---
title: Don't tag metrics with things strangers control
categories:
  - Posts
tags:
  - micrometer
  - metrics
  - observability
  - resilience4j
  - kotlin
  - springboot
  - cloudwatch
  - logging
classes: wide
taxonomy: Micrometer Metrics Cardinality
header:
  overlay_image: /assets/images/metric-cardinality.png
author_profile: true
date: '2026-08-26'
description: >-
  A metric tagged with the client IP looks harmless in staging and turns into
  one time series per stranger in production. The bill is the second-worst
  consequence.
---
## The symptom

There wasn't one. That's the problem.

Nothing broke. No alarm fired, no request failed, no latency moved, no error rate ticked up. The tests passed, staging looked exactly the way it was supposed to, and the code did precisely what I told it to do. A cardinality bug produces no runtime signal, because from the application's point of view nothing *is* wrong — you asked for a counter tagged by client IP and you got exactly that, once per distinct client address, forever.

So it surfaces the way cost problems surface: out of band, on a bill, well after the commit that caused it, spotted by someone who wasn't looking for it. By then the deploy is buried under a hundred others and nobody connects "we improved our observability" to "this line item grew".

## The mistake, in five lines of code

There was a Resilience4j rate limiter in front of some public endpoints, and I wanted to know *who* was getting throttled. So:

```kotlin
try {
    rateLimiter.executeSuppliedRunnable { handler.handle(request) }
} catch (e: RequestNotPermitted) {
    meterRegistry.counter("ratelimit.rejected", "client.ip", request.remoteAddr).increment()
    throw e
}
```

That is the whole bug. It passed review. It behaved perfectly in staging, where the set of client IPs is roughly "the CI runner and my laptop" — two time series, both stable, dashboard looked great.

## Why it explodes

A metric's series count is the **product** of its tag cardinalities, not the sum. Bounded times bounded is fine: five limiters times two outcomes is ten series, and it stays ten series forever. Add a third bounded tag and you get thirty. You can write that number down in advance, which is the whole test.

One unbounded tag makes the entire metric unbounded, and every other tag on it becomes a multiplier on infinity. The limiter name was fine. The limiter name *next to the client IP* was not.

But unbounded isn't even the interesting part. Client IP is unbounded **and chosen by a third party**. The cardinality of that tag is not a property of my system; it's a property of whoever is sending me traffic. An external actor decides how many time series my monitoring backend stores, and therefore what I pay for it. That's a denial-of-wallet vector. A mild one, but it's the same shape as the real thing, and I built it myself and paid for it monthly.

The detail that annoys me most: the request that creates the new time series is the one I just *rejected*. The rate limiter did its job, and the metric quietly routed around it. A client hammering an endpoint at ten times the allowed rate gets a 429 for every request and a brand-new billable dimension combination for every source address it rotates through. On IPv6, rotating source addresses is free.

## The arithmetic

CloudWatch bills per metric, and "a metric" there means a unique combination of namespace, name, and dimension values. Not a unique metric name. Every distinct dimension set is its own billable thing.

Public pricing at the time of writing: **$0.30 per metric per month for the first 10,000**, then **$0.10 for the next 240,000**.

So, an illustrative example — these are made-up round numbers, not my figures:

- 50,000 distinct client IPs in a month, tagged onto 2 metrics = 100,000 metrics
- first 10,000 × $0.30 = $3,000
- remaining 90,000 × $0.10 = $9,000
- **$12,000 per month**

Fifty thousand distinct client IPs in a month is not a big public API. That is the number that should make you uncomfortable — not because it's large, but because it's so ordinary.

## The second, worse problem

Suppose the money didn't matter. The metric is still useless.

"Rejections, broken down by client IP" answers no question anyone has ever asked me. Nobody wants a per-IP time series; they want *the top ten offenders right now*, which is a different query and one that metrics are structurally bad at. What I built was a hundred thousand mostly-empty series and no aggregation across them that a dashboard could render before someone closed the tab.

It degrades everything downstream, too. Dashboard queries slow down because there's more to scan, and alarm evaluation gets more expensive for the same reason. And if you're also scraping the registry with Prometheus, its TSDB holds an in-memory index proportional to the number of **active** series — high cardinality doesn't politely age out, it grows the resident set of the process that's meant to tell you when you're out of memory.

High cardinality doesn't just cost money. It destroys the signal you wanted in the first place.

## The fix

Bounded dimensions only. Every tag value comes from a set I can enumerate:

```kotlin
enum class ClientTier { ANONYMOUS, FREE, PARTNER, INTERNAL }

meterRegistry.counter(
    "ratelimit.rejected",
    "limiter", limiterName,   // one of the limiters we configured
    "route", routeId,         // a route template, from the route table
    "tier", tier.name,        // it's an enum, so it's enumerable
).increment()

log.warn(
    "rate limit rejected route={} limiter={} tier={} clientIp={} apiKeyId={}",
    routeId, limiterName, tier, request.remoteAddr, apiKeyId,
)
```

Note `routeId`, not `request.path`. A raw path is attacker-controlled too — `/api/v1/quote?cachebust=` plus a random integer is the same bug wearing a different hat. Route templates come from a table you wrote; paths come from the internet.

The client IP hasn't disappeared. It moved to the log line, where it belongs.

## The guardrail

The fix above is one commit. The guardrail is the point:

```kotlin
@Bean
fun denyUnboundedTags(): MeterFilter =
    MeterFilter.ignoreTags("client.ip", "user.id", "session.id", "request.id")

@Bean
fun capRouteCardinality(): MeterFilter =
    MeterFilter.maximumAllowableTags("ratelimit", "route", 200, MeterFilter.deny())
```

The first strips known-dangerous tag keys wherever they appear. The second is a backstop: if a 201st distinct `route` value shows up under `ratelimit`, something is passing raw paths, and the meter gets dropped rather than billed.

I care about this more than the fix, because review will not catch it next time. It didn't catch it this time. `"client.ip", request.remoteAddr` is four tokens in a diff that otherwise looks like good observability work — someone adding a metric, which is the behaviour you spent a year encouraging. You can't review your way out of it. The registry has to refuse.

## Where the high-cardinality data actually belongs

Logs and traces. They're priced per volume ingested, not per distinct value, which is exactly the cost model this data wants.

The question I originally had — "which clients are getting throttled most?" — is a query, not a dashboard:

```
fields @timestamp, clientIp, route, tier
| filter message = "rate limit rejected"
| stats count(*) as rejections by clientIp, route
| sort rejections desc
| limit 20
```

Runs on demand, costs what it costs when someone actually asks, stores nothing extra the rest of the month.

If you want it standing rather than on demand, CloudWatch Contributor Insights is the native answer: top-N rankings over a high-cardinality field, built from log data. That is the tool I should have reached for instead of inventing a worse one out of counters.

Resilience4j's own meters, incidentally, get this right — `resilience4j.ratelimiter.available.permissions` and `resilience4j.ratelimiter.waiting_threads` carry the limiter name and nothing else. The library was already bounded. I unbounded it.

## The rule

Tag values must come from a set you can enumerate. Not "a set that's usually small" — a set you can actually write down: an enum, a config file, a route table, a list of limiter names. If you can't write down the possible values, it isn't a tag, it's a log field. And if the values come from outside your system, it isn't even a close call, because you've handed a stranger the pen that writes your monitoring bill.

---

*The snippets are Kotlin against Micrometer and Resilience4j. The `MeterFilter` signatures are checked against current Micrometer upstream, but compile them against your own versions before trusting them. The CloudWatch prices are public list prices at the time of writing and vary by region.*

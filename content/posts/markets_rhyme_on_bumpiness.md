---
title: "Markets Don't Rhyme on Direction. They Rhyme on Bumpiness."
date: "2026-11-08"
---

# Markets Don't Rhyme on Direction. They Rhyme on Bumpiness.

Last year I built a search engine for [market rhymes](/post/Can_AI_Help_a_Retail_Investor_Find_Market_Rhymes/). It describes today's market as a vector, finds the moments in the past that looked most like it, and checks what happened next. I never finished the write-up, partly because the backtests were all over the place. Some stocks made money, some lost it, and I couldn't tell whether any of it was more than luck.

So I went back and tested it properly.

## The test

- 45 large caps that have been listed since before 2005
- every 5th trading day from 2010 to 2025, 844 dates in all
- on each date, a stock could only be matched against past windows whose outcome was already known that day, so there was no peeking at the future

For each stock, the forecast is the average of what happened after its closest matches. Then I asked a simple question: do the stocks it expects to do best actually do best?

As a sanity check I added a control that picks random moments from the past instead of the closest ones. If the engine is doing anything, it should beat random.

## Direction: no rhyme

| Signal | 5-day IC | 20-day IC |
| :--- | ---: | ---: |
| My original engine | 0.004 | -0.010 |
| Original engine + my backtest filters | -0.001 | 0.000 |
| Random matches | 0.004 | -0.004 |

IC is the rank correlation between the forecast and the actual return across stocks on a date. Zero means no information.

None of these is distinguishable from zero, and my engine is no better than random. Even classic signals like momentum came out at about zero in this setup. Ranking big stocks by next month's return is just very hard.

## Bumpiness: some rhyme

Then I changed the question. Instead of asking where prices go, I asked how much they move: the stock's realized volatility over the next 20 days.

The obvious forecasts here are the stock's own recent volatility and the VIX, so the real question was whether similar past moments add anything on top of those two.

| Forecast of next-20-day volatility | Out-of-sample R² |
| :--- | ---: |
| Own recent volatility | 0.358 |
| + VIX | 0.370 |
| + random matches | 0.370 |
| + my original engine | 0.375 |
| + matches on a simpler market state | **0.404** |

The VIX adds a little. Matching on a simpler state adds about three times as much, and the random control adds nothing, so it isn't noise.

Most of that gain comes from the features themselves: recent returns, the volatility regime, distance from moving averages. But the matching still adds a bit on top of using those features in a plain linear model. My guess is that it picks up non-linear things, like volatility jumping more after a sharp drop than after a rally.

It also ranks which stocks will be bumpier slightly better than recent volatility does (0.586 vs 0.561 rank correlation). The VIX can't help with that at all, since it's the same number for every stock.

## Why my original engine failed even here

It z-scored every 30-day window before comparing them. That keeps the shape of a move and throws away its size. Shape turned out to say nothing about direction, and size is exactly what risk depends on.

## So

Similar moments don't tell you where a stock is going. They do tell you a bit about how rough the ride will be. Drawdowns, by the way, stayed unpredictable: nothing I tried explained more than 3% of them.

The natural next question is whether that's worth anything in options, where you get paid for being right about volatility rather than direction. That's next.

Code and full results are on the `research/signal-eval` branch of [stocks_match](https://github.com/Yuehan-Wang/stocks_match/tree/research/signal-eval).

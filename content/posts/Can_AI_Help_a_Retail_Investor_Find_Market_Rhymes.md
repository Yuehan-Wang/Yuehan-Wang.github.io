---
title: "Can AI Help a Retail Investor Find Market Rhymes?"
date: "2025-11-27"
---

# Can AI Help a Retail Investor Find Market Rhymes?

> History doesn't repeat itself, but it often rhymes. — Mark Twain

I invest on the side, and I spend too much time staring at charts wondering whether the "bull flag" I see is real or just my own optimism. Technical analysis gives you a vocabulary, but most of the time it just confirms what you already wanted to believe.

So I asked a different question: if today's market looks mathematically like some moment in the past, what happened next? To answer it, I built a vector similarity engine that searches the last ten years of market data for those rhymes.

## How it works

Matching the shape of a price line isn't enough. A $5 move is a breakout for a cheap stock and noise for an expensive one, so raw prices mislead. Instead, each day is described by 12 factors, each normalized with a z-score:

- **Structure:** price shape, distance from moving averages
- **Momentum:** RSI, MACD, stochastic
- **Energy:** normalized volume, on-balance volume
- **Volatility:** ATR, Bollinger Band width

A pattern also depends on the economy around it. A breakout when rates are near zero isn't the same as one during a credit crunch. So before the engine accepts a historical match, it checks the 10-year Treasury yield on that date. If rates were very different from today, the match is thrown out, however good the chart looks.

## Testing it properly

My first backtests were all over the place. Some stocks made money, some lost it, and I couldn't tell whether any of it was more than luck. So I set up a stricter test:

- 45 large caps that have been listed since before 2005
- every 5th trading day from 2010 to 2025, 844 dates in all
- on each date, a stock could only be matched against past windows whose outcome was already known that day, so there was no peeking at the future

For each stock, the forecast is the average of what happened after its closest matches. As a sanity check I added a control that picks random moments from the past instead of the closest ones. If the engine is doing anything, it should beat random.

## Direction: no rhyme

First question: do the stocks it expects to do best actually do best?

| Signal | 5-day IC | 20-day IC |
| :--- | ---: | ---: |
| The engine | 0.004 | -0.010 |
| The engine + my backtest filters | -0.001 | 0.000 |
| Random matches | 0.004 | -0.004 |

IC is the rank correlation between the forecast and the actual return across stocks on a date. Zero means no information.

None of these is distinguishable from zero, and the engine is no better than random. Even classic signals like momentum came out at about zero in this setup. Ranking big stocks by next month's return is just very hard.

## Bumpiness: some rhyme

Then I changed the question. Instead of asking where prices go, I asked how much they move: the stock's realized volatility over the next 20 days.

The obvious forecasts here are the stock's own recent volatility and the VIX, so the real question was whether similar past moments add anything on top of those two.

| Forecast of next-20-day volatility | Out-of-sample R² |
| :--- | ---: |
| Own recent volatility | 0.358 |
| + VIX | 0.370 |
| + random matches | 0.370 |
| + the engine | 0.375 |
| + matches on a simpler market state | **0.404** |

The VIX adds a little. Matching on a simpler state adds about three times as much, and the random control adds nothing, so it isn't noise.

Most of that gain comes from the features themselves: recent returns, the volatility regime, distance from moving averages. But the matching still adds a bit on top of using those features in a plain linear model. My guess is that it picks up non-linear things, like volatility jumping more after a sharp drop than after a rally. It also ranks which stocks will be bumpier slightly better than recent volatility does (0.586 vs 0.561 rank correlation), something the VIX can't do at all, since it's the same number for every stock.

Why didn't the original engine help here? It z-scored every 30-day window before comparing them. That keeps the shape of a move and throws away its size. Shape turned out to say nothing about direction, and size is exactly what risk depends on.

## So, can it?

Not for picking direction. Similar moments don't tell you where a stock is going. They do tell you a bit about how rough the ride will be. Drawdowns stayed unpredictable, though: nothing I tried explained more than 3% of them.

Code and full results are on the `research/signal-eval` branch of [stocks_match](https://github.com/Yuehan-Wang/stocks_match/tree/research/signal-eval).

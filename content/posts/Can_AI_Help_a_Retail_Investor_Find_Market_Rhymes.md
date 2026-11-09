---
title: "Can AI Help a Retail Investor Find Market Rhymes?"
date: "2025-11-27"
---

# Can AI Help a Retail Investor Find Market Rhymes?

> History doesn't repeat itself, but it often rhymes. — Mark Twain

I invest on the side, and I spend too much time staring at charts wondering whether the "bull flag" I see is real or just my own optimism. So I asked a different question: if today's market looks mathematically like some moment in the past, what happened next?

## How it works

I built a vector similarity engine over the last ten years of market data. Each day is described by 12 z-scored factors: price shape, distance from moving averages, RSI, MACD, stochastic, volume, on-balance volume, ATR and Bollinger Band width. A historical match is thrown out if the 10-year Treasury yield back then was very different from today, since a breakout at zero rates isn't the same as one in a credit crunch.

## Testing it

My first backtests were all over the place, so I set up a stricter test: 45 large caps, every 5th trading day from 2010 to 2025, and each stock could only be matched against past windows whose outcome was already known on that day. As a control, I also tried picking random past moments instead of the closest ones.

**Direction: no rhyme.** The engine couldn't rank which stocks would do best over the next 5 or 20 days. Its scores were indistinguishable from zero and no better than random matches. Even momentum came out at about zero, so this is just a very hard question.

**Bumpiness: some rhyme.** Then I asked how much stocks would move instead of where they'd go.

| Forecast of next-20-day volatility | Out-of-sample R² |
| :--- | ---: |
| Own recent volatility | 0.358 |
| + VIX | 0.370 |
| + random matches | 0.370 |
| + matches on a simpler market state | **0.404** |

Matching on a simpler state (recent returns, volatility regime, distance from moving averages) adds about three times what the VIX does, and the random control adds nothing. The original 12-factor vectors didn't help. They z-score each window, which keeps the shape of a move but throws away its size, and size is what risk depends on.

So similar moments don't tell you where a stock is going, but they do say a little about how rough the ride will be.

## To be continued

That points at options. A strangle doesn't care about direction: it pays when the move is bigger than what the market priced in. The catch is that the bar is the option's implied volatility, not trailing vol or the VIX. My next test is to compare the engine's volatility forecast for SPY with the VIX, which is the market's own 30-day forecast, and see whether the gap predicts when realized volatility ends up above or below it. If it does, there might be something here.

Code and results are on the `research/signal-eval` branch of [stocks_match](https://github.com/Yuehan-Wang/stocks_match/tree/research/signal-eval).

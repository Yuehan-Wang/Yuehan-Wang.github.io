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

A pattern also depends on the economy around it. A breakout when rates are near zero isn't the same as one during a credit crunch. So before the engine accepts a historical match, it checks the 10-year Treasury yield and the VIX on that date. If either was very different from today, the match is thrown out, however good the chart looks.

## Update

I finally tested it properly. The short version: no rhyme on direction, some on volatility. [Part 2](/post/markets_rhyme_on_bumpiness/).

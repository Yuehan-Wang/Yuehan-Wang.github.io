---
title: "Smart DCA: Methodology and Results"
date: "2025-11-05"
---
# Smart DCA: Methodology and Results

Dollar-cost averaging works because it takes timing out of your hands. It's also completely blind. It buys the same amount during a crash, when good stocks are on sale, and during a bubble, when they're expensive.

I wanted a version that leans in when quality assets are cheap and eases off when they're overheated, using fixed rules instead of however I feel about the market that week.

## V1: buy the dips, slow down when it's hot

The first version had two rules:

- **Buy more:** if the VIX is above 30 or the price is below its 200-day average, invest 1.6x–2.0x the usual amount.
- **Buy less:** if RSI is above 70 (overbought), invest 0.6x.

It beat plain DCA, but it got strong bull runs wrong. A stock like Nvidia in 2023 can stay above RSI 70 for months, and V1 kept treating that as a warning and cutting back exactly when it should have kept buying.

## V2: Smart Impulse

To fix that, I added the Elder Impulse System, which colors each bar by momentum: green for a strong uptrend, red for a strong downtrend. Two rules changed:

- **Momentum beats RSI.** If RSI says overbought but the impulse bar is still green, keep buying.
- **Buy quality dips right away.** If a quality asset like the S&P 500 drops below its 200-day average and RSI falls under 40, invest 1.6x immediately instead of waiting for the perfect bottom. Good assets don't stay cheap for long.

## Backtests

Each test compares plain DCA, V1 and Smart Impulse. "Capital deployed" is how much a strategy invested relative to plain DCA.

### 2007–2010: the financial crisis

| | Plain DCA | V1 | Smart Impulse |
| :--- | :--- | :--- | :--- |
| Total ROI | 4.3% | 8.5% | **9.4%** |
| Alpha | — | +4.2% | **+5.1%** |
| Max drawdown | -24.9% | -17.6% | **-14.7%** |

Smart Impulse put the most money in when the VIX spiked. It came out of the crisis with about twice plain DCA's return and the smallest drawdown of the three.

### 2020–2021: the Covid crash and rally

| | Plain DCA | V1 | Smart Impulse |
| :--- | :--- | :--- | :--- |
| Total ROI | 30.7% | **36.0%** | 35.3% |
| Capital deployed | 100% | 124.1% | 132.7% |

This is the only period V1 won, by 0.7 points. Both beat plain DCA easily.

### 2022: the inflation selloff

| | Plain DCA | V1 | Smart Impulse |
| :--- | :--- | :--- | :--- |
| Total ROI | -9.0% | -8.9% | **-8.7%** |
| Capital deployed | 100% | 163.3% | 139.2% |

A slow, year-long slide. V1 kept pouring money into it (163%). Smart Impulse invested less and still finished slightly ahead.

## 2020 to now

### A volatile portfolio: NVDA, PYPL, DIS

| | Plain DCA | V1 | Smart Impulse |
| :--- | :--- | :--- | :--- |
| Total ROI | 89.9% | 97.1% | **100.3%** |
| Capital deployed | 100% | 137.9% | 123.4% |
| Max drawdown | -39.3% | -37.1% | -39.4% |

This is the test that made me drop V1. It invested 138% to get 97%. Smart Impulse invested 123% and got 100%. The drawdown is about the same as plain DCA, so this doesn't make a volatile portfolio any safer, it just uses the money better.

### An index portfolio: VOO + QQQ

| | Plain DCA | V1 | Smart Impulse |
| :--- | :--- | :--- | :--- |
| Total ROI | 67.0% | 73.7% | **74.6%** |
| Capital deployed | 100% | 122.4% | 120.3% |
| Max drawdown | -11.0% | -8.5% | -10.2% |

For plain index investing the gain is modest but real: 7.6 points over plain DCA and about 1 point over V1, with slightly less money put in.

You can try it [here](https://yuehan-wang-smart-dca-app-cujodf.streamlit.app/).

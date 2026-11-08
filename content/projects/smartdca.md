---
title: "Smart DCA"
description: "Dollar-cost averaging that buys more when quality assets are on sale and less when they're overheated."
imageUrl: '/images/projects/smartdca.svg'
date: "2025-11-05"
visible: true
---

Plain DCA buys the same amount every time, whether the market is crashing or in a bubble. Smart DCA scales each buy with a few rules instead. It buys up to 2x when a quality asset drops below its 200-day average or volatility spikes. It cuts back to 0.6x when the asset is overbought.

The first version cut buying too early in strong uptrends, like Nvidia in 2023. Version 2 fixes that with the Elder Impulse System: as long as momentum is still green, it keeps buying even when RSI says overbought.

[Try the app](https://yuehan-wang-smart-dca-app-cujodf.streamlit.app/) · [Read the full methodology and results](/post/smart_dca/)

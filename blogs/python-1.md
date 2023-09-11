---
title: Pythonの;の意味
description: Pythonの;の意味について
date: 2022/9/30 8:29
---

## 例文

こんな文を一文で書ける

### Before

```py
import discord


client = discord.Client(intents=discord.Intents.all())
```

### After

```py
import discord;client=discord.Client(intents=discord.Intents.all())
```

## Pep8では

Afterの文を見ればわかる通り、Pep8では推奨されてない。

推測だが、汚いからという理由が大きいのではないか？と思う。

## まとめ

仮でテストする時などでは使ってもいいと思うが、誰かと一緒にプロジェクトをする際はやるべきではないと思った。

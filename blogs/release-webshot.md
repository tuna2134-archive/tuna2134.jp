---
title: Webshot APIのリリース
description: chromium使ってサイトをスクリーンショットしてくれるAPIをリリースしました。
date: 2023/7/1
---

## 利用ソフトウェア

- kubernetes
- TypeScript
- Puppeteer-core
- Chromium
- Node.js

## ドキュメント

ベースのURLは`https://webshot-api.tuna2134.dev`です。

### GET /

**Parameters**

|  name  | description  | required |
| :----: | :----------: | :------: |
|  url   | サイトの宛先 |   true   |
| height |     高さ     |  false   |
| width  |     横幅     |  false   |

## サンプルコード

**Python**

```py
import requests


res = requests.get("https://webshot-api.tuna2134.dev", params={
    "url": "https://google.com"
})
with open("image.png", "wb") as f:
    f.write(res.content)
```

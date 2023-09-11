---
title: CloudFlare workers puppeteerを使ってみた
description: CloudFlare workersでブラウザを自動化することが可能なものを使ってみた。(まだベータ版)
date: 2023/6/30 12:00
---

CloudFlare puppeteerがベータ版としてリリースされたので、使ってみようと思います。

## 申し込み方法
公式Discordサーバーから申し込んだ方が早いので、そこに入室後CloudflareのアカウントIDを貼り付けて、使いたいと英語で送信してくれれば、使えるようにしてくれます。

[CloudFlare公式サーバー](https://discord.gg/cloudflaredev)

## コード

スクリーンショット撮ってくれるコード
```ts:src/index.ts
import puppeteer from "@cloudflare/puppeteer";

let browser = await puppeteer.launch(env.MYBROWSER);
let page = await browser.newPage();
await page.goto("https://example.com");
let img = await page.screenshot() as Buffer;
```

```toml:wrangler.toml
workers_dev = true
browser = { binding = "MYBROWSER", type = "browser" }
```
上のものを`wrangler.toml`に追加したあと、`wrangler deploy`実行すれば使えるようになります。

## まとめ
ブラウザを作るのに、レートリミットがあるようです。そのためWeb APIとして公開するなどはできないと思います。
だけど、サイトのテストなどの利用には最適だと思います。

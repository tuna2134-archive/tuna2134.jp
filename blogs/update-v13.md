---
title: notesをNext.js v13にアップデートしました
description: notesをv12からv13にアップデートしました。
date: 2022/12/4 09:44
---

## 概要

Next.js v13が出たので、アップデートしようと思います。

## Next.js関連ライブラリをアップデート

```sh
yarn add next@latest react@latest react-dom@latest eslint-config-next@latest
```

## Linkの子要素にあるaタグを全部変える

例:

```jsx
<Link href="/">
  <a className="nav_title">Title</a>
</Link>
```

To:

```jsx
<Link href="/" className="nav_title">
  Title
</Link>
```

## 最後に

Next.js v13の目玉機能である`/app`の機能を使ってみたいと思います。
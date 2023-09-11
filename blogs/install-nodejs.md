---
title: node.js(最新)を導入する方法
description: Linuxにnode.js(最新)を導入する方法を説明します
date: 2022/10/17 13:34
---

## 概要

Linuxにnode.jsを導入しようと思ったけど、ビルドがマジクソ遅いんで、`dnf`からインストールしてみる。

## Node.jsをインストール

```sh
sudo dnf install nodejs
```

ではなく

```sh
curl -sL https://rpm.nodesource.com/setup_18.x | sh -
```

で実行してください。理由としては、前者のやり方でやると古いバージョンがインストールされるから。

その後に

```sh
sudo dnf install nodejs
```

こうすることで最新版のNode.jsをインストールすることができます。

## 最後に

Node.js最新版をインストールできてよかったです。ではまた会いましょう。

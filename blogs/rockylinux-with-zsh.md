---
title: Rockylinuxでzshを使う方法
description: Rockylinuxでzshを使えなかったので、調べて使えるようにしました。
date: 2022/10/7 13:10
---

## 概要

zshをインストールしたけど、デフォルトに設定できなかったのでメモしとく。

## 必要なライブラリをインストール

```sh
sudo dnf install zsh util-linux-user
```

zsh: zsh
util-linux-user: chshを実行するために必要

## デフォルトシェルをzshに変更

```sh
chsh -s $(which zsh)
```

## 最後に

`chsh`ができなくて困ったけど、`util-linux-user`をインストールすることでできた。

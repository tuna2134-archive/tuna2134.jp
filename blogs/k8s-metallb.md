---
title: kubernetesにmetallbを入れてみた話
description: kubernetesにmetallbを入れました
date: 2023/5/1 22:43
---

## そもそもmetallbとは
MetalLBは、ベアメタルKubernetesクラスタ用のロードバランサ実装で、標準ルーティングプロトコルを使用します。

つまりGKEなどでServiceのLoadbalancerモードで動かすと、ランダムにIPが割り当てられるよって感じです。

## まずインストール
以下のコマンドを実行してください。

```sh
kubectl get configmap kube-proxy -n kube-system -o yaml | \
sed -e "s/strictARP: false/strictARP: true/" | \
kubectl diff -f - -n kube-system
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.13.9/config/manifests/metallb-native.yaml
```

## セットアップ
IPの割り当て範囲を指定します。この場合Layer2モードでやるのでBGPを探している方は後日出す記事を見てください。

```yaml
apiVersion: metallb.io/v1beta1
kind: IPAddressPool
metadata:
  name: first-pool
  namespace: metallb-system
spec:
  addresses:
  - 192.168.11.40-192.168.11.60
```

とりあえずこんな感じにしてください。

## 使う
さて、metallbこれで使えるようになりました！

サンプルを試しに実行してみましょう！

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nginx
spec:
  selector:
    app: nginx
  ports:
  - name: http
    protocol: TCP
    port: 80
    targetPort: 80
  type: LoadBalancer
```

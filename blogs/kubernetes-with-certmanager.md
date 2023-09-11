---
title: Kubernetes with CloudFlare
description: Kubernetes上でサイトをCloudFlare使って公開した時にやったこと
date: 2023/6/28 17:00
---

:::message alert
結構曖昧で、間違っているところがあると思います。
:::
​
## 説明
kubernetesでmisskey建てたのですが、CloudFlareの設定でオリジンからエッジ間がSSL認証するように設定しています。だけどcertbotとか云々でめんどくさいので、ネットで漁った結果、cert-managerってものを見つけたので、それを使おうと思います。
​
## cert-managerとは
kubernetesで証明書を管理するためのツールだと思えばいいです。Linuxとかで使うとしたらcertbotです。
​
## origin-ca-issuer
CloudFlare謹製のcert-manager向けプラグインです。エッジ間で使う専用の証明書を自動的に発行してくれます。
​
## cert-manager導入
```sh
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.12.0/cert-manager.yaml
```
これだけで導入できます。
​
## origin-ca-issuer
1. origin-ca-issuerをまずダウンロード
```sh
git clone https://github.com/cloudflare/origin-ca-issuer.git
```
​
2. Custom Resource Definitionsを導入
```sh
kubectl apply -f deploy/crds
```
​
3. RBACルールを導入
```sh
kubectl apply -f deploy/rbac
```
​
4. コントローラーをインストール
```sh
kubectl apply -f deploy/manifests
```
​
5. 動作確認
```sh
kubectl get -n origin-ca-issuer pod
```
​
## CloudFlare Origin CA Keyをセット
​
1. API Keyを取得
[ここ](https://dash.cloudflare.com/profile/api-tokens)にアクセスした後、下にクロールして、`API Keys`とかかれたところにある、`Origin CA Key`の横のViewを押した後、パスワードを求められるので、パスワードを入力し、`View`をもう一回押すと、apiキーがでるので、保存しといてください。
​
2. Secretを作成
```sh
kubectl create secret generic \
    -n default service-key \
    --from-literal key=<Your API Key>
```
Your API Keyと書かれているところを先ほど保存したAPIキーと入れ替えてください。
​
3. secretからAPIキーを取得して動かす。
```yaml:issuer.yaml
apiVersion: cert-manager.k8s.cloudflare.com/v1
kind: OriginIssuer
metadata:
  name: prod-issuer
  namespace: default
spec:
  requestType: OriginECC
  auth:
    serviceKeyRef:
      name: service-key
      key: key
```
これを`issuer.yaml`に保存し、applyしてください。
その後有効かどうか、チェックします。
```sh
kubectl get originissuer.cert-manager.k8s.cloudflare.com prod-issuer -o json | jq .status.conditions
```
​
4. 証明書を自動的に作るpodをデプロイ
```yaml:cert.yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: social-tuna2134-dev
  namespace: default
spec:
  secretName: social-tuna2134-dev-tls
  dnsNames:
  - social.tuna2134.dev
  duration: 168h
  renewBefore: 24h
  issuerRef:
    group: cert-manager.k8s.cloudflare.com
    kind: OriginIssuer
    name: prod-issuer
```
​
5. Ingressをたてて使う
```yaml:ingress.yaml
apiVersion: networking/v1
kind: Ingress
metadata:
  annotations:
    cert-manager.io/issuer: prod-issuer
    cert-manager.io/issuer-kind: OriginIssuer
    cert-manager.io/issuer-group: cert-manager.k8s.cloudflare.com
  name: misskey-ingress
  namespace: default
spec:
  rules:
    - host: social.tuna2134.dev
      http:
        paths:
         - pathType: Prefix
           path: /
           backend:
              service:
                name: misskey-service
                port:
                  number: 3000
  tls:
  - hosts:
    - social.tuna2134.dev
      secretName: social-tuna2134-dev-tls
```
これを`ingress.yaml`に保存した後、applyしてください。
その後CloudFlareのDNSにいつも通りの設定をすると、使うことができます。
​
## 最後に
certbotみたいに自動的に証明書を更新してくれる機能が便利だなと思いました。

# A memo of how I structured this backend

## ./index.js

/startup の中のものを取り込む

## ./apicalls

spotifyApi から JSON オブジェクトを取得できるようにする

## ./authentication

spotifyApi の authentication を自動でできるモジュールを作成する

### ./authentication/authorization_code

authorization code が必要な API リクエストのために、spotify の authentication をやる

### ./authentication/client_credentials

authorization code が必要ではない API リクエストのときの、authentication を担う

## ./config

configuration を設定する。（環境変数など）

## ./middleware

必要なサードパーティーミドルウェア、カスタムミドルウェアなどをまとめておく。

## ./routes

クライアントのリクエストを処理して、リスポンスを返す

## ./startup

/routes その他必要な機能をまとめる

## ./tests

jest を使って TDD を行う

## ./experiments.js

コードをテストしたいときの実験場

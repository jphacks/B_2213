# Ingame REST API

レスポンスは全て[WebSocket Response](WebSocket%20Response%209dd64b3db1734a91a5931c9cdf4cc95d.md) に書いてあるとおりになるので、省略する。

このページに書かれているエンドポイントにはCookieが設定されていないと401 Unauthorizedが返される

## データを送らずにクライントのデータを更新だけする

### リクエスト

`GET /api/ingame/{RoomID}/`

### レスポンス

204 No Content

## レイズ

### リクエスト

`POST /api/ingame/{RoomID}/raise?userID={userID}`

| Column | Datatype | Detail |
| --- | --- | --- |
| amount | number | レイズ量 |

レイズ量はレイズする人が既に出したチップ量に更に上乗せする量である。

例えばPlayer1が100ベットして、Player2が200にレイズし、更にPlayer1が400にレイズしたい時、amountは300になる

また、以上のことからamountはPlayer1が所持しているチップ量より必ず少なくなる。

```json
{
  "amount": 300
}
```

### レスポンス

204 No Content

## コール(チェック)

### リクエスト

`POST /api/ingame/{RoomID}/call?userID={userID}`

Bodyなし

コールに必要なチップ量を所持していない場合、AllInとなる。

### レスポンス

204 No Content

## フォールド

### リクエスト

`POST /api/ingame/{RoomID}/fold?userID={userID}`

Bodyなし

コールに必要なチップ数が0の時、コールとして扱う

### レスポンス

204 No Content

## 勝者選択

### リクエスト

`POST /api/ingame/{RoomID}/selectWinner?userID={userID}`

| Column | Datatype | Detail |
| --- | --- | --- |
| winner | string | 勝者のUserID |

```json
{
  "winner": "ULKJTYU"
}
```

誰の中から勝者を選択するのかを見に行くだけの場合、Bodyは`{}`で取得できる

### レスポンス

まだ勝者選択が必要な場合: 200 OK

| Column | Datatype | Detail |
| --- | --- | --- |
| winner | []string | UserID |

```json
{
  "winner": [
    "ULJKUIO",
    "UEWQSDA"
  ]
}
```

これ以上勝者選択がいらない場合: 204 No Content

AdminがFalseの場合、403 Forbiddenが返される

Bodyが誤っていてサーバーで解釈できない場合、422または400が返される

## オプション適用

### リクエスト

`POST /api/ingame/{RoomID}/options?userID={userID}`

| Column | Datatype | Detail |
| --- | --- | --- |
| stacks.{UserID} | number | 所持チップ量(キーは変更するUserのID) |
| bb | number | BBの強制ベット額(required) |
| sb | number | SBの強制ベット額(required) |

```json
{
  "stacks": {
    "UKJYFGS": 12342,
    "USERIDD": 12341
  },
  "bb": 50,
  "sb": 30
}
```

### レスポンス

204 No Content

AdminがFalseの場合、403 Forbiddenが返される

Bodyが誤っていてサーバーで解釈できない場合、422または400が返される

## ゲーム退出

### リクエスト

`POST /api/ingame/{RoomID}/quitGame?userID={userID}`

Bodyなし

### レスポンス

200 OK

## BB選択

### リクエスト

`POST /api/ingame/{RoomID}/bb?userID={userID}`

Bodyなし

### レスポンス

204 No Content

## SB選択

### リクエスト

`POST /api/ingame/{RoomID}/sb?userID={userID}`

Bodyなし

### レスポンス

204 No Content

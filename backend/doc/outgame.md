# Outgame REST API

目次

## ゲームがプレイ可能か返すエンドポイント

### リクエスト

`GET /api/status/[poker or mahjong]`

### レスポンス

| Column | type | Details |
| --- | --- | --- |
| status | string | "alive", "busy" or "dead" |

```json
{
    "status": "alive"
}
```

## ルーム作成

### リクエスト

`POST /api/createRoom/poker`

| Column | type | Details |
| --- | --- | --- |
| userName | string | userName |

```json
{
	"userName": "KF"
}
```

### レスポンス

| Column | type | Details |
| --- | --- | --- |
| data.userID | string | 頭文字はU固定、合計7文字 |
| data.roomID | string | 頭文字はR固定、A-Z/0-9の5文字 |
| data.userName | string | 表示名 |
| data.permission | string | "admin" or "normal" <br> ゲーム内でadminのみが使えるコマンドが存在する |

```json
{
    "data": {
        "userID": "U901723",
        "roomID": "RSOIUQ",
        "userName": "KF",
        "permission": "admin"
    }
}
```

400番代のエラーはメッセージの通り

## ルーム参加

### リクエスト

`POST /api/joinRoom/poker`

| Column | type | Details |
| --- | --- | --- |
| userName | string | userName |
| roomID | string | roomID |

```json
{
	"userName": "KF"
	"roomID": "R12432"
}
```

### レスポンス

| Column | type | Details |
| --- | --- | --- |
| data.userID | string | 頭文字はU固定、合計7文字 |
| data.roomID | string | 頭文字はR固定、A-Z/0-9の5文字 |
| data.userName | string | 表示名 |
| data.permission | string | "admin" or "normal"ゲーム内でadminのみが使えるコマンドが存在する  |

```json
{
    "data": {
        "userID": "U901723",
        "roomID": "RSOIUQ",
        "userName": "KF",
        "permission": "normal"
    }
}
```

400番代のエラーはメッセージの通り

## ルームステータス

ルームの状態が参加待機、プレー中、終了済みかを返す

### リクエスト

`GET /api/status/[poker or mahjong]/{roomID}`

### レスポンス

| Column | type | Details |
| --- | --- | --- |
| status | string | "waiting", "on game" or "finished" |

```json
{
    "status": "on game"
}
```

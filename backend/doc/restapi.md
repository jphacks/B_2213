# RestAPI Document

## ゲームがプレイ可能か返すエンドポイント

### リクエスト

`GET /api/status/[poker or mahjong]`

### レスポンス

| Column | type | Details |
| -------- | -------- | -------- |
| status | string | "alive", "busy" or "dead" |

```json
{
    "status": "alive"
}
```

## ルーム作成

### リクエスト

`POST /api/createRoom/poker`

### レスポンス

| Column | type | Details |
| -------- | -------- | -------- |
| userID | int | userID |
| roomID | string | A-Z, 0-9の5文字 |
| userName | string | 表示名 |

```json
{
    "userInfo": {
        "userID": number,
        "roomID": string,
        "userName": string,
        "permission": "admin"
    }
}
```

## ルーム作成

### リクエスト

`POST /api/joinRoom/poker`

### レスポンス

| Column | type | Details |
| -------- | -------- | -------- |
| userID | int | userID |
| roomID | string | roomID |
| userName | string | 表示名 |

```json
{
    "register_info": {
        "userID": 901723,
        "roomID": SOIUQ,
        "userName": "KF",
        "permission": "normal"
    }
}
```

## ルームステータス

ルームの状態が参加待機、プレー中、終了済みかを返す

### リクエスト

`GET /api/status/[poker or mahjong]/{roomID}`

### レスポンス

| Column | type | Details |
| -------- | -------- | -------- |
| status | string | "waiting", "on game" or "finished" |

```json
{
    "status": "on game"
}
```
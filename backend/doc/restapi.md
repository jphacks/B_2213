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

`GET /api/createRoom/poker`

### レスポンス

| Column | type | Details |
| -------- | -------- | -------- |
| roomID | string | RoomID |

```json
{
    "roomID": "a0s9d8fy"
}
```

## ルーム参加

### リクエスト

`WebSocket /room/{roomID}`

### レスポンス

別に詳述

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
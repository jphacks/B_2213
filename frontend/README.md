# Setup .env.local for root

```.env.local
NEXT_PUBLIC_API_URL=***
```

# 起動方法
`docker compose run app npm install` </br>
`docker compose up`

# テスト方法
`docker compose run app npm run test`

# ページ説明


| Routing                   | 内容                     |
| ------------------------- | ------------------------ |
| /start/                   | スタート画面(gameの種類、部屋への参加、部屋作成の選択|
| /start/poker/joinRoom     | ユーザー名設定、参加するroomid入力画面           |
| /start/poker/createRoom   | ユーザー名設定画面 |
| /start/mahjong/joinRoom   | ユーザー名設定、参加するroomid入力画面           |
| /start/mahjong/createRoom | ユーザー名設定画面 |
| /game/waitRoom/[roomID]   | 参加メンバー待ち、ルール設定画面            |
| /game/playRoom/[roomID]   | ゲーム画面         |




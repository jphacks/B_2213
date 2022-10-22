# 起動方法

## 通常時

`make run`
or
`docker compose up -d --build`

## 開発ホットリロードを使用する時

`make dev-run`
or
`docker compose -f docker-compose-deploy.yml up -d    `

# Backend Documents

- [ゲームに参加するために使用するエンドポイント](./doc/outgame.md)

- [ゲーム中に使用するエンドポイント](./doc/ingame.md)

- [WebSocket Response Example](./doc/websocket.md)

![JPHacks.png](./doc/JPHacks.png)
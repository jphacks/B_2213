# Setup .env for root

```.env
MYSQL_ROOT_PASSWORD=******
MYSQL_DATABASE=****
TZ=Asia/Tokyo
```

# 起動方法

`make run`
or
`docker compose up`

# API Endpoints

[RestAPI](./doc/restapi.md)

## 失敗時

原則、GitHub APIに倣って400代のエラーを返す

| Column | type | Details |
| -------- | -------- | -------- |
| message | string | エラーに関するメッセージ |

```json
{
    "message": "permission denied"
}
```

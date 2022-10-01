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

[RestAPI](https://dazzling-balmoral-ae7.notion.site/API-Document-53049bbdbf9f46e7800746e36ad44629)

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

# Setup .env for root

```.env
MYSQL_ROOT_PASSWORD=******
MYSQL_DATABASE=****
TZ=Asia/Tokyo
```

# API Endpoints

ルーム作成

GET http://localhost:3000/createRoom/{string}


ルーム参加

GET ws://localhost:3000/ws/{string}

wsには
```json
{
    "str": ""
}
```

の形で送れば動く
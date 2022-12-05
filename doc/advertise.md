## 接口前缀
```shell
http://localhost:5000/api/v1
```

# 广告

## 创建广告
```
POST    /advertise
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
title | 广告标题 | 是
link | 广告链接 | 是


### 成功操作返回
```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "created_at": "2019-12-15",
        "id": 3,
        "title": "广告标题",
        "link": "https://www.boblog.com/",
        "updated_at": "2019-12-15T12:19:07.194Z"
    }
}
```

## 广告详情
```
GET    /advertise/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 广告ID | 是


### 成功操作返回
```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "created_at": "2019-12-15",
        "id": 3,
        "title": "广告标题",
        "link": "https://www.boblog.com/"
    }
}
```

## 广告列表
```
GET    /advertise
```

### 参数说明
无

### 成功操作返回
```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "data": [
            {
                "id": 3,
                "title": "广告标题",
                "link": "https://www.boblog.com/"
            },
            {
                "id": 2,
                "title": "Tonight Learning nliangdxa1",
                "link": "http://cdn.boblog.com/funny.jpg"
            },
            {
                "id": 1,
                "title": "今晚学习Node.js",
                "link": "https://lo"
            }
        ],
        "meta": {
            "current_page": 1,
            "per_page": 10,
            "count": 3,
            "total": 3,
            "total_pages": 1
        }
    }
}
```

## 更新单个广告
```
PUT    /advertise/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 广告ID | 是
title | 广告名字 | 否
link | 广告关键字 | 否

### 成功操作返回

```json
{
    "msg": "更新广告成功",
    "code": 200,
    "errorCode": 0
}
```

## 删除单个广告
```
DELETE    /advertise/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 广告ID | 是

### 成功操作返回

```json
{
    "msg": "删除广告成功",
    "code": 200,
    "errorCode": 0
}
```

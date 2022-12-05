## 接口前缀
```shell
http://localhost:5000/api/v1
```

# 回复评论接口

## 创建回复评论
```
POST    /comment
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
nickname | 回复评论人名字 | 是
email    | 回复评论人邮箱 | 是
content | 回复评论内容 | 是
comment_id | 回复哪条评论的评论id | 是

### 成功操作返回
```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "id": 1,
        "nickname": "linhe123",
        "content": "Hello Node.js",
        "created_at": "2019-11-14T04:39:13.834Z",
        "comment_id": "1"
    }
}
```

## 回复评论详情
```
GET    /reply/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 回复评论ID | 是


### 成功操作返回
```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "created_at": "2019-11-14",
        "id": 1,
        "nickname": "linhe123",
        "comment_id": 1
    }
}
```

## 评论列表
```
GET    /reply
```

### 参数说明
参数 | 说明 | 是否必填
comment_id | 关联的评论ID | 是

### 成功操作返回
```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "data": [
            {
                "id": 2,
                "nickname": "linhe123",
                "content": "Hello Node.js",
                "comment_id": 1
            },
            {
                "id": 1,
                "nickname": "linhe123",
                "content": "Hello Node.js",
                "comment_id": 1
            }
        ],
        "meta": {
            "current_page": 1,
            "per_page": 10,
            "count": 2,
            "total": 2,
            "total_pages": 1
        }
    }
}
```

## 更新单个回复评论
```
PUT    /reply/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 回复ID | 是
nickname | 回复评论人名字 | 否
email    | 回复评论人邮箱 | 否
content | 回复评论内容 | 否
comment_id | 回复哪条评论的评论id | 否

### 成功操作返回

```json
{
    "msg": "更新评论成功",
    "code": 200,
    "errorCode": 0
}
```

## 删除单篇回复评论
```
DELETE    /reply/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 回复评论ID | 是

### 成功操作返回

```json
{
    "msg": "删除回复评论成功",
    "code": 200,
    "errorCode": 0
}
```

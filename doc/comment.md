## 接口前缀
```shell
http://localhost:3000/api/v1
```

# 评论接口

## 创建评论
```
POST    /comment
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
nickname | 评论人名字 | 是
email    | 评论人邮箱 | 是
content | 评论内容 | 是
target_id | 评论目标id，如果是普通文章为普通文章id，专栏文章为专栏文章id | 是
target_type | 评论类型，普通文章为：article，专栏文章为：column | 是

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
        "target_id": "1",
        "target_type": "article",
        "created_at": "2019-11-14T04:33:37.048Z"
    }
}
```

## 评论详情
```
GET    /comment/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 评论ID | 是


### 成功操作返回
```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "created_at": "2019-11-14",
        "id": 1,
        "target_id": 1,
        "target_type": "article",
        "nickname": "linhe123",
        "reply": []
    }
}
```

## 评论列表
```
GET    /comment
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
                "id": 1,
                "target_id": 1,
                "target_type": "article",
                "nickname": "linhe123",
                "content": "Hello Node.js"
            }
        ],
        "meta": {
            "current_page": 1,
            "per_page": 10,
            "count": 1,
            "total": 1,
            "total_pages": 1
        }
    }
}
```

## 更新单个评论
```
PUT    /comment/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 评论ID | 是
nickname | 评论人名字 | 否
email    | 评论人邮箱 | 否
content | 评论内容 | 否
target_id | 评论目标id，如果是普通文章为普通文章id，专栏文章为专栏文章id | 是
target_type | 评论类型，普通文章为：article，专栏文章为：column | 是

### 成功操作返回

```json
{
    "msg": "更新评论成功",
    "code": 200,
    "errorCode": 0
}
```

## 删除单篇评论
```
DELETE    /comment/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 评论ID | 是

### 成功操作返回

```json
{
    "msg": "删除评论成功",
    "code": 200,
    "errorCode": 0
}
```

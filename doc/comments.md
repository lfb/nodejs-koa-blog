## 接口前缀
```shell
http://localhost:3000/v1
```

# 评论

## 创建评论
```
POST    /comments
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
nickname | 评论人名字 | 是
email    | 评论人邮箱 | 是
content | 评论内容 | 是
article_id | 文章ID | 是
parent_id | 评论父级ID | 否

### 成功操作返回
```json
{
    "msg": "创建评论成功",
    "code": 200,
    "errorCode": 0
}
```

## 评论详情
```
GET    /comments/:id
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
        "id": 10,
        "nickname": "梁凤波",
        "email": "itbo@163.com",
        "content": "今夜一起学习Node.js，9点Github不见不散！",
        "article_id": "6",
        "parent_id": 0,
        "created_at": "2019-06-14T15:16:37.000Z"
    }
}
```

## 评论列表
```
GET    /category
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
                "id": 10,
                "nickname": "梁凤波",
                "content": "今夜一起学习Node.js，9点Github不见不散！",
                "article_id": "6",
                "parent_id": 0
            },
            {
                "id": 9,
                "nickname": "bobobo",
                "content": "koa2框架入门",
                "article_id": "3",
                "parent_id": 0
            },
            {
                "id": 8,
                "nickname": "lynn",
                "content": "一起学习nodejs啊",
                "article_id": "3",
                "parent_id": 0
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

## 更新单个评论
```
PUT    /comments/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 分类ID | 是
nickname | 评论人名字 | 否
email    | 评论人邮箱 | 否
content | 评论内容 | 否
article_id | 文章ID | 否
parent_id | 评论父级ID | 否

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
DELETE    /comments/:id
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

## 获取文章下的评论
```
GET    /article/:article_id/comments
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:article_id | 文章ID | 是
page | 页码 | 否
desc | 排序，默认最新：created_at，浏览次数：browse | 否

### 成功操作返回
```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "data": [
            {
                "id": 10,
                "nickname": "梁凤波",
                "content": "今夜一起学习Node.js，9点Github不见不散！",
                "article_id": "6",
                "parent_id": 0,
                "created_at": "2019-06-14T15:16:37.000Z"
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

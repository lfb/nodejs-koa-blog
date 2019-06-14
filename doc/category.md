## 接口前缀
```shell
http://localhost:3000/v1
```

# 分类

## 创建分类
```
POST    /category
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
name | 分类名字 | 是
key | 分类关键字 | 是
parent_id | 分类父级ID | 否


### 成功操作返回
```json
{
    "msg": "创建分类成功",
    "code": 200,
    "errorCode": 0
}
```

## 分类详情
```
GET    /category/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 分类ID | 是


### 成功操作返回
```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "id": 1,
        "name": "JavaScript",
        "key": "JavaScript",
        "parent_id": 0
    }
}
```

## 分类列表
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
    "data": [
        {
            "id": 1,
            "name": "JavaScript",
            "key": "JavaScript",
            "parent_id": 0,
            "article_nums": 1
        },
        {
            "id": 2,
            "name": "css",
            "key": "css",
            "parent_id": 0,
            "article_nums": 2
        },
        {
            "id": 3,
            "name": "nodejs",
            "key": "node",
            "parent_id": 0,
            "article_nums": 0
        }
    ]
}
```

## 更新单个分类
```
PUT    /category/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 分类ID | 是
name | 分类名字 | 否
key | 分类关键字 | 否
parent_id | 分类父级ID | 否

### 成功操作返回

```json
{
    "msg": "更新分类成功",
    "code": 200,
    "errorCode": 0
}
```

## 删除单篇文章
```
DELETE    /category/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 分类ID | 是

### 成功操作返回

```json
{
    "msg": "删除分类成功",
    "code": 200,
    "errorCode": 0
}
```

## 获取一个分类下的文章
```
GET    /category/:id/article
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 分类ID | 是
page | 页码 | 否
desc | 排序，默认最新：created_at，浏览次数：browse | 否

### 成功操作返回
字段 | 说明
---|---
category_detail | 文章关联的分类详情 
comments_list | 文章关联的评论

```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "data": [
            {
                "id": 6,
                "title": "今夜一起学习Node.js吗？?",
                "author": "梁凤波",
                "content": "今夜一起学习Node.js，9点Github不见不散！",
                "cover": "http://cdn.boblog.com/JS.png",
                "category_id": "2",
                "browse": 3,
                "created_at": "2019-06-14T12:41:15.000Z",
                "comments_nums": 0,
                "category_detail": {
                    "id": 2,
                    "name": "css",
                    "key": "css",
                    "parent_id": 0
                }
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

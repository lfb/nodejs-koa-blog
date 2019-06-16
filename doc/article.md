## 接口前缀
```shell
http://localhost:3000/v1
```

# 文章

## 创建文章
```
POST    /article
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
title | 文章标题 | 是
author | 文章作者 | 是
content | 文章内容 | 是
cover | 文章封面 | 是
category_id | 文章分类 | 是
browse | 文章浏览数 | 否


### 成功操作返回
```json
{
    "msg": "创建文章成功",
    "code": 200,
    "errorCode": 0
}
```

## 文章详情
```
GET    /article/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 文章ID | 是


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
        "id": 6,
        "title": "今夜一起学习Node.js吗？",
        "author": "梁凤波",
        "content": "今夜一起学习Node.js，9点Github不见不散！",
        "cover": "http://cdn.boblog.com/JS.png",
        "category_id": "2",
        "browse": 1,
        "created_at": "2019-06-14T12:41:15.000Z",
        "category_detail": {
            "id": 2,
            "name": "css",
            "key": "css",
            "parent_id": 0
        },
        "comments_list": {
            "data": [],
            "meta": {
                "current_page": 1,
                "per_page": 10,
                "count": 0,
                "total": 0,
                "total_pages": 0
            }
        }
    }
}
```

## 文章列表
```
GET    /article
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
page | 分页 | 否
desc | 排序，默认最新：created_at，浏览次数：browse | 否
category_id | 分类ID | 否
keyword | 搜索关键字 | 否

### 成功操作返回
字段 | 说明
---|---
category_detail | 文章关联的分类详情 
comments_nums | 文章关联的评论总数
```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "data": [
            {
                "id": 6,
                "title": "今夜一起学习Node.js吗？",
                "author": "梁凤波",
                "content": "今夜一起学习Node.js，9点Github不见不散！",
                "cover": "http://cdn.boblog.com/JS.png",
                "category_id": "2",
                "browse": 0,
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

## 更新单篇文章
```
PUT    /article/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 文章ID | 是
title | 文章标题 | 否
author | 文章作者 | 否
content | 文章内容 | 否
cover | 文章封面 | 否
category_id | 文章分类 | 否
browse | 文章浏览数 | 否

### 成功操作返回

```json
{
    "msg": "更新文章成功",
    "code": 200,
    "errorCode": 0
}
```

## 删除单篇文章
```
DELETE    /article/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 文章ID | 是

### 成功操作返回

```json
{
    "msg": "删除文章成功",
    "code": 200,
    "errorCode": 0
}
```

## 搜索文章
```
GET    /search/article
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
keyword | 文章标题关键字 | 是
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
                "id": 6,
                "title": "今夜一起学习Node.js吗？?",
                "author": "梁凤波",
                "content": "今夜一起学习Node.js，9点Github不见不散！",
                "cover": "http://cdn.boblog.com/JS.png",
                "category_id": "2",
                "browse": 3,
                "created_at": "2019-06-14T12:41:15.000Z",
                "updated_at": "2019-06-14T12:54:19.000Z",
                "deleted_at": null,
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

## 接口前缀
```shell
http://localhost:3000/api/v1
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
description | 文章简介 | 是
keyword | 文章关键字 | 是
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
category | 文章关联的分类详情 
article_comment | 文章关联的评论
reply | 评论下的回复
```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "created_at": "2019-11-14",
        "id": 1,
        "title": "深入浅出 Node.js",
        "author": "梁凤波",
        "description": "简介：深入浅出 Node.js",
        "content": "hello world",
        "cover": "http://cdn.boblog.com/FmdNNoR1MRtgvmQD1KwaKzbkL_i7",
        "browse": 1,
        "updated_at": "2019-11-14T04:25:22.000Z",
        "deleted_at": null,
        "category_id": 1,
        "category": {
            "created_at": "2019-11-14",
            "id": 1,
            "name": "html",
            "key": "html",
            "parent_id": 0
        },
        "article_comment": {
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
category | 文章关联的分类详情 
```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "data": [
            {
                "created_at": "2019-11-14",
                "id": 1,
                "title": "深入浅出 Node.js",
                "author": "梁凤波",
                "description": "简介：深入浅出 Node.js",
                "cover": "http://cdn.boblog.com/FmdNNoR1MRtgvmQD1KwaKzbkL_i7",
                "browse": 0,
                "category_id": 1,
                "category": {
                    "created_at": "2019-11-14",
                    "id": 1,
                    "name": "html",
                    "key": "html",
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
description | 文章内容 | 否
keyword | 文章关键字 | 否
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
                "created_at": "2019-11-14",
                "id": 1,
                "title": "深入浅出 Node.js",
                "author": "梁凤波",
                "description": "简介：深入浅出 Node.js",
                "content": "hello world",
                "cover": "http://cdn.boblog.com/FmdNNoR1MRtgvmQD1KwaKzbkL_i7",
                "browse": 1,
                "updated_at": "2019-11-14T04:27:37.000Z",
                "deleted_at": null,
                "category_id": 1,
                "category": {
                    "created_at": "2019-11-14",
                    "id": 1,
                    "name": "html",
                    "key": "html",
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

## 接口前缀
```shell
http://localhost:3000/v1
```

# 章节目（专栏章节下的文章）

## 创建专栏文章
```
POST    /chapter/section
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
title | 专栏文章标题 | 是
author | 专栏文章作者 | 否
content | 专栏文章内容 | 是
column_chapter_id | 章节ID | 是


### 成功操作返回
```json
{
    "msg": "创建专栏文章成功",
    "code": 200,
    "errorCode": 0
}
```

## 专栏文章详情
```
GET    /column/section/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 专栏文章ID | 是


### 成功操作返回
字段 | 说明
---|---
section_comment | 专栏文章关联的评论
reply | 评论下的回复
```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "created_at": "2019-11-14",
        "id": 2,
        "title": "文章",
        "author": "梁凤波",
        "content": "HELLO",
        "updated_at": "2019-11-14T05:53:11.000Z",
        "deleted_at": null,
        "column_chapter_id": 2,
        "section_comment": {
            "data": [
                {
                    "created_at": "2019-11-14",
                    "id": 4,
                    "target_id": 2,
                    "target_type": "column",
                    "nickname": "梁凤波",
                    "content": "Hello Node.js",
                    "deleted_at": null,
                    "reply": [
                        {
                            "created_at": "2019-11-14",
                            "id": 3,
                            "nickname": "梁凤波2",
                            "content": "Hello Node.js",
                            "comment_id": 4
                        }
                    ]
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
}
```

## 专栏文章列表
```
GET    /column/section-list/:column_chapter_id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
column_chapter_id | 专栏章节ID | 是

### 成功操作返回
```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": [
        {
            "created_at": "2019-11-14",
            "id": 1,
            "title": "深入浅出 Node.js22",
            "author": "梁凤波",
            "column_chapter_id": 2
        }
    ]
}
```

## 更新单篇专栏文章
```
PUT    /column/article/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 专栏文章ID | 否
title | 专栏文章标题 | 否
author | 专栏文章作者 | 否
content | 专栏文章内容 | 否
column_chapter_id | 章节ID | 否

### 成功操作返回

```json
{
    "msg": "更新专栏文章成功",
    "code": 200,
    "errorCode": 0
}
```

## 删除单篇文章
```
DELETE    /column/section/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 专栏文章ID | 是

### 成功操作返回

```json
{
    "msg": "删除专栏文章成功",
    "code": 200,
    "errorCode": 0
}
```

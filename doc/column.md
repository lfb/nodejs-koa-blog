## 接口前缀
```shell
http://localhost:3000/v1
```

# 专栏

## 创建专栏
```
POST    /column
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
title | 专栏标题 | 是
author | 专栏作者 | 是
description | 专栏简介 | 是
cover | 专栏封面 | 是

### 成功操作返回
```json
{
    "msg": "创建专栏成功",
    "code": 200,
    "errorCode": 0
}
```

## 专栏详情
```
GET    /column/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 专栏ID | 是


### 成功操作返回
字段 | 说明
---|---
column_chapter | 专栏关联的章节
chapter_section | 章节关联下的章节目
```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "created_at": "2019-11-14",
        "id": 2,
        "title": "深入浅出 Node.js2",
        "author": "梁凤波",
        "description": "简介：深入浅出 Node.js",
        "cover": "http://cdn.boblog.com/FmdNNoR1MRtgvmQD1KwaKzbkL_i7",
        "updated_at": "2019-11-14T05:22:48.000Z",
        "deleted_at": null,
        "column_chapter": [
            {
                "created_at": "2019-11-14",
                "id": 2,
                "title": "深入浅出 Node.js22",
                "column_id": 2,
                "chapter_section": [
                    {
                        "id": 2,
                        "title": "文章"
                    }
                ]
            }
        ]
    }
}
```

## 专栏列表
```
GET    /column
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
page | 分页 | 否

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
                "cover": "http://cdn.boblog.com/FmdNNoR1MRtgvmQD1KwaKzbkL_i7"
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

## 更新单篇专栏
```
PUT    /column/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 专栏ID | 是
title | 专栏标题 | 否
author | 专栏作者 | 否
description | 专栏简介 | 否
cover | 专栏封面 | 否

### 成功操作返回

```json
{
    "msg": "更新专栏成功",
    "code": 200,
    "errorCode": 0
}
```

## 删除单篇专栏
```
DELETE    /column/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 专栏ID | 是

### 成功操作返回

```json
{
    "msg": "删除专栏成功",
    "code": 200,
    "errorCode": 0
}
```


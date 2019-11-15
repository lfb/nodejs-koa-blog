## 接口前缀
```shell
http://localhost:3000/v1
```

# 专栏章节

## 创建专栏章节
```
POST    /column/chapter
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
title | 专栏章节标题 | 是
column_id | 专栏ID | 是

### 成功操作返回
```json
{
    "msg": "创建专栏章节成功",
    "code": 200,
    "errorCode": 0
}
```

## 专栏章节详情
```
GET    /column/chapter/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 专栏章节ID | 是


### 成功操作返回
字段 | 说明
---|---
chapter_section | 章节关联下的章节目
```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "created_at": "2019-11-14",
        "id": 1,
        "title": "深入浅出 Node.js2",
        "index": 1,
        "updated_at": "2019-11-14T05:27:40.000Z",
        "deleted_at": null,
        "column_id": 2,
        "chapter_section": []
    }
}
```

## 专栏章节列表
```
GET    /column/chapter-list/:column_id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
column_id | 专栏ID | 是

### 成功操作返回
chapter_section | 章节下面的章节目
```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "id": 2,
        "title": "深入浅出 Node.js2",
        "chapter_list": [
            {
                "created_at": "2019-11-14",
                "id": 2,
                "title": "深入浅出 Node.js22",
                "index": 1,
                "column_id": 2,
                "chapter_section": []
            },
            {
                "created_at": "2019-11-14",
                "id": 1,
                "title": "深入浅出 Node.js2",
                "index": 1,
                "column_id": 2,
                "chapter_section": []
            }
        ]
    }
}
```

## 更新单篇专栏章节
```
PUT    /column/chapter/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 专栏章节ID | 是
title | 专栏章节标题 | 是
column_id | 专栏ID | 是

### 成功操作返回

```json
{
    "msg": "更新专栏章节成功",
    "code": 200,
    "errorCode": 0
}
```

## 删除单篇专栏章节
```
DELETE    /column/chapter/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 专栏章节ID | 是

### 成功操作返回

```json
{
    "msg": "删除专栏章节成功",
    "code": 200,
    "errorCode": 0
}
```

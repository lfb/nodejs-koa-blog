## 接口前缀
```shell
http://localhost:5000/api/v1
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

## 删除单个分类
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

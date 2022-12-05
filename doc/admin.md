## 接口前缀
```shell
http://localhost:5000/api/v1
```

# 管理员
## 管理员注册
> 部署线上建议屏蔽掉此注册接口
```
POST    /admin/register
```
### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
nickname | 昵称 | 是
email | 邮箱 | 是
password1 | 密码 | 是
password2 | 确认密码 | 是

### 成功操作返回
```json
{
    "msg": "注册成功",
    "code": 200,
    "errorCode": 0
}
```

## 管理员登录
```
POST    /admin/login
```
```
### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
email | 邮箱 | 是
password | 密码 | 是

### 成功操作返回
```json
{
    "code": 200,
    "msg": "登录成功",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjMsInNjb3BlIjoxNiwiaWF0IjoxNTYwNTE0NzQwLCJleHAiOjE1NjA1MTgzNDB9.E7k-3bFWizGq2ykrmBgIF0Ng-2oPI70RdhvRTJ3GC4Y"
}
```
## 管理员身份验证
```
POST    /admin/auth
```
### 参数说明
无

### 必需携带token

在 Postman 软件里选择 Authorization，Type选择Basic Auth，Username 填写上token值即可。

在代码中需要在header上携带token：

```js
// 转码 token
// 需要安装一下base64: npm install js-base64
import { Base64 } from 'js-base64'
function _encode() {
    const token = localStorage.getItem("token")
    const base64 = Base64.encode(token + ':')
    return 'Basic ' + base64
}

// 代码示例：重点看header携带 Authorization Basic + token
ajax({
  url: 'http://localhost:5000/v1/admin/auth',
  method: 'GET',
  success: res => {
    console.log(res.data)
  },
  header: {
    Authorization: _encode()
  }
})

// 在 Vue.js axios 携带token
config.headers['Authorization'] = _encode();
```


### 成功操作返回
```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "id": 3,
        "nickname": "梁凤波",
        "email": "itbo@163.com"
    }
}
```

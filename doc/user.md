# 用户

## 用户注册
```
POST    /user/register
```
### 请求参数
|参数名|说明|是否必填
|---|---|:---:
|nickname|用户昵称|必填
|email|用户邮箱|必填
|password1|密码|必填
|password2|重复密码|必填
|openid|微信OPENID|可选

### 注册成功返回数据
```json
{
    "msg": "注册成功",
    "error_code": 0,
    "request": "POST /v1/user/register"
}
```

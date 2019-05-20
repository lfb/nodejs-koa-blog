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
    "errorCode": 0
}
```

## 用户登录
```
POST    /user/login
```
### 请求参数
|参数名|说明|是否必填
|---|---|---
|account|邮箱|必填
|secret|密码|必填
|type|登录类型 小程序：100, 普通用户：101，管理员：200|必填

### 注册成功返回数据
```json
{
    "msg": "登录成功",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsInNjb3BlIjo4LCJpYXQiOjE1NTgzMzk5OTMsImV4cCI6MTU1ODM0MzU5M30.yJMnrEwBoGXEVvfrbCz0VtNa-2_HeEui9nxnX9hbCBQ"
}
```
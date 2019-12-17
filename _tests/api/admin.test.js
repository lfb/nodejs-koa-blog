const server = require('../server')
const {nickname, email, password} = require('../utils')
const {saveTokens, getToken} = require('../token')

test('测试管理员注册，按正确的发送参数，测试结果应该注册成功', async (done) => {
  const res = await server.post('/api/v1/admin/register').send({
    nickname,
    email,
    password1: password,
    password2: password
  })
  expect(res.status).toBe(200)
  done()
})

test('测试管理员注册，输入不正确的邮箱进行注册，测试结果应该注册失败', async () => {
  const res = await server.post('/api/v1/admin/register').send({
    nickname,
    email: `not a mail@m`,
    password1: password,
    password2: password
  })
  expect(res.status).toBe(400)
})


test('测试管理员注册，输入两次密码不正确，测试结果注册失败', async () => {
  const res = await server.post('/api/v1/admin/register').send({
    nickname,
    email,
    password1: password,
    password2: password + '1024'
  })
  expect(res.status).toBe(400)
})


test('测试管理员登录，使用正确的邮箱和密码，测试结果应该登录成功', async () => {
  const res = await server.post('/api/v1/admin/login').send({
    email,
    password
  })

  saveTokens(res.body.token)
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty('msg', '登录成功');
})

test('测试管理员登录，使用正确的邮箱和错误密码，测试结果应该登录失败', async () => {
  const res = await server.post('/api/v1/admin/login').send({
    email,
    password: password + '1024'
  })
  expect(res.status).toBe(401);
})

test('测试管理员登录，使用不同的的邮箱和正确密码，测试结果应该登录失败', async () => {
  const res = await server.post('/api/v1/admin/login').send({
    email: '1024' + email,
    password: password
  })
  expect(res.status).toBe(401);
  expect(res.body.msg).toBe('账号不存在或者密码不正确');
})

test('测试登录，使用不正确的邮箱和正确的密码，测试结果应该登录失败', async () => {
  const res = await server.post('/api/v1/admin/login').send({
    email: email + '1024',
    password
  })
  expect(res.status).toBe(400);
})

test('测试使用正确的 token 获取管理员信息，测试结果应该成功', async (done) => {
  const token = getToken()
  const res = await server.get('/api/v1/admin/auth')
    .auth(token, {type: "basic"})

  expect(res.status).toBe(200)
  expect(res.body.data.nickname).toBe(nickname)
  expect(res.body.data.email).toBe(email)
  expect(res.body.data.password).toBeUndefined
  done()
})


test('测试使用不正确的 token 获取管理员信息，测试结果应该不成功', async () => {
  const token = getToken()
  const res = await server.get('/api/v1/admin/auth').auth(token + '1024', {type: "basic"})
  expect(res.status).toBe(403)
})


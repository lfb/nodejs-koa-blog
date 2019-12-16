const server = require('../server')

test('测试登录，使用正确的邮箱和密码，应该登录成功', async () => {
  const res = await server.post('/api/v1/admin/login').send({
    email: 'itbo@163.com',
    password: 'test12345'
  })
  expect(res.status).toBe(200);
})

test('测试登录，使用正确的邮箱和错误密码，应该登录失败', async () => {
  const res = await server.post('/api/v1/admin/login').send({
    email: 'itbo@163.com',
    password: 'bo12345'
  })
  expect(res.status).toBe(401);
})

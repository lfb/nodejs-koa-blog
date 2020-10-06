const {AdminDao} = require('../../app/dao/admin')
const {nickname, email, password} = require('../utils')

test('创建管理员模型，按正常的参数传入，应该创建成功', async () => {
  const admin = await AdminDao.create({
    nickname,
    email,
    password
  })
  expect(admin.nickname).toBe(nickname)
  expect(admin.email).toBe(email)
  expect(admin.password).toBe(undefined)
})

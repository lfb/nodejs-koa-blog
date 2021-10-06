module.exports = {
  environment: 'dev',
  database: {
    dbName: 'railway',
    host: '35.203.191.34',
    port: 7024,
    user: 'root',
    password: 'EWq6iHiwAqOBZnGTvki4'
  },
  security: {
    secretKey: "secretKey",
    // 过期时间 1小时
    expiresIn: 60 * 60
  }
}

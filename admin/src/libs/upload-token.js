const qiniu = require('qiniu')

// 自己可以到"www.qiniu.com" 申请自己的七牛空间
// 这个账号是我的，不是开放的哦
const ACCESS_KEY = "iIESo7ruEIWIEwLNRHpybNjahv9NGlN7vVac3PLQ";
const SECRET_KEY = "xFLqbpefbXiQY9dcOo8ICtIuYgGn1HhT-93B3DY8";

export default async function getUploadToken() {
  return new Promise((resolve, reject) => {
    let mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
    let options = {
      scope: "boblog",
      expires: 7200
    };
    let putPolicy = new qiniu.rs.PutPolicy(options);
    let uploadToken = putPolicy.uploadToken(mac);

    if (uploadToken) {
      resolve({
        token: uploadToken
      })
    } else {
      reject()
    }
  })
}


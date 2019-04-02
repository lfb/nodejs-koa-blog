const qiniu = require('qiniu')

// 自己可以到"www.qiniu.com" 申请自己的七牛空间
// 这个账号是我的，不是开放的哦
const ACCESS_KEY = "iIESo7ruEIWIEwLNRHpybNjahv9NGlN7vVac3PLQ";
const SECRET_KEY = "xFLqbpefbXiQY9dcOo8ICtIuYgGn1HhT-93B3DY8";

class UploadToken {
    // 获取七牛上传token
    static async token(ctx) {
        try {
            let mac = await new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);

            let options = {
                scope: "boblog",
                expires: 7200
            };
            let putPolicy = await new qiniu.rs.PutPolicy(options);
            let uploadToken = await putPolicy.uploadToken(mac);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `获取上传token成功！`,
                data: {
                    token: uploadToken
                }
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `获取token失败！`,
                data: err
            }

        }
    }
}


module.exports = UploadToken
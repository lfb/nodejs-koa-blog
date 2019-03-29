const qiniu = require('qiniu')

const ACCESS_KEY = "iIESo7ruEIWIEwLNRHpybNjahv9NGlN7vVac3PLQ";
const SECRET_KEY = "xFLqbpefbXiQY9dcOo8ICtIuYgGn1HhT-93B3DY8";

class uploadTokenController {
    // 获取上传token
    static async getUploadToken(ctx) {
        try {
            var mac = await new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);

            var options = {
                scope: "sourcerobot",
                expires: 7200
            };
            var putPolicy = await new qiniu.rs.PutPolicy(options);
            var uploadToken = await putPolicy.uploadToken(mac);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `获取上传token成功！`,
                data: {
                    token: uploadToken,
                    assess_key: ACCESS_KEY,
                    secret_key: SECRET_KEY
                }
            }

        } catch (err) {
            console.log(err);
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `获取token失败！`,
                data: err
            }

        }
    }
}


module.exports = uploadTokenController
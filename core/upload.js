const fs = require('fs')
const path = require('path')
const multer = require('koa-multer')

const { createMD5Hash } = require('@core/crypto')

// 上传封面图片
const uploadCoverPath = path.join(__dirname, '../images')

// 目录不存在，创建目录
fs.mkdir(uploadCoverPath, { recursive: true }, err => {
    if (err) throw err
})

const limits = {
    fileSize: 10 * 1024 * 1024, // 10M
    files: 1 //文件数量
}

const fileFilter = function (req, file, cb) {
    // 验证上传文件类型
    const fileTypes = /jpeg|jpg|png|gif/
    const extname = path.extname(file.originalname)

    if (!fileTypes.test(extname)) {
        return cb(new global.errs.ParameterException('请上传正确的图片格式'))
    }
    cb(null, true)
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 指定上传的目标路径
        cb(null, uploadCoverPath)
    },
    filename: function (req, file, cb) {
        const extname = path.extname(file.originalname)
        cb(null, createMD5Hash(Date.now()) + extname) // 指定文件命名规则
    }
})

// 上传配置
const handleUpload = multer({
    fileFilter,
    storage,
    limits
})

module.exports = {
    handleUpload
}

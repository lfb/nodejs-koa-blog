module.exports = {
    apps: [
        {
            // 项目名
            name: 'boblog.com',
            // 执行文件
            script: './app.js',
            // 是否监听文件变动然后重启
            watch: true,
            // 不用监听的文件
            ignore_watch: ['node_modules', 'logs'],
            // 正常日志文件
            out_file: './logs/boblog.log',
            // 错误日志文件
            error_file: './logs/boblog-err.log',
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ]
}

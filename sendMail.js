const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'qq', // 发给QQ邮箱
    port: 465, // 发邮箱的端口号
    secureConnection: true, // 使用SSL加密传输
    auth: { // 权限认证
        user: '534893106@qq.com',
        pass: 'txakqvjzeiqqcbea'
    }
})


function sendMail(message) {
    let mailOptions = {
        from: '"534893106@qq.com" <534893106@qq.com>', // 发邮件的账号
        to: '534893106@qq.com', // 收邮件的账号
        subject: '部署通知', // 标题
        html: message // 邮寄的内容
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (!err) {
            console.log('邮件已经发生完成')
        }
    })
}
module.exports = sendMail;
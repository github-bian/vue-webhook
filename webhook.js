let http = require("http")

let crypto = require('crypto')
let SECRET = '123456'

function sign(body) {
    return `sha1=` + crypto.createHmac('sha1', SECRET).update(body).digest('hex');
}

let server = http.createServer(function(req, res) {
    console.log("触发webhook", req.method)


    if (req.method == 'POST' && req.url === '/webhook') {
        let buffers = [];
        req.on('data', function(buffer) {
            buffers.push(buffer)
        })

        req.on('end', function(buffer) {
            let body = Buffer.concat(buffers);
            let event = req.headers['x-gitHub-event'];
            let signature = req.headers['x-hub-signature'];
            if (signature !== sign(body)) {
                return res.end("not found")
            }

        })
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ ok: true }))
    } else {
        res.end("not found")
    }
})

server.listen(4000, () => {
    console.log("webhook服务已经在4000端口服务已启动")
})
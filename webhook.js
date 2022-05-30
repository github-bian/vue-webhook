let http = require("http")

let server = http.createServer(function(req, res) {
    console.log("触发webhook", req)
    if (req.method == 'POST' && req.url === '/webhook') {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ ok: true }))
    } else {
        res.end("not found")
    }
})

server.listen(4000, () => {
    console.log("webhook服务已经在4000端口服务已启动")
})
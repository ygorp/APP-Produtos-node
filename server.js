const http = require('http')

http
  .createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'application/json' })

    if(req.url === '/produto') {
      res.end(JSON.stringify({
        data: 'Rota de produto'
      }))
    }

    if(req.url === '/usuarios') {
      res.end(JSON.stringify({
        data: 'Rota de usuario'
      }))
    }

    res.end(
      JSON.stringify({
        data: 'qualquer outra rota!'
      })
    )
  })
  .listen(4001, () => console.log('Servidor está rodando na porta 4001'))

const express = require('express')
const {randomUUID} = require('crypto')
const fs = require('fs')

const app = express()

app.use(express.json())

let products = []

fs.readFile('products.json', 'utf-8', (err, data) => {
  if(err) {
    console.log(err)
  }else{
    products = JSON.parse(data)
  }
})


app.post('/products', (req, res) => {
  //nome e preço
  const {name, price} = req.body

  const product = {
    name,
    price,
    id: randomUUID(),
  }

  products.push(product)

  createproductsFile()

  return res.json(product)

})

app.get('/products', (req, res) => {
  return res.json(products)
})

app.get('/products/:id', (req, res) => {
  const { id } = req.params
  const product = products.find(product => product.id === id)
  return res.json(product)
})

app.put('/products/:id', (req, res) => {
  const { id } = req.params
  const { name, price } = req.body

  const productIndex = products.findIndex(product => product.id === id)
  products[productIndex] = {
    ...products[productIndex],
    name,
    price
  }

  createproductsFile()

  return res.json({
    data: 'produto alterado com sucesso'
  })

})

app.delete('/products/:id', (req, res) => {
  const { id } = req.params

  const productIndex = products.findIndex(product => product.id === id)

  products.splice(productIndex, 1)

  createproductsFile()

  return res.json({
    data: 'Produto removido com sucesso'
  })

})

function createproductsFile() {
  fs.writeFile('products.json', JSON.stringify(products), (err) => {
    if(err) {
      console.log(err)
    }else{
      console.log('Produto inserido')
    }
  })
}


app.listen(4002, () => console.log('Servidor está rodando na porta 4002'))
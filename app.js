const express = require('express')
const path = require('path')
const cors = require('cors') //added cors due to errors fetching data, this fixed it
const stocks = require('./stocks')

const app = express()
app.use(cors())
app.use(express.static(path.join(__dirname, 'static')))

app.get('/stocks', async (req, res) => {
  try {
    const stockSymbols = await stocks.getStocks()
    res.send({ stockSymbols })
  } 
  /** Returns a meaningful error message
  * when the stock data cannot be retrieved
  */
  catch (error) {
    console.error('Error while retrieving stock data', error.message);
    res.status(500).send({ error: error.message });
  }
})

app.get('/stocks/:symbol', async (req, res) => {
  try {
    const { params: { symbol } } = req
    const data = await stocks.getStockPoints(symbol, new Date())
    res.send(data)
  }
  // Returns a meaningful error message
  catch (error) {
    console.error('Error while retrieving stock data', error.message);
    res.status(500).send({ error: error.message });
  }
})


app.listen(3000, () => console.log('Server is running!'))
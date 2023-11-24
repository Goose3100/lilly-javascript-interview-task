const canvas = document.getElementById('chart')
const ctx = canvas.getContext('2d')

function drawLine (start, end, style) {
  ctx.beginPath()
  ctx.strokeStyle = style || 'black'
  ctx.moveTo(...start)
  ctx.lineTo(...end)
  ctx.stroke()
}

function drawTriangle (apex1, apex2, apex3) {
  ctx.beginPath()
  ctx.moveTo(...apex1)
  ctx.lineTo(...apex2)
  ctx.lineTo(...apex3)
  ctx.fill()
}

drawLine([50, 50], [50, 550])
drawTriangle([35, 50], [65, 50], [50, 35])

drawLine([50, 550], [950, 550])
drawTriangle([950, 535], [950, 565], [965, 550])



function fetchStockList() { //Query the backend for list of available stocks.
  fetch('http://localhost:3000/stocks')
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
  })
  .then(async stocks => {
    const stockData = await fetchAllStockData(stocks);
    // Hide the spinner
    document.querySelector('.spinner').style.display = 'none';
    return stockData;
})
  .then(data => {
      console.log('Stocks:', data);
      // Process the stock data here
  })
  .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
  });
}

async function fetchStockData(stock) { //Query the backend for data about each stock.
  try {
      const response = await fetch(`http://localhost:3000/stocks/${stock}`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return await response.json();
  } catch (error) {
      console.error('Error fetching data for stock:', stock, error);
      return null; // add appropriate error handling when available
  }
}

async function fetchAllStockData(stocks) {
  const allData = [];
  for (const stock of stocks) {
      const data = await fetchStockData(stock);
      if (data) {
          allData.push({ stock, data });
      }
  }
  return allData;
}


document.addEventListener('DOMContentLoaded', (event) => {
  fetchStockList(); // Fetch the stock list when the program is loaded
});
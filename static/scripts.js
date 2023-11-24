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



// Function to fetch data for a single stock
async function fetchStockData(stock) {
  try {
      const response = await fetch(`http://localhost:3000/stocks/${stock}`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return await response.json();
  } catch (error) {
      console.error('Error fetching data for stock:', stock, error);
      return null; // Handle error as appropriate
  }
}

// Function to fetch data for all stocks
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

// Main function to fetch stock list and their data
function fetchStockList() {
  fetch('http://localhost:3000/stocks')
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(async stocks => {
      const stockData = await fetchAllStockData(stocks);
      // Hide the spinner after all data is loaded
      document.querySelector('.spinner').style.display = 'none';
      
      // Log the structured stock data
      console.log('Complete Stock Data:', stockData);

      // Additional processing of stock data can be done here
      // For example, updating the chart with this data
  })
  .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      // Handle or display error as appropriate
  });
}

function test() {
  fetch('http://localhost:3000/stocks')
  .then ((res) => (res.json())
  .then((data) => {
    console.log(data)
  }))
}



// Call the function when the page loads
document.addEventListener('DOMContentLoaded', (event) => {
  //fetchStockList();
  test();
});
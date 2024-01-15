import Chart from 'chart.js/auto'
const fs = require('fs');

const dataString = fs.readFileSync('data.json', 'utf-8');


// No funciona por Parcel
// const dataJSON = async function() {
//     const data = await fetch("data.json");
//     const result = await data.json();
//     console.log(result);
//     return result;
// }

(async function() {
  const data = JSON.parse(dataString);
  console.log(data);
  let allDataValues = data.map(row => row.amount);
  let maxValue = Math.max(...allDataValues);


  new Chart(
    document.querySelector('.js-dashboard-graph'),
    {
      type: 'bar',
      data: {
        labels: data.map(row => row.day),
        datasets: [
          {
            label: '',
            data: data.map(row => row.amount),
            backgroundColor: color => {
              let colors = color.raw === maxValue ? 'hsl(186, 34%, 60%)' : 'hsl(10, 79%, 65%)'
              return colors;
            },
            hoverBackgroundColor: color => {
              let colors = color.raw === maxValue ? '#B4E0E5' : '#FF9B86'
              return colors;
            },
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive:true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            // displayColors: false,
            callbacks: {
              label: (context) => {
                return ` $${context.raw}`
              },
              title: context => {
                return ''
              }
            },
            padding: 10
          }
        },
        scales: {
            x: {
                border: {
                    display: false
                },
                grid: {
                  drawBorder: false,
                  drawOnChartArea: false,
                  display: false,
                  lineWidth: 5,

                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                  display: false
                },
                border: {
                    display: false
                },
                grid: {
                    borderColor: 'green',
                    drawOnChartArea: false,
                    borderWidth: 3,
                    drawBorder: false,
                    display: false
                }
            }
        }
      }
    }
  );
})();


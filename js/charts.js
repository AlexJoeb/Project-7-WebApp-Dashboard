// LINE CHART
let trafficChart = document.getElementById("trafficChart").getContext('2d');

let trafficChartVar = new Chart(trafficChart, {
type:'line',
data:{
  labels:['16-20', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-7', '18-24', '25-31'],
  datasets:[{
    label:'TRAFFIC',
    data:[
      500,
      1000,
      1500,
      900,
      700,
      1300,
      800,
      1700,
      900,
      700,
      2000,
      1200
    ],
  backgroundColor: '#b8cef2',
  borderWidth:1,
  borderColor: '#4777c6',
  pointBackgroundColor: '#fff'
}]
},
options:{
  legend:{
  display: false
},
responsive: true,
maintainAspectRatio: true,
}
});

// BAR CHART
let dailyTraffic = document.getElementById("dailyTrafficChart").getContext('2d');

let dailyTrafficVar = new Chart(dailyTraffic, {
  type:'bar',
  data:{
    labels:['S', 'M', 'T', 'W', 'T', 'F', 's'],
    datasets:[{
      label:'DAILY TRAFFIC',
      data:[
      50,
      100,
      150,
      100,
      180,
      80,
      120
    ],
    backgroundColor: '#2e4568',
    borderWidth:1,
    borderColor: '#777',
    hoverBorderWidth:3,
    hoverBorderColor: '#727984'

  }]
},
options:{
  responsive: true,
  legend:{
    display:false,

  }
}
});

// DOUGHNUT CHART
let mobileChart = document.getElementById("mobileUsersChart").getContext('2d');

let mobileChartVar = new Chart(mobileChart, {
  type:'doughnut',
  data:{
    labels:[
      'Phones',
      'Tablets',
      'Desktop'
    ],
    datasets:[{
      label:'MOBILE USERS',
      data:[
      120,
      90,
      50

    ],
    backgroundColor: [
      '#2e4568',
      '#4b915f',
      '#c62737'
    ],
    borderWidth:1,
    borderColor: '#777',
    hoverBorderWidth:3,
    hoverBorderColor: '#727984'

  }]
},
options:{
  responsive: true,
  maintainAspectRatio: true,
  legend:{
    position: 'right',
    labels:{
      padding: 30
    },
  },
  layout: {
    padding: {
     left: 20
    // right: 10,
    // top: 0,
    // bottom: 20
       }
     }
   }
});

mobileChartVar.render();
dailyTrafficVar.render();
trafficChartVar.render();

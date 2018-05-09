// 以下サイトを参考に
//
// 公式サイト？
// https://www.chartjs.org/
//
// Summary(他のグラフタイプの選択肢とか書いてる)
// https://github.com/chartjs/Chart.js/blob/master/docs/SUMMARY.md

function csv2Array(str) {
  var csvData = [];
  var lines = str.split("\n");
  for (var i = 0; i < lines.length-1; ++i) {
    var cells = lines[i].split(",");
    csvData.push(cells);
  }
  return csvData;
}

var myChart;
function drawchart(label, data) {
  var ctx = document.getElementById("myChart").getContext('2d');
  myChart = new Chart(ctx, {
    // type属性を以下の値に変えるとグラフのタイプが変わります．(折れ線グラフ,棒グラフ, ...)
    // line, bar, radar, doughnut(pie)
    type: 'bar',
    data: {
      labels: label,
      datasets: [
        {
          label: 'graph1',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            // 'rgba(75, 192, 192, 0.2)',
            // 'rgba(153, 102, 255, 0.2)',
            // 'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            // 'rgba(75, 192, 192, 1)',
            // 'rgba(153, 102, 255, 1)',
            // 'rgba(255, 159, 64, 1)'
          ],
          // borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function updateGraph(key) {
  console.log(key);
  // myChart.destroy();
  // drawchart(label, datasets[key])

  // console.log(myChart);
  
  myChart.data.datasets[0].data = datasets[key];
  myChart.update();
}
var label;
var datasets = {};
(function (){
  // 1) ajaxでCSVファイルをロード
  var req = new XMLHttpRequest();
  var filePath = 'data.csv';
  req.open("GET", filePath, true);
  req.onload = function() {
    // 2) CSVデータ変換の呼び出し
    data = csv2Array(req.responseText);
    // 3) chart.jsデータ準備、4) chart.js描画の呼び出し
    label = data.shift()
    label.shift();
    for (d of data) {
      console.log(d);
      
      var key = d.shift();
      $("#button_area").append(`<button id="${key}" class="btn btn-outline-primary" onClick="updateGraph('${key}');">${key}</button>`)
      for (let i in d) {
        d[i] = +d[i];
      }
      datasets[key] = d;
    }
    drawchart(label,datasets.A)
  }
  req.send(null);
})();

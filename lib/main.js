//import * as d3 from 'd3';
var d3 = require('d3')
d3.select('body')
  .append('h1')
  .append('text')
  //.text(`D3 version: ${d3.version}`)
  .text(`Распределение рынка броузеров, 2021`)
var height = 500, 
    width = 500, 
    margin=30,
    data=null;
  //   data=[
  //     {browser: "Google Chrome", rate: 42.52},
  //     {browser: "Firefox", rate: 16.23},
  //     {browser: "Opera", rate: 12.6},
  //     {browser: "Yandex Browser", rate: 9.12},
  //     {browser: "Internet Explorer", rate: 10.56},
  //     {browser: "Другие", rate: 8.97}
  // ];
var xhr = new XMLHttpRequest();

xhr.open('GET', 'data/visiologyBrowsers.json', false);

xhr.send();
if (xhr.status != 200) {
  alert( xhr.status + ': ' + xhr.statusText );
} else {
  let res=JSON.parse(xhr.responseText)    
   data= res.series[0].data
  
}

    var color = d3.scaleOrdinal(d3.schemeCategory10);

var radius = Math.min(width - 2*margin, height- 2*margin) / 2;
var arc = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);
var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.y; });
    var svg = d3.select("body").append("svg")
    .attr("class", "axis")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", 
        "translate(" +(width / 2) + "," + (height / 2 ) + ")");
        console.log(data);
var g = svg.selectAll(".arc")
.data(pie(data))
.enter().append("g")
.attr("class", "arc");  

g.append("path")
.attr("d", arc)
.style("fill", function(d) { return color(d.data.name); });

g.append("text")
.attr("transform", function(d) {
    return "translate(" + arc.centroid(d) + ")"; })
.style("text-anchor", "middle")
.text(function(d) { return d.data.name; });


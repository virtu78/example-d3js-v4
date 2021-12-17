import * as d3 from 'd3';
//var d3 = require('d3')
import styles from "../styles/index.css";

var height = 500, 
    width = 500, 
    margin=30,
    data=[],
    keys=[];

var xhr = new XMLHttpRequest();
xhr.open('GET', 'data/visiologyBrowsers.json', false);
xhr.send();
if (xhr.status != 200) {
  alert( xhr.status + ': ' + xhr.statusText );
} else {
  let res=JSON.parse(xhr.responseText)    
   data= res.series[0].data  
}

data.map(function(item){    
  keys.push(item.name)
})

console.log(keys)
d3.select('body')
  .append('h1')
  .append('text')
  //.text(`D3 version: ${d3.version}`)
  .text(`Распределение рынка броузеров, 2021`)

var color = d3.scaleOrdinal()
  .domain(keys)
  .range(d3.schemeCategory10);
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

    var div = d3.select("body").append("div")
         .attr("class", "tooltip-donut")
         .style("opacity", 0);   

var g = svg.selectAll(".arc")
  .data(pie(data))
  .enter().append("g")
  .attr("class", "arc")
  .on('mouseover', function (d, i) {
    d3.select(this).transition()
         .duration('50')
         .attr('opacity', '.85')
         
         div.transition()
               .duration(50)
               .style("opacity", 1)
               .style("position", 'absolute')
               .style("width", '70px')
               .style("height", '50px')
               .style("background", '#FFF');
              let browser= d.data.name;
              let num = d.value + '%';
              let text=div.html('<span>'+browser+'</span></br><span>'+num+'</span>')
               
     .style("left", (d3.event.pageX - 3) + "px")
     .style("top", (d3.event.pageY + 5) + "px");
  })   
  .on('mouseout', function (d, i) {
    d3.select(this).transition()
         .duration('50')
         .attr('opacity', '1');
         div.transition()
               .duration('50')
               .style("opacity", 0);
 })
g.append("path")
.attr("d", arc)
.style("fill", function(d) { return color(d.data.name); });

// g.append("text")
// .attr("transform", function(d) {
//     return "translate(" + arc.centroid(d) + ")"; })
//     .style("text-anchor", "middle")
//     .text(function(d) { return d.data.name; });


var svg_legend = d3.select("body").append("svg")
    .attr("class", "axis")
    .attr("width", 200)
    .attr("height", 400)

svg_legend.selectAll("mydots")
  .data(keys)
  .enter()
  .append("circle")
    .attr("cx", 100)
    .attr("cy", function(d,i){ return 100 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("r", 7)
    .style("fill", function(d){ return color(d)})


svg_legend.selectAll("mylabels")
  .data(keys)
  .enter()
  .append("text")
    .attr("x", 120)
    .attr("y", function(d,i){ return 100 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", function(d){ return color(d)})
    .text(function(d){ return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
Template.production.onRendered(function () {
  this.autorun(function () {

    // Setup svg using Bostock's margin convention

var margin = {top: 20, right: 160, bottom: 35, left: 60};

var width = 1310 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

var svg = d3.select("#prodChart2")
.append("div")
.classed("svg-container", true)
.append("svg")
.attr("preserveAspectRatio","xMinYMin meet")
.attr("viewBox", "0 0 1200 470")
.classed("svg-content-responsive", true)
.append("g")
.attr("class", "graph")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


/* Data in strings like it would be if imported from a csv */

var data = [
  {"state":"Andhra Pradesh","crossbred":1251,"indigenous":2228,"buffalo":5763},
  {"state":"Arunachal Pradesh","crossbred":11,"indigenous":133,"buffalo":1},
  {"state":"Assam","crossbred":175,"indigenous":3335,"buffalo":157},
  {"state":"Bihar","crossbred":2023,"indigenous":3959,"buffalo":4017},
  {"state":"Chhatisgarh","crossbred":89,"indigenous":3238,"buffalo":409},
  {"state":"Goa","crossbred":10,"indigenous":14,"buffalo":16},
  {"state":"Gujarat","crossbred":1048,"indigenous":3092,"buffalo":5646},
  {"state":"Haryana","crossbred":522,"indigenous":322,"buffalo":2914},
  {"state":"Himachal Pradesh","crossbred":549,"indigenous":403,"buffalo":423},
  {"state":"Jammu & Kashmir","crossbred":703,"indigenous":525,"buffalo":417},
  {"state":"Jharkhand","crossbred":137,"indigenous":2486,"buffalo":398},
  {"state":"Karnataka","crossbred":1829,"indigenous":2540,"buffalo":2056},
  {"state":"Kerala","crossbred":630,"indigenous":36,"buffalo":10},
  {"state":"Madhya Pradesh","crossbred":415,"indigenous":6538,"buffalo":4251},
  {"state":"Maharashtra","crossbred":2138,"indigenous":3302,"buffalo":3359},
  {"state":"Manipur","crossbred":20,"indigenous":77,"buffalo":23},
  {"state":"Meghalaya","crossbred":19,"indigenous":333,"buffalo":4},
  {"state":"Mizoram","crossbred":6,"indigenous":10,"buffalo":2},
  {"state":"Nagaland","crossbred":52,"indigenous":38,"buffalo":9},
  {"state":"Nct Of Delhi","crossbred":32,"indigenous":15,"buffalo":95},
  {"state":"Odisha","crossbred":575,"indigenous":2884,"buffalo":250},
  {"state":"Punjab","crossbred":1182,"indigenous":115,"buffalo":2805},
  {"state":"Rajasthan","crossbred":929,"indigenous":5540,"buffalo":6933},
  {"state":"Sikkim","crossbred":57,"indigenous":5,"buffalo":0},
  {"state":"Tamilnadu","crossbred":3411,"indigenous":1074,"buffalo":423},
  {"state":"Tripura","crossbred":54,"indigenous":289,"buffalo":4},
  {"state":"Uttar Pradesh","crossbred":1828,"indigenous":7241,"buffalo":15432},
  {"state":"Uttarakhand","crossbred":259,"indigenous":548,"buffalo":582},
  {"state":"West Bengal","crossbred":1270,"indigenous":5053,"buffalo":172}
];



// Transpose the data into layers
var dataset = d3.layout.stack()(["crossbred", "indigenous", "buffalo"].map(function(fruit) {
  return data.map(function(d) {
    return {x: d.state, y: +d[fruit]};
  });
}));


// Set x, y and colors
var x = d3.scale.ordinal()
  .domain(dataset[0].map(function(d) { return d.x; }))
  .rangeRoundBands([10, width-10], 0.02);

var y = d3.scale.linear()
  .domain([0, d3.max(dataset, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y + 10; });  })])
  .range([height, 0]);

var colors = ["#ff7f0e", "#1f77b4", "#2ca02c"];


// Define and draw axes
var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(5)
  .tickSize(-width, 0, 0)
  .tickFormat( function(d) { return d } );

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom")
  // .tickFormat(d3.time.format("%Y"));

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .selectAll("text")
  .attr("font-size", "12px");


svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + (height+2) + ")")
  .call(xAxis)
  .selectAll("text")
  .attr("y", 3)
  .attr("x", 9)
  .attr("dy", ".35em")
  .attr("transform", "rotate(90)")
  .attr("font-size", "12px")
  .style("text-anchor", "start");


// Create groups for each series, rects for each segment
var groups = svg.selectAll("g.cost")
  .data(dataset)
  .enter().append("g")
  .attr("class", "cost")
  .style("fill", function(d, i) { return colors[i]; });

var rect = groups.selectAll("rect")
  .data(function(d) { return d; })
  .enter()
  .append("rect")
  .attr("x", function(d) { return x(d.x); })
  .attr("y", function(d) { return y(d.y0 + d.y); })
  .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
  .attr("width", x.rangeBand()-10)
  .on("mouseover", function() { tooltip.style("display", null); })
  .on("mouseout", function() { tooltip.style("display", "none"); })
  .on("mousemove", function(d) {
    var xPosition = d3.mouse(this)[0] - 15;
    var yPosition = d3.mouse(this)[1] - 25;
    tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
    tooltip.select("text").text(d.y);
  });


// Draw legend
var legend = svg.selectAll(".legend")
  .data(colors)
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) { return "translate(-1050," + i * 25 + ")"; });

legend.append("rect")
  .attr("x", width - 15)
  .attr("width", 15)
  .attr("height", 15)
  .style("fill", function(d, i) {return colors.slice().reverse()[i];});

legend.append("text")
  .attr("x", width + 5)
  .attr("y", 9)
  .attr("dy", ".35em")
  .attr("font-size", "1.3em")
  .style("text-anchor", "start")
  .text(function(d, i) {
    switch (i) {
      case 0: return "Buffaloes";
      case 1: return "Indigenous cows";
      case 2: return "Cross-bred cows";
    }
  });


// Prep the tooltip bits, initial display is hidden
var tooltip = svg.append("g")
  .attr("class", "tooltip")
  .style("display", "none");

tooltip.append("rect")
  .attr("width", 30)
  .attr("height", 20)
  .attr("fill", "white")
  .style("opacity", 0.5);

tooltip.append("text")
  .attr("x", 15)
  .attr("dy", "1.2em")
  .style("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("font-weight", "bold");

});
});

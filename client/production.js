Template.production.onRendered(function () {
  this.autorun(function () {

var margin = {top: 20, right: 90, bottom: 80, left: 50},
    width = 1050 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);
var y0 = d3.scale.linear().domain([300, 1100]).range([height, 0]),
y1 = d3.scale.linear().domain([20, 1000]).range([height, 0]);
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
// create left yAxis
var yAxisLeft = d3.svg.axis().scale(y0).ticks(4).orient("left");
// create right yAxis
var yAxisRight = d3.svg.axis().scale(y1).ticks(6).orient("right");
var svg = d3.select("#prodChart")
    .append("div")
    .classed("svg-container", true)
    .append("svg")
    .attr("preserveAspectRatio","xMinYMin meet")
    .attr("viewBox", "0 0 1000 370")
    .classed("svg-content-responsive", true)
  .append("g")
    .attr("class", "graph")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("production.tsv", type, function(error, data) {
  x.domain(data.map(function(d) { return d.year; }));
  y0.domain([0, d3.max(data, function(d) { return d.money; })]);



  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
   .attr("y", 0)
   .attr("x", 9)
   .attr("dy", ".35em")
   .attr("transform", "rotate(90)")
   .style("text-anchor", "start");;
  svg.append("g")
	  .attr("class", "y axis axisLeft")
	  .attr("transform", "translate(0,0)")
	  .call(yAxisLeft)
	.append("text")
	  .attr("y", 6)
	  .attr("dy", "-2em")
	  .style("text-anchor", "end")
	  .style("text-anchor", "end")
	  .text("Dollars");

  svg.append("g")
	  .attr("class", "y axis axisRight")
	  .attr("transform", "translate(" + (width) + ",0)")
	  .call(yAxisRight)
	.append("text")
	  .attr("y", 6)
	  .attr("dy", "-2em")
	  .attr("dx", "2em")
	  .style("text-anchor", "end")
	  .text("#");

  svg.append("text")
      .attr("x", 35)
      .attr("y", 25)
      .text('Per capita availability (g/day)')
      .attr("font-size", "12px")
      .attr("fill",[ "#ff7f0e"]);
  svg.append("text")
      .attr("x", 35)
      .attr("y", 45)
      .text('Annual production (1000 tons)')
      .attr("font-size", "12px")
      .attr("fill",[ "#1f77b4"]);
svg.append("rect")
          .attr("class", "bar2")
          .attr("x", 20)
          .attr("y", 16)
          .attr("width", 10)
          .attr("height", 10);
svg.append("rect")
          .attr("class", "bar1")
          .attr("x", 20)
          .attr("y", 36)
          .attr("width", 10)
          .attr("height", 10);
  bars = svg.selectAll(".bar").data(data).enter();
  bars.append("rect")
      .attr("class", "bar1")
      .attr("x", function(d) { return x(d.year); })
      .attr("width", x.rangeBand()/2)
      .attr("y", function(d) { return y0(d.money); })
	  .attr("height", function(d,i,j) { return height - y0(d.money); });
  bars.append("rect")
      .attr("class", "bar2")
      .attr("x", function(d) { return x(d.year) + x.rangeBand()/2; })
      .attr("width", x.rangeBand() / 2)
      .attr("y", function(d) { return y1(d.number); })
	  .attr("height", function(d,i,j) { return height - y1(d.number); });
});
function type(d) {
  d.money = +d.money;
  return d;
}

});
});

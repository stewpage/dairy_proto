
Template.trade.onRendered(function () {

  this.autorun(function () {
var subs = Meteor.subscribe("exportshist");
    if (subs.ready()) {

      console.log("> Export hist subs ready. \n\n");
      var selectedProduct = Session.get('donutproduct');
      histdata2 = ExportsHist2.find().fetch();
      histdata = ExportsHist.find({product:selectedProduct}).fetch()[0].exports

      function compare(a,b) {
        if (a.date < b.date)
        return -1;
        if (a.date > b.date)
        return 1;
        return 0;
        }
      var jsonhist = histdata.sort(compare)
      var jsonhist2 = histdata2.sort(compare)

    // start dual-axis chart
    var margin = {top: 30, right: 45, bottom: 30, left: 45},
    width = 800 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y%m").parse;

var x = d3.time.scale().range([0, width]);
var y0 = d3.scale.linear().range([height, 0]);
var y1 = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxisLeft = d3.svg.axis().scale(y0)
    .orient("left").ticks(5);

var yAxisRight = d3.svg.axis().scale(y1)
    .orient("right").ticks(5);

var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y0(d.value); });

var valueline2 = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y1(d.qty); });

d3.selectAll("div.svg-container").remove();
var svg2 = d3.select("div#exportqtylinechart")
        .append("div")
        .classed("svg-container", true)
        .append("svg")
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 800 400")
        //class to make it responsive
        .classed("svg-content-responsive", true)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");


 var dataValues = d3.values(jsonhist)[0];
 var dataHead = (Object.keys(dataValues));
 var dataLabels = dataHead.slice(1, 1 + 2);
 jsonhist.forEach(function(d) {
     d.date = parseDate(d.date);
     d.value = +d.value;
     d.qty = +d.qty;

 });
    // Scale the range of the data
    x.domain(d3.extent(jsonhist, function(d) { return d.date; }));
    y0.domain([0, d3.max(jsonhist, function(d) {
		return Math.max(d.value); })]);
    y1.domain([0, d3.max(jsonhist, function(d) {
		return Math.max(d.qty); })]);

    svg2.append("path")        // Add the valueline path.
        .style("stroke", "#1f77b4")
        .style("fill", "none")
        .attr("d", valueline(jsonhist));

    svg2.append("path")        // Add the valueline2 path.
        .style("stroke", "#ff7f0e")
        .style("fill", "none")
        .attr("d", valueline2(jsonhist));


    svg2.append("g")            // Add the X Axis
        .attr("class", "x axis")
        .attr("class", "greyaxis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg2.append("g")
        .attr("class", "y axis")
        .attr("class", "greyaxis")
        .style("fill", "#1f77b4")
        .call(yAxisLeft);

    svg2.append("g")
        .attr("class", "y axis")
        .attr("class", "greyaxis")
        .attr("transform", "translate(" + width + " ,0)")
        .style("fill", "#ff7f0e")
        .call(yAxisRight);

    svg2.append("text")
                .attr("x", 595)
                .attr("y", 215)
                .text('Quantity (1000 units)')
                .attr("font-size", "12px")
                .attr("fill",[ "#ff7f0e"]);
    svg2.append("text")
                .attr("x", 595)
                .attr("y", 230)
                .text("Value (lakh Rs)")
                .attr("font-size", "12px")
                .attr("fill","#1f77b4");
    svg2.append("line")          // attach a line
                .style("stroke", "#ff7f0e")  // colour the line
                .attr("x1", 575)     // x position of the first end of the line
                .attr("y1", 212)      // y position of the first end of the line
                .attr("x2", 585)     // x position of the second end of the line
                .attr("y2", 212);
    svg2.append("line")          // attach a line
                .style("stroke", "#1f77b4") // colour the line
                .attr("x1", 575)     // x position of the first end of the line
                .attr("y1", 227)      // y position of the first end of the line
                .attr("x2", 585)     // x position of the second end of the line
                .attr("y2", 227);

} else {
  console.log("> Subscription is not ready yet. \n\n");
}

  });
});

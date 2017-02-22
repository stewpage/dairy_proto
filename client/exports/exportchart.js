
Template.trade.onRendered(function () {

  this.autorun(function () {

      Session.set('donutmonth', "2015-2016");
      Session.set('donutproduct', "19");
    var subs = Meteor.subscribe("productexporttop");
    this.autorun(function() {
      if (subs.ready()) {
        var selectedMonth = Session.get('donutmonth');
        var selectedProduct = Session.get('donutproduct');
        coldata = ProductExportTop.find({$and: [{month: selectedMonth},
                                              {product:selectedProduct}]
        }).fetch()[0].exports;

      } else {
        console.log("> Subscription is not ready yet. \n\n");
      }

    $(function() {
      $.getJSON("donutdata.json", function(json) {
          var dataset2 = json;
          // var donutData = dataset2
          var donutData = coldata;
        var donuts = new DonutCharts();
        donuts.create(donutData);


        });
    });



    function DonutCharts() {


        var donutcharts = d3.select('#donut-charts');

        var chart_m,
            chart_r,
            color = d3.scale.category20();

        var getCatNames = function(dataset) {

            var catNames = new Array();

            for (var i = 0; i < dataset[0].data.length; i++) {
                catNames.push(dataset[0].data[i].cat);

            }
            return catNames;

        }

        var createLegend = function(catNames) {

            var legends = donutcharts.select('.legend')
                            .selectAll('g')
                                .data(catNames)
                            .enter().append('g')
                                .attr('transform', function(d, i) {
                                  if (i<3) {
                                return 'translate('+(i * 100 +10) +',10)';
                            } else if (i<6){
                                return 'translate('+((i-3) * 100 +10) +',30)';
                            } else{
                                return 'translate('+((i-6) * 100 +10) +',50)';
                            }
                                });

            legends.append('circle')
                .attr('class', 'legend-icon')
                .attr('r', 6)
                .style('fill', function(d, i) {
                    return color(i);
                });

            legends.append('text')
                .attr('dx', '1em')
                .attr('dy', '.3em')
                .text(function(d) {
                    return d;
                });
        }

        var createCenter = function(pie) {

            var eventObj = {
                'mouseover': function(d, i) {
                    d3.select(this)
                        .transition()
                        .attr("r", chart_r * 0.65);
                },

                'mouseout': function(d, i) {
                    d3.select(this)
                        .transition()
                        .duration(500)
                        .ease('bounce')
                        .attr("r", chart_r * 0.6);
                },

                'click': function(d, i) {
                    var paths = donutcharts.selectAll('.clicked');
                    pathAnim(paths, 0);
                    paths.classed('clicked', false);
                    resetAllCenterText();
                }
            }

            var donuts = d3.selectAll('.donut');

            // The circle displaying total data.
            donuts.append("svg:circle")
                .attr("r", chart_r * 0.6)
                .style("fill", "#E7E7E7")
                .on(eventObj);

            donuts.append('text')
                    .attr('class', 'center-txt type')
                    .attr('y', chart_r * -0.16)
                    .attr('text-anchor', 'middle')
                    .style('font-weight', 'bold')
                    .text(function(d, i) {
                        return d.type;
                    });
            donuts.append('text')
                    .attr('class', 'center-txt value')
                    .attr('text-anchor', 'middle');
            donuts.append('text')
                    .attr('class', 'center-txt percentage')
                    .attr('y', chart_r * 0.16)
                    .attr('text-anchor', 'middle')
                    .style('fill', '#A2A2A2');
        }

        var setCenterText = function(thisDonut) {
            var sum = d3.sum(thisDonut.selectAll('.clicked').data(), function(d) {
                return d.data.val;
            });

            thisDonut.select('.value')
                .text(function(d) {
                    return (sum)? sum.toFixed(1) + d.unit
                                : d.total.toFixed(1) + d.unit;
                });
            thisDonut.select('.percentage')
                .text(function(d) {
                    return (sum)? (sum/d.total*100).toFixed(2) + '%'
                                : '';
                });
        }

        var resetAllCenterText = function() {
            donutcharts.selectAll('.value')
                .text(function(d) {
                    return d.total.toFixed(1) + d.unit;
                });
            donutcharts.selectAll('.percentage')
                .text('');
        }

        var pathAnim = function(path, dir) {
            switch(dir) {
                case 0:
                    path.transition()
                        .duration(500)
                        .ease('bounce')
                        .attr('d', d3.svg.arc()
                            .innerRadius(chart_r * 0.7)
                            .outerRadius(chart_r)
                        );
                    break;

                case 1:
                    path.transition()
                        .attr('d', d3.svg.arc()
                            .innerRadius(chart_r * 0.6)
                            .outerRadius(chart_r * 1.00)
                        );
                    break;
            }
        }

        var updateDonut = function() {

            var eventObj = {

                'mouseover': function(d, i, j) {
                    pathAnim(d3.select(this), 1);

                    var thisDonut = donutcharts.select('.type' + j);
                    thisDonut.select('.value').text(function(donut_d) {
                        return d.data.val.toFixed(1) + donut_d.unit;
                    });
                    thisDonut.select('.percentage').text(function(donut_d) {
                        return (d.data.val/donut_d.total*100).toFixed(2) + '%';
                    });
                },

                'mouseout': function(d, i, j) {
                    var thisPath = d3.select(this);
                    if (!thisPath.classed('clicked')) {
                        pathAnim(thisPath, 0);
                    }
                    var thisDonut = donutcharts.select('.type' + j);
                    setCenterText(thisDonut);
                },

                'click': function(d, i, j) {
                    var thisDonut = donutcharts.select('.type' + j);

                    if (0 === thisDonut.selectAll('.clicked')[0].length) {
                        thisDonut.select('circle').on('click')();
                    }

                    var thisPath = d3.select(this);
                    var clicked = thisPath.classed('clicked');
                    pathAnim(thisPath, ~~(!clicked));
                    thisPath.classed('clicked', !clicked);

                    setCenterText(thisDonut);
                }
            };

            var pie = d3.layout.pie()
                            .sort(null)
                            .value(function(d) {
                                return d.val;
                            });

            var arc = d3.svg.arc()
                            .innerRadius(chart_r * 0.7)
                            .outerRadius(function() {
                                return (d3.select(this).classed('clicked'))? chart_r * 1.08
                                                                           : chart_r;
                            });

            // Start joining data with paths
            var paths = donutcharts.selectAll('.donut')
                            .selectAll('path')
                            .data(function(d, i) {
                                return pie(d.data);
                            });

            paths
                .transition()
                .duration(1000)
                .attr('d', arc);

            paths.enter()
                .append('svg:path')
                    .attr('d', arc)
                    .style('fill', function(d, i) {
                        return color(i);
                    })
                    .style('stroke', '#FFFFFF')
                    .on(eventObj)

            paths.exit().remove();

            resetAllCenterText();
        }

        this.create = function(dataset) {
            var $donutcharts = $('#donut-charts');
            d3.selectAll("svg.legend").remove();
            d3.selectAll("svg.donutnew").remove();
            chart_m = $donutcharts.innerWidth() / dataset.length / 2 * 0.07;
            chart_r = $donutcharts.innerWidth() / dataset.length / 2 * 0.85;

            donutcharts.append('svg')
                .attr('class', 'legend')
                .attr('width', '100%')
                .attr('height', 60)
                .attr('transform', 'translate(0, -700)');

            var donut = donutcharts.selectAll('.donut')
                            .data(dataset)
                        .enter().append('svg:svg')
                            .attr('width', (chart_r + chart_m) * 2)
                            .attr('height', (chart_r + chart_m) * 2)
                            .attr('class', 'donutnew')
                        .append('svg:g')
                            .attr('class', function(d, i) {
                                return 'donut type' + i;
                            })
                            .attr('transform', 'translate(' + (chart_r+chart_m) + ',' + (chart_r+chart_m) + ')');

            createLegend(getCatNames(dataset));
            createCenter();

            updateDonut();

        }

    }
    });




});
  });

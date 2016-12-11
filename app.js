var h = 500;
var w = 800;

var svg = d3.select("body")
  .append("svg")
  .attr({
    height: h,
    width: w,
  });

var data = [1, 8, 3, 1, 5, 4, 0, 7, 1];
console.log("ddd");


var padding = 40

var xScale = d3.scale.ordinal()
  .domain(d3.range(data.length))
  .rangeRoundBands([0, w - padding], 0.05);

var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("buttom")
  .ticks(5)

svg.append("g")
  .attr("transform", "translate(" + padding + ", " + (h - padding) + ")")
  .call(xAxis);

var yScale = d3.scale.linear()
  .domain([0, 10])
  .range([h - padding, padding]);

var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left")
  .ticks(5)

svg.append("g")
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);

var line = d3.svg.line()
  .x(function(d, i) {
    return xScale(i) + padding * 2;
  })
  .y(function(d) {
    return yScale(d);
  }).interpolate("basis")

svg.append("path")
  .attr({
    d: line(data),
    'class': 'myline',
    'fill': 'none',
    'stroke': 'black',
    'stroke-width': 2
  })


d3.select("p")
  .on("click", function() {
    console.log("click");
    var x = data.splice(0,1);
    data.push(x)
    svg.selectAll(".myline")
      .transition().
      duration(750)
      .attr({
        d: line(data),
      })
  });

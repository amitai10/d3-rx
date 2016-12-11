var h = 500;
var w = 800;
var padding = 50

var svg = d3.select("body")
  .append("svg")
  .attr({
    height: h,
    width: w + padding,
    padding: padding
  });

var data = [
  {
    date: new Date('2016-12-01'),
    value: 6
  },
  {
    date: new Date('2016-12-02'),
    value: 1
  },
  {
    date: new Date('2016-12-03'),
    value: 3
  },
  {
    date: new Date('2016-12-04'),
    value: 2
  },
  {
    date: new Date('2016-12-06'),
    value: 8
  },
  {
    date: new Date('2016-12-07'),
    value: 1
  }

];

var minDate = data[0].date;
var maxDate = data[data.length - 1].date;
var xScale = d3.time.scale()
  .domain([minDate, maxDate])
  .range([0, w - padding]);

var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("buttom")
  .ticks(d3.time.day, 1)
  .tickFormat(d3.time.format('%a'))


svg.append("g")
  .attr("class", "x-axis axis")
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
  .attr("class", "axis")
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);

var line = d3.svg.line()
  .x(function(d, i) {
    return xScale(d.date) + padding;
  })
  .y(function(d) {
    return yScale(d.value);
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
    data = [
      {
        date: new Date('2016-12-07'),
        value: 2
      },
      {
        date: new Date('2016-12-08'),
        value: 8
      },
      {
        date: new Date('2016-12-09'),
        value: 1
      }
      ,
      {
        date: new Date('2016-12-10'),
        value: 5
      }
    ]

    var minDate = data[0].date;
    var maxDate = data[data.length - 1].date;
    xScale = d3.time.scale()
      .domain([minDate, maxDate])
      .range([0, w - padding]);

      xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("buttom")
        .ticks(d3.time.day, 1)
        .tickFormat(d3.time.format('%a'))

    svg.selectAll("g.x-axis").call(xAxis);

    svg.selectAll(".myline")
      .transition().
      duration(750)
      .attr({
        d: line(data),
      })
  });

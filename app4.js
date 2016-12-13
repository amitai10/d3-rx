var h = 500;
var w = 800;
var padding = 50

updates = [];

var pauser = new Rx.Subject();
var counter = Rx.Observable.interval(100)
  .pausable(pauser)
  .map(function (i) {
    return i;
  })

  counter.subscribe(function(response) {
    var value = Math.sin(response/10);

    updates.push({
        date: new Date(),
        value: value,
    });

      if (updates.length > 200)  {
          updates.shift();
      }
      update(updates);
  });

  pauser.onNext(true);

d3.select("#start").on("click", function() {
  console.log("start");
  pauser.onNext(true);
})

d3.select("#stop").on("click", function() {
  console.log("stop");
  pauser.onNext(false);
})

var svg = d3.select("body")
  .append("svg")
  .attr({
    height: h,
    width: w + padding,
    padding: padding
  });

var xScale = d3.time.scale()
  .domain([new Date(), new Date()])
  .range([0, w - padding]);

var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("buttom")
  .tickFormat(d3.time.format("%X"));


svg.append("g")
  .attr("class", "x-axis axis")
  .attr("transform", "translate(" + padding + ", " + (h/2) + ")")
  .call(xAxis);

var yScale = d3.scale.linear()
  .domain([-1, 1])
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
    'class': 'myline',
    'fill': 'none',
    'stroke': 'black',
    'stroke-width': 2
  })



function update(data) {
    console.log("click");

    var minDate = data[0].date;
    var maxDate = data[data.length - 1].date;
    xScale = d3.time.scale()
      .domain([minDate, maxDate])
      .range([0, w - padding]);

      xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("buttom")
        .ticks(5)
        .tickFormat(d3.time.format("%S"));

    svg.selectAll("g.x-axis").call(xAxis);

    svg.selectAll(".myline")
      .transition()
      .attr({
        d: line(data),
      })
  }

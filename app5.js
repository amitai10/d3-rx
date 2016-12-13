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

var svg = d3.select("body").append("svg")
    .attr("width", w)
    .attr("height", h)


var x = d3.scaleTime()
  .domain([new Date(), new Date()])
  .range([0, w - padding]);

svg.append("g")
  .attr("class", "x-axis axis")
  .attr("transform", "translate(" + padding + ", " + (h/2) + ")")
  .call(d3.axisBottom(x));

var y = d3.scaleLinear()
  .domain([-1, 1])
  .range([h - padding, padding]);

svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(" + padding + ",0)")
  .call(d3.axisLeft(y));

var line = d3.line()
  .x(function(d, i) {
    return x(d.date) + padding;
  })
  .y(function(d) {
    return y(d.value);
  })

svg.append("path")
.attr("class", "myline")




function update(data) {
    console.log("click");

    var minDate = data[0].date;
    var maxDate = data[data.length - 1].date;
    x = d3.scaleTime()
      .domain([minDate, maxDate])
      .range([0, w - padding]);

    svg.selectAll("g.x-axis").call(d3.axisBottom(x));

    svg.selectAll(".myline")
      .transition()
      .attr("d", line(data));
  }

var margin = 20,
    width = parseInt(d3.select(".energy-chart").style("width")) - margin*2,
    height = maintainAspectRatio(width);

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .5);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(function(d) { return d[0].toUpperCase(); });

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select(".energy-chart")
    .attr("width", width + margin*2)
    .attr("height", height + margin*2)
  .append("g")
    .attr("transform", "translate(0," + margin + ")");

var bars = svg.append("g")
      .attr("class", "bars")
      .attr("transform", "translate(-"+margin+", 0)")

d3.tsv("data/energy.tsv", type, function(error, data) {
  x.domain(data.map(function(d) { return d.month; }));
  y.domain([0, d3.max(data, function(d) { return d.amount; })]);

  yAxis.ticks(3);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(-"+margin+"," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + width + ",0)")
    .call(yAxis);

  bars.selectAll(".negative-space")
      .data(data)
    .enter().append("rect")
      .attr("class", "negative-space")
      .attr("x", function(d) { return x(d.month); })
      .attr("width", x.rangeBand())
      .attr("y", 0)
      .attr("height", function(d) { return height; }).attr("rx", "2")
      .attr("ry", "2");

  bars.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.month); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.amount); })
      .attr("height", function(d) { return height - y(d.amount); })
      .attr("rx", "2")
      .attr("ry", "2");

      function resize() {
        var width = parseInt(d3.select(".energy-chart").style("width")),
        height = maintainAspectRatio(width),
        barWidth = x.rangeBand();

        x.rangeRoundBands([0, width], .5);
        y.range([height, 0]);

        svg.select('.x.axis')
          .call(xAxis);

        svg.select('.y.axis')
          .call(yAxis)

        svg.selectAll('rect')
          .attr("x", function(d) { return x(d.month); })
          .attr("width", barWidth);
      }

      d3.select(window).on('resize', resize);
      resize();

});

function maintainAspectRatio(width) {
  var height = width / 4.5;
  return height;
}

function type(d) {
  d.amount = +d.amount;
  return d;
}

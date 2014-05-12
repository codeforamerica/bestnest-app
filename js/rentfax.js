

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 480 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(function(d) { return d[0].toUpperCase(); });

var svg = d3.select(".energy-chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/energy.tsv", type, function(error, data) {
  x.domain(data.map(function(d) { return d.month; }));
  y.domain([0, d3.max(data, function(d) { return d.amount; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.month); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.amount); })
      .attr("height", function(d) { return height - y(d.amount); });

  svg.selectAll(".negative-space")
      .data(data)
    .enter().append("rect")
      .attr("class", "negative-space")
      .attr("x", function (d) { return x(d.month); })
      .attr("width", x.rangeBand())
      .attr("y", 0)
      .attr("height", function(d) { return y(d.amount); });
;

});

function type(d) {
  d.amount = +d.amount;
  return d;
}

/*

var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 500 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var chart = d3.select(".energy-chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/energy.tsv", type, function(error, data) {
  x.domain(data.map(function(d) { return d.month; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  var barWidth = width / data.length;

  chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  chart.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d, i) { return i * barWidth + (barWidth/4); })
      .attr("width", x.rangeBand() )
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });

});

function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}


/*
var ctx = document.getElementById("energy-cost-by-month").getContext("2d");

var data = {
	labels : ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
	datasets : [
		{
			fillColor: "rgb(74, 179, 236)",
			strokeColor: "rgb(74, 179, 236)",
			data: [65,59,90,81,56,55,40]
		}
	]
};

var options = {
  scaleShowGridLines: false,
  scaleGridLineWidth: 0,
  scaleLineWidth: 0,
  scaleShowLabels: false
};

var chart = new Chart(ctx).Bar(data, options);

*/

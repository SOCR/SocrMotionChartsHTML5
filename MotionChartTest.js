(function($){
	function motionChart(element, options)
	{
		var xScale, yScale, radiusScale, colorScale, xAxisOrient, yAxisOrient, svg, xAxis, yAxis, xLabel, yLabel, label, circles, circle, csv, mappings = [];

		var settings = $.extend({
			param: 'defaultValue'
		}, options || {});

		var margin = {top: 19.5, right: 19.5, bottom: 29.5, left: 39.5},
		width = $(".svg").innerWidth() - margin.left - margin.right,
		height = $(".svg").innerHeight() - margin.top - margin.bottom;

		chart = {
			
			init: function()
			{
				// Create the SVG container and set the origin.
				svg = d3.select(".svg").append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
				  .append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

				// The x & y axes.
				xAxisOrient = d3.svg.axis().orient("bottom").ticks(10, d3.format(",d"));
				yAxisOrient = d3.svg.axis().orient("left");//.scale

				// Add the x-axis.
				xAxis = svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + height + ")")
					.call(xAxisOrient);

				// Add the y-axis.
				yAxis = svg.append("g")
					.attr("class", "y axis")
					.call(yAxisOrient);

				// Add an x-axis label.
				xLabel = svg.append("text")
					.attr("class", "x label")
					.attr("text-anchor", "end")
					.attr("x", width)
					.attr("y", height - 6)
					//.text(mappings[$('ul.xAxis').data('ID')]);

				// Add a y-axis label
				yLabel = svg.append("text")
					.attr("class", "y label")
					.attr("text-anchor", "end")
					.attr("y", 6)
					.attr("dy", ".75em")
					.attr("transform", "rotate(-90)")
					//.text(mappings[$('ul.yAxis').data('ID')]);

				// Add the year label; the value is set on transition.
				label = svg.append("text")
					.attr("class", "year label")
					.attr("text-anchor", "end")
					.attr("y", height - 24)
					.attr("x", width);
					
				// Initialise Circles
				circles = svg.append("g")
				.attr("class", "circles")
			},
			getData: function()
			{	
				// Convert the table into comma seperated value format
				var csvFormat = d3.csv.format( $('.dataTable').handsontable('getNonEmptyData') );
				
				// Parse the csv format into objects
				csv = d3.csv.parse(csvFormat);
				
				//Get first row for mappings
				mappings = $('.dataTable').handsontable('getMappings');
				setMappings( mappings );		
				
				// Convert strings to numbers.
				csv.forEach(function(d) {
					for(var x=0;x<mappings.length;x++){
					d[mappings[x]] = +d[mappings[x]];
					}
				});
				
				//return csv;
			},
		  /**
			* Sets xScale, yScale, radiusScale, colorScale
			* @param { Object } Comma Seperated Values (csv)
		   **/
			setScales: function ()
			{
				// Various scales. These domains make assumptions of data, naturally.
				xScale = d3.scale.linear().domain(d3.extent(csv, function(d) { return chart.x(d); })).range([0, width]);
				yScale = d3.scale.linear().domain(d3.extent(csv, function(d) { return chart.y(d); })).range([height, 0]);
				radiusScale = d3.scale.sqrt().domain(d3.extent(csv, function(d) { return chart.radius(d); })).range([10, 40]);
				colorScale = d3.scale.linear().domain(d3.extent(csv, function(d) { return chart.color(d); })).range(["rgb(255,0,0)","rgb(0,0,255)"]).interpolate(d3.interpolateRgb);
			
				// Add Circles relative to data.
				circle = circles.selectAll(".circle").data(csv);
			},
			update: function()
			{
				//Update x&y axis scales
				xAxis.call(xAxisOrient.scale(xScale));
				yAxis.call(yAxisOrient.scale(yScale));
				
				//Update x&y axis labels
				xLabel.text(mappings[$('ul.xAxis').data('ID')]);
				yLabel.text(mappings[$('ul.yAxis').data('ID')]);
				
				
				circle.enter().append("circle")
				  .attr("class", "circle")
				  .call(chart.position)
				  /*.sort(chart.order)*/;
				
				circle.exit().remove();
			},
			// Positions the dots based on data.
			position: function (circles) { 
			  circle.attr("cx", function(d) { return xScale(chart.x(d)); })
					.attr("cy", function(d) { return yScale(chart.y(d)); })
					.attr("r", function(d) { return radiusScale(chart.radius(d)); })
					.style("fill", function(d) { return colorScale(chart.color(d)); })
			},
			// Defines a sort order so that the smallest dots are drawn on top.
			order: function (a, b) {
				return chart.radius(b) - chart.radius(a);
			},
			key: function (d) { return d[mappings[$('ul.key').data('ID')]]; },
			x: function (d) { return d[mappings[$('ul.xAxis').data('ID')]]; },
			y: function (d) { return d[mappings[$('ul.yAxis').data('ID')]]; },
			radius: function (d) { return d[mappings[$('ul.size').data('ID')]]; },
			color: function (d) { return d[mappings[$('ul.color').data('ID')]]; },
			category: function (d) {	return d[mappings[$('ul.category').data('ID')]];	}
			
		};
		

		

		// Public method - can be called from client code
		this.publicMethod = function()
		{
			console.log('public method called!');
		};
		
		this.init = function()
		{
			chart.init();
			chart.getData();
			chart.setScales();
			chart.update();
		};
		
		this.mappingsChange = function()
		{
			chart.setScales();
			chart.update();
		};

		// Private method - can only be called from within this object
		var privateMethod = function()
		{
			console.log('private method called!');
		};
	}

	$.fn.motionchart = function(options)
	{
		return this.each(function()
		{
			var motionchart;
			var element = $(this);

			// Return early if this element already has a plugin instance
			if ((motionchart = element.data('motionchart'))) 
			{
				motionchart.mappingsChange();
				return;
			}

			// pass options to plugin constructor
			motionchart = new motionChart(this, options);

			// Store plugin object in this element's data
			element.data('motionchart', motionchart);
			motionchart.init();
		});
	};
})(jQuery);
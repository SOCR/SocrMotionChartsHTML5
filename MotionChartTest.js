(function($){
	function motionChart(element, options)
	{
		var xSctest,cale, yScale, radiusScale, colorScale, xAxisOrient, yAxisOrient, svg, xAxis, yAxis, xLabel, yLabel, label, circles, circle, csv, mapnest, mappings = [], mappingID = [];

		var MapEnum = { key: 0, x: 1, y: 2, size: 3, color: 4, category: 5 };
		ar settings = $.extend({
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
					.attr("class", "circles");

			},
			getData: function()
			{csvFormat = d3.csv.format( $('.dataTable').handsontable('getNonEmptyData') );
				
				// Parse the csv format into objects
				csv = d3.csv.parse(csvFormat);
				
				//Get first row for mappings
				mappings = $('.dataTable').handsontaetMappings');
				setMappings( mappings );		
				
				// Convert strings to numbers.
				csv.forEach(function(d) {
				or(var x=0;x<mappings.length;x++){
					d[mappings[x]] = +d[mappings[x]];
					}
				});
				
				//return csv;
			},
		  /**
			* Sets xScale, yScale, radiusScale, colorScale
			* @panest = d3.nest()
					.key(function(d) { return chart.key(d); })
					//.sortValues(function (a,b) { return chart.radius(b) - chart.radius(a); })
					.map(csv);
				console.log("csv" + JSON.stringify(csv));
				console.log("nest" + JSON.stringify(nest));
				console.log("nest entreis" + JSON.stringify(d3.entries(nest)));
				console.log("nest valyes" + JSON.stringify(d3.values(nest))) } Comma Seperated Values (csv)
		   **/
			setScales: function ()
			{
				// Various scales. These domains make assumptions of data, naturally.
				xScale = d3.scale.linear().domain(d3.extent(csv, function(d) { return chart.x(d); })).rankeyScale = d3.scale.ordinal().domain([0,csv.length]).range(d3.values(csv, function(d) { return chart.key(d); }));
				xScale = d3.scale.linear().domain(d3.extent(csv, chart.x )).range([0, width]);
				yScale = d3.scale.linear().domain(d3.extent(csv, chart.y )).range([height, 0]);
				radiusScale = d3.scale.sqrt().domain(d3.extent(csv, chart.radius  chart.color(d); })).range(["rgb(255,0,0)","rgb(0,0,255)"]).interpolate(d3.intchart.color elative to data.
				circle = circles.selectAll(".circle").data(csv);
			},
			update: function()
			{
				//Update x&y ax circle = circles.selectAll(".circle")
					// .data(d3.values(nest), function(d) { return chart.key(d))
					.data(d3.values(nest)[0])
					.enter().append("circle")
					.attr("class","circle");
					
				circle.append("title");
				
				//Update Slider
					$('.slider').slider("option", "min", d3.min(csv, chart.key ));
					$('.slider').slider("option", "max", d3.max(csv, chart.key ));
					//$('.circle').each( function() { $(this).tooltip({ title: function() { return csv[$(this).index()
			},
			update: function(keyIndexnt.scale(yScale));
				
				//Update x&y axis labels
				xLabel.text(mappings[$('ul.xAxis').data('ID')]);
				yLabel.text(mappings[$('ul.yAxis').data('ID')]);
				
				
				circle.enter().append("circle")
				  .attr("class", "circle")
				  .call(chart.position)
				  /*.sort(cha  // Add a title.
				  // circles;
					  
				var thisCircle = svg.selectAll(".circle").data(d3.values(nest)[keyIndex], chart.category)
					/*.sort(function (a,b) {return chart.radius(b) - chart.radius(a); })*/;
				
				//Enter
				thisCircle.enter().append("circle").attr("class","circle");
				
				console.log(thisCircle);	//Debug
					
				//Transition
				thisCircle.transition().duration(2000).ease("linear")
					attr("r", function(d) { return radiusScale(chart.radius(d)); })
					.style("fill", function(d) { return colorScale(chart.color(d)); })
			},
			// Defines a sort order so that the smallest dots are drawn on top.
			order: function (a, b) {
				return chart.radius(b		.select("title").text( chart.category );	
					
				//Exit
				thisCircle.exit().transition()
				  .duration(1000).attr("r", 0).remove();
				  
				//Update Slider
				//$('a.ui-slider-handle').tooltip('show');
				$('.slider').slider("value", d3.keys(nest)[keyIndex]{ return xScale(chart.x(d)); })
					.attr("cy", function(d) { return yScale(chart.y(d)); })
					.attr("r", function(d) { return radiusScale(chart.radius(d)); })
					.style("fill", function(d) { return colorScale(chart.color(d)); })
			},
			// Defines a sort order so that the smallest dots are drawn on top.
			order: function (a, b) {
				return chart.radius(b) - chart.radius(a);
			},
			key: function (d) { return d[mappings[$('ul.key')key: function (d) { return d[mappings[mappingID[MapEnum.key]]]; },
			x: function (d) { return d[mappings[mappingID[MapEnum.x]]]; },
			y: function (d) { return d[mappings[mappingID[MapEnum.y]]]; },
			radius: function (d) { return d[mappings[mappingID[MapEnum.size]]]; },
			color: function (d) { return d[mappings[mappingID[MapEnum.color]]]; },
			category: function (d) { return d[mappings[mappingID[MapEnum.category]]]; }
		};
		
/**********************************TESTING AREA************************************************ 

  // Tweens the entire chart by first tweening the year, and then the data.
  // For the interpolated data, the dots and label are redrawn.
  function tweenKey() {
    var KeyVal = d3.interpolateNumber(d3.extent(csv,function(d) { return chart.key(d); }));
    return function(t) { displayKeyVal(Key(t)); };
  }

  // Updates the display to show the specified year.
  function displayKey(KeyVal) {
    circle.data(interpolateData(KeyVal), category).call(chart.position).sort(order);
    label.text(Math.round(KeyVal));
  }

  // Interpolates the dataset for the given (fractional) year.
  function interpolateData(KeyVal) {
    return csv.map(function(d) {
			alert("what" + d);
		return {
			mappings[1]: interpolateValues(d[mappings[1]],KeyVal),
			mappings[mappingID[MapEnum.y]]: interpolateValues(chart.y(d),KeyVal),
			mappings[mappingID[MapEnum.size]]: interpolateValues(chart.size(d),KeyVal),
			mappings[mappingID[MapEnum.color]]: interpolateValues(chart.color(d),KeyVal),
			mappings[mappingID[MapEnum.category]]: chart.category(d)
      };
    });
  }

  // Finds (and possibly interpolates) the value for the specified year.
  function interpolateValues(values, KeyVal) {
    var i = bisect.left(values, KeyVal, 0, values.length - 1),
        a = values[i];
    if (i > 0) {
      var b = values[i - 1],
          t = (KeyVal - a[0]) / (b[0] - a[0]);
      return a[1] * (1 - t) + b[1] * t;
    }
    return a[1];
  }
});

******************************************tESTING AREA END*********************************************************/
		
		is.init = function()
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

		// Private method - can only be called from//chart.update(d3.min(csv, function(d) { return chart.key(d); }));
			chart.update(0);
		};
		this.mappingsChange = function()
		{
			chart.setScales();
			chart.update(0);
		};
		this.dataChange = function()
		{
			chart.getData();
			chart.setScales();
			chart.update(0);
		};
		//Todo: prevent more than one.
		this.motion = function()
		{
			chart.update(0);
			var max = d3.values(nest).length;
			var	index = max > 0 ? 1 : 0;
			var timeline = setInterval( function()
			{
				// chart.redraw(function(d, i) {return chart.key(d)[i];});
				chart.update(index);
				index++;
				if(index >= max) 
				{
					clearInterval(timeline);
				}
			}, 2000);
		};
		this.updateMappingID = function (keyID, mapID) 
		{ 
			mappingID[keyID] = mapID; 
		}
			ionchart = function(options)
	{
		return this.each(function()
		{
			var motionchart;
			var element = $(this);

			// Return early if this element already has a plugin instance
			if ((motioaction, options)
	{
		var motionchart;
		var element = $(this);

		// Return early if this element already has a plugin instance
		if ((motionchart = element.data("motionchart"))) 
		{
			args = [];
			if (arguments.length > 1) {
				for (i = 1, ilen = arguments.length; i < ilen; i++) {
				  args.push(arguments[i]);
				}
			}
			this.each(function () {
				output = $(this).data("motionchart")[action].apply(this, args);
			});
			return output;
		}
		else
		{
			// pass options to plugin constructor
			motionchart = new motionChart(this, options);
			
	};
})(jQuery);
(function($){
	function motionChart(element, options)
	{
		var xScale, yScale, radiusScale, colorScale, xAxisOrient, yAxisOrient, svg, xAxis, yAxis, xLabel, yLabel, label, circles, circle, csv, nest, duration, mappings = [], mappingID = [], NaNMap = [], colorRange = {};

		var MapEnum = { key: 0, x: 1, y: 2, size: 3, color: 4, category: 5 };
		
		var settings = $.extend({
			param: 'defaultValue'
		}, options || {});

		var margin = {top: 39.5, right: 39.5, bottom: 29.5, left: 39.5},
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
				xAxisOrient = d3.svg.axis().orient("bottom");
				yAxisOrient = d3.svg.axis().orient("left");

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
					.attr("y", height - 6);

				// Add a y-axis label
				yLabel = svg.append("text")
					.attr("class", "y label")
					.attr("text-anchor", "end")
					.attr("y", 6)
					.attr("dy", ".75em")
					.attr("transform", "rotate(-90)");

				// Add the year label; the value is set on transition.
				label = svg.append("text")
					.attr("class", "year label")
					.attr("text-anchor", "end")
					.attr("y", height - 24)
					.attr("x", width);
					
				// Initialise Circles
				circles = svg.append("g")
					.attr("class", "circles");
					
				//set Default Color Range
				colorRange = {from: "rgb(255,0,0)", to: "rgb(0,0,255)"};
				
				//Initialise duration
				duration = 1000;

			},
			resize: function() {
				width = $(".svg").innerWidth() - margin.left - margin.right,
				height = $(".svg").innerHeight() - margin.top - margin.bottom;
				//d3.select("svg g").remove();
				// re-size the SVG container.
				d3.select("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom);
					
				// Reposition the x-axis to the bottom of the chart.
				xAxis.attr("transform", "translate(0," + height + ")");
				
				// Reset the axis scale to the new width and height
				(NaNMap[mappingID[MapEnum.x]]) ?	xScale.rangePoints([0, width]) : xScale.range([0, width]);
				(NaNMap[mappingID[MapEnum.y]]) ? yScale.rangePoints([height, 0]): yScale.range([height, 0]);
				xAxis.call(xAxisOrient.scale(xScale));
				yAxis.call(yAxisOrient.scale(yScale));
				
				//Move the xLabel to its respective position
				xLabel.attr("x", width)
					  .attr("y", height - 6);
				// Finally move all circles to their new respective positions
				svg.selectAll(".circle")
					.attr("cx", function(d) { return xScale( chart.x(d)) })							//set x postion
					.attr("cy", function(d) { return yScale( chart.y(d)) })							//set y position
			},
			updateData: function()
			{
				// Convert the table into comma seperated value format
				var csvFormat = d3.csv.format( $('.dataTable').handsontable('getNonEmptyData') );
				
				// Parse the csv format into objects
				csv = d3.csv.parse(csvFormat);
				
				//Get first row for mappings
				mappings = $('.dataTable').handsontable('getMappings');
				
				//nest the data by key
				nest = d3.nest()
					.key(function(d) { return chart.key(d); })
					//.sortValues(function (a,b) { return chart.radius(b) - chart.radius(a); })
					.map(csv);
				console.log("csv" + JSON.stringify(csv));
				console.log("nest" + JSON.stringify(nest));
				console.log(nest);
				console.log("nest entreis" + JSON.stringify(d3.entries(nest)));
				console.log("nest valyes" + JSON.stringify(d3.values(nest)));
				
				// Add Circles relative to data.
				circle = circles.selectAll(".circle")
					// .data(d3.values(nest), function(d) { return chart.key(d))
					.data(d3.values(nest)[0]);
					
				var csvSampleValues = d3.values(csv[0]);
				for(var i=0;i<csvSampleValues.length;i++)
				{	NaNMap[i] = isNaN(csvSampleValues[i]); }
				
				setMappings( mappings );														//TODO: move to UI for clean up
				
				
				// csv.forEach(function(d) {
					
			},
		    /**
			* Sets xScale, yScale, radiusScale, colorScale
			* @param { Object } Comma Seperated Values (csv)
		    **/
			setScales: function ()
			{			
				var thisArray=[];
				// x, y, radius and color scales. These scales assume the numerical data.
				xScale = (NaNMap[mappingID[MapEnum.x]]) ? d3.scale.ordinal().domain(thisArray, csv.forEach(function(d) {thisArray.push(chart.x(d)) })).rangePoints([0, width]) : d3.scale.linear().domain(d3.extent(csv, chart.x )).range([0, width]); thisArray.length = 0;
				yScale = (NaNMap[mappingID[MapEnum.y]]) ? d3.scale.ordinal().domain(thisArray, csv.forEach(function(d) {thisArray.push(chart.y(d)) })).rangePoints([height, 0]) : d3.scale.linear().domain(d3.extent(csv, chart.y )).range([height, 0]); thisArray.length = 0;
				radiusScale = (NaNMap[mappingID[MapEnum.size]]) ? d3.scale.ordinal().domain(thisArray, csv.forEach(function(d) {thisArray.push(chart.radius(d)) })).rangePoints([10, 40]) : d3.scale.sqrt().domain(d3.extent(csv, chart.radius )).range([10, 40]); thisArray.length = 0;
				colorScale = (NaNMap[mappingID[MapEnum.color]]) ? d3.scale.category20() : d3.scale.linear().domain(d3.extent(csv, chart.color )).range([colorRange.from,colorRange.to]).interpolate(d3.interpolateRgb); thisArray.length = 0;
			},
			update: function(keyIndex)
			{
				//Select all circles in SVG. If keyIndex is -1 (Passed by updateMapping) use current data. Otherwise Bind them to data with current key values.
				if (keyIndex != -1) circle = svg.selectAll(".circle").data(d3.values(nest)[keyIndex]/*, chart.category*/)
					//circle.sort(function (a,b) {alert("");console.log(a);console.log(b);return chart.radius(b) - chart.radius(a); });													//Set the metadata blobs
					
				
				
				//Enter
				circle.enter().append("circle").attr("class","circle");
					
				//Transition
				circle.transition().duration(duration).ease("linear")
					.attr("cx", function(d) { return xScale( chart.x(d)) })							//set x postion
					.attr("cy", function(d) { return yScale( chart.y(d)) })							//set y position
					.attr("r", function(d) { return radiusScale( chart.radius(d)) })				//Set radius
					.style("fill", function(d) { return colorScale( chart.color(d)) });				//Set color
				
				circle.call(chart.setPopover);
				
				//Exit
				circle.exit().transition()
				  .duration(1000).attr("r", 0).remove();
				
			},
			//Call popover for each circle
			setPopover: function()
			{
				
				$(this).each( function() {
				
					$(this).popover({
						placement: function() {return ($(this.$element[0]).attr('cx') < (3 * width / 4)) ? "right" : "left"},
						title: function() {return (typeof chart.category(d3.select(this).datum())!=='undefined') ? chart.category(d3.select(this).datum()) : "Data"},
						content: function() { 
							var outputObject = d3.select(this).datum();
							
							var output = "";
							var keys = d3.keys(outputObject);
							var values = d3.values(outputObject);
							
							for(var i=0;i<keys.length;i++)
							output += keys[i] + " : " + values[i] + "<br>";
							
							return output;
						}
					});
				});
			},
			// TODO: Define a sort order so that the smallest dots are drawn on top.
			/**
			 * Called automatically when mapping changed through the UI
			 * @param {Integer} number denoting the mapping changed. Reflected in MapEnum.
			**/
			updateMapping: function(keyID)
			{
				//temporary array used to extract a specific key within an associative array (CSV)	
				var thisArray = [];
				
				switch(keyID)
				{
					case MapEnum.key:
						//Nest CSV on a new key
						nest = d3.nest()
							.key(function(d) { return chart.key(d); })
							.map(csv);
						chart.update(0);							
						//Update Slider
						$('.slider').slider("option", "max", d3.values(nest).length - 1 );
						$('.slider').slider("value", 0);									//Reset Slider
						d3.entries(nest).forEach(function(d) {thisArray.push(d.key) });
						setKeyNames(thisArray);
						
						break;
						
					case MapEnum.x:
						//Update x axis scale and label
						xScale = (NaNMap[mappingID[MapEnum.x]]) ? d3.scale.ordinal().domain(thisArray, csv.forEach(function(d) {thisArray.push(chart.x(d)) })).rangePoints([0, width]) : d3.scale.linear().domain(d3.extent(csv, chart.x )).range([0, width]);
						xAxis.call(xAxisOrient.scale(xScale));
						xLabel.text(mappings[mappingID[MapEnum.x]]);
						circle.transition().duration(duration).ease("linear")
							.attr("cx", function(d) { return xScale( chart.x(d)) })							//set x postion
						break;
						
					case MapEnum.y:
						//Update y axis scale and label
						yScale = (NaNMap[mappingID[MapEnum.y]]) ? d3.scale.ordinal().domain(thisArray, csv.forEach(function(d) {thisArray.push(chart.y(d)) })).rangePoints([height, 0]) : d3.scale.linear().domain(d3.extent(csv, chart.y )).range([height, 0]);
						yAxis.call(yAxisOrient.scale(yScale));
						yLabel.text(mappings[mappingID[MapEnum.y]]);
						circle.transition().duration(duration).ease("linear")
							.attr("cy", function(d) { return yScale( chart.y(d)) })							//set y position
						break;
						
					case MapEnum.size:
						//Update Radius Scale
						radiusScale = (NaNMap[mappingID[MapEnum.size]]) ? d3.scale.ordinal().domain(thisArray, csv.forEach(function(d) {thisArray.push(chart.radius(d)) })).rangePoints([10, 40]) : d3.scale.sqrt().domain(d3.extent(csv, chart.radius )).range([10, 40]);
						circle.transition().duration(duration).ease("linear")
							.attr("r", function(d) { return radiusScale( chart.radius(d)) })				//Set radius
						break;
						
					case MapEnum.color:
						//Update Color Scale
						colorScale = (NaNMap[mappingID[MapEnum.color]]) ? d3.scale.category20() : d3.scale.linear().domain(d3.extent(csv, chart.color )).range([colorRange.from,colorRange.to]).interpolate(d3.interpolateRgb);
						circle.transition().duration(duration).ease("linear")
							.style("fill", function(d) { return colorScale( chart.color(d)) })				//Set color
						break;
					case MapEnum.category:
						//Do Nothing for now..
						break;
				}
						
			},
			/**
			 * Called automatically when scaling changed through the UI
			 * @param {Integer} number denoting the mapping changed. Reflected in MapEnum.
			 * @param {String} Denoting the scale to convert to - "linear","sqrt" or "log"
			**/
			updateScale: function(keyID, toScale) {
				
				switch(keyID)
				{
					case MapEnum.x:
						switch(toScale)
						{
							case "linear":
								xScale = d3.scale.linear().domain(d3.extent(csv, chart.x )).range([0, width]).nice();
								xAxis.transition().duration(1000)
									.call(xAxisOrient.scale(xScale));
								break;
							case "sqrt":
								xScale = d3.scale.sqrt().domain(d3.extent(csv, chart.x )).range([0, width]).nice();
								xAxis.transition().duration(1000)
									.call(xAxisOrient.scale(xScale));
								break;
							case "log":
								var format = d3.format(".0f"); // for formatting integers
								xScale = d3.scale.log().domain(d3.extent(csv, chart.x )).range([0, width]).nice();
								xAxis.transition().duration(1000)
									.call(xAxisOrient.scale(xScale));
								break;
							case "pow":
								xScale = d3.scale.pow().exponent(2).domain(d3.extent(csv, chart.x )).range([0, width]).nice();
								xAxis.transition().duration(1000)
									.call(xAxisOrient.scale(xScale));
								break;
						}
						break;
						
					case MapEnum.y:
						switch(toScale)
						{
							case "linear":
								yScale = d3.scale.linear().domain(d3.extent(csv, chart.y )).range([height, 0]);
								yAxis.transition().duration(1000)
									.call(yAxisOrient.scale(yScale));
								break;
							case "sqrt":
								yScale = d3.scale.sqrt().domain(d3.extent(csv, chart.y )).range([height, 0]);
								yAxis.transition().duration(1000)
									.call(yAxisOrient.scale(yScale));
								break;
							case "log":
								var format = d3.format(".0f"); // for formatting integers
								yScale = d3.scale.log().domain(d3.extent(csv, chart.y )).range([height, 0]);
								yAxis.transition().duration(1000)
									.call(yAxisOrient.scale(yScale));
								break;
							case "pow":
								yScale = d3.scale.pow().exponent(2).domain(d3.extent(csv, chart.y )).range([height, 0]);
								yAxis.transition().duration(1000)
									.call(yAxisOrient.scale(yScale));
								break;
						}
						break;
						
					case MapEnum.size:
						switch(toScale)
						{
							case "linear":
								radiusScale = d3.scale.sqrt().domain(d3.extent(csv, chart.radius )).range([10, 40]);
								circle.transition().duration(1000).ease("linear")
									.attr("r", function(d) { return radiusScale( chart.radius(d)) })				//Set radius
								break;
							case "sqrt":
								radiusScale = d3.scale.sqrt().domain(d3.extent(csv, chart.radius )).range([10, 40]);
								circle.transition().duration(1000).ease("linear")
									.attr("r", function(d) { return radiusScale( chart.radius(d)) })				//Set radius
								break;
							case "log":
								var format = d3.format(".0f"); // for formatting integers
								radiusScale = d3.scale.log().domain(d3.extent(csv, chart.radius )).range([10, 40]);
								circle.transition().duration(1000).ease("linear")
									.attr("r", function(d) { return radiusScale( chart.radius(d)) })				//Set radius
								break;
							case "pow":
								radiusScale = d3.scale.pow().exponent(2).domain(d3.extent(csv, chart.radius )).range([10, 40]);
								circle.transition().duration(1000).ease("linear")
									.attr("r", function(d) { return radiusScale( chart.radius(d)) })				//Set radius
								break;
						}
						break;
						
					case MapEnum.color:
						switch(toScale)
						{
							case "linear":
								colorScale = d3.scale.linear().domain(d3.extent(csv, chart.color )).range([colorRange.from,colorRange.to]).interpolate(d3.interpolateRgb);
								circle.transition().duration(duration).ease("linear")
									.style("fill", function(d) { return colorScale( chart.color(d)) })				//Set color
								break;
							case "sqrt":
								colorScale = d3.scale.sqrt().domain(d3.extent(csv, chart.color )).range([colorRange.from,colorRange.to]).interpolate(d3.interpolateRgb);
								circle.transition().duration(duration).ease("linear")
									.style("fill", function(d) { return colorScale( chart.color(d)) })				//Set color
								break;
							case "log":
								colorScale = d3.scale.log().domain(d3.extent(csv, chart.color )).range([colorRange.from,colorRange.to]).interpolate(d3.interpolateRgb);
								circle.transition().duration(duration).ease("linear")
									.style("fill", function(d) { return colorScale( chart.color(d)) })				//Set color
								break;
							case "pow":
								colorScale = d3.scale.pow().exponent(2).domain(d3.extent(csv, chart.color )).range([colorRange.from,colorRange.to]).interpolate(d3.interpolateRgb);
								circle.transition().duration(duration).ease("linear")
									.style("fill", function(d) { return colorScale( chart.color(d)) })				//Set color
								break;
						}
						break;
				}
			},
			/**
			 * Called automatically when color range changed through the UI
			 * @param {String} RGB color - Start Range
			 * @param {String} RGB color - End Range
			**/
			updateColorRange: function(from, to) {
				colorRange.from = from;
				colorRange.to = to;
				colorScale.range([colorRange.from,colorRange.to]).interpolate(d3.interpolateRgb);
				// circle.transition().duration(duration).ease("linear")
					// .style("fill", function(d) { return colorScale( chart.color(d)) })				//Set color
			},
			key: function (d) { return (NaNMap[mappingID[MapEnum.key]]) ? d[mappings[mappingID[MapEnum.key]]] : +d[mappings[mappingID[MapEnum.key]]]; },
			x: function (d) { return (NaNMap[mappingID[MapEnum.x]]) ? d[mappings[mappingID[MapEnum.x]]] : +d[mappings[mappingID[MapEnum.x]]]; },
			y: function (d) { return (NaNMap[mappingID[MapEnum.y]]) ? d[mappings[mappingID[MapEnum.y]]] : +d[mappings[mappingID[MapEnum.y]]]; },
			radius: function (d) { return (NaNMap[mappingID[MapEnum.size]]) ? d[mappings[mappingID[MapEnum.size]]] : +d[mappings[mappingID[MapEnum.size]]]; },
			color: function (d) { return (NaNMap[mappingID[MapEnum.color]]) ? d[mappings[mappingID[MapEnum.color]]] : +d[mappings[mappingID[MapEnum.color]]]; },
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
		
		
		// Public method - can be called from client code
		this.publicMethod = function()
		{
			console.log('public method called!');
		};
		
		this.init = function()
		{
			chart.init();
			chart.updateData();
			chart.setScales();
			chart.update(0);
		};
		this.mappingsChange = function(mapID)
		{
			chart.mappingChange(mapID);
			chart.update(-1);
		};
		this.dataChange = function()
		{
			chart.updateData();
			chart.setScales();
			chart.update(0);
		};
		this.motion = function()
		{
			chart.update(0);
			var max = d3.values(nest).length;
			var	index = max > 0 ? 1 : 0;
			var timeline = setInterval( function()
			{
				chart.update(index);
				index++;
				if(index >= max)
				{
					clearInterval(timeline);
				}
			}, duration);
		};
		this.updateCurrentIndex = function (index)
		{
			chart.update(index);
		}
		this.updateMappingID = function (keyID, mapID) 
		{ 
			mappingID[keyID] = mapID; 
			chart.updateMapping(keyID);
		};
		this.updateScales = function(mapID, scaleType)
		{
			chart.updateScale(mapID, scaleType);
			chart.update(-1);
		};
		this.updateColor = function(from, to)
		{
			chart.updateColorRange(from, to);
			chart.update(-1);
		};
		this.updateSpeed = function(newSpeed)
		{
			duration = newSpeed;
		};
		this.resize = function ()
		{
			chart.resize();
		}
		this.disableScale = function(mapEnum)
		{
			return NaNMap[mappingID[mapEnum]];
		}
		// Private method - can only be called from within this object
		var privateMethod = function()
		{
			console.log('private method called!');
		};
	}

	$.fn.motionchart = function(action, options)
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
			
			// Store plugin object in this element's data
			element.data('motionchart', motionchart);
			motionchart.init();
		}
	};
})(jQuery);
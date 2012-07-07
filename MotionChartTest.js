(function($){
	function motionChart(element, options)
	{
		var xScale, yScale, radiusScale, colorScale, xAxisOrient, yAxisOrient, svg, xAxis, yAxis, xLabel, yLabel, label, circles, circle, csv, mapnest, mappings = [], mappingID = [];

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
				xAxisOrient = d3.svg.axis().orient("bottom").ticks(10, d3.format(",d"));;
				yAxisOrient = d3.svg.axis().orient("left");xAxis = svg.append("g")
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
					//.text(mappings[$('ul.xAxis').data('ID')pend("text")
					.attr("class", "y label")
					.attr("text-anchor", "end")
					.attr("y", 6)
					.attr("dy", ".75em")
					.attr("transform", "rotate(-90)")
					//.text(mappings[$('ul.yAxis').data('ID')]);

				ion.
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
			getDatresize: function() {
				width = $(".svg").innerWidth() - margin.left - margin.right,
				height = $(".svg").innerHeight() - margin.top - margin.bottom;
				//d3.select("svg g").remove();
				// re-size the SVG container.
				d3.selectidth", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
				  .append("g")
			;
					
				// Reposition the x-axis to the bottom of the chart.
				xAxis.attr("transform", "translate(0," + height + ")");
				
				// Reset the axis scale to the new width and height
				isNaN(csv[0][mappings[mappingID[MapEnum.x]]]) ?	xScale.rangePoints([0, width]) : xScale.range([0, width]);
				isNaN(csv[0][mappings[mappingID[MapEnum.y]]]) ? yScale.rangePoints([height, 0]): yScale.range([height, 0]);
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
			updatefunction()
			{csvFormat = d3.csv.format( $('.dataTable').handsontable('getNonEmptyData') );
				
				// Parse the csv format into objects
				csv = d3.csv.parse(csvFormat);
				
				//Get first row for mappings
				mappings = $('.dataTable').handsontaetMappitMappings');
				setMappings( mappings );		
				
				// Convert strings to numbers.
				csv.forEach(f
				//nest the data by keyest = d3.nest()
					.key(function(d) { return chart.key(d); })
					//.sortValues(function (a,b) { return chart.radius(b) - chart.radius(a); })
					.map(csv);
				console.log("csv" + JSON.stringify(csv));
				console.log("nest" + JSON.stringify(nest));
				console.log("nest entreisnestle.log("nest entreis" + JSON.stringify(d3.entries(nest)));
				console.log("nest valyes" + JSON.stringify(d3.values(nest))) } Comma Seperated V	
				// Add Circles relative to data.
				selectAll(".circle")
					// .data(d3.values(nest), function(d) { return chart.key(d))
					.data(d3.values(nest)[0])
					.enter().appe;

				//TODO: move to UI for clean up
				setMappings( mappings rated Values (csv)
		   **/
			setScales: function ()
			{
				// Various scales. These domains make assumptions of data, naturally.
				xScale = d3.scale.linear().domain(var thisArray=[];
				// x, y, radius and color scales. These scales assume the numerical data.
				xScale = isNaN(csv[0][mappings[mappingID[MapEnum.x]]]) ? d3.scale.ordinal().domain(thisArray, csv.forEach(function(d) {thisArray.push(chart.x(d)) })).rangePoints([0, width]) : d3.scale.linear().domain(d3.extent(csv, chart.x )).range([0, width]); thisArray.length = 0;
				yScale = isNaN(csv[0][mappings[mappingID[MapEnum.y]]]) ? d3.scale.ordinal().domain(thisArray, csv.forEach(function(d) {thisArray.push(chart.y(d)) })).rangePoints([height, 0]) : d3.scale.linear().domain(d3.extent(csv, chart.y )).range([height, 0]); thisArray.length = 0;
				radiusScale = isNaN(csv[0][mappings[mappingID[MapEnum.size]]]) ? d3.scale.ordinal().domain(thisArray, csv.forEach(function(d) {thisArray.push(chart.radius(d)) })).rangePoints([10, 40]) : d3.scale.sqrt().domain(d3.extent(csv, chart.radius )).range([10, 40]); thisArray.length = 0;
				colorScale = isNaN(csv[0][mappings[mappingID[MapEnum.color]]]) ? d3.scale.category20() :5)"]).interpolate(d3.intchart.color elative to data.
				circle = circles.selectAll(".circle").data(csv);
			},
			update: fun thisArray.length = 0;
			},
			updateAxis: function()
			{

			},
			update: function(keyIndex)
			{
				//Select all circles in SVG. If keyIndex is -1 (Passed by updateMapping) use current data. Otherwise Bind them to data with current key values.
				if (keyIndex != -1) circle = svg.selectAll(".circle").data(d3.values(nest)[keyIndex]/*, chart.category*/)
					/*.sort(function (a,b) {return chart.radius(b) - chart.radius(a); })*/;
				
				//Enter
				circle.enter().append("circle").attr("class","circle").append("title");
				
				console.log(circle);	//Debug
					
				//Transition
				circle.transition().duration(2000).ease("linear")
					.attr("cx", function(d) { return xScale( chart.x(d)) })							//set x postion
					.attr("cy", function(d) { return yScale( chart.y(d)) })							//set y position
					.attr("r", function(d) { return radiusScale( chart.radius(d)) })				//Set radius
					.style("fill", function(d) { return colorScale( chart.color(d)) })				//Set color
					.select("title").text( chart.category );										//Add a title
					
				//Exit
				circle.exit().transition()
				  .duration(1000).attr("r", 0).remove();
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
	nction() { $(this).tooltip({ title: function() { return csv[$(this).index()
			},
			update: function(keyInd			
						break;
						
					case MapEnum.x:
						//Update x axis scale and label
						xScale = isNaN(csv[0][mappings[mappingID[MapEnum.x]]]) ? d3.scale.ordinal().domain(thisArray, csv.forEach(function(d) {thisArray.push(chart.x(d)) })).rangePoints([0, width]) : d3.scale.linear().domain(d3.extent(csv, chart.x )).range([0, width]);
						xAxis.call(xAxisOrient.scale(xScale));
						xLabel.text(mappings[mappingID[MapEnum.x]]);
						circle.transition().duration(2000).ease("linear")
							.attr("cx", function(d) { return xScale( chart.x(d)) })							//set x postion
						break;
						
					case MapEnum.y:
						//Update y axis scale and label
						yScale = isNaN(csv[0][mappings[mappingID[MapEnum.y]]]) ? d3.scale.ordinal().domain(thisArray, csv.forEach(function(d) {thisArray.push(chart.y(d)) })).rangePoints([height, 0]) : d3.scale.linear().domain(d3.extent(csv, chart.y )).range([height, 0]);
						yAxis.call(yAxisOrient.scale(yScale));
						yLabel.text(mappings[mappingID[MapEnum.y]]);
						circle.transition().duration(2000).ease("linear")
							.attr("cy", function(d) { return yScale( chart.y(d)) })							//set y position
						break;
						
					case MapEnum.size:
						//Update Radius Scale
						radiusScale = isNaN(csv[0][mappings[mappingID[MapEnum.size]]]) ? d3.scale.ordinal().domain(thisArray, csv.forEach(function(d) {thisArray.push(chart.radius(d)) })).rangePoints([10, 40]) : d3.scale.sqrt().domain(d3.extent(csv, chart.radius )).range([10, 40]);
						circle.transition().duration(2000).ease("linear")
							.attr("r", function(d) { return radiusScale( chart.radius(d)) })				//Set radius
						break;
						
					case MapEnum.color:
						//Update Color Scale
						colorScale = isNaN(csv[0][mappings[mappingID[MapEnum.color]]]) ? d3.scale.category20() :5)"]).interpolate(d3.intchart.color elative to data.
				circle = circles.selectAll(".circle").data(csv);
			},
			update: function			circle.transition().duration(2000).ease("linear")
							.style("fill", function(d) { return colorScale( chart.color(d)) })				//Set color
						break;
					case MapEnum.category:
						//Update Category Scale
						circle.transition().duration(2000).ease("linear")
							.select("title").text( chart.category );
						break;
				}
						
			},D[MapEnum.key]]]; },
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

		// Private method - can only be called from//chart.update(d3.min(csv, function(d) { return chart.key(d); }))updateData();
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
		}; 0;
			var timeline = setInterval( function()
			{
				// chart.redraw(function(d, i) {return chart.key(d)[i];});
				chart.update(index);
				index++;
				if(index >= max) 
				{
chart.update(index);
				index++;
				if(index >= max)
				{
					clearInterval(timeline);
				}
			}, 2000);
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
		this.resize = function ()
		{
			chart.resize();rly if this element already has a plugin instance
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
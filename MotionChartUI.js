	/* ==========================================================
	 * SOCR MotionCharts v3.0.1
	 * http://socr.googlecode.com
	 * ==========================================================
	 * TODO: Add License type.
	 * @author: Ramy Elkest
	 * ========================================================== */
	 
	 //Temp var. TODO: place in a object oriented position..
	 var keyNames=[], playState, tableChangeFlag = false, keyItems = {}, menu={};
	 
	 var MapEnum = {key:0, x: 1, y:2, size:3, color:4, category: 5};
	 
	/*Set up Window*/
	$('.svg').ready( function() {
		$('.svg').height($('.chart').outerHeight() - $('.timeline').outerHeight());
		
		$('.slider').width($('.timeline').outerWidth(true) - ($('.playpause').outerWidth(true) + $('.speed-control').outerWidth(true) + $('.slide-control').outerWidth(true) + parseInt($('.slider').css('margin-right')) + parseInt($('.slider').css('margin-left')) + 2 )); //TODO: Fix the 2...
						
	});
		
	/* Initilise slider */
	$('.slider').ready( function() {
		$('.slider').slider({
			min: 0,
			max: 1,
			step: 1,
			animate: true,
			change: function(event, ui) { $('.svg').motionchart("updateCurrentIndex",ui.value); }
		});
	});
	/*Initialise speed control slider */
	$('.speed-control-slider').ready( function() {
		$('.speed-control-slider').slider({
			min: 1000,
			max: 6000,
			step: 500,
			orientation: "vertical",
			slide: function(event, ui) { $('.speed-control-slider').tooltip('show');},
			change: function(event, ui) { $('.svg').motionchart("updateSpeed",ui.value);}
		});
	});
	
	/* Initialise Table */
	$('.dataTable').ready( function() {
		var data = [
			["Year", "Kia", "Nissan", "Toyota", "Honda"],
			["2008", 10, 11, 12, 13],
			["2009", 20, 11, 14, 13],
			["2010", 30, 15, 12, 13]
			];
		$('.dataTable').handsontable({
			rows: 10,
			cols: 10,
			minSpareRows: 1,
			minSpareCols: 1,
			onChange: function(data) { if(data) tableChangeFlag = true; }
			});
		$('.dataTable').handsontable("loadData", data);
		//Initialise otion Chart with default data
		$('.svg').motionchart();
		tableChangeFlag = false;
	});
	
	/* Initilise dropdown functionality */
	$('a').click(function (e) {
		e.preventDefault();
		$(this).parent().prev('a').html($(this).text() + ' <b class="caret bottom-up"></b>');
	});
	
	/* Initialise Header buttons functionality */
	$('.header > .btn-group >button').click( function() {
		if( $(this).is('.active')) { return;}
		else {
			switch($(this).index())
			{
				case 0:
					$('#tab0').slideToggle();
					$('#tab1').slideToggle();
					if (tableChangeFlag) 
					{	
						$('.svg').motionchart("dataChange");		//If table was changed then re-bind data and mappings
						tableChangeFlag = false;
					}
					break;
				case 1:
					$('#tab1').slideToggle();
					$('#tab0').slideToggle();
					break;
			}
		}
	});
	
	/* Initialise slider tooltip functionality */
	$('.slider a.ui-slider-handle').ready( function() {
		$('.slider a.ui-slider-handle').tooltip({
			title: function() {return keyNames[$('.slider').slider("value")]; }
		});
	});
	$('.speed-control-slider a.ui-slider-handle').ready( function() {
		$('.speed-control-slider a.ui-slider-handle').tooltip({
			placement: "right",
			title: function() {return ($('.speed-control-slider').slider("value")/1000) + ' sec'; }
		});
	});
	
	/* Initialise Mapping tooltip functionality */
	$('ul.key').parent().ready( function() {
		$('ul.key').parent().tooltip({
			title: "Key",
			placement: "left"
		});
	});
	$('ul.xAxis').parent().ready( function() {
		$('ul.xAxis').parent().tooltip({
			title: "x-Axis",
			placement: "left"
		});
	});
	$('ul.yAxis').parent().ready( function() {
		$('ul.yAxis').parent().tooltip({
			title: "y-Axis",
			placement: "left"
		});
	});
	$('ul.size').parent().ready( function() {
		$('ul.size').parent().tooltip({
			title: "Size",
			placement: "left"
		});
	});
	$('ul.color').parent().ready( function() {
		$('ul.color').parent().tooltip({
			title: "Color",
			placement: "left"
		});
	});
	$('ul.category').parent().ready( function() {
		$('ul.category').parent().tooltip({
			title: "Category",
			placement: "left"
		});
	});
	$('.playpause').ready( function() {
		$('.playpause').tooltip({
			title: "Play/Pause"
		});
	});
	$('.backward-skip').ready( function() {
		$('.backward-skip').tooltip({
			title: "Double click to skip to beggining"
		});
	});
	$('.forward-skip').ready( function() {
		$('.forward-skip').tooltip({
			title: "Double click to skip to end"
		});
	});
	
	/* Initialise Chart resizable funtionality */
	$('.svg').ready( function() {
		$('.svg').resizable({
			minHeight: 200,
			minWidth: 700,
			handles: "se",
			resize: function (event, ui) {
						$('.content, .header').width( $('.svg').width() );
						$('.content').height( $('.svg').height() + $('.timeline').height() );
						
						$('.slider').outerWidth($('.timeline').outerWidth(true) - ($('.playpause').outerWidth(true) + $('.speed-control').outerWidth(true) + $('.slide-control').outerWidth(true) + parseInt($('.slider').css('margin-right')) + parseInt($('.slider').css('margin-left') )));
						
						$('.svg').motionchart("resize");
			}
		});
	});
	
	function setKeyNames( keyNames )
	{
		
		this.keyNames = keyNames;

	}
	function setMappings( mapping )
	{
		
		//Send mapping array to key items
		keyItems.setMapping(mapping);
		//Send mapping array to Menu
		menu.setMapping(mapping);
		//Initialise all dimentions to direct match mapping
		for(var i=0;i<d3.keys(MapEnum).length;i++)
		{
			menu.setMap(i, (i < mapping.length-1) ? i : mapping.length-1);
		}
		//Initialise scales for all dimentions, starting from 1 - end (0 is key and 1 is x)
		for(var i=1;i<d3.keys(MapEnum).length;i++)
		{	menu.setScale(i, "linear");		}
	
		/*
		$('.keyMappings ul.dropdown-menu').each(
			function() {
				$this = $(this);
				// Empty lists
				$(this).empty();
				// Add the mapping keys to all dropdowns 
				for(var i=0; i < mapping.length ;i++)
				{
					$selector = $('<li><a href="#">'+mapping[i]+'</a></li>');
					$(this).append($selector);
				}
				// Bind a click event to all new elements
				$(this).children('li').click(function (e) {
					e.preventDefault();
					$(this).parent().prev('a').html($(this).text() + ' <b class="caret bottom-up"></b>');
					// $(this).parent().data('ID', $(this).index());
					$('.svg').motionchart("updateMappingID", $('.keyMappings ul.dropdown-menu').index($(this).parent()), $(this).index());
					menu.setMap( $('.keyMappings ul.dropdown-menu').index($(this).parent()), $(this).index());
				});
				// DEFAULT: select new dropdown keys in an incremental order
				$('li',this).eq($('.keyMappings ul.dropdown-menu').index(this)).trigger('click');
			});
		*/
	};
	/**
	* keyItems called by context menu
	* Returns an object of the current mapping and callbacks
	**/
	keyItems = {
	
		mapping: [],
		items: {},
		
		setMapping: function(mappings)
		{	this.mapping = mappings;	},
		
		get: function()
		{
			// Set up mappings in context menu
			items = {};																				//Clear current map
			for(var i=0;i<this.mapping.length;i++)															//Add map image to each dimention
			{	items[i] = {name: this.mapping[i], callback: function(key, options) {	menu.setMap($('.context-menu-root>.context-menu-submenu.hover').index(), key);}};		}
			return items;
		},
		
		getByKey: function (MapEnumValue)
		{
			// Set up mappings in context menu
			items = {};																						//Clear current map
			for(var i=0;i<this.mapping.length;i++)															//Add map image to each dimention
			{	items[i] = {name: this.mapping[i], callback: function(key, options) {	menu.setMap(MapEnumValue, key);}};		}
			return items;
		}
	};
	//Stores the current values for mappings scales and colormaps
	menu = {
		mappingsList: [],
		mappings: {},
		scales: {},
		colors: {},
		setMap: function (keyID, mapID)
		{
			menu.mappings[keyID] = this.mappingsList[mapID];
			$('.svg').motionchart("updateMappingID", keyID, mapID);
			menu.setScale(keyID, menu.scales[keyID]);															//Reset scales to previous configuration 
		},
		setScale: function (keyID, scale)
		{	
			menu.scales[keyID] = scale;
			$('.svg').motionchart("updateScales", keyID, scale);
		},
		setColor: function(keyID, color)
		{	menu.colors[keyID] = color;		},
		setMapping: function(mappings)
		{	menu.mappingsList = mappings;	}
	};
	
	//Set axis dropdowns
	// Play/Pause button
	$('.playpause').click(
		function()
		{
			var index = $(".slider").slider("value"),									// Current value of slider (and on svg)
				max = $(".slider").slider("option","max");								// Maximum value of slider (and of key)

			
			if ($(this).hasClass("pause"))												// Pause
			{
				clearInterval(playState);
				$(this).toggleClass("play").toggleClass("pause");
				setTimeout( function() {$(".slider a.ui-slider-handle").tooltip("hide")},1000);
			}
			else if (index == max) { 													// If the slider is already at maximum, show tooltip then return without doing anything.
				$(".slider a.ui-slider-handle").tooltip("show");
				setTimeout( function() {$(".slider a.ui-slider-handle").tooltip("hide")},1000); 
				return; }											
			else {																		//Play
				$(this).toggleClass("play").toggleClass("pause");
				$(".slider a.ui-slider-handle").tooltip("show");
				$(".slider").slider("value", ++index);
				playState = setInterval( function() {
					$(".slider a.ui-slider-handle").tooltip("show");
					index = $(".slider").slider("value");
					if(index == max) { $('.playpause').trigger("click"); }
					else $(".slider").slider("value", ++index);
					}, $('.speed-control-slider').slider("value"));	
			}
		}
	);
	
	// Skip to beginning button
	$('.backward-skip').dblclick( function()
	{
		var index = $(".slider").slider("value"),									// Current value of slider (and on svg)
			min = $(".slider").slider("option","min");								// Minimum value of slider (and of key)

		if (index > min) $('.slider').slider("value", min);
	});
	
	// Previous step button
	$('.backward-skip').click( function()
	{
		var index = $(".slider").slider("value"),									// Current value of slider (and on svg)
			min = $(".slider").slider("option","min");								// Minimum value of slider (and of key)

		if (index > min) $('.slider').slider("value", --index);
	});
		
	// Next step button
	$('.forward-skip').click( function()
	{
		var index = $(".slider").slider("value"),									// Current value of slider (and on svg)
			max = $(".slider").slider("option","max");								// Maximum value of slider (and of key)

		if (index < max) $('.slider').slider("value", ++index);
	});
		
	// Skip to end button
	$('.forward-skip').dblclick( function()
	{
		var index = $(".slider").slider("value"),									// Current value of slider (and on svg)
			max = $(".slider").slider("option","max");								// Maximum value of slider (and of key)

		if (index < max) $('.slider').slider("value", max);
	});
	
	function scaleCallback(key, options) 
	{
		menu.setScale($('.context-menu-root>.context-menu-submenu.hover').index(),key);
	};
	//Overloading scaleCallback function
	function scaleCallback(key, options, mapID)
	{
		menu.setScale(mapID, key);
	};
	
	function colorCallback(key, from, to)
	{
		$('.svg').motionchart("updateColor", from, to);
		menu.setColor(MapEnum.color,key);
	};
	
	$(function(){
	
		//Main Menu
		var settings = {
			selector: '.svg',
			build: function($trigger, event) {
			return {
				callback: function(key, options) {
					var m = "clicked: " + key;
					window.console && console.log(m) || alert(m); 
					console.log(options);
				},
				items: {
					"key":{
						name:"Key",
						items:
							{"map":
								{name:"Map",
								items: keyItems.get()
								}
							}
					},
					"xAxis":{
						name:"X-Axis",
						items:
							{"map":
								{name:"Map",
								items: keyItems.get()
								},
							"scale":
								{name:"Scale",
								items: 
									{"linear": {name: "Linear", callback: scaleCallback},
									 "log": {name: "Log", callback: scaleCallback},
									 "sqrt": {name: "Square Root", callback: scaleCallback},
									 "pow": {name: "Exponential", callback: scaleCallback}
									},
								disabled: $('.svg').motionchart("disableScale", MapEnum.x)
								}
							}
					},
					"yAxis":{
						name:"Y-Axis",
						items:
							{"map":
								{name:"Map",
								items: keyItems.get()
								},
							"scale":
								{name:"Scale",
								items: 
									{"linear": {name: "Linear", callback: scaleCallback},
									 "log": {name: "Log", callback: scaleCallback},
									 "sqrt": {name: "Square Root", callback: scaleCallback},
									 "pow": {name: "Exponential", callback: scaleCallback}
									},
								disabled: $('.svg').motionchart("disableScale", MapEnum.y)
								}
							}
					},
					"size":{
						name:"Size",
						items:
							{"map":
								{name:"Map",
								items: keyItems.get()
								},
							"scale":
								{name:"Scale",
								items: 
									{"linear": {name: "Linear", callback: scaleCallback},
									 "log": {name: "Log", callback: scaleCallback},
									 "sqrt": {name: "Square Root", callback: scaleCallback},
									 "pow": {name: "Exponential", callback: scaleCallback}
									},
								disabled: $('.svg').motionchart("disableScale", MapEnum.size)
								},
							"setsize":
								{name: "Adjust Size",
								className: "set-size"
								}
							}
					},
					"color":{
						name:"Color",
						items:
							{"map":
								{name:"Map",
								items: keyItems.get()
								},
							"scale":
								{name:"Scale",
								items: 
									{"linear": {name: "Linear", callback: scaleCallback},
									 "log": {name: "Log", callback: scaleCallback},
									 "sqrt": {name: "Square Root", callback: scaleCallback},
									 "pow": {name: "Exponential", callback: scaleCallback}
									}
								},
							"setcolor":
								{name: "Adjust Color",
								className: "set-color",
								items:
									{"Red-Blue": {name:"Red-Blue", className:"red2blue", callback: function(key) {colorCallback(key,"rgb(255,0,0)","rgb(0,0,255)");}},
									"Green-Yellow": {name:"Green-Yellow", className:"green2yellow", callback: function(key) {colorCallback(key,"rgb(0,255,0)","rgb(255,255,0)")}}
									}
								}
							}
					},
					"category":{
						name:"Category",
						items:
							{"map":
								{name:"Map",
								items: keyItems.get()
								}
							}
					},
					"sep1": "---------",
					"zoomin": {name: "Zoom In"},
					"zoomout": {name:"Zoom Out"}
				}
			}}
		}
		$.contextMenu(settings);
	
		//X-Axis Menu
		$.contextMenu({
			selector: "text.x.label",
			trigger: "left",
			build: function($trigger, event) {
				return {
					items: keyItems.getByKey(MapEnum.x),
					position: function(opt, x, y){ opt.determinePosition.call(this, opt.$menu); return; },
					determinePosition: function($menu) {
						$menu.css('display', 'block')
							 .position({ my: "right bottom", at: "left bottom", of: this, offset: "-10 -5"})
							 .css('display', 'none')
					}
				}
			}
		});
	
		//Y-Axis Menu
		$.contextMenu({
			selector: "text.y.label",
			trigger: "left",
			build: function($trigger, event) {
				return {
					items: keyItems.getByKey(MapEnum.y),
					position: function(opt, x, y){ opt.determinePosition.call(this, opt.$menu); return; },
					determinePosition: function($menu) {
						$menu.css('display', 'block')
							 .position({ my: "left top", at: "right top", of: this, offset: "-5 0"})
							 .css('display', 'none')
					}
				}
			}
		});
		
		//Sliding Popover Menu
		/**
		*	Note: Class name has to be MapEnum.$name+'Map', so x would be xMap and color would be colorMap
		*	These elements (td) must only have one class.
		**/
		$.contextMenu({
			selector: ".keyMap, .xMap, .yMap, .sizeMap, .colorMap, .categoryMap",
			trigger: "left",
			build: function($trigger, event) {
			
				var mapID = MapEnum[$trigger.prop('class').replace('Map','')];
				var selectedItems;
				selectedItems = keyItems.getByKey(mapID);
				
				return {
					items: selectedItems,
					position: function(opt, x, y){ opt.determinePosition.call(this, opt.$menu); return; },
					determinePosition: function($menu) {
						console.log($trigger);
						$menu.css('display', 'block')
							 .position({ my: "left top", at: "left bottom", of: this, offset: "5 0"})
							 .css('display', 'none');
					},
					events: {hide: function(opt) {$trigger.text(menu.mappings[mapID])}}//TODO: Create Getters
				}
			}
		});
		
		//Sliding Popover Menu
		/**
		*	Note: Class name has to be MapEnum.$name+'Map', so x would be xScale and color would be colorScale
		*	These elements (td) must only have one class.
		**/
		$.contextMenu({
			selector: ".xScale, .yScale, .sizeScale, .colorScale",
			trigger: "left",
			build: function($trigger, event) {
			
				var mapID = MapEnum[$trigger.prop('class').replace('Scale','')];
				var selectedItems = {"linear": {name: "Linear", callback: function(key, options) {	scaleCallback(key, options, mapID); }},
									 "log": {name: "Log", callback: function(key, options) {	scaleCallback(key, options, mapID); }},
									 "sqrt": {name: "Square Root", callback: function(key, options) {	scaleCallback(key, options, mapID); }},
									 "pow": {name: "Exponential", callback: function(key, options) {	scaleCallback(key, options, mapID); }}		//TODO Change pow to exponential in Test
									};
				
				return {
					items: selectedItems,
					position: function(opt, x, y){ opt.determinePosition.call(this, opt.$menu); return; },
					determinePosition: function($menu) {
						console.log($trigger);
						$menu.css('display', 'block')
							 .position({ my: "left top", at: "right top", of: this, offset: "-5 0"})
							 .css('display', 'none');
					},
					events: {hide: function(opt) {$trigger.text(menu.scales[mapID])}}// TODO: Create Getters
				}
			}
		});
	});
	/*
	$('li.set-size').on("hover",function(){});
	*/
	
	// $('.myMenuTestSub').mouseenter( function(e)
	// {
		// console.log($(this).has(e.target));
	// });
				
	$('.myMenuTestSub').mouseenter( function(e)
	{
		
		var insert = '<table class="mappings" cellpadding="10" style="width:100%;">'+
			'<tr><td></td><td class="cat">Key</td><td class="cat">X-Axis</td><td class="cat">Y-Axis</td><td class="cat">Size</td><td class="cat">Color</td><td class="cat">Category</td></tr>'+
			'<tr><td class="cat">Mappings</td><td class="keyMap">'+menu.mappings[MapEnum.key]+'</td><td class="xMap">'+menu.mappings[MapEnum.x]+'</td><td class="yMap">'+menu.mappings[MapEnum.y]+'</td>'+
			'<td class="sizeMap">'+menu.mappings[MapEnum.size]+'</td><td class="colorMap">'+menu.mappings[MapEnum.color]+'</td><td class="categoryMap">'+menu.mappings[MapEnum.category]+'</td></tr>'+
			'<tr><td class="cat">Scaling</td><td></td><td class="xScale">'+menu.scales[MapEnum.x]+'</td><td class="yScale">'+menu.scales[MapEnum.y]+'</td><td class="sizeScale">'+menu.scales[MapEnum.size]+'</td>'+
			'<td class="colorScale">'+menu.scales[MapEnum.color]+'</td><td></td></tr>'+
			'<tr><td class="cat">Color Map</td><td></td><td></td><td></td><td></td><td class="colorColorMap">'+menu.colors[MapEnum.color]+'</td><td></td></tr></table>';	
			
		if($(this).has(e.target).length != 0) {return;}
		
		$(this).children('span').html(insert).show();
		
		$(this).animate(
		{
			width: '64%',
			padding: '1% 4% 2% 0%'//,
			//height: 'auto'
		}, 500);
	});
	
	$('.myMenuTestSub').mouseleave( function(e)
	{
		if($(this).has(e.target).length != 0) {return;}
	
		$(this).animate(
		{
			width: '1px',
			padding: '1% 6px 2% 0%'//,
			//height: '152px'
		}, 500,
		function()
		{
			$(this).children('span').hide();
		});
	
	});

	
	
	
	
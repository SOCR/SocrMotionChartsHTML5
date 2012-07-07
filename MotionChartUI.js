	/* ==========================================================
	 * SOCR MotionCharts v3.0.1
	 * http://socr.googlecode.com
	 * ==========================================================
	 * TODO: Add License type.
	 * @author: Ramy Elkest
	 * ========================================================== */
	 

	/* RES	 //Temp var. TODO: place in a object oriented position..
	 var keyNames=[], playState, tableChangeFlag = false;
	 
	/*Set up Windowvg').ready( function() {
		$('.columnHolder').height( $('.chart').height() - $('.timeline').height() );
		$('.middleColumn').width( $('.columnHolder').width() - $('.y-axis').outerWidth() );
		var newHeight = $('.middleColumn').innerHeight() - $('.x-axis').innerHeight();
		$('.svg').height(newHeight);
		$('.y-axis').height(newHeight);
	});
	
	/* Ali		gn y-axis vertically */
	$('.vertical').ready( function() {
		var temp = $('.vertical').height();
		$('.vertical').height($('.vertical').width());
		$('.vertical').width(temp);
		$('.vertical').offset($('.vertical').parent().offset());
		$('.vertical').css('visibility','visible');
	});
		
	/* Initilise slider */
	$('.slider').ready( function() {
		$('.slider').slider({
			min: 0,
			max: 1,
			step: 1,
			animate: true 	
			// slide: function() //2000,
			trigger: "manual",
			slide: function(event, ui) {}, }, //TODO: slides when user clicks on play
			change: function(event, ui) { $('.svg').motionchart("updateCurrentIndex",ui.value} */
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
			minSpareCols: 1
			});
		$('.dataTable').handsontable("loadData", da,
			onChange: function(data) { if(data) tableChangeFlag = true; }
			});
		$('.dataTable').handsontable("loadData", data);
		//Initialise otion Chart with default data
		$('.svg').motionchart();
		tableChangeFlag = false).click(function (e) {
		e.preventDefault();
		$(this).parent().prev('a').html($(this).text() + ' <b class="caret bottom-up"></b>');
	});
	
	/* Initialise Header buttons functionality */
	$('.header > button').click( function() {
		if( $(this).is('.active')) { return;}
		else {
			switch($(this).index())
			{
				case 0:
					$('#tab0').slideToggle();
					$('#tab1').slideToggle();
					update();
					break;
				case 1:
					$('#tab1').slideToggle();
					//$if (tableChangeFlag) 
					{	
						$('.svg').motionchart("dataChange");		//If table was changed then re-bind data and mappings
						tableChangeFlag = false;
					}lideToggle();
					break;
			}
		}
	});
	
	/* Initialise slider tooltip functionality */
	$('a.ui-slider-handle').ready( function() {
		$('a.ui-slider-handle').tooltip({
			title: "key percentage"
		});
	});
	$('ul.key').parent().ready( function() {
		$('ul.key')function() {return $('keyNames[$('.slider').slider("value")]
		});
	});
	/* Initialise Mapping tooltip functionality */ "Key",
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
	
	/* Initialise Chart resizable funtionality */
	$('.svg').ready( function() {
		$('.svg').resizable({
			animate: true
		});
	}$('.playpause').ready( function() {
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
			title: "Double click to skip to endte: true
		});
	});
	
	function setMappings( mapping )
	{
		$('.keyMappings ul.dropdown-menu').each(
			function() {
				// EmpminHeight: 200,
			minWidth: 700,
			resize: function (event, ui) {
						$('.y-axis').height( $('.svg').height() );
						$('.vertical').width( $('.y-axis').height() );
						$('.vertical').offset($('.vertical').parent().offset());
						$('.middleColumn').height( $('.svg').height() + $('.x-axis').outerHeight() );
						$('.middleColumn').width( $('.svg').width() );
						$('.columnHolder').height( $('.middleColumn').height() );
						$('.columnHolder').width( $('.middleColumn').width() + $('.y-axis').outerWidth() );
						$('.chart').width( $('.columnHolder').width() );
						$('.table').width( $('.columnHolder').width() );
						$('.content').height( $('.columnHolder').height() + $('.timeline').height() );
						$('.content').width( $('.columnHolder').width() + $('.rightColumn').width() );
						
						$('.svg').motionchart("resize");
			}
		});
	});
	
	function setKeyNames( keyNames )
	{
		this.keyNames = keyNames;
	}
				// Add the mapping keys to all dropdowns 
				for(var i=0; i < mapping.length ;i++)
				{
				$this = $(this);{
					$selector = $('<li><a href="#">'+mapping[i]+'</a></li>').data('mappingID', i);
					$(this).append($selector);
				}
				// Bind a click event to all new elements
				$(this).children('li').clicke.preventDefault();
					$(this).parent().prev('a').html($(this).text() + ' <b class="caret bottom-up"></b>');
					$(this).parent().data('ID', $(this).data('mappingID'));
				});
				// DEFAULT: select new dropdown keys in an incremental order
				$('li',this).eq($('.keyMappings ul.dropdown-menu'index());
					$('.svg').motionchart("updateMappingID", $('.keyMappings ul.dropdown-menu').index($(this).parent()), $(this).index(rigger('click');
			});
	}
	//TODO: This is just a hack to show chart update
	$('.update').click(function() {$('.svg').motionchart(); });
	
	
	
	
	
	
	
	
	
	EMP HACK
	$('.update').click(funSet axis dropdowns
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
				setTimeout( function() {$("a.ui-slider-handle").tooltip("hide")},1000);
			}
			else if (index == max) { return; }											// If the slider is already at maximum, return without doing anything.
			else {																		//Play
				$(this).toggleClass("play").toggleClass("pause");
				$("a.ui-slider-handle").tooltip("show");
				$(".slider").slider("value", ++index);
				playState = setInterval( function() {
					$("a.ui-slider-handle").tooltip("show");
					index = $(".slider").slider("value");
					if(index == max) { $('.playpause').trigger("click"); }
					else $(".slider").slider("value", ++index);
					}, 2000);															//TODO: Reeplace 2000 with value from speed-control
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
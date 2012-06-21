	/* ==========================================================
	 * SOCR MotionCharts v3.0.1
	 * http://socr.googlecode.com
	 * ==========================================================
	 * TODO: Add License type.
	 * @author: Ramy Elkest
	 * ========================================================== */
	 

	/* RESIZE WINDOW */
	$('.svg').ready( function() {
		$('.columnHolder').height( $('.chart').height() - $('.timeline').height() );
		$('.middleColumn').width( $('.columnHolder').width() - $('.y-axis').outerWidth() );
		var newHeight = $('.middleColumn').innerHeight() - $('.x-axis').innerHeight();
		$('.svg').height(newHeight);
		$('.y-axis').height(newHeight);
	});
	
	/* Align y-axis vertically */
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
			// slide: function() //TODO: slides when user clicks on play
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
			minSpareCols: 1
			});
		$('.dataTable').handsontable("loadData", data);
	});
	
	/* Initilise dropdown functionality */
	$('a').click(function (e) {
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
					$('#tab0').slideToggle();
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
	
	/* Initialise Chart resizable funtionality */
	$('.svg').ready( function() {
		$('.svg').resizable({
			animate: true
		});
	});
	
	function setMappings( mapping )
	{
		$('.keyMappings ul.dropdown-menu').each(
			function() {
				// Empty lists
				$(this).empty();
				// Add the mapping keys to all dropdowns 
				for(var i=0; i < mapping.length ;i++)
				{
					$selector = $('<li><a href="#">'+mapping[i]+'</a></li>').data('mappingID', i);
					$(this).append($selector);
				}
				// Bind a click event to all new elements
				$(this).children('li').click(function (e) {
					e.preventDefault();
					$(this).parent().prev('a').html($(this).text() + ' <b class="caret bottom-up"></b>');
					$(this).parent().data('ID', $(this).data('mappingID'));
				});
				// DEFAULT: select new dropdown keys in an incremental order
				$('li',this).eq($('.keyMappings ul.dropdown-menu').index(this)).trigger('click');
			});
	}
	//TODO: This is just a hack to show chart update
	$('.update').click(function() {$('.svg').motionchart(); });
	
	
	
	
	
	
	
	
	
	
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
			["", "Kia", "Nissan", "Toyota", "Honda"],
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
	$('li > ul > li').not('.divider').click(function (e) {
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
	
	
	
	
	
	
	
	
	
	
	
	
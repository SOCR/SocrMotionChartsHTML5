# SOCR  Motion Chart HTML5 Documentation

###Introduction###
Motion Chart HTML5 Documentation is a detailed documentation of [[SOCR]]'s Motion Chart jQuery plugin.

###Overview###
The jQuery plugin was designed with a [[MVC]] structure in mind. It is not strictly enforced due to jQuery's plugins’ callback nature. Nevertheless it helps organise different aspects of the plugin. The core components of Motion Chart are Priv, View, Controller and Chart. Additionally there’s a settings object and motionchart function.

###Priv###
Contains Motion Chart’s private variables

* settings: Inherits options from object settings or (if specified) user options
* dom: jQuery objects

###View###
####Overview####
The view object constructs and maintains Motion Chart’s DOM. This includes constructing sliders, tables, tooltips, menus and resizing components.

####Components####
* Build: Constructs the DOM skeleton for the motionchart instance and stores teh jquery references in priv.dom to minimize DOM lookups.
* Sliders: Creates two sliders: 
** Documentation available on http://jqueryui.com/demos/slider/
** mainSlider (used to control the chart)
*** min: always set to 0
*** max: initialised to 1, set to the maximum key length during axis key change
*** step: always set to 1
*** animate: initialised to priv.settings.speed, updated when speedSlider is changed
*** change: when the slider is altered chart.update is called with the slider’s value as the parameter. Meaning the slider triggers the chart to update to a new key
** speedSlider (used to control the motion speed)
*** min: initialised to priv.settings.minSpeed, defaulted at 1000
*** max: initialised to priv.settings.maxSpeed, defaulted at 6000
*** step: always set to 500
*** orientation: vertical
*** slide: everytime the slider is triggered to slide, show tooltip (which contains the speed value) Might be removed
*** change: when the slider is altered update chart’s duration and mainSlider’s animation speed

* table: Constructs a handsontable instance in priv.dom.$table
** rows: 10, initial number of rows
** cols: 10, initial number of columns
** minSpareRows: 1, minimum number of empty rows to maintain at the end
** min SpareCols: 1, minimum number of empty columns to maintain at the end
** contextMenu: true, allow right click options
** onChange: on table change update chart data and reset mappings MOVE TO TABCHANGE

* tooltips
** mainSlider handler: displays slider value
** play/pause button: displays info.
** backward button: displays info.
** forward button: displays info.

* initWindow
** If container is smaller than priv.settings.minWidth/minHeight, resizes container to priv.settings.minWidth/minHeight respectively
** Resizes dom components from the top ($content) down ($play)

* resize: Applies resizable plugin to $svg
** minHeight: priv.settings.minHeight, minimum $svg height
** minWidth: priv.settings.minWidth, minimum $svg width
** handles: se, place a handle only on the south east (bottom right) corner
** resize: when resized
*** resizes the dom from the bottom ($svg) up (container)
*** calls chart.resize() to resize the SVG element including axes and nodes’ positioning

* Context Menu: Initialises all Context menus
** $svg context menu: Covers all mappings, scales, colormaps and Save As Image
*** selector: .svg, bind context menu to .svg
*** trigger: none, we will create a custom trigger (right-click) in controller.contextmenu to bind the trigger to specific motionchart instances
*** build: returns object containing list of menu elements and callbacks
*** items:
****map: view.keyItems.getMapItems() passed through $trigger.data(“items”)
****scale :
***** items: linear - log (logarithm) - sqrt (square root) - exponential (squared) which is mapped in a switch in chart.setScale(scale)
*****  callback: controller.scaleCallback function passed through $trigger.data(“scaleCallback”)
**** setcolor: view.keyItems.getColorItems() passed through $trigger.data("colorItems")
** X-Axis label menu: Covers x-axis mappings only
** Y-Axis label menu: Covers y-axis mappings only
** Interactive Menu menu: Covers mappings, scales and colormaps separately

*saveAsImage

###Controller###
####Overview####
The controller handles all the user interactions within a Motion Chart instance. This includes buttons and menus.

####Components####
* buttons
** $tabs (Chart/Data)
*** When clicked toggles $chart and $table
*** When going to chart updateData() and setMappings() are called to rebind data and reset mappings
** $play
*** if $play has class ‘pause’
**** Stop ongoing animation (playState interval
**** hide tooltip after 1000 ms
*** if mainSlider handler is at the end
**** Display the tooltip for 1000 ms and do nothing
*** Otherwise (play the animation)
**** Add class ‘pause’
**** Display tooltip
**** increment mainSlider’s value (which causes chart to animate to the next key)
**** set playState interval (repeats every speedSlider value)
***** Display tooltip
***** Increment mainSlider’s value (which causes chart to animate to the next key) 
***** if mainSlider handler is at the end then trigger a click to emulate pause and stop the animation (playState interval)
** $about
*** When clicked goto SOCR wikipage
** .backward-skip
*** when clicked decrements mainSlider’s value (which causes chart to animate to the previous key)
*** when double clicked changes mainSlider’s value to it’s minimum (which causes the chart to animate to the first key)
** .forward-skip
*** when clicked increments mainSlider’s value (which causes chart to animate to the next key)
*** when double clicked changes mainSlider’s value to it’s maximum (which causes the chart to animate to the last key)

* contextMenu
** Custom triggers are created here to control the menus per motionchart instance
** $svg
** 

* menu

###Chart###
####Overview####
The chart object handles everything related to d3/SVG. This includes the axes, bubbles, text, mappings, scalings and so on.

####Components####

* init: Initialises chart components
** Creates SVG to span container
** Create x and y axes bar and text
* resize:
** Called when container is being resized
** Get new dimentions and update the SVG
** Update the x and y axes and scales maintaining any ordinal values (which uses rangePoints as opposed to range)
** Update the x axis label position
** Finally remap the circles to the axes. Note that this is done directly rather than calling chart.update to ensure swift movement as resize is called frequently during resizing.
* updateData:
** Extracts data from handsontable using the custom (not included in the default library) function ‘getNonEmptyData’. Important note: getNonEmptyData returns the data from row 0, column 0 to the last row/column with data in them (on the row:0 column:0 axes). This function can be refined to identify a complete matrix even if pasted in the middle of the table.
** Parses data (nest array) into CSV
** nests data by key. In other words transforms the CSV into an associative array with (mapping) keys being its (associative) keys.
** Creates NaNMap based on the first row of values
* update: 
** If parameter keyIndex is passed then bind data for that particular index to nodes
** Enter: Create and map nodes for data that aren’t mapped
** update: Transition, with duration value of the speed slider, the nodes linearly move to their new respective x and y position while the circles (within the nodes) transition to their new radius and color.
** exit: Remove any nodes that are not mapped to data. Let radius go to 0 before removing for a nice visual effect
** Select all svg:text from nodes and update their text. Note only nodes that have been clicked on will have svg:text elements in them.
** Call popover on all circles, explained in a different point.
** Add click event to circles
*** When a node is clicked and selected append a svg:text element with category
*** if node is already selected then deselect and remove svg:text element.
*** Note the svg:text is being transitioned along with the node and, maintaining its position in the centre of the circle.
* setPopover 
** initialise a bootstrap popover for every circle with relevant data
*** placement: Where the popover will appear. Right if node is less than ¾ the chart width and left otherwise.
*** title: Category if defined or “Data” otherwise.
*** content: display the data bind to the node (accessed through node.datum() )
* updateMapping:
** Updates individual mapping
** switch (keyID)
*** MapEnum.key
* updateScale
* updateColorRange
* isNaNMap

###Design Decisions###



###Options###

###Methods###

###Known Issues / TODO###
* Draw smaller circles on top of larger ones
* Save data associated with selected circle
** Open new window
** Create handsontable
** Get data associated with circle
** Export data into handsontable
* Add set circle size in right click menu (commented out).
* Load CSV/Excel file directly to handsontable and into chart.
* parse dates in addition to string/number

###Conclusion###


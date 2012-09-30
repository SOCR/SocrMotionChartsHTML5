# SOCR HTML5 Motion Chart

Motion Chart is a jQuery plugin designed to render dynamic bubble charts and allows efficient and interactive exploration and visualization of longitudinal multivariate Data.

You can see a live example on http://socr.ucla.edu/htmls/HTML5/MotionChart/ or fork an example on [JSFiddle--Todo](http://jsfiddle.net/).

## How-To

First, include all the dependencies:

```html
<!--StyleSheets-->
<link href="MotionChartCss.css" rel="stylesheet">
<link href="bootstrap/css/bootstrap.css" rel="stylesheet">
<link href="jquery-handsontable/jquery.handsontable.css" rel="stylesheet">
<link href="jquery-ui-1.8.20/css/ui-lightness/jquery-ui-1.8.20.custom.css" rel="stylesheet">
<link href="jquery-handsontable/lib/jQuery-contextMenu/jquery.contextMenu.css" rel="stylesheet">
<!--Scripts-->
<script src="jquery-ui-1.8.20/js/jquery-1.7.2.min.js"></script>
<script src="bootstrap/js/bootstrap.js"></script>
<script src="jquery-ui-1.8.20/js/jquery-ui-1.8.20.custom.min.js"></script>
<script src="jquery-handsontable/jquery.handsontable.js"></script>
<script src="jquery-handsontable/lib/jquery.autoresize.js"></script>
<script src="jquery-handsontable/lib/jQuery-contextMenu/jquery.ui.position.js"></script>
<script src="jquery-handsontable/lib/jQuery-contextMenu/jquery.contextMenu.js"></script>
<script src="d3/d3.v2.js"></script> 
<script src="canvg/rgbcolor.js"></script> 
<script src="canvg/canvg.js"></script> 
<script src="jquery.motionchart.js"></script>
```

Run `motionchart()` on an empty div to initialise a motionchart with default settings.

Or pass options when calling the constructor for a customised instance.

```html
<div id="dataTable" class="dataTable"></div>
<script>
 $('.motionchart').motionchart({
							title: "My Demo",
							mappings: {key: 1, x: 2, y: 3, size: 5, color: 4, category: 0},
							colorPalette: {	"Blue-Red": {from: "rgb(0,0,255)", to: "rgb(255,0,0)"}},
							color: "Blue-Red"
						});
</script>
```

## Changelog

MotionChart-v3.1 - First official public release.

## Methods

  Option                                                                               | Role        | Description
---------------------------------------------------------------------------------------|-------------|-------------
 motionchart(options)                                                                  | Constructor | Accepts optional configuration object. See **Options**.
 motionchart('title',myTitle)														   | Method		 | Updates the title.
 motionchart('data',myData)															   | Method		 | Loads new data into data table and updates the chart components accordingly.
 motionchart('destroy')																   | Method		 | Destructs the motion chart instance, recommended to free up memory.
 
## Options

The table below presents configuration options that are interpreted by `motionchart()` constructor:

  Option                 | Type                           | Default												 		   | Description
-------------------------|--------------------------------|----------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------
 `title`                 | String                         | SOCR HTML5 Motion Chart         						       | Defines the initial title
 `data`                  | Object                         | see **Data**    											   | Initial data loaded in the chart and data table
 `minWidth`				 | Number						  | 700															   | Minimum width in pixels the users can shrink the instance to. **Note:** A value too small could cause the instance to lose it's structure.
 `minHeight`			 | Number						  | 300															   | Minimum height in pixels the users can shrink the instance to. **Note:** A value too small could cause the instance to lose it's structure.
 `speed`				 | Number						  | 3000														   | Initial speed of the speed slider. **Note:** Value must be between 1000 and 6000.
 `colorPalette`			 | Object						  | see **colorPalette**										   | Defines the color palette for the user to choose from.
 `color`				 | String						  | Red-Blue													   | Defines the circles' initial color gradient. **Note:** The value has to be from the set of keys in colorPalette.
 `mappings`				 | Object						  | {key:0, x:1, y:2, size:3, color:4, category:0}				   | Defines the mapping from chart component to data column. See **Mappings and Scalings**.
 `scalings`				 | Object						  | {x:"linear", y:"linear", size:"linear", color:"linear"}		   | Defines the initial scaling settings for the chart components. See **Mappings and Scalings**.

### Data

The Data passed can be any table/spreadsheet formatted as a nested array. The data is inserted in the data table and reflected in the chart.

The data should have the following structure.

```
[
	[ColumnName1, ColumnName2, ... , ColumnNameN],
	[Row1Value1, Row1Value2, ... , Row1ValueN],
	[Row2Value1, Row2Value2, ... , Row2ValueN],
	...										,
	[RowNValue1, RowNValue2, ... , RowNValueN]
]
```

The default option, taken from [Warpech's handsontable](https://github.com/warpech/jquery-handsontable), is

```
[
	["Year", "Kia", "Nissan", "Toyota", "Honda"],
	["2008", 10, 11, 12, 13],
	["2009", 20, 11, 14, 13],
	["2010", 30, 15, 12, 13]
]
```

### Color and ColorPalette

Color Palette is an extensible Object that pre-defines color gradients from which the user can choose.

The color gradients are used as scale to represent the difference/similarity between circles' values.

Color is simply a key name for one of the values in colorPalette.

The colorPalette object's format is as follows

```
{ 
	Color1Name: { from: "rgb(R,G,B)", to: "rgb(R,G,B)" },
	Color2Name: { from: "rgb(R,G,B)", to: "rgb(R,G,B)" },
	...													,
	ColorNName: { from: "rgb(R,G,B)", to: "rgb(R,G,B)" }
}
```
Where R,G,B are numbers from 0-255 representing the intensity of Red, Green, Blue respectively.

The default option is

```
{
	"Red-Blue": {
		from: "rgb(255,0,0)",
		to: "rgb(0,0,255)"
	},
	"Green-Yellow": {
		from: "rgb(0,255,0)",
		to: "rgb(0,255,255)"
	}
}
```
**Note:** The list of default options may be expanded in future revisions.

**Note:** When passing a colorPalette it is extended (added to) to the existing default option. This might be changed in future revisions.

Color is simply a value from the range of values `Color1Name, Color2Name, ... ,ColorNName`.

The default option is `"Red-Blue"`

## Mappings and Scalings

Mappings and Scalings are two objects that map chart components to data columns (via column numbers).

Mappings defines which column the `key`, `x`, `y`, `size`, `color`, `category` should represent.

Chart Dimensions:
* `key`: Defines what the chart should transition upon.
* `x`: Defines the x-axis data mapping.
* `y`: Defines the y-axis data mapping.
* `size`: Defines the size of the circles' data mapping.
* `color`: Defines the color of the circles' data mapping.
* `color`: Defines the name of the circles' data mapping.

Scaling Types:
* `linear`: Defines a linear scale `x->y`.
* `sqrt`: Defines a square root scale `x->y^(1/2)`.
* `log`: Defines a logarithmic scale `x->log(y)`.
* `exponential`: Defines a polynomial scale `x->y^2`. **Note:** To be changed to 'poly' in future revisions.

Mappings object should be in the following format `{key:N, x:N, y:N, size:N, color:N, category:N}`
Where N is a number from 0 to (the number of columns - 1) and all components are optional.

Mappings default option is

```
{
	key: 0,
	x: 1,
	y: 2,
	size: 3,
	color: 4,
	category: 0
}
```
Given that the default data column length is 5.

**Note:** There is an internal check on the maximum data column length where a number larger would be capped to data column length - 1.

Scalings object should be in the following format `{x:SCALE_TYPE, y:SCALE_TYPE, size:SCALE_TYPE, color:SCALE_TYPE}`.
Where SCALE_TYPE is a string with one of the scaling type values noted above and all components are optional.

Scalings default option is

```
{
	x: "linear",
	y: "linear",
	size: "linear",
	color: "linear"
}
```
**Note:** Scalings is currently case sensitive. This might be changed in future revisions.

## License 

Copyright (c) 2012 Ramy Elkest &lt;ramyelkest@gmail.com&gt;

**The MIT License**
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**The LGPL License***

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
var addSVG = function(tag, attrs) {
    var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs) {
        el.setAttribute(k, attrs[k]);
    }
    return el;
}

rect = function(params, domID) {
    document.getElementById(domID).appendChild(addSVG("rect", params)); 
}

line = function(params, domID) {
	document.getElementById(domID).appendChild(addSVG("line", params));	
}

polygon = function(params, domID) {
	document.getElementById(domID).appendChild(addSVG("polygon", params));	
}

randomID = function() {
	return Math.floor(Math.random()*Number.MAX_SAFE_INTEGER);
}

drawLine = function(start, end, stroke, width, domID, id, dashed, arrow, dashArray) {
	if (width == null) {
		width = 1
	}
	if (arrow == null) {
		arrow = false
	}
	if (dashed == null) {
		dashed = false
	}
	if (dashArray == null) {
		dashArray = "4 2"
	}
	line({
		x1: start[0],
		y1: start[1],
		x2: end[0],
		y2: end[1],
		stroke: stroke,
		"transform": "rotate(0 0 0)",
		"stroke-width": width,
		"stroke-dasharray": dashed ? dashArray : "0",
		"marker-end" : arrow ? "url(#arrow)" : "none",
		id: (id == null) ? randomID(): id
	}, domID);
}

drawPolygon = function(coords, fill, domID, strokeWidth) {
	if (strokeWidth == null) {
		strokeWidth = 0
	}
	polygon( {
		points: coords.join(" "),
		style: "fill:" + fill +";stroke:" + fill + ";stroke-width:" + strokeWidth
	}, domID)
}

drawRectangle = function(coord, width, height, fill, stroke, domID, id) {
        rect({
            x: coord[0],
            y: coord[1],
            width: width,
            height: height,
            stroke: stroke,
            fill: fill,
            style: "stroke-width:1;",
            id: id
        }, domID);  
}

$( document ).ready(function() {

	render = function() {
		let drawBorder = false
		let zoom = 2+Math.ceil(24*Math.random())
		$("#logo-gen-main").empty()

		let width = $("#logo-gen-main").width()
		let numSquares = Math.min(Math.sqrt(width),zoom)
		let dim = width/numSquares
		
		let height = $("#logo-gen-main").height()
		height = height - height%dim

		if (drawBorder) {

			drawLine([0,0], [width,0], "rgba(0,0,0,0.2)", 1, "logo-gen-main")
			drawLine([0,0], [0,height], "rgba(0,0,0,0.2)", 1, "logo-gen-main")
			drawLine([width,0], [width,height], "rgba(0,0,0,0.2)", 1, "logo-gen-main")
			drawLine([0,height], [width,height], "rgba(0,0,0,0)", 1, "logo-gen-main")

			for (let i=0; i<numSquares; i++) {
				drawLine([i*dim,0], [i*dim,height], "rgba(0,0,0,0.05)", 1, "logo-gen-main")
				drawLine([0,i*dim], [width,i*dim], "rgba(0,0,0,0.05)", 1, "logo-gen-main")
			}

		}

		for (let i=0; i<numSquares; i++) {
			for (let j=0; j<Math.min(numSquares, height/dim); j++) {
				let dice = Math.random()
				if (dice < 0.2) {
					drawPolygon([[i*dim,j*dim],[(i+1)*dim,j*dim],[(i+1)*dim,(j+1)*dim]], "#000",  "logo-gen-main",1)
				} else if (dice < 0.4) {
					drawPolygon([[i*dim,j*dim],[i*dim,(j+1)*dim],[(i+1)*dim,j*dim]], "#000",  "logo-gen-main",1)
				} else if (dice < 0.6) {
					drawPolygon([[i*dim,j*dim],[i*dim,(j+1)*dim],[(i+1)*dim,(j+1)*dim], [(i+1)*dim, j*dim]], "#000",  "logo-gen-main",1)
				} else if (dice < 0.8) {
					drawPolygon([[i*dim,j*dim],[i*dim,(j+1)*dim],[(i+1)*dim,(j+1)*dim], [(i+1)*dim, j*dim]], "#1E72D0",  "logo-gen-main",1)
				}
			}
		}	
	}
	
	render()
	setInterval(render,1500)


});
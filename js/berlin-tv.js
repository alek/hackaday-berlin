let thresholdA = 100
let thresholdB = 100
let maxDice = 76
let vScroll = 0
let hScroll = 0

let iteration = 0

function setPixel(imageData, x, y, r, g, b, a) {
    var index = 4 * (x + y * imageData.width);
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}

function render(img, canvas, ctx, offset) {

		ctx.drawImage(img, offset, 0);
		let id = ctx.getImageData(0, 0, canvas.width, canvas.height);	
		let pixels = id.data
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		let dice = Math.floor(Math.random()*maxDice)
		for (let i=0; i<canvas.height; i++) {
			for (let j=0; j<canvas.width; j++) {
				let off = (i * id.width + j) * 4;
				if (pixels[off] > dice && pixels[off+2] > thresholdA + thresholdB*Math.random()) {									
					setPixel(id,j, i, pixels[off], pixels[off+1],pixels[off+2],pixels[off+3])
				} else {
					setPixel(id,j, i, 0, 0, 0, 0)
				}
			}
		}
		ctx.putImageData(id, (iteration*hScroll)%1200, (iteration*vScroll)%800);		
		iteration++
}

function inputEventHandler(el) {
	let val = parseInt(el.value)
	switch(el.id) {
		case "knob-0":
			vScroll = val
			break
		case "knob-1":
			hScroll = val
			break
		case "knob-2":
			thresholdA = val
			break
		case "knob-3":
			thresholdB = val
			break
		case "knob-4":
			maxDice = val
			break
	}
}

function changeEventHandler(el) {
}

$( document ).ready(function() {

	var img = new Image();	
	img.src = "img/mess.png";
	img.onload = function() {
		const canvas = document.getElementById("canvas");		
		const container = document.getElementById('container');
		canvas.width = container.clientWidth;
		canvas.height = 800;
		let offset = 0;
		if (canvas.width < 1259) {
			offset = canvas.width - 1259
		} else if (canvas.width > 1400 && canvas.width < 1800) {
			offset = canvas.width - 1400
		} else if (canvas.width > 1800) {
			offset = Math.min(300, canvas.width - 1600)
		}

		const ctx = canvas.getContext("2d");
		render(img,canvas, ctx, offset)
		setInterval(function() { render(img, canvas, ctx, offset) }, 75)
		$("#knob-control").css("display", "flex")
	}

	for (let i=0; i<schedule.length; i++) {
		let entry = $('<div></div>').addClass("talk-entry");

		let head = $('<div></div>').addClass("talk-head");
		head.append($('<h5>' + schedule[i]["time"] + '</h5>'))
		head.append($('<h2>' + schedule[i]["title"] + '</h2>'))
		head.append($('<h3>' + schedule[i]["speaker"] + '</h3>'))
		
		let parallel = $('<div></div>').addClass("parallel");
		let who = $('<div></div>').addClass("bio");
		who.append($('<img></img>').attr({ 'src':  schedule[i]["headshot"], 'height': '200px' } ))
		who.append($('<div class="speaker">' + schedule[i]["about"] + '</div>'))	

		let desc = $('<div></div>').addClass("description");
		desc.append('<p>' + schedule[i]["description"]  + "</p>")

		if (i%2 == 0) {
			parallel.append(desc)
			parallel.append(who)
		} else {
			// head.addClass("right")
			parallel.append(who)
			desc.addClass("right-desc")
			parallel.append(desc)
		}
		entry.append(head)
		entry.append(parallel)
		$("#talks-container").append(entry)
	}
});
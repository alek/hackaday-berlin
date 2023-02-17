let iteration = 0
let colors = ["#0061D6", "#262626", "#313131", "#000"]

function randomColor() {
	return colors[Math.floor(Math.random()*colors.length)]
}

function setPixel(imageData, x, y, r, g, b, a) {
    var index = 4 * (x + y * imageData.width);
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}

function render(img, canvas, ctx) {

		ctx.drawImage(img, 0, 0);
		let id = ctx.getImageData(0, 0, canvas.width, canvas.height);	
		let pixels = id.data
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = 'red';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		let dice = 2 + iteration%3
		for (let i=0; i<canvas.height; i++) {
			for (let j=0; j<canvas.width; j++) {
				let off = (i * id.width + j) * 4;
				if (pixels[off+2] > 75 + 180*Math.random()) {
					setPixel(id,j, i, pixels[off], pixels[off+1],pixels[off+2],pixels[off+3])
				} else {
					setPixel(id,j, i, 0, 0, 0, 0)
				}
			}
		}
		ctx.putImageData(id, 0, 0);		
		iteration++
		// if (iteration%2 == 0) {
		// 	$("#container").css("background-color", randomColor());
		// }
}


$( document ).ready(function() {

	var img = new Image();	
	img.src = "img/mess.png";
	// img.crossOrigin = "Anonymous";
	// img.setAttribute('crossOrigin', '');
	img.onload = function() {
		const canvas = document.getElementById("canvas");		
		const container = document.getElementById('container');
		canvas.width = container.clientWidth;
		canvas.height = 800;
		const ctx = canvas.getContext("2d");
		render(img,canvas, ctx)
		setInterval(function() { render(img, canvas, ctx) }, 75)
	}

});
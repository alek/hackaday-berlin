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

		let dice = Math.floor(Math.random()*76)
		for (let i=0; i<canvas.height; i++) {
			for (let j=0; j<canvas.width; j++) {
				let off = (i * id.width + j) * 4;
				if (pixels[off] > dice && pixels[off+2] > 100 + 100*Math.random()) {									
					setPixel(id,j, i, pixels[off], pixels[off+1],pixels[off+2],pixels[off+3])
				} else {
					setPixel(id,j, i, 0, 0, 0, 0)
				}
			}
		}
		ctx.putImageData(id, 0, 0);		
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
		} else if (canvas.width > 1800) {
			offset = Math.min(300, canvas.width - 1600)
		}
		const ctx = canvas.getContext("2d");
		render(img,canvas, ctx, offset)
		setInterval(function() { render(img, canvas, ctx, offset) }, 75)
	}

});
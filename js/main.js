hashCode = function(s){
  return Math.abs(s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0));
}

getHash = function(entry) {
	let codeString = (hashCode(entry.speaker)*(1+hashCode(entry.title))).toString()
	let result = []
	for (let i=0; i<8; i++) {
		let entry = parseInt((codeString[(i*2)%codeString.length] + codeString[(i*2+1)%codeString.length]))
		result.push(1+entry%64)
	}
	return result
}

render = function(el, day) {

	let dayTitle = document.createElement("h2");
	dayTitle.appendChild(document.createTextNode(day))
	dayTitle.appendChild(document.createElement("hr"))
	el.appendChild(dayTitle)

	let grid = document.createElement("div");
	grid.className = "grid";

	for (let i=0; i<schedule[day].length; i++) {
		let entry = schedule[day][i]

		let talk = document.createElement("div");
		talk.className = "talk";
		
		let speaker = document.createElement("h3")
		speaker.appendChild(document.createTextNode(entry.speaker))

		let bar = document.createElement("div")
		bar.className = "bar";

		let title = document.createElement("h2");
		title.appendChild(document.createTextNode(entry.title))

		let description = document.createElement("p");
		description.appendChild(document.createTextNode(entry.description))

		let about = document.createElement("p");
		about.appendChild(document.createTextNode(entry.about))

		talk.appendChild(speaker)
		talk.appendChild(bar)
		talk.appendChild(title)
		talk.appendChild(about)
		talk.appendChild(description)

		let date = document.createElement("h4");
		date.appendChild(document.createTextNode(entry.date));		
		date.appendChild(document.createElement("br"));		
		date.appendChild(document.createTextNode(entry.time));		

		let location = document.createElement("h5");
		location.appendChild(document.createTextNode(entry.location))
		talk.appendChild(location)
		talk.appendChild(date)

		grid.appendChild(talk)
		el.appendChild(grid)
	}
}

document.addEventListener('DOMContentLoaded', function () {	

	let el = document.getElementById("grid-container");
	for (let day in schedule) {
		render(el, day)
	}

}, false);
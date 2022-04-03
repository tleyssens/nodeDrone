function initChart() {
	var smoothie = new SmoothieChart({
		maxValue: 180,
		minValue: -180,
		tooltip: true,
		labels: {
			fillStyle: '#ee3a3a',
			fontSize: 12
		},
		grid: {
			strokeStyle: 'rgb(125, 0, 0)',
			fillStyle: 'rgb(60, 0, 0)',
			lineWidth: 1,
			millisPerLine: 250,
			verticalSections: 6,
		},
		labels: {
			fillStyle: 'rgb(60, 0, 0)'
		},

	});

	// Add to SmoothieChart
	smoothie.addTimeSeries(line1, {
		fillStyle: 'rgba(210,50,50,0.49)'
	});
	smoothie.addTimeSeries(line2, {
		strokeStyle: '#00ff00'
	});
	smoothie.addTimeSeries(line3, {
		strokeStyle: '#0000ff'
	});

	smoothie.streamTo(document.getElementById("mycanvas"));
}
// Data
var line1 = new TimeSeries();
var line2 = new TimeSeries();
var line3 = new TimeSeries();
//initialize socket io connection
var socket = io.connect();
// Add a random value to each line every second
// setInterval(function () {
// 	line1.append(new Date().getTime(), Math.random());
// 	line2.append(new Date().getTime(), Math.random());
// }, 1000);
socket.on('bandwidth_update', function (obj) {
	line1.append(new Date().getTime(), line1val);
	line2.append(new Date().getTime(), line2val);

});



function updateChart(data) {
	console.log(data);
	if (data) {
		line1.append(new Date().getTime(), data['pitch']);
		line2.append(new Date().getTime(), data['roll']);
		line3.append(new Date().getTime(), data['yaw']);

		// forEachCategory(function (category) {
		// 	orders[category].append(new Date().getTime(), data[category]);
		// });
	}
}
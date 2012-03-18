var COUNT = COUNT || {};

COUNT.app = (function(){
	(function init() {
		setObjects();
		setListeners();
	})();

	function setListeners() {

	}

	function setObjects() {
		setSocketIO();
	}

	function setSocketIO(){
		var socket = io.connect( 'http://localhost' );
  	socket.on( 'message', function ( data ) {
    	setChart(data);
  	});
	}

	function setChart(_data){
		for(data in _data){
					var w = 20;
					var h = 80;

					var x = d3.scale.linear()
									.domain([0,1])
									.range([0,w]);
					var y = d3.scale.linear()
									.domain([0,300])
									.rangeRound([0,h])

					if(document.getElementById(data)){
						document.getElementById(data).parentNode.removeChild(document.getElementById(data));
					}
					chart = d3.select("body").append("svg")
							.attr("id",data)
							.attr("class","chart")
							.attr("width", w * _data[data].step.length - 1)
							.attr("height", h);
					chart.selectAll("rect")
							.data(_data[data].step)
							.enter().append("rect")
							.attr("x",function(d, i){return x(i) - .5; })
							.attr("y", function(d){return h - y(d)})
							.attr("width", w)
							.attr("height", function(d){return y(d)} );
					chart.append("line")
						.attr("x1", 0)
						.attr("x2", w * _data[data].step.length)
						.attr("y1", h - .5)
						.attr("y2", h - .5)
						.style("stroke", "#000");
				}
		}

})();
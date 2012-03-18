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
    	console.log( data );
  	});
	}

})();
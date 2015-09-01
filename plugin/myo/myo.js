(function () {
	var myFirebaseRef = new Firebase("https://myopres.firebaseio.com/");
	var myLightRef = new Firebase("https://lettherebelight.firebaseio.com/");
	var light = false;
	myFirebaseRef.child("pose").on("value", function(snapshot){
		if(snapshot.val() === "WAVE_IN") {
			Reveal.right();
		}
		else if (snapshot.val() === "WAVE_OUT") {
			Reveal.left();
		}
		else if (snapshot.val() === "FIST") {
			Reveal.down();
		}
		else if (snapshot.val() === "FINGERS_SPREAD") {
			if(!Reveal.up()){
				light = !light;
				myLightRef.set({'switch':light});

				document.querySelector('.light').src = 'http://0.0.0.0:9000/images/light-bulb-'+(light?'on':'off')+'.png'
			}

		}
	})
})()

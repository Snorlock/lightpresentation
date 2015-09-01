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
			if(!Reveal.down() && Reveal.getIndices().h == 2){
				var event = new CustomEvent('mousedown', {
					detail: {
						target: document.querySelector( '.myoZoomable' )
					}
				})
				document.querySelector( '.reveal' ).dispatchEvent(event);

			}

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

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
			if(Reveal.getIndices().h == 5 && Reveal.getIndices().v == 2) {
				turnOnLight();
				return;
			}
			if(!Reveal.up()){
				turnOnLight();
			}

		}
	})

	var turnOnLight = function() {
		light = !light;
		myLightRef.set({'switch':light});
		console.log(window.location);
		document.querySelector('.light').src = 'http://'+window.location.host+'/images/light-bulb-'+(light?'on':'off')+'.png'

	}
})()

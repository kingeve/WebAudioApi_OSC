//We try with non-server environment first.
var context;

function init() {
  try {
	// Fix up for prefixing
	//depending on the browser, some uses webkitAudioContext
	//Look for the compatibility: https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
	
	//we need an AudioContext for managing and playing all sound
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
}

function startOsc(frequency){ 

	// Create OscillatorNode
	oscillator = context.createOscillator(); // Create sound source
	oscillator.type = 'square'; // square wave. You can try with other oscillators like sine, triangle, sawtooth. Also custom design is possible
	oscillator.frequency.value = frequency; // Frequency in hertz (passed from input button)
	oscillator.start(0); // Play oscillator instantly
	
	// Create GainNode	
	gain = context.createGain(); // Create gain node
	gain.gain.value = 1; // Set gain to full volume (0~1)

	// Connect the Nodes
	oscillator.connect(gain); // Connect oscillator to gain
	gain.connect(context.destination); // Connect gain to output

};
function off() {
	oscillator.stop(0); // Stop oscillator after 0 seconds
    oscillator.disconnect(); // Disconnect oscillator so it can be picked up by browser’s garbage collector
}

init();


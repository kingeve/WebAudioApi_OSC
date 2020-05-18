
//WebAudioAPI is not fully supported in Node js environment. The reason is because it is not part of the JavaScript language itself. It is a separate web platform JS API.
//Some parts are still working fine. You will see from the next example.
//In order to see this example working, you'll have to upload the code into a server. Not working locally.
//The example code is uploaded here: http://jiyounkang.com/test/test.html

//This example is to play a sound sample, demonstrating in 2 ways: by pressing a button, and a key (x).

var context = new AudioContext(); // Create and Initialize the Audio Context
var buffer;

//The audio sample has to be loaded and decoded to a buffer, and then to be read. If the sound file is too big, then using a buffer isn't a very good way. Rather use HTMLMediaElement. But we start with a buffer.

var getSound = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
getSound.open("GET", "./cat.wav", true); // Path to Audio File
getSound.responseType = "arraybuffer"; // Read as Binary Data. More about responseType: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
getSound.onload = function () {
    context.decodeAudioData(getSound.response, function (buf) {
        buffer = buf; // Decode the Audio Data and Store it in a Variable
    });
}
getSound.send(); // Send the Request and Load the File

function play() {
    var playSound = context.createBufferSource(); // Declare a New Sound
    playSound.buffer = buffer; // Attatch our Audio Data
    playSound.connect(context.destination);  // Link the Sound to the Output
    playSound.start(0); // Play the Sound Immediately
}

window.addEventListener("keydown", onKeyDown); // Create Event Listener for KeyDown

function onKeyDown(e) {
    switch (e.keyCode) {
        // X is number 88
        case 88:
            var playSound = context.createBufferSource(); // Declare a New Sound
            playSound.buffer = buffer; // Attatch our Audio Data 
            playSound.connect(context.destination);  // Link the Sound to the Output
            playSound.start(0); // Play the Sound Immediately
            break;
    }
}
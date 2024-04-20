// Get access to the camera
var videoStream;
var ct=1;
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        var video = document.getElementById('video');
        video.srcObject = stream;
        video.play();
        videoStream = stream;  // Store the stream reference
    })
    .catch(function(err) {
        console.log("An error occurred: " + err);
    });

// Capture and send the image
document.getElementById('snap').addEventListener('click', function() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');

    // Draw the video frame on the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Stop the camera stream
    videoStream.getTracks().forEach(function(track) {
        track.stop();
    });
    // document.getElementById("pred-l").href="/pred"
    video.style.display="none";
    // Get the image data from the canvas
    var imageData = canvas.toDataURL('image/jpeg');

    // Send the image data to the server
    fetch('/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'image=' + encodeURIComponent(imageData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    ct+=1;
});
import React, { useState, useRef } from 'react';

const WebcamCapture = (props) => {
  const [image, setImage] = useState('');
  const [cap, setcap] = useState(false);
  const [scap, setscap] = useState(false);
  const videoRef = useRef();

  const captureImage = async () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL('image/jpeg');
    // const encodedImage = encodeURIComponent(imageDataUrl);
    
    setImage(imageDataUrl);
    // handleStopCapture();
    const stream = videoRef.current.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
    videoRef.current.srcObject = null;
    props.onTakePhoto(imageDataUrl);
    setscap(false); 
    setcap(true); 
  };

  const handleStartCapture = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(error => {
        console.error('Error accessing webcam:', error);
      });
      setscap(true);
  };
  return (
    <div className='container my-3' > 
    <h3 className='or my-3'>Emotion Based Music Recommender</h3>
    {scap?<h5>Click on Capture Image to get Recommendation</h5>:
    <h5>Click on {cap?"Retake Image":"Start Capture"} to Start Camera</h5>}
      <div className='container my-3'>
        {scap?<video ref={videoRef} autoPlay muted style={{ maxWidth: '100%', maxHeight: '300px' }}></video>:
        image && (
          <img
            src={decodeURIComponent(image)}
            alt="Captured"
            style={{ maxWidth: '100%', maxHeight: '300px' }}
          />
        )}
      </div>
      <div>
        {scap?<button onClick={captureImage}>Capture Image</button>:
        <button onClick={handleStartCapture}>{cap?"Retake Image":"Start Capture"}</button>}
      </div>
    </div>
  );
};

export default WebcamCapture;

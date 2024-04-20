import './App.css';
import React, { useState } from 'react'
import Pred from './components/Pred';
// import SpotifyEmbed from './components/SpotifyEmbed';
import WebcamCapture from './components/WebcamCapture';
import Navbar from './components/Navbar';
function App() {
  // const trackURI = 'spotify:track:2qb5ASYergjk2qNLvYEQJD';
  const [imageData, setimageData] = useState("");
  const  handleImageData = (data) =>{
    console.log(data)
    setimageData(data);
  
  };
  return (
    <div className="App">
      <Navbar/>
      <WebcamCapture  onTakePhoto={handleImageData}/>
      {/* <SpotifyEmbed trackURI={trackURI}/> */}
      {imageData.length >0  && <Pred imageData={imageData} />}
      {/* {console.log(imageData)} */}
      {/* <Pred/> */}
      
    </div>
  );
}

export default App;

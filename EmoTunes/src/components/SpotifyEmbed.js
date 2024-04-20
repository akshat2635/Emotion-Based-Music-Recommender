import React from 'react';

const SpotifyEmbed = (props) => {
  // Extract the Spotify ID from the URI
  if (typeof props.trackURI !== 'string') {
    // Handle the case where props.trackURI is not a string
    console.error('props.trackURI is not a string:', props.trackURI);
    return null; // or return a placeholder component or message
  }

  const trackID = props.trackURI.split(':').pop();

  return (
    <div className='spotify-embed'>
      <div className="container">
      <iframe title={props.trackURI} style={{"border-radius":12}} src={`https://open.spotify.com/embed/track/${trackID}?utm_source=generator`} width="100%" height="252" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </div>
    </div>
  );
};

export default SpotifyEmbed;

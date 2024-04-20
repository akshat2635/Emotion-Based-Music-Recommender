import React, { useEffect, useState } from 'react';
import SpotifyEmbed from './SpotifyEmbed';

export default function Predictions(props) {
    const [Data, setData] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [error, seterror] = useState(null);
    useEffect(() => {
        data_fetch();
    }, [props.mood]);

    const data_fetch = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/reccomend/${props.mood}`, {
                // mode: 'no-cors',
                method: 'GET',
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const data = await response.json();
            setData(data);
            setLoading(false);
            seterror(null)  
        } catch (error) {
            seterror(error.message); // Setting error message as string
            setLoading(false);
        }
    };
  return (
    <div>
        {Loading ? (
            <p>Loading...</p>
        ) : error ? (
            <p>Error: {error}</p> // Displaying error message as string
        ) : (
            <>
            <h1>Recommended Music for Your {props.mood==="neutral"?"Calm":props.mood[0].toUpperCase()+props.mood.slice(1)} mood</h1>
            <div className="row mx-5">
                {Data['data'].map((item,index) => (
                    <div className="col-md-4 my-5" > 
                        <SpotifyEmbed trackURI={item['Track URI']} />
                    </div>
                ))}
            </div>
            </>
        )}
    </div>
  )
}

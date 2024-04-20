import React, { useEffect, useState } from 'react';
import SpotifyEmbed from './SpotifyEmbed';

export default function Pred(props) {
    const [Data, setData] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [error, seterror] = useState(null);
    useEffect(() => {
        data_fetch();
    }, [props.imageData]);

    const data_fetch = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/upload', {
                // mode: 'no-cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'image=' + encodeURIComponent(props.imageData)
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
    const class_name=['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise'];
    return (
        <div>
            {Loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p> // Displaying error message as string
            ) : (
                <>
                <div className="container">
                    {class_name.map((item)=>(
                        Data['pred'][item]>0.05?<h5>{item} : {Data['pred'][item]}%</h5>:""
                    ))}
                </div>
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
    );
}

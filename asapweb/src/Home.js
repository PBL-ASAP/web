import React, { useState, useEffect } from 'react';

const Home = () => {
    const [videos, setVideos] = useState([]);

    const fetchVideos = async () => {
        try {
            const response = await fetch('http://localhost:8001/api/videos/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setVideos(data.videos || []);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    return (
        <div>
            <h1>Uploaded Videos</h1>
            <ul>
                {videos.length > 0 ? (
                    videos.map((video, index) => (
                        <li key={index}>
                            <video width="320" height="240" controls>
                                <source src={video.url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </li>
                    ))
                ) : (
                    <p>No videos found.</p>
                )}
            </ul>
        </div>
    );
};

export default Home;

import React, { useState } from 'react';
import './FindMyFace.css';

function FindMyFace() {
  const [searchKey, setSearchKey] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch('YOUR_SERVER_ENDPOINT/find-face', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key: searchKey }) // 검색 키 값으로 서버에 요청
      });
      const data = await response.json();
      setSearchResult(data.videos);  // 가정: 응답이 비디오 목록을 포함
      setLoading(false);
    } catch (error) {
      console.error('Search Failed:', error);
      setLoading(false);
    }
  };

  return (
    <div className="find-my-face-container">
      <h1>Find My Face</h1>
      <input 
        type="text" 
        placeholder="Enter key value"
        value={searchKey}
        onChange={e => setSearchKey(e.target.value)}
      />
      <button onClick={handleSearch}>Search for Videos</button>
      {loading ? <p>Loading...</p> : (
        <div>
          {searchResult.length > 0 ? (
            searchResult.map((video, index) => (
              <div key={index}>
                <video controls width="240" height="160">
                  <source src={video.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p>{video.title}</p>
              </div>
            ))
          ) : <p>No videos found</p>}
        </div>
      )}
    </div>
  );
}

export default FindMyFace;

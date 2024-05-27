import React, { useState } from 'react';
import './FindMyFace.css';

const FindMyFace = () => {
  const [searchKey, setSearchKey] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    console.log('Search button clicked');
    console.log('Search key:', searchKey);
    try {
      const response = await fetch('http://localhost:8001/api/search_videos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ face_key: searchKey }) // 검색 키 값으로 서버에 요청
      });
      const data = await response.json();
      console.log('Search result:', data);
      if (data.status === 'success') {
        setSearchResult(data.matched_videos);  // 응답이 비디오 목록을 포함
      } else {
        console.error('Search failed:', data.message);
      }
    } catch (error) {
      console.error('Search Failed:', error);
    }
    setLoading(false);
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
                  <source src={`http://localhost:8001/${video}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p>{video}</p>
              </div>
            ))
          ) : <p>No videos found</p>}
        </div>
      )}
    </div>
  );
}

export default FindMyFace;

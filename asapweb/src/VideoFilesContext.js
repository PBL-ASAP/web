/*비디오콘텍스트파일*/
// src/VideoFilesContext.js
import { createContext } from 'react';

const VideoFilesContext = createContext({
  videoFiles: [],
  setVideoFiles: () => {},
});

export default VideoFilesContext;

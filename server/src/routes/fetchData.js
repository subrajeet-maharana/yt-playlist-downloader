import ytpl from 'ytpl';
import ytdl from 'ytdl-core';
import fs from 'fs';


// // console.log(ytpl);
export default async function fetchData(req, res) {

const playlistUrl = 'https://www.youtube.com/playlist?list=PLu0W_9lII9agpFUAlPFe_VNSlXW5uE0YL';

// Fetch kruchi playlist details

ytpl(playlistUrl, { limit: Infinity })
  .then(playlistInfo => {

    // Extract kruchi video IDs from the playlist, kali map kahi thilo hence map

    const videoIDs = playlistInfo.items.map(item => item.id);
    const videoTitles = playlistInfo.items.map(item => item.title);
    





   
    videoIDs.forEach((videoID, index) => {
      const videoURL = `https://www.youtube.com/watch?v=${videoID}`;
      const videoTitle = videoTitles[index]; // Access the corresponding title
    
      const options = {
        quality: 'highest',
      };
    
      ytdl(videoURL, options)
        .pipe(fs.createWriteStream(`${sanitizeFilename(videoTitle)}.mp4`)) // Use sanitized title
        .on('finish', () => {
          console.log(`Video ${videoTitle} downloaded!`);
        })
        .on('error', (err) => {
          console.error(`Error downloading video ${videoTitle}:`, err);
        });
    });
    
    // Function to sanitize file names for compatibility:
    function sanitizeFilename(filename) {
      return filename.replace(/[^a-zA-Z0-9.-]/g, ''); // Remove invalid characters
    }


  })
  .catch(err => {
    console.error('Error fetching playlist:', err);
  });
};
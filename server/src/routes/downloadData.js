import ytpl from 'ytpl';
import ytdl from 'ytdl-core';
import fs from 'fs';

export default async function downloadData(req, res) {
    const playlistUrl = req.query.playlistUrl;
    ytpl(playlistUrl, { limit: Infinity })
        .then(playlistInfo => {
            const videoIDs = playlistInfo.items.map(item => item.id);
            const videoTitles = playlistInfo.items.map(item => item.title);
            videoIDs.forEach((videoID, index) => {
                const videoURL = `https://www.youtube.com/watch?v=${videoID}`;
                const videoTitle = videoTitles[index];
                const options = {
                    format: 'mp4/bestvideo',
                    filter: 'audioandvideo',
                    audioFormat: 'bestaudio',
                };
                ytdl(videoURL, options)
                    .pipe(fs.createWriteStream(`${videoTitle}.mp4`))
                    .on('finish', () => {
                        console.log(`Video ${videoTitle} downloaded!`);
                    })
                    .on('error', (err) => {
                        console.error(`Error downloading video ${videoTitle}:`, err);
                    });
            });


        })
        .catch(err => {
            console.error('Error fetching playlist:', err);
        });
};
import ytpl from 'ytpl';
import ytdl from 'ytdl-core';
import fs from 'fs';

export default async function downloadData(req, res) {
    const playlistUrl = req.query.playlistUrl;
    console.log(playlistUrl);

    ytpl(playlistUrl, { limit: Infinity })
        .then(playlistInfo => {

            const videoIDs = playlistInfo.items.map(item => item.id);
            const videoTitles = playlistInfo.items.map(item => item.title);

            // Assuming only one video is being downloaded for simplicity
            const videoID = videoIDs[0];
            const videoTitle = videoTitles[0];

            const videoURL = `https://www.youtube.com/watch?v=${videoID}`;
            const options = {
                format: 'mp4/bestvideo',
                filter: 'audioandvideo',
                audioFormat: 'bestaudio',
            };

            res.setHeader('Content-Disposition', `attachment; filename="${videoTitle}.mp4"`);
            res.setHeader('Content-Type', 'video/mp4');

            ytdl(videoURL, options)
                .pipe(res)
                .on('finish', () => {
                    console.log(`Video ${videoTitle} downloaded and sent to the client`);
                })
                .on('error', (err) => {
                    console.error(`Error downloading video ${videoTitle}:`, err);
                });

        })
        .catch(err => {
            console.error('Error fetching playlist:', err);
            res.status(500).send('Internal Server Error');
        });
}

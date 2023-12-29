import ytpl from "ytpl";
import ytdl from "ytdl-core";
import fs from "fs";

export default async function fetchData(req, res) {

    const playlistID = 'https://www.youtube.com/playlist?list=PLu0W_9lII9agpFUAlPFe_VNSlXW5uE0YL';

    // Fetch kruchi playlist details

    ytpl(playlistID, { limit: Infinity })
        .then(playlistInfo => {

            // Extract kruchi video IDs from the playlist, kali map kahi thilo hence map

            const videoIDs = playlistInfo.items.map(item => item.id);

            // Download heba katha
            videoIDs.forEach(videoID => {
                const videoURL = `https://www.youtube.com/watch?v=${videoID}`;

                const options = {
                    quality: 'highest',
                };

                //  downloading start 

                ytdl(videoURL, options)
                    .pipe(fs.createWriteStream(`${videoID}.mp4`)) // File name based on video ID
                    .on('finish', () => {
                        console.log(`Video ${videoID} downloaded !`);
                    })
                    .on('error', (err) => {
                        console.error(`Error downloading video ${videoID}:`, err);
                    });
            });
        })
        .catch(err => {
            console.error('Error fetching playlist:', err);
        });
}
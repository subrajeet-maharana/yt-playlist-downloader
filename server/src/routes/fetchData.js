import ytpl from 'ytpl';
import ytdl from 'ytdl-core';
import fs from 'fs';


// // console.log(ytpl);
export default async function fetchData(req, res) {
    //     try {
    //         const { url: playlistUrl } = req.body;
    //         if (!playlistUrl) {
    //             return res.status(400).json({ error: 'Missing playlistUrl in the request body' });
    //         }

    //         const playlistInfo = await ytpl(playlistUrl);
    //         // console.log(playlistInfo);   // Not Working for single vido

    //         res.status(200).json({
    //             playlistName: playlistInfo.title,
    //             thumbnailLink: playlistInfo.bestThumbnail.url,
    //         });



    //         console.log( playlistInfo.id); 
    //         const videoId = playlistInfo.id;  // not able to read the video id
    //         const downloadOptions = {
    //         filter: 'audioandvideo',  // Adjust filter for desired format
    //         quality: '480p',       // Or specify a specific quality
    //         output: 'downloaded_video.mp4'  // Output filename
    //         };

    //         ytdl(videoId, downloadOptions).pipe(fs.createWriteStream('downloaded_video.mp4'));

    //     } catch (error) {
    //         console.error('Error:', error.message);
    //         res.status(500).json({ error: 'Failed to fetch playlist details' });
    //     }
    // }


    // const ytpl = require('ytpl');
    // const ytdl = require('ytdl-core');
    // const fs = require('fs');

    const playlistID = 'https://www.youtube.com/playlist?list=PLu0W_9lII9agpFUAlPFe_VNSlXW5uE0YL';

    // Fetch kruchi playlist details

    ytpl(playlistID, { limit: Infinity })
        .then(playlistInfo => {

            // Extract kruchi video IDs from the playlist, kali map kahi thilo hence map

            const videoIDs = playlistInfo.items.map(item => item);

            // Download heba katha
            videoIDs.forEach(videoID => {
                const videoURL = `https://www.youtube.com/watch?v=${videoID.id}`;

                const options = {
                    quality: 'highest',
                };

                //  downloading start 

                ytdl(videoURL, options)
                    .pipe(fs.createWriteStream(`${ videoID.title }.mp4`)) // File name based on video ID
                    .on('finish', () => {
                        console.log(`Video ${ videoID.title } downloaded!`);
                    })
                    .on('error', (err) => {
                        console.error(`Error downloading video ${ videoID.title }:`, err);
                    });
            });
        })
        .catch(err => {
            console.error('Error fetching playlist:', err);
        });
};
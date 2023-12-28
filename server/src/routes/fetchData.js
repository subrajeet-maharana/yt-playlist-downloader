import ytpl from 'ytpl';

export default async function fetchData(req, res) {
    try {
        const { url: playlistUrl } = req.body;

        if (!playlistUrl) {
            return res.status(400).json({ error: 'Missing playlistUrl in the request body' });
        }

        const playlistInfo = await ytpl(playlistUrl);

        res.status(200).json({
            playlistName: playlistInfo.title,
            thumbnailLink: playlistInfo.bestThumbnail.url,
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch playlist details' });
    }
}

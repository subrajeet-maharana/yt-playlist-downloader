import { useEffect, useState } from 'react';
import Loader from './loader';
import { Button } from './button';
export const Home = () => {
    const [playlistData, setPlaylistData] = useState(null);
    const [playlistUrl, setPlaylistUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3001/fetch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ playlistUrl }),
            });

            const data = await response.json();
            setPlaylistData(data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <>
            <div className="max-w-xl flex flex-col pt-36 px-3 py-8 h-screen mx-auto">
                <div className="mb-4 flex items-center justify-center">
                    <input
                        type="text"
                        placeholder="Enter YouTube playlist URL"
                        value={playlistUrl}
                        onChange={(e) => setPlaylistUrl(e.target.value)}
                        className="p-2 mr-4 border border-blue-200 rounded w-4/6 focus:outline-none focus:border-blue-500"
                    />
                    {loading ? (<Loader onClick={fetchData} />) : (<Button onClick={fetchData} />)}

                </div>
                {playlistData && (
                    <div className="bg-white p-4 rounded shadow-md">
                        <img
                            src={playlistData.thumbnailLink}
                            alt="Playlist Thumbnail"
                            className="mb-4 w-full h-auto rounded-t-lg"
                        />
                        <h1 className="text-2xl font-bold mb-4">{playlistData.playlistName}</h1>
                    </div>
                )}
            </div>
        </>
    );
};

import { useEffect, useState } from 'react';
import Loader from './loader';
import { Button } from './button';
export const Home = () => {
    const [playlistData, setPlaylistData] = useState(null);
    const [playlistUrl, setPlaylistUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [downloadLoading, setDownloadLoading] = useState(false);
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

    const downloadData = async () => {
        setDownloadLoading(true);
        try {
            const response = await fetch('http://localhost:3001/download', {
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
        setDownloadLoading(false);
    };

    return (
        <>
            <div className="max-w-xl flex flex-col pt-18 px-3 py-8 h-screen mx-auto">
                <div className='flex flex-col items-center justify-center p-8'>
                    <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl text-gray-700 mb-2'>Youtube Playlist Downloader</h1>
                    <p className='text-base sm:text-lg md:text-xl text-gray-400'>Download the playlist with a single click👇🏻</p>
                </div>
                <div className="mb-12 flex items-center justify-center">
                    <input
                        type="text"
                        placeholder="Enter YouTube playlist URL"
                        value={playlistUrl}
                        onChange={(e) => setPlaylistUrl(e.target.value)}
                        className="p-2 mr-4 border border-blue-200 rounded w-4/6 focus:outline-none focus:border-blue-500"
                    />
                    {loading ? (<Loader onClick={fetchData} buttonText="Fetching..." />) : (<Button onClick={fetchData} buttonText="Fetch" />)}

                </div>
                {playlistData && (
                    <div className="flex flex-col items-center bg-white p-4 rounded shadow-md">
                        <h1 className="text-xl sm:text-3xl font-bold mb-1">{playlistData.playlistName}</h1>
                        <p className='text-gray-400 text-lg sm:text-xl font-normal mb-4'>Number of Vidoes: {playlistData.videoCount}</p>
                        <img
                            src={playlistData.thumbnailLink}
                            alt="Playlist Thumbnail"
                            className="mb-4 w-full h-auto rounded-t-lg"
                        />
                        {downloadLoading ? (<Loader onClick={downloadData} buttonText="Downloading..." />) : (<Button onClick={downloadData} buttonText="Download" />)}
                    </div>
                )}
            </div>
        </>
    );
};

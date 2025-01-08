// authentication and search logic API 
import axios from 'axios';

const clientId = '8b8ac949f49747a3a05f3cc0f372ae65';
const redirectUri = 'http://localhost:3000';
const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=user-read-private user-read-email`

export const login = () => {
    window.location.href = authUrl;
}
export const getAccessTokn = () => {
    const hash = window.location.hash
    let token = localStorage.getItem('token')

    if (!token && hash) {
        token = hash.split('&')[0].split('=')(1);
        localStorage.setItem('token', token);
        window.location.hash = '';
    }
    return token
}
export const searchTracks = async (query) => {
    const token = getAccessTokn();
    const response = await axios.get(`https://api.spotify.com/v1/search/`, {
        headers: {
            Authorization: `Barrer ${token}`
        },
        params: {
            q: query,
            type: 'track,artist',
            limit: 10,
        },
    })
    return response.data;
}

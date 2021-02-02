import axios from 'axios';
const SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search'
const DETAILS_URL = 'https://www.googleapis.com/youtube/v3/videos'

const API_KEY = 'AIzaSyDT9sOsVrKS57kBtrHqmY0FOgykI0fhOrY';

export const youtubeService = {
    get,
    getDuration,
}

async function get(query) {
    if (!query) return
    try {
        const res = await axios.get(`${SEARCH_URL}?videoCategoryId=10&part=id,snippet&videoEmbeddable=true&type=video&maxResults=10&q=${query}&key=${API_KEY}`);
        return res.data.items;
    } catch (err) {
        console.dir(err);
        throw (err)
    }
}

async function getDuration(videoId, timeString) {
    let duration
    if (!timeString) {
        try {
            let res = await axios.get(`${DETAILS_URL}?id=${videoId}&part=contentDetails&key=${API_KEY}`);
            duration = res.data.items[0].contentDetails.duration;
        } catch (err) {
            console.log(err);
            throw err;
        }
    } else duration = timeString;
    try {
        duration = duration.substring(2);
        duration = duration.replace('M', ':');
        duration = duration.split(':')
        duration[1] = duration[1].replace('S', '');
        duration[1] = duration[1].padStart(2, '0');
        duration = duration.join(':');
        return duration.toString();
    } catch (err) {
        return null;
    }
}


import axios from 'axios'
// const API_KEY = process.env.REACT_APP_API_KEY
const API_KEY = 'AIzaSyAi8TiL5zHDXOkZdPP6Aiyc1bVxynZagNI'
export const youtubeService = {
  getVideoResults,
  getTimeOfSong,
  formatDuration,
  convertDurationToSeconds
}

async function getVideoResults(val) {
  const results = []
  try {
    const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&maxResults=5&type=video&key=${API_KEY}&q=${val}`)
    const videos = res.data.items
    videos.map(video => {
      if (video.snippet.title.includes('Trailer') || !video.snippet.title) return
      const song = {
        id: video.id.videoId,
        title: video.snippet.title,
        imgUrl: video.snippet.thumbnails.high.url,
        artist: video.snippet.channelTitle
      }
      results.push(song)
    })
    return results
  }
  catch (err) {
    console.log(err)
    return err
  }
}

async function getTimeOfSong(val) {
  console.log('vallllll', val)

  if (!val) {
    console.error('Error: Invalid or missing video ID');
    throw new Error('Invalid or missing video ID');
  }
  console.log('val', val)
  // const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=qwoyUpxjQ9c&part=contentDetails&key=AIzaSyDbYtw99FWbtr4RCHxS0dxtj3--vXfSp4E`)

  const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${val}&part=contentDetails&key==${API_KEY}`)
  console.log('API response', res);
  console.log('API response data', res.data);

  if (res.data.items && res.data.items[0]) {
    console.log('getTimeOfSong', res.data.items[0].contentDetails.duration)
    return res.data.items[0].contentDetails.duration
  } else {
    console.error('Error: Unable to fetch contentDetails for the given video ID');
    throw new Error('Unable to fetch contentDetails for the given video ID');
  }
}

function formatDuration(res) {
  const isDuration = res.data.items[0].contentDetails.duration
  const regex = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
  const matches = isDuration.match(regex);

  const hours = parseInt(matches[1]) || 0;
  const minutes = parseInt(matches[2]) || 0;
  const seconds = parseInt(matches[3]) || 0;

  const totalMinutes = (hours * 60) + minutes;
  const formattedMinutes = totalMinutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`
}
function convertDurationToSeconds(res) {
  const duration = res.data.items[0].contentDetails.duration

  var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  var hours = (parseInt(match[1]) || 0);
  var minutes = (parseInt(match[2]) || 0);
  var seconds = (parseInt(match[3]) || 0);
  return hours * 3600 + minutes * 60 + seconds;
}
import axios from "axios"
const API_KEY = 'AIzaSyDbYtw99FWbtr4RCHxS0dxtj3--vXfSp4E'

export const youtubeService = {
  getVideoResults,
}

async function getVideoResults(val) {
  const results = []
  try {
    const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&maxResults=4&type=video&key=${API_KEY}&q=${val}`)
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
    console.log(results)
    return results
  }
  catch (err) {
    console.log(err)
    return err
  }
}

 //https://www.googleapis.com/youtube/v3/videos?id=Q4VK9_CfOLQ&part=contentDetails&key=AIzaSyCp8KMTEjR9frWUGpSnc8Cw5cLVe7wRRDM
         // const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&maxResults=4&type=video&key=AIzaSyDbYtw99FWbtr4RCHxS0dxtj3--vXfSp4E&q=${val}`)
        // `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&maxResults=3&type=video&key=AIzaSyCp8KMTEjR9frWUGpSnc8Cw5cLVe7wRRDM&q=madona`

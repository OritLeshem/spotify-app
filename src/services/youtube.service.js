import axios from "axios"
const API_KEY = process.env.REACT_APP_API_KEY

export const youtubeService = {
  getVideoResults,
}

async function getVideoResults(val) {
  const results = []
  try {
    const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&maxResults=20&type=video&key=${API_KEY}&q=${val}`)
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


import { useSelector } from "react-redux";

export function Music({ song, startTime = 0, handlePlayPauseClick }) {
  const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
  const currentSong = useSelector(storeState => storeState.playerModule.currentSong)

  const displayPauseIcon = song.id === currentSong.id && isPlaying;

  return (
    <section className="music">
      <button onClick={() => handlePlayPauseClick(song)}>
        {displayPauseIcon ? (
          // display the pause icon if the song is playing
          <svg
            role="img"
            height="24"
            width="24"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-encore-id="icon"
          >
            <path
              fill="currentcolor"
              d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"
            ></path>
          </svg>
        ) : (
          // display the play icon otherwise
          <svg
            role="img"
            height="24"
            width="24"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-encore-id="icon"
          >
            <path
              fill="currentcolor"
              d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
            ></path>
          </svg>
        )}
      </button>
    </section>
  );
}

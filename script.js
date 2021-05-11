const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const image = document.querySelector("img");
let title = document.getElementById("title");
let artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
console.log(title, artist);
let isPlaying = false;
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
const songs = [
  {
    name: "Battein_ye_kabhi",
    displayName: "Battein_ye_kabhi",
    artist: "Arijitsingh",
  },
  {
    name: "Kitni-hasrat-hai",
    displayName: "Kitni-hasrat-hai",
    artist: "KumarSanu",
  },
  {
    name: "suno-na-sangemarmar",
    displayName: "Suno-na-sangemarmar",
    artist: "Arijitsingh",
  },
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];
function loadSong(song) {
  artist.textContent = song.artist;
  title.textContent = song.displayName;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}
let songId = 0;
let len = songs.length;
loadSong(songs[songId]);
function nextsong() {
  songId++;
  songId = songId % len;
  loadSong(songs[songId]);
  playSong();
  //console.log(songId);
}
function prevsong() {
  songId--;
  songId = songId % len;
  songId = (songId + len) % len;
  loadSong(songs[songId]);
  playSong();
  //console.log(songId);
}
function updateProgressbar(e) {
  // console.log(e);
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    console.log(duration, currentTime);
    const perwidth = (currentTime / duration) * 100;
    progress.style.width = `${perwidth}%`;
    const durMin = Math.floor(duration / 60);
    const durSec = Math.floor(duration % 60);
    if (durSec) {
      if (durSec < 10) durationEl.textContent = `${durMin}:0${durSec}`;
      else durationEl.textContent = `${durMin}:${durSec}`;
    }
    const curMin = Math.floor(currentTime / 60);
    const curSec = Math.floor(currentTime % 60);
    if (curSec) {
      if (curSec < 10) currentTimeEl.textContent = `${curMin}:0${curSec}`;
      else currentTimeEl.textContent = `${curMin}:${curSec}`;
    }
  }
}
function setProgressBar(e) {
  console.log(e);
  console.log(this);
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;

  music.currentTime = (clickX / width) * duration;
}
prevBtn.addEventListener("click", prevsong);
nextBtn.addEventListener("click", nextsong);
music.addEventListener("timeupdate", updateProgressbar);
progressContainer.addEventListener("click", setProgressBar);
music.addEventListener("ended", nextsong);

"use strict";

const prevBtn = document.getElementById("prev__btn");
const playBtn = document.getElementById("play__btn");
const nextBtn = document.getElementById("next__btn");

const songEl = document.getElementById("song");

const imageEl = document.getElementById("song__image");
const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");

const progressContainerEl = document.getElementById("progress-container");
const progressEl = document.getElementById("progress");

const currentTimeEl = document.getElementById("current__time");
const durationEl = document.getElementById("duration");

const playlist = document.getElementById("playlist");

// Data
const songs = [
  {
    name: "better-day",
    artist: "penguinmusic",
    title: "Better Day",
    duration: "1:30",
  },
  {
    name: "midnight-forest",
    artist: "Syouki Takahashi",
    title: "Midnight Forest",
    duration: "2:48",
  },
  {
    name: "ethereal-vistas",
    artist: "Starjam",
    title: "ethereal-vistas",
    duration: "4:01",
  },
];

let isPlaying = false;
let songIndex = 0;

const playSong = () => {
  isPlaying = true;
  songEl.play();
  playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`
}

const pauseSong = () => {
  isPlaying = false;
  songEl.pause();
  playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
})

const displaySong = (index) => {
  titleEl.textContent = songs[index].title
  artistEl.textContent = songs[index].artist
  imageEl.src = `./images/${songs[index].name}.webp`
  songEl.src = `./audio/${songs[index].name}.mp3`
}

prevBtn.addEventListener("click", () => {
  songIndex = songIndex === 0 ? songs.length - 1 : songIndex - 1
  displaySong(songIndex)
  isPlaying ? playSong() : pauseSong();
})

nextBtn.addEventListener("click", () => {
  songIndex === songs.length - 1 ? songIndex = 0 : songIndex++;
  displaySong(songIndex)
  isPlaying ? playSong() : pauseSong();
})

songEl.addEventListener("timeupdate", (e) => {
  const { duration, currentTime } = e.target
  const total = (currentTime / duration) * 100
  if (!duration) return;
  // Currentime in progress music
  progressEl.style.width = `${total}%`
  // Duration time lengt audio
  const minuteDuration = Math.floor(duration / 60);
  const secondDuration = Math.floor(duration % 60);
  durationEl.innerText = `${String(minuteDuration).padStart(2, "00")} : ${String(secondDuration).padStart(2, "00")}`
  // Duration time audio
  const minuteCurrent = Math.floor(currentTime / 60);
  const secondCurrent = Math.floor(currentTime % 60);
  currentTimeEl.innerText = `${String(minuteCurrent).padStart(2, "00")} : ${String(secondCurrent).padStart(2, "00")}`
})

progressContainerEl.addEventListener("click", (e) => {
  const click = e.offsetX
  const width = progressContainerEl.clientWidth
  const duration = songEl.duration;
  songEl.currentTime = (click / width) * duration
})

window.addEventListener("DOMContentLoaded", () => {
  songIndex = Math.floor(Math.random() * songs.length)
  displaySong(songIndex)
})

const repeat = document.querySelector(".repeat")

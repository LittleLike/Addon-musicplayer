const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'Music/Lake Bit of faith.mp3',
        displayName: 'Lake/ Bit of faith',
        cover: 'bg/Lake.jpg',
        artist: 'Malena Stark and Mia Niles',
    },
    {
        path: 'Music/Relax Pokemon.mp3',
        displayName: 'Pokémon ambience music',
        cover: 'bg/Pokémon Casseroya Lake Ambience & Music.png',
        artist: 'Ollie Ambience',
    },
    {
        path: 'Music/Relax Pokemon 2.mp3',
        displayName: 'Pokémon ambience music',
        cover: 'bg/Pokémon Casseroya Lake Ambience & Music.png',
        artist: 'Ollie Ambience',
    },
    {
        path: 'Music/Relax Paldea.mp3',
        displayName: 'Pokémon ambience music Paldea',
        cover: 'bg/Pokémon ambience music paldean south province.png',
        artist: 'Ollie Ambience',
    },
    {
        path: 'Music/Relax Paldea 2.mp3',
        displayName: 'Pokémon ambience music Paldea',
        cover: 'bg/Pokémon ambience music paldean south province.png',
        artist: 'Ollie Ambience',
    },
    {
        path: 'Music/Silent Hill OST - Lisas Theme Extended Music 1 hour.mp3',
        displayName: 'Lisa\'s Theme Extended',
        cover: 'bg/lisa garland.jpg',
        artist: 'Silent Hill OST',
    },
    {
        path: 'Music/every hourly song from animal crossing wild world.mp3',
        displayName: 'Animal Crossing Wild World',
        cover: 'bg/animal crossing wild world.jpg',
        artist: 'Nintendo',
    },
    {
        path: 'Music/Lower Down the Bridge.mp3',
        displayName: 'Lake/ Lower Down the Bridge',
        cover: 'bg/Lake.jpg',
        artist: 'Yara Meyers',
    },
    {
        path: 'Music/Last days of September.mp3',
        displayName: 'Lake/ Last days of September',
        cover: 'bg/Lake.jpg',
        artist: 'Lake Soundtrack',
    }
    ,
    {
        path: 'Music/Life is strange.mp3',
        displayName: 'Life is Strange - Jonathan Morali',
        cover: 'bg/Life is strange.jpg',
        artist: 'Jonathan Morali',
    }
    ,
    {
        path: 'Music/Life is strange 2.mp3',
        displayName: 'Life is Strange - Jonathan Morali',
        cover: 'bg/Life is strange.jpg',
        artist: 'Jonathan Morali',
    }

];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);
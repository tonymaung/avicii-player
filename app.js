const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.querySelector('nav');
const footer = document.querySelector('footer');
const switchIcon = document.querySelector('.fas');
const text = document.querySelector('.toggle-text');
const repeatBtn = document.querySelector(".repeat");
const icon = document.getElementById('logo');
let isDark = false;

const currentTheme = localStorage.getItem('theme')
if(currentTheme){
    document.documentElement.setAttribute('data-theme', currentTheme);
    if(currentTheme == 'dark'){
        isDark = true;
        toggleSwitch.setAttribute("checked",true);
        toggleDarkLight(isDark);
    }
}else{
    document.documentElement.setAttribute('data-theme', 'light');
}
//function for toggling dark and light mode
function toggleDarkLight(isDark){
    document.documentElement.setAttribute('data-theme', isDark? 'dark' : 'light');
    nav.style.backgroundColor = isDark? '#242323' :'rgb(255 255 255 / 50%)';
    footer.style.backgroundColor = isDark? '#242323' :'rgba(255, 255, 255, 0.9)';
    repeatBtn.style.filter = isDark? "invert(100%) sepia(0%) saturate(7500%) hue-rotate(91deg) brightness(114%) contrast(105%)":"invert(20%) sepia(0%) saturate(9%) hue-rotate(206deg) brightness(98%) contrast(78%)";
	icon.style.filter =  isDark ? 'invert(100%) sepia(0%) saturate(0%) hue-rotate(333deg) brightness(101%) contrast(101%)' : 'invert(7%) sepia(3%) saturate(5379%) hue-rotate(195deg) brightness(89%) contrast(87%)';
	text.innerText = isDark? 'Dark Mode' : 'Light Mode';
	isDark? switchIcon.classList.replace('fa-sun','fa-moon') : switchIcon.classList.replace('fa-moon','fa-sun') ;
}

//Switch Theme
const switchTheme = (e) => {
	if (e.target.checked) {
        isDark = true;
		toggleDarkLight(isDark);
        localStorage.setItem('theme','dark');
	} else {
        isDark = false;
		toggleDarkLight(isDark);
        localStorage.setItem('theme','light');
	}
};
//Adding Event Listener
toggleSwitch.addEventListener('change', switchTheme);

// Audio Player
const music = document.querySelector("audio");
const prevBtn  = document.getElementById("prev");
const playBtn  = document.getElementById("play");
const nextBtn  = document.getElementById("next");
const title    = document.getElementById("title");
const artist   = document.getElementById("artist");
const albumArt = document.querySelector(".album-art");
const currentTrackTime = document.getElementById("current-time");
const durationTrack = document.getElementById("duration");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById('progress');
const muteBtn = document.getElementById("mute");
let isRepeat = false;
let isMute = false;
let isPlaying  = false;

const songs = [{
    name: 'levels',
    displayName: 'Levels (Radio Mix)',
    artist: 'Avicii'
},
{
    name: 'the-nights',
    displayName: 'The Nights',
    artist: 'Avicii'
},
{
    name: 'waiting-for-love',
    displayName: 'Waiting For Love',
    artist: 'Avicii'
},{
    name: 'wake-me-up',
    displayName: 'Wake Me Up',
    artist: 'Avicii'    
}];
// Play Function
function playMusic (){
    music.play()
    isPlaying = true;
    playBtn.classList.replace("fa-play","fa-pause")
    playBtn.setAttribute("title", "Pause");
}
//Pause Function
function pauseMusic (){
    music.pause()
    isPlaying = false;
    playBtn.classList.replace("fa-pause","fa-play");
    playBtn.setAttribute("title", "Play");
}
//Repeat Function 
function repeatMusic() {
    isRepeat = true ;
    music.setAttribute("loop","loop")
    repeatBtn.style.filter = isDark? "drop-shadow(2px 2px 5px rgb(255 255 255 / 0.5))":"drop-shadow(2px 2px 5px rgb(0 0 0 / 0.5))";

    console.log("repeat on")
}
function repeatOffMusic() {
    isRepeat = false;
    music.loop = false; 
    music.removeAttribute("loop")
    repeatBtn.style.filter = "";
    repeatBtn.style.filter = isDark? "invert(100%) sepia(0%) saturate(7500%) hue-rotate(91deg) brightness(114%) contrast(105%)":"invert(20%) sepia(0%) saturate(9%) hue-rotate(206deg) brightness(98%) contrast(78%)";
    console.log("repeat off")
}
//repeat off 
// play or pause, repeat event listener
playBtn.addEventListener("click", ()=> (isPlaying ? pauseMusic() : playMusic()))
repeatBtn.addEventListener("click", ()=> (isRepeat ?  repeatOffMusic() : repeatMusic() ))
document.addEventListener("keydown", e =>{
    if(e.which == "32"){
        isPlaying ? pauseMusic() : playMusic();
    }
    switch(e.key){
        case "r":
            isRepeat ?  repeatOffMusic() : repeatMusic();
            break;
        case "ArrowRight":
            nextSong();
            break;
        case "ArrowLeft":
            prevSong();
            break;
    }
    
})
// Update songs
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    albumArt.src = `img/${song.name}.jpg`
    currentTrackTime.textContent = "0.00";
    // duration.textContent = song.srcElement.duration;
}
//Current Track
let songIndex = 0;

loadSong(songs[songIndex]);
//Prev Song 
function prevSong(){
    if(songIndex <= 0){
        songIndex = songs.length - 1
    }else{
        songIndex--;
    }
    loadSong(songs[songIndex]);
    playMusic();
}
function nextSong(){
    if(songIndex >= (songs.length - 1)){
        songIndex = 0
    }else{
        songIndex++;
    }
    loadSong(songs[songIndex]);
    playMusic();
}

function updateProgressBar (e){
    if(isPlaying){
        const {duration, currentTime } = e.srcElement;
        // console.log(duration, currentTime);
        //Update Progress Bar
        const progressPercent = (currentTime/duration) * 100;
        progress.style.width = `${progressPercent}%`;
        //Calculate to Display
        let durationMin = Math.floor(duration / 60) ;
        let durationSec = Math.floor(duration % 60) ;
        let currentMin = Math.floor(currentTime / 60) ;
        let currentSec = Math.floor(currentTime % 60) ;
        if(currentSec < 10){
            currentSec = `0${currentSec}`
        }
        if(durationSec < 10){
            durationSec = `0${durationSec}`
        }
        currentTrackTime.textContent = `${currentMin}:${currentSec}`;
        //delay switching element
        if(durationSec && durationMin){
            durationTrack.textContent = `${durationMin}:${durationSec}`;
        }
        // if(currentMin && currentSec){
            
        // }
        // durationTrack.textContent = `${((parseInt(duration) / 60).toPrecision(3)).toString()}`;
        // currentTrackTime.textContent = `${().toString()}`
    }
}
//setProgress Bar
function setProgressBar (e){
    
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width)* duration ;
    playMusic()
}
//Mute Music 
function muteMusic (){
    muteBtn.classList.replace("fa-volume-mute","fa-volume-up")
    isMute = !isMute;
    music.muted = !music.muted
}
function unmuteMusic (){
    muteBtn.classList.replace("fa-volume-up","fa-volume-mute")
    isMute = !isMute;
    music.muted = !music.muted
}
//Event listener for prev next
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar)
progressContainer.addEventListener("click", setProgressBar)
music.addEventListener("ended", nextSong);
muteBtn.addEventListener("click", ()=>(isMute? unmuteMusic() : muteMusic()));
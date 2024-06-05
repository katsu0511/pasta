const fullAudio = new Audio('./mp3/full.mp3');
const pastaAudio = new Audio('./mp3/pasta.mp3');
const play = document.getElementById('play');
const back = document.getElementById('back');
const pause = document.getElementById('pause');
const forward = document.getElementById('forward');
const pasta = document.getElementById('pasta');
let duration;

const current = document.getElementById('current_time');
const playTime = document.getElementById('play_time');
const leftTime = document.getElementById('left_time');
const currentVolume = document.getElementById('current_volume');
const volumeMinus = document.getElementById('volume_minus');
const volumePlus = document.getElementById('volume_plus');
let positionOfVolume = 150;

fullAudio.addEventListener('loadedmetadata', () => {
  duration = Math.round(fullAudio.duration);
  leftTime.textContent = getMinutes(duration);
});

fullAudio.addEventListener('timeupdate', () => {
  const currentTime = Math.floor(fullAudio.currentTime);
  const leftDuration = duration - currentTime;
  const lengthOfTimeBar = 986;
  playTime.textContent = getMinutes(currentTime);
  leftTime.textContent = getMinutes(leftDuration);
  const lengthOfPlayTime = Math.round(currentTime / duration * lengthOfTimeBar);
  current.style.left = lengthOfPlayTime + 'px';
});

play.addEventListener('click', () => {
  if (play.classList.contains('play')) {
    changePlayToPause();
    enablePause();
    changePlayToStop();
    enableSkip();
    fullAudio.play();
  } else if (play.classList.contains('stop')) {
    changePlayToPause();
    disablePause();
    changeStopToPlay();
    disableSkip();
    fullAudio.pause();
    fullAudio.currentTime = 0;
  }
});

pause.addEventListener('click', () => {
  if (pause.classList.contains('pause')) {
    changePauseToPlay();
    fullAudio.pause();
  } else if (pause.classList.contains('play')) {
    changePlayToPause();
    fullAudio.play();
  }
});

pastaAudio.addEventListener('ended', () => {
  fullAudio.muted = false;
});

fullAudio.addEventListener('ended', () => {
  changeStopToPlay();
  disableSkip();
  disablePause();
  changePlayToPause();
  fullAudio.pause();
  fullAudio.currentTime = 0;
});

pasta.addEventListener('click', () => {
  fullAudio.muted = true;
  pastaAudio.play();
});

forward.addEventListener('click', () => {
  fullAudio.currentTime += 10;
});

back.addEventListener('click', () => {
  fullAudio.currentTime -= 10;
});

volumeMinus.addEventListener('click', () => {
  if (positionOfVolume !== 0) {
    positionOfVolume -= 30;
    changeVolume();
  }
});

volumePlus.addEventListener('click', () => {
  if (positionOfVolume !== 300) {
    positionOfVolume += 30;
    changeVolume();
  }
});

function getMinutes(second) {
  let minute = 0;
  while (second >= 60) {
    minute++;
    second -= 60;
  }
  if (second < 10) {
    second = '0' + second;
  }
  return minute + ':' + second;
}

function changePlayToStop() {
  play.classList.remove('play');
  play.classList.add('stop');
  play.value = '■';
}

function changeStopToPlay() {
  play.classList.remove('stop');
  play.classList.add('play');
  play.value = '>';
}

function disableSkip() {
  back.disabled = true;
  forward.disabled = true;
  back.classList.remove('enabled');
  back.classList.add('disabled');
  forward.classList.remove('enabled');
  forward.classList.add('disabled');
}

function enableSkip() {
  back.disabled = false;
  forward.disabled = false;
  back.classList.remove('disabled');
  back.classList.add('enabled');
  forward.classList.remove('disabled');
  forward.classList.add('enabled');
}

function disablePause() {
  pause.disabled = true;
  pause.classList.remove('enabled');
  pause.classList.add('disabled');
}

function enablePause() {
  pause.disabled = false;
  pause.classList.remove('disabled');
  pause.classList.add('enabled');
}

function changePlayToPause() {
  pause.classList.remove('play');
  pause.classList.add('pause');
  pause.value = '||';
}

function changePauseToPlay() {
  pause.classList.remove('pause');
  pause.classList.add('play');
  pause.value = '>';
}

function changeVolume() {
  currentVolume.style.left = positionOfVolume + 'px';
  const volume = positionOfVolume / 300;
  fullAudio.volume = volume;
  pastaAudio.volume = volume;
}

import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
  console.log('play the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const onPlay = throttle(function () {
  player.getCurrentTime().then(function (seconds) {
    localStorage.setItem('videoplayer-current-time', seconds);
  });
}, 1000);

player.on('timeupdate', onPlay);

const savedTime = localStorage.getItem('videoplayer-current-time');
if (savedTime) {
  player.setCurrentTime(savedTime).catch(function (error) {
    console.error('Error setting current time:', error);
  });
}

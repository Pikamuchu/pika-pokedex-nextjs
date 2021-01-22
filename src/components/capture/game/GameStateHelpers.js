import { getElementById, getFirstElement } from './GameElementsHelpers';
import { isTransformableElement, randomTransform, emitBallColisionParticles } from './GameEffectsHelpers';

export function createGameState(anime, ball, target, screen, audio, actions) {
  let gameRunning = 0;
  const isGameRunning = () => !!gameRunning;
  const isGameVisible = () => !!getElementById('target');

  const startGame = (events) => {
    gameRunning = 1;
    if (target.motion) {
      target.motion.play();
    }
    if (audio.music && audio.music.paused) {
      audio.music.muted = false;
      audio.music.loop = true;
      audio.music.play();
    }
    ballColisions();
  };

  const pauseGame = () => {
    gameRunning = 0;
    if (target.motion) {
      target.motion.pause();
    }
    if (audio.music) {
      audio.music.pause();
    }
  };

  const resetState = (events) => {
    ball.resetBall();
    getElementById('target').style.opacity = 1;
    // Adjust Ring
    const ring = getFirstElement('ring-fill');
    ring.style.height = '150px';
    ring.style.width = '150px';
    anime({
      targets: ['.ring-fill'],
      height: '5px',
      width: '5px',
      duration: 3000,
      loop: true,
      easing: 'linear'
    });
    startGame();
  };

  // Window events
  window.onresize = () => {
    screen.height = window.innerHeight;
    screen.width = window.innerWidth;
    resetState();
  };

  // Page visibility events
  document.addEventListener(
    'visibilitychange',
    () => {
      if (document.hidden) {
        pauseGame();
      } else {
        startGame();
      }
    },
    false
  );

  // ball colision events
  const ballColisions = () => {
    const elements = document.elementsFromPoint(ball.x, ball.y);
    elements.forEach((element) => {
      if (isTransformableElement(element)) {
        randomTransform(element);
        emitBallColisionParticles(anime, ball, element);
      }
    });
    if (isGameRunning() && isGameVisible()) {
      setTimeout(function () {
        ballColisions();
      }, 500);
    }
  };

  return {
    isGameRunning,
    isGameVisible,
    startGame,
    pauseGame,
    resetState
  };
}

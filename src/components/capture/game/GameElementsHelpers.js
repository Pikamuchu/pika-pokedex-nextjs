import { Resources } from './GameResourcesHelpers';

const BALL_DEFAULT_SIZE = 60;
const BALL_INITIAL_POSITION = 120;
const TARGET_DEFAULT_SIZE = 140;

export const createScreen = () => {
  return {
    height: window.innerHeight,
    width: window.innerWidth
  };
};

export const createAudio = () => {
  return {
    music: document.getElementById('game-music')
  };
};

export const createBall = (Screen) => {
  const ball = {
    id: 'ball',
    size: BALL_DEFAULT_SIZE,
    x: 0,
    y: 0,
    inMotion: false,
    moveBall: (x, y) => {
      ball.x = x;
      ball.y = y;
      const ballElement = getElementById(ball.id);
      if (ballElement) {
        ballElement.style.top = `${ball.y}px`;
        ballElement.style.left = `${ball.x}px`;
      }
    },
    moveBallDelta: (deltaX, deltaY) => {
      const x = ball.x + deltaX;
      const y = ball.y + deltaY;
      ball.moveBall(x, y);
    },
    moveBallPointer: (centerX, centerY) => {
      const x = centerX - ball.size / 2;
      const y = centerY - ball.size / 2;
      ball.moveBall(x, y);
    },
    getElement: () => {
      return getElementById(ball.id);
    },
    resetBall: () => {
      ball.moveBall(Screen.width / 2 - ball.size / 2, Screen.height - (ball.size + BALL_INITIAL_POSITION));
      const ballElement = getElementById(ball.id);
      if (ballElement) {
        ballElement.style.transform = '';
        ballElement.style.height = `${ball.size}px`;
        ballElement.style.width = `${ball.size}px`;
        ballElement.style.backgroundImage = `url('${Resources.pikaball}')`;
      }
      ball.inMotion = false;
    },
    savePosition: () => {
      const ballElement = getElementById(ball.id);
      if (ballElement) {
        const ballRect = ballElement.getBoundingClientRect();
        ballElement.style.transform = '';
        ballElement.style.top = `${ballRect.top}px`;
        ballElement.style.left = `${ballRect.left}px`;
        ballElement.style.height = `${ballRect.width}px`;
        ballElement.style.width = `${ballRect.width}px`;
      }
    }
  };
  return ball;
};

export const createTarget = (anime, pokemon) => {
  const target = {
    id: 'target',
    size: TARGET_DEFAULT_SIZE,
    getElement: () => {
      return getElementById(target.id);
    }
  };
  const targetElement = target.getElement();
  targetElement.style.backgroundImage = `url('${pokemon.image}')`;
  if (pokemon.imageRatio > 1) {
    targetElement.style.height = `${target.size * pokemon.imageRatio}px`;
  }
  // Move pokemon through path
  const path = anime.path('.motion-path path');
  target.motion = anime({
    targets: '.target',
    translateX: path('x'),
    translateY: path('y'),
    rotate: 20,
    easing: 'easeInOutQuad',
    duration: 10000,
    loop: true,
    direction: 'alternate',
    autoplay: false
  });
  return target;
};

export const getElementById = (id) => document.getElementById(id);

export const getFirstElement = (className) => document.getElementsByClassName(className)[0];

export const getCenterCoords = (elementId) => {
  const rect = getElementById(elementId).getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
};

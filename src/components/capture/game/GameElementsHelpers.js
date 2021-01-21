import { Resources } from './GameResourcesHelpers';

const INITIAL_BALL_POSITION = 120;
const TARGET_DEFAULT_SIZE = 140;

export const createBall = (Screen) => {
  const Ball = {
    id: 'ball',
    size: 60,
    x: 0,
    y: 0,
    inMotion: false,
    moveBall: (x, y) => {
      Ball.x = x;
      Ball.y = y;
      const BallElement = getElementById(Ball.id);
      if (BallElement) {
        BallElement.style.top = `${Ball.y}px`;
        BallElement.style.left = `${Ball.x}px`;
      }
    },
    moveBallDelta: (deltaX, deltaY) => {
      const x = Ball.x + deltaX;
      const y = Ball.y + deltaY;
      Ball.moveBall(x, y);
    },
    moveBallPointer: (centerX, centerY) => {
      const x = centerX - Ball.size / 2;
      const y = centerY - Ball.size / 2;
      Ball.moveBall(x, y);
    },
    getElement: () => {
      return getElementById(Ball.id);
    },
    resetBall: () => {
      Ball.moveBall(Screen.width / 2 - Ball.size / 2, Screen.height - (Ball.size + INITIAL_BALL_POSITION));
      const BallElement = getElementById(Ball.id);
      if (BallElement) {
        BallElement.style.transform = '';
        BallElement.style.height = `${Ball.size}px`;
        BallElement.style.width = `${Ball.size}px`;
        BallElement.style.backgroundImage = `url('${Resources.pikaball}')`;
      }
      Ball.inMotion = false;
    },
    savePosition: () => {
      const ballEle = getElementById(Ball.id);
      if (ballEle) {
        const ballRect = ballEle.getBoundingClientRect();
        ballEle.style.transform = '';
        ballEle.style.top = `${ballRect.top}px`;
        ballEle.style.left = `${ballRect.left}px`;
        ballEle.style.height = `${ballRect.width}px`;
        ballEle.style.width = `${ballRect.width}px`;
      }
    }
  };
  return Ball;
};

export const createTarget = (anime, pokemon) => {
  const target = getElementById('target');
  target.style.backgroundImage = `url('${pokemon.image}')`;
  if (pokemon.imageRatio > 1) {
    target.style.height = `${TARGET_DEFAULT_SIZE * pokemon.imageRatio}px`;
  }
  // Move pokemon through path
  const path = anime.path('.motion-path path');
  const motion = anime({
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
  return {
    motion
  };
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

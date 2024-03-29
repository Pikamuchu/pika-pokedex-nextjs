import { Resources } from './GameResourcesHelpers';
import { getElementById, getFirstElement, getCenterCoords, clearContainerElement } from './GameUtils';
import { elementShrinkEffect, moveElementThroughPath, removeElementAnimation } from './GameEffectsHelpers';

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
    music: getElementById('game-music')
  };
};

export const createBall = (screen) => {
  const ball = {
    id: 'ball',
    size: BALL_DEFAULT_SIZE,
    x: 0,
    y: 0,
    inMotion: false,
    colision: false,
    bouncing: 0,
    getElement: () => {
      return getElementById(ball.id);
    },
    getCenterCoords: () => {
      return getCenterCoords(ball.id);
    },
    getCurrentSize: () => {
      const ballElement = getElementById(ball.id);
      return ballElement.style.height ? ballElement.style.height.replace('px', '') : ball.size;
    },
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
    resetBall: () => {
      ball.moveBall(screen.width / 2 - ball.size / 2, screen.height - (ball.size + BALL_INITIAL_POSITION));
      const ballElement = getElementById(ball.id);
      if (ballElement) {
        ballElement.style.opacity = 1;
        ballElement.style.transform = '';
        ballElement.style.height = `${ball.size}px`;
        ballElement.style.width = `${ball.size}px`;
        ballElement.style.backgroundImage = `url('${Resources.pikaball}')`;
      }
      ball.inMotion = false;
      ball.colision = false;
      ball.bouncing = 0;
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

export const createTarget = (pokemon, screen) => {
  const target = {
    id: 'target',
    size: TARGET_DEFAULT_SIZE,
    captured: false,
    attacks: pokemon.gameConfig?.attacks,
    numAttacks: 0,
    level: 0,
    attackDelay: 10,
    attackBurst: 1,
    getMaxSuccessRate: () => {
      return (pokemon.gameConfig?.maxSuccesRate || 100) - target.level;
    },
    getElement: () => {
      return getElementById(target.id);
    },
    getCenterCoords: () => {
      return getCenterCoords(target.id);
    },
    getRadius: () => {
      return getElementById(target.id).getBoundingClientRect().width / 2;
    },
    getAttackType: () => {
      return target.attacks ? target.attacks[target.level]?.type : null;
    },
    getAttackImage: () => {
      return target.attacks ? target.attacks[target.level]?.images[0] : null;
    },
    resetTarget: () => {
      // Init target state
      target.captured = false;
      target.numAttacks = 0;
      // Initialize target image
      const targetElement = target.getElement();
      if (targetElement) {
        targetElement.style.backgroundImage = `url('${pokemon.image}')`;
        if (pokemon.imageRatio > 1) {
          targetElement.style.height = `${target.size * pokemon.imageRatio}px`;
        }
        targetElement.style.opacity = 1;
      }
      // Adjust Ring
      const ring = getFirstElement('ring-fill');
      if (ring) {
        ring.style.height = '150px';
        ring.style.width = '150px';
        elementShrinkEffect(ring);
      }
      // Initialize motion
      removeElementAnimation(targetElement);
      target.motion = moveElementThroughPath(targetElement, '.motion-path path', screen);
      target.motion.play();
      // Remove attacks
      const attackContainer = getFirstElement('attack-container');
      if (attackContainer) {
        clearContainerElement(attackContainer);
      }
    }
  };
  // Initialize motion
  target.motion = moveElementThroughPath(target.getElement(), '.motion-path path', screen);
  return target;
};

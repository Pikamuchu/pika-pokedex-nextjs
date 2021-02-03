import { Resources } from './GameResourcesHelpers';
import { getElementById, getFirstElement, getCenterCoords, clearContainerElement } from './GameUtils';
import { elementShrinkEffect, moveElementThroughPath } from './GameEffectsHelpers';

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

export const createTarget = (pokemon) => {
  const target = {
    id: 'target',
    size: TARGET_DEFAULT_SIZE,
    captured: false,
    attacks: pokemon.gameConfig?.attacks,
    numAttacks: 0,
    getElement: () => {
      return getElementById(target.id);
    },
    getCenterCoords: () => {
      return getCenterCoords(target.id);
    },
    getRadius: () => {
      return getElementById(target.id).getBoundingClientRect().width / 2;
    },
    resetTarget: () => {
      // Init target state
      target.captured = false;
      target.numAttacks = 0;
      // Initialize target image
      const targetElement = target.getElement();
      targetElement.style.backgroundImage = `url('${pokemon.image}')`;
      if (pokemon.imageRatio > 1) {
        targetElement.style.height = `${target.size * pokemon.imageRatio}px`;
      }
      targetElement.style.opacity = 1;
      // Adjust Ring
      const ring = getFirstElement('ring-fill');
      ring.style.height = '150px';
      ring.style.width = '150px';
      elementShrinkEffect(ring);
      // Remove attacks
      const attackContainer = getFirstElement('attack-container');
      clearContainerElement(attackContainer);
    }
  };
  target.motion = moveElementThroughPath(target.getElement(), '.motion-path path');
  return target;
};

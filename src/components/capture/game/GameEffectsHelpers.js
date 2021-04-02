import anime from 'animejs/lib/anime.es.js';

import { getFirstElement, getRandomNumber, getCenterCoords } from './GameUtils';

const NUM_COLISION_PARTICLES = 10;

export const emitBallColisionParticles = (ball, element, completeCallback) => {
  const ballCoords = ball.getCenterCoords();
  const colisionCoords = {
    x: ballCoords.x,
    y: ballCoords.y
  };
  const palette = ['#000000', '#FAD61D', '#E19720', '#F62D14', '#811E09'];
  const particleContainer = getFirstElement('particle-container');
  for (let i = 0; i < NUM_COLISION_PARTICLES; i++) {
    const particleElement = document.createElement('div');
    particleElement.className = 'particle';
    particleElement.setAttribute('id', `particle-${i}`);
    particleElement.style.left = `${colisionCoords.x}px`;
    particleElement.style.top = `${colisionCoords.y}px`;
    particleElement.style.backgroundColor = palette[getRandomNumber(0, palette.length)];
    particleContainer.appendChild(particleElement);
    anime({
      targets: [particleElement],
      translateX: {
        value: getRandomNumber(-60, 60),
        delay: 100
      },
      translateY: {
        value: getRandomNumber(-60, 60),
        delay: 100
      },
      opacity: {
        value: 0,
        delay: 100,
        duration: 800,
        easing: 'easeInSine'
      },
      complete: (anim) => {
        removeElementAnimation(particleElement, true);
        if (completeCallback) {
          completeCallback(anim);
        }
      }
    });
  }
};

export const dropElementEffect = (element, completeCallback) => {
  anime({
    targets: [element],
    translateY: {
      value: '200px',
      delay: 400,
      duration: 400,
      easing: 'linear'
    },
    complete: (anim) => {
      removeElementAnimation(element);
      if (completeCallback) {
        completeCallback(anim);
      }
    }
  });
};

export const fadeElementEffect = (element, completeCallback) => {
  anime({
    targets: [element],
    opacity: {
      value: 0,
      delay: 200,
      easing: 'easeInSine'
    },
    complete: (anim) => {
      removeElementAnimation(element);
      if (completeCallback) {
        completeCallback(anim);
      }
    }
  });
};

export const emitParticlesToElementEffect = (
  element,
  elementSize,
  targetCoords,
  particleContainer,
  completeCallback
) => {
  const NUM_PARTICLES = 50;
  const elementRect = element.getBoundingClientRect();
  const palette = ['#E4D3A8', '#6EB8C0', '#FFF', '#2196F3'];
  for (let i = 0; i < NUM_PARTICLES; i++) {
    const particleElement = document.createElement('div');
    particleElement.className = 'particle';
    particleElement.setAttribute('id', `particle-${i}`);
    const particleLeft = getRandomNumber(-60, 60) + targetCoords.x;
    particleElement.style.left = `${particleLeft}px`;
    const particleRight = getRandomNumber(-60, 60) + targetCoords.y;
    particleElement.style.top = `${particleRight}px`;
    particleElement.style.backgroundColor = palette[getRandomNumber(0, palette.length)];
    particleContainer.appendChild(particleElement);
    anime({
      targets: [`#particle-${i}`],
      translateX: {
        value: elementRect.left - particleLeft,
        delay: 100 + i * 10
      },
      translateY: {
        value: elementRect.top + elementSize / 2 - particleRight,
        delay: 100 + i * 10
      },
      opacity: {
        value: 0,
        delay: 100 + i * 10,
        duration: 800,
        easing: 'easeInSine'
      },
      complete: (anim) => {
        removeElementAnimation(particleElement, true);
        if (i === (NUM_PARTICLES - 1) && completeCallback) {
          completeCallback(anim);
        }
      }
    });
  }
};

export const shakeEffect = (element, duration, completeCallback) => {
  anime({
    targets: [element],
    rotate: 40,
    duration,
    easing: 'easeInOutBack',
    loop: true,
    direction: 'alternate',
    complete: (anim) => {
      removeElementAnimation(element);
      if (completeCallback) {
        completeCallback(anim);
      }
    }
  });
};

export const moveElementAsideEffect = (element, distance, orientation, completeCallback) => {
  anime({
    targets: [element],
    translateY: {
      value: -1.15 * distance,
      duration: 200,
      easing: 'linear'
    },
    translateX: {
      value: 1.15 * distance * orientation,
      duration: 200,
      easing: 'linear'
    },
    scaleX: {
      value: orientation,
      duration: 200
    },
    complete: (anim) => {
      removeElementAnimation(element);
      if (completeCallback) {
        completeCallback(anim);
      }
    }
  });
};

export const throwEffect1 = (element, translateXValue, movementY, scalePercent, completeCallback) => {
  anime({
    targets: [element],
    translateX: {
      value: translateXValue,
      duration: 300,
      easing: 'easeOutSine'
    },
    translateY: {
      value: movementY * 1.25,
      duration: 300,
      easing: 'easeOutSine'
    },
    scale: {
      value: 1 - 0.75 * scalePercent,
      duration: 300,
      easing: 'easeInSine'
    },
    complete: (anim) => {
      removeElementAnimation(element);
      if (completeCallback) {
        completeCallback(anim);
      }
    }
  });
};

export const throwEffect2 = (element, movementY, translateXValue, scalePercent, completeCallback) => {
  anime({
    targets: [element],
    translateX: {
      value: -translateXValue * 0.25,
      duration: 400,
      easing: 'linear'
    },
    translateY: {
      value: movementY * -0.5,
      duration: 400,
      easing: 'easeInOutSine'
    },
    scale: {
      value: 1 - 0.5 * scalePercent,
      easing: 'easeInSine',
      duration: 400
    },
    complete: (anim) => {
      removeElementAnimation(element);
      if (completeCallback) {
        completeCallback(anim);
      }
    }
  });
};

export const throwAttackEffect = (element, translateX, translateY, scalePercent, duration, completeCallback) => {
  anime({
    targets: [element],
    translateX: {
      value: translateX + getRandomNumber(-90, 90),
      duration: duration,
      easing: 'easeOutSine'
    },
    translateY: {
      value: translateY + getRandomNumber(0, 120),
      duration: duration,
      easing: 'easeOutSine'
    },
    rotate: {
      value: 360,
      easing: 'easeInSine',
      duration: duration
    },
    scale: {
      value: 1 + 0.25 * scalePercent,
      easing: 'easeInSine',
      duration: duration
    },
    complete: (anim) => {
      removeElementAnimation(element, true);
      if (completeCallback) {
        completeCallback(anim);
      }
    }
  });
};

export const removeElementAnimation = (element, isRemoveElement) => {
  anime.remove(element);
  if (isRemoveElement) {
    element.remove()
  }
};

export const poofEffect = (poofElement, hideEscapeAnimation) => {
  anime({
    targets: [poofElement],
    scale: {
      value: 20,
      delay: 0,
      easing: 'linear',
      duration: 500
    },
    complete: (anim) => {
      removeElementAnimation(poofElement);
      setTimeout(() => {
        hideEscapeAnimation();
      }, 500);
    }
  });
};

export const restoreBallEffect = (ball) => {
  const ballElement = ball.getElement();
  anime({
    targets: [ballElement],
    opacity: {
      value: 0,
      delay: 0,
      easing: 'easeInSine',
      duration: 500
    },
    complete: (anim) => {
      removeElementAnimation(ballElement);
      ball.resetBall();
    }
  });
};

export const moveElementToCoords = (element, coords, duration, scalePercent, completeCallback) => {
  const translateY = 0;
  const translateX = 0;
  anime({
    targets: [element],
    translateY: {
      value: translateY,
      duration: duration || 400,
      easing: 'linear'
    },
    translateX: {
      value: translateX,
      duration: duration || 400,
      easing: 'linear'
    },
    scale: {
      value: 1 - 0.25 * (scalePercent || 0),
      easing: 'easeInSine',
      duration: 400
    },
    complete: (anim) => {
      removeElementAnimation(element, true);
      if (completeCallback) {
        completeCallback(anim);
      }
    }
  });
};

export const rainConfettiEffect = (container, completeCallback) => {
  const NUM_PARTICLES = 100;
  for (let i = 0; i < NUM_PARTICLES; i++) {
    const particleElement = document.createElement('div');
    particleElement.className = 'particle';
    particleElement.setAttribute('id', `particle-${i}`);
    const particleLeft = window.innerWidth / 2;
    particleElement.style.left = `${particleLeft}px`;
    const particleTop = window.innerHeight / 2;
    particleElement.style.top = `${particleTop}px`;
    particleElement.style.backgroundColor = getRandomNumber(0, 2) ? '#FFF' : '#4aa6fb';
    container.appendChild(particleElement);
    anime({
      targets: [particleElement],
      translateX: {
        value: (getRandomNumber(0, 2) ? -1 : 1) * getRandomNumber(0, window.innerWidth / 2),
        delay: 100
      },
      translateY: {
        value: (getRandomNumber(0, 2) ? -1 : 1) * getRandomNumber(0, window.innerHeight / 2),
        delay: 100
      },
      opacity: {
        value: 0,
        duration: 800,
        easing: 'easeInSine'
      },
      complete: (anim) => {
        removeElementAnimation(particleElement, true);
        if (i === (NUM_PARTICLES - 1) && completeCallback) {
          completeCallback(anim);
        }
      }
    });
  }
};

export const elementShrinkEffect = (element, completeCallback) => {
  anime({
    targets: [element],
    height: '5px',
    width: '5px',
    duration: 3000,
    loop: true,
    easing: 'linear',
    complete: (anim) => {
      removeElementAnimation(element, true);
      if (completeCallback) {
        completeCallback(anim);
      }
    }
  });
};

export const moveElementThroughPath = (element, path, screen) => {
  if (path) {
    const animePath = anime.path(path);
    if (animePath) {
      return anime({
        targets: [element],
        translateX: animePath('x'),
        translateY: animePath('y'),
        easing: 'easeInOutQuad',
        duration: 10000,
        loop: true,
        direction: 'alternate',
        autoplay: false,
        update: () => {
          updateElement3DEffectTransform(element, screen);
        }
      });
    }
  }
};

const updateElement3DEffectTransform = (element, screen) => {
  const position = getCenterCoords(element);
  const xAxis = (screen.width / 2 - position.x) / 10;
  const yAxis = (screen.height / 2 - position.y) / 20;
  const scale = 1.5 - (screen.height - position.y) / screen.height;
  element.style.transform += `rotateY(${-xAxis}deg) rotateX(${-yAxis}deg) scale(${scale})`;
};

export const translateElementToCoords = (element, coords) => {};

export function createGameState(ball, target, screen, audio) {
  let gameRunning = 0;
  const isGameRunning = () => !!gameRunning;
  const isGameVisible = () => !!target.getElement();

  let gameEvents = [];
  const addGameEvent = (eventFunction) => {
    if (typeof eventFunction === 'function') {
      gameEvents.push(eventFunction);
    }
  };
  const startGameEvents = () => {
    gameEvents.forEach((eventFunction) => eventFunction());
  };

  const startGame = () => {
    resetState();
    if (target.motion) {
      target.motion.play();
    }
    if (audio.music && audio.music.paused) {
      audio.music.muted = false;
      audio.music.loop = true;
      audio.music.play();
    }
    startGameEvents();
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

  const resumeGame = () => {
    gameRunning = 1;
    if (target.motion) {
      target.motion.play();
    }
    if (audio.music) {
      audio.music.play();
    }
    startGameEvents();
  };

  const resetState = () => {
    gameRunning = 1;
    ball.resetBall();
    target.resetTarget();
  };

  return {
    isGameRunning,
    isGameVisible,
    addGameEvent,
    startGame,
    resumeGame,
    pauseGame,
    resetState
  };
}

export const SCALE_GAME = 0.25;
export const WIDTH_GAME = 3508 * SCALE_GAME;
export const HEIGHT_GAME = 2480 * SCALE_GAME;

export const PADDING = {
  x: 51,
  y: 45.5,
};

export const POSITION_BLAST = {
  x: 940,
  y: 1340,
};

export const POSITION_PROGRESS = {
  x: 2740,
  y: 1060,
};

export const STYLE_COMMON = {
  fontFamily: 'marvinFont',
  color: '#fff',
  align: 'center',
};

export const BUTTON_STYLE = 280;

export const SCORE_STYLE = 140;

export const SCORE_TITLE_STYLE = 80;

export const MOVE_STYLE = 232;

export const PROGRESS_TITLE_STYLE = 68;

export const GAME_BACKGROUND = '#A3A3A3';
export const COLOR_BACKGROUND = '#0D233D';

export const PARTICLE_VERTICAL = {
  speed: 40,
  lifespan: 800,
  color: [0xfacc25, 0xf89800, 0xf83600, 0x9f0404],
  blendMode: 'ADD',
  maxParticles: 100,
  quantity: 10,
  scale: { start: SCALE_GAME / 2, end: 0 },
  advance: 200,
  duration: 300,
  emitting: false,
};

export const PARTICLE_HORIZONTAL = {
  speed: 40,
  lifespan: 800,
  color: [0xfacc25, 0xf89800, 0xf83600, 0x9f0404],
  blendMode: 'ADD',
  maxParticles: 100,
  quantity: 10,
  scale: { start: SCALE_GAME / 2, end: 0 },
  advance: 200,
  duration: 300,
  emitting: false,
};

export const PARTICLE_BOMB = {
  speed: 200,
  lifespan: 700,
  color: [0xfacc25, 0xf89800, 0xf83600, 0x9f0404],
  blendMode: 'ADD',
  angle: { min: 0, max: 360 },
  maxParticles: 50,
  scale: { start: SCALE_GAME, end: 0, ease: 'sine.out' },
  advance: 2500,
  emitting: false,
};

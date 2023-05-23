import {Point} from '@/types/@bodyGraph';

export const allPointsCoordsOriginal = {
  1: {
    x: 191.8,
    y: 268,
  },
  2: {
    x: 191.8,
    y: 360,
  },
  3: {
    x: 191.8,
    y: 492,
  },
  4: {
    x: 213,
    y: 89,
  },
  5: {
    x: 177,
    y: 423,
  },
  6: {
    x: 316,
    y: 451,
  },
  7: {
    x: 177,
    y: 283,
  },
  8: {
    x: 191.8,
    y: 246,
  },
  9: {
    x: 206,
    y: 492,
  },
  10: {
    x: 146,
    y: 317,
  },
  11: {
    x: 206,
    y: 133,
  },
  12: {
    x: 226,
    y: 229,
  },
  13: {
    x: 206,
    y: 283,
  },
  14: {
    x: 191.8,
    y: 423,
  },
  15: {
    x: 177,
    y: 347,
  },
  16: {
    x: 157,
    y: 213,
  },
  17: {
    x: 177,
    y: 133,
  },
  18: {
    x: 15,
    y: 484,
  },
  19: {
    x: 226,
    y: 521,
  },
  20: {
    x: 157,
    y: 239,
  },
  21: {
    x: 270,
    y: 347,
  },
  22: {
    x: 353,
    y: 427,
  },
  23: {
    x: 191.8,
    y: 177,
  },
  24: {
    x: 191.8,
    y: 89,
  },
  25: {
    x: 231,
    y: 323,
  },
  26: {
    x: 239,
    y: 385,
  },
  27: {
    x: 157,
    y: 463,
  },
  28: {
    x: 31,
    y: 472,
  },
  29: {
    x: 206,
    y: 423,
  },
  30: {
    x: 369,
    y: 484,
  },
  31: {
    x: 177,
    y: 246,
  },
  32: {
    x: 50,
    y: 463,
  },
  33: {
    x: 206,
    y: 246,
  },
  34: {
    x: 157,
    y: 436,
  },
  35: {
    x: 226,
    y: 213,
  },
  36: {
    x: 369,
    y: 418,
  },
  37: {
    x: 338,
    y: 436,
  },
  38: {
    x: 157,
    y: 543,
  },
  39: {
    x: 226,
    y: 543,
  },
  40: {
    x: 312,
    y: 397,
  },
  41: {
    x: 226,
    y: 563,
  },
  42: {
    x: 177,
    y: 492,
  },
  43: {
    x: 191.8,
    y: 158,
  },
  44: {
    x: 50,
    y: 436,
  },
  45: {
    x: 226,
    y: 246,
  },
  46: {
    x: 206,
    y: 347,
  },
  47: {
    x: 169,
    y: 89,
  },
  48: {
    x: 15,
    y: 415,
  },
  49: {
    x: 338,
    y: 463,
  },
  50: {
    x: 69,
    y: 451,
  },
  51: {
    x: 256,
    y: 363,
  },
  52: {
    x: 206,
    y: 510,
  },
  53: {
    x: 177,
    y: 510,
  },
  54: {
    x: 157,
    y: 521,
  },
  55: {
    x: 353,
    y: 472,
  },
  56: {
    x: 206,
    y: 177,
  },
  57: {
    x: 31,
    y: 423,
  },
  58: {
    x: 157,
    y: 563,
  },
  59: {
    x: 226,
    y: 463,
  },
  60: {
    x: 191.8,
    y: 510,
  },
  61: {
    x: 191.8,
    y: 72,
  },
  62: {
    x: 177,
    y: 177,
  },
  63: {
    x: 213,
    y: 72,
  },
  64: {
    x: 169,
    y: 72,
  },
  nodeTop: {
    x: 99,
    y: 324,
  },
  nodeBottom: {
    x: 69,
    y: 367,
  },
};

export type pointsUnion = keyof typeof allPointsCoordsOriginal;

const allPointsIds = Object.keys(allPointsCoordsOriginal);

export const allPointsCoords = allPointsIds.reduce((acc, pointID) => {
  const point = allPointsCoordsOriginal[pointID as pointsUnion];

  return {
    ...acc,
    [pointID]: {
      x: Math.round(point.x * 2),
      y: Math.round(point.y * 2),
    },
  };
}, {}) as {[Property in pointsUnion]: Point};

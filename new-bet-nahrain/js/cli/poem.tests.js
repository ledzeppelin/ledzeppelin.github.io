/* eslint-disable no-console */

const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

const {
  poemTranslation,
} = require('../consts/poem-translation');

const {
  findLastIndexSmallerThan,
  generateStartTimes,
} = require('../functions');

let anyErrors = false;

const numSectionsCond = poemTranslation.length === 4;
console.assert(numSectionsCond, '4 sections');
if (!numSectionsCond) { anyErrors = true; }

poemTranslation.forEach((section, i) => {
  const numLinesCond = section.lines.length === 16;
  console.assert(numLinesCond, '%o', { actual: section.lines.length, expected: 16, section: i });
  if (!numLinesCond) { anyErrors = true; }
});

const startTimes = generateStartTimes(poemTranslation);
const numLinesTotalCond = startTimes.length === 64;
console.assert(numLinesTotalCond, '64 lines');
if (!numLinesTotalCond) { anyErrors = true; }

if (anyErrors) {
  throw new Error('Fix errors');
}

function validateLyricTimestamp(duration) {
  // console.log(duration);
  const examples = [
    [0, -1],
    [Math.min(startTimes), -1],
    [0.01, 0],
    [duration, 63],
    [duration - 0.01, 63],
    [duration + 100, 63],
    [31.97, 15],
    [31.97 + 0.01, 16],
  ];

  examples.forEach((pair) => {
    const [currentTime, expected] = pair;
    const actual = findLastIndexSmallerThan(startTimes, currentTime);
    console.assert(actual === expected, '%o', { actual, expected });
    if (actual !== expected) { throw new Error('err'); }
  });
}

const filePath = path.join(__dirname, '../../audio/new_bet_nahrain_5dB-trim.m4a'); // Replace 'yourfile.m4a' with your actual file name
ffmpeg.ffprobe(filePath, (err, metadata) => {
  if (err) {
    throw new Error(err);
  } else {
    const { duration } = metadata.format;
    validateLyricTimestamp(duration);
  }
});

const AWS = require('aws-sdk');
const fs = require('fs');
const { AssyrianText } = require('./aii2ipa');

const aiiBible = JSON.parse(fs.readFileSync('./aii-bible.json'));

// Create an Polly client
const polly = new AWS.Polly({
  signatureVersion: 'v4',
  region: 'us-east-1',
});

if (!process.env.AWS_ACCESS_KEY_ID) {
  throw Error('AWS_ACCESS_KEY_ID not set');
}

if (!process.env.AWS_SECRET_ACCESS_KEY) {
  throw Error('AWS_SECRET_ACCESS_KEY not set');
}

function ipaToSSML(ipa) {
  const phoneme = `<phoneme alphabet="ipa" ph='${ipa}'/>`;
  return `<speak><prosody rate="slow">${phoneme}</prosody></speak>`;
}

// Generate audio from Polly and check if output is a Buffer
const generatePollyAudio = (ssml) => {
  // de-DE 'Vicki'
  // de-AT 'Hannah'
  // en-US 'Joanna'
  // en-ZA 'Ayanda' good for ܬܠܝܼܩܹ̈ܐ tliqe
  // ca-ES 'Arlet'
  // es-ES 'Lucia'
  // es-MX 'Mia'
  // es-US 'Lupe'

  // console.log(ssml);
  const params = {
    Engine: 'neural',
    Text: ssml,
    OutputFormat: 'mp3',
    TextType: 'ssml',
    VoiceId: 'Vicki',
  };

  return polly.synthesizeSpeech(params).promise().then((audio) => {
    if (audio.AudioStream instanceof Buffer) return audio;
    return null;
  });
};

const ipaToSpeech = async (filename, ipa) => {
  try {
    const ssml = ipaToSSML(ipa);
    const audio = await generatePollyAudio(ssml);

    const filePath = `../mp3s/${filename.replace(':', '.')}.mp3`;
    await fs.promises.writeFile(filePath, audio.AudioStream);
    return filePath;
  } catch (e) {
    console.log(e.errorCode);
    console.log(e.error);
    console.log(e.errorCode);
    return null;
  }
};

async function textToSpeech() {
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, aii] of Object.entries(aiiBible)) {
    try {
      const { ipa } = AssyrianText(aii);

      // eslint-disable-next-line no-await-in-loop
      await ipaToSpeech(key, ipa);
      console.log(key, ipa);
    } catch (error) {
      console.log(`error: ${error}`);
    }
  }
}

textToSpeech();

/* eslint-disable quotes */
const truSentences = [
  "ܘܒܰܟ݂ ܟ݂ܰܕܳܡܶܐ ܕܟܳܟ݂ܘܕܡܝ ܐܝ ܢܳܫܘܬ݂ܐ ܟܘܠܰܗ ܕܠܐ ܦܘܪܫܳܢܐ",
  "ܚܦܷܪܠܶܗ ܬܠܰܬ݂ ܥܰܝܢܳܬ݂ܶܐ ܕܰܡ ܡܰܝܶܐ ܡܶܐ ܬܰܚܬܰܐ ܕܝ ܐܰܪܥܐ",
  "ܒܷܬܷ݂ܪ ܒܫܰܬܐ ܡܰܪܟܰܘܠܶܗ ܣܝܣܬܶܡ ܕܝ ܚܙܰܝܬܐ ܛܰܘ ܡܝ ܩܰܡܰܝܬܐ",
  "ܒܘ ܒܰܝܬܐ ܐܝܢܰܩܠܰܐ ܕܗܳܘܶܘܰܝܠܶܗ ܙܰܒܢܐ ܡܔܰܪܰܒ ܘܰܐ ܡܶܕܳܢܶܐ",
  "ܘܗܰܬ݂ܶܐ ܗܰܘܝܐ ܣܰܒܰܦ݁ ܠܝ ܥܡܰܪܰܐ ܕܝ ܕܰܝܪܐ ܕܡܳܪܝ ܓܰܒܪܐܶܝܠ",
  "ܘܐܘ ܠܰܠܝܐ ܟܘܠܶܗ ܡܰܫܰܦܥܝܘܰܝܠܶܗ ܒܘ ܫܰܗܪܐ ܟ݂ܘܕ ܐܰܫ ܫܠܝܚܶܐ",
  "ܟܷܬܘܰܠܠܶܗ ܩܛܳܪܐ ܥܶܠܳܝܐ ܓ݂ܰܠܰܒܶܐ ܫܰܦܝܪܐ ܕܗܶܫ ܠܐ ܢܰܦܷܠܘܰܐ",
  "ܒܘ ܫܰܟܠܰܢܐ ܗܰܢܝ ܫܰܬܐ ܣܷܡܠܶܗ ܬܰܬ݂ܝܪ ܥܰܠ ܟܘܠܰܗ ܐܝ ܢܳܫܘܬ݂ܐ",
  "ܐܰܢ ܢܳܫܶܐ ܣܬܶܐ ܟܘܠܠܶܗ ܟܳܢܷܛܪܝ ܕܚܳܙܷܢ ܐܝ ܦܰܝܕܰܐ ܕܝ ܡܚܰܛܐ",
  "ܐܰܝܢܰܐ ܪܝܫܳܢܐ ܕܟܳܐܬ݂ܶܐ ܠܡܷܕ݂ܝܰܕ݂ ܟܳܐܬܶܐ ܠܝ ܕܷܟܟܰܢܰܝܕ݂ܰܢ",
  "ܡܰܣܪܰܚ ܕܰܝܪܳܝܐ ܒܐܝܕ݂ܶܗ ܕܡܳܪܝ ܛܝܡܳܬ݂ܶܐܘܳܣ ܫܡܘܐܶܝܠ ܐܰܩܛܰܫ",
  "ܘܠܚܰܡܷܫܡܐ ܘܐܷܫܬܝ ܒܘ ܙܰܒܢܐ ܕܡܳܪܝ ܫܶܡܥܘܢ ܐܘ ܬܰܠܡܝܕ݂ܰܝܕ݂ܶܗ",
  "ܒܷܬ݂ܷܪ ܦܪܝܫܢܐ ܘܥܰܒܷܪܢܐ ܠܰܩ ܩܶܠܳܝܳܬ݂ܶܐ ܘܟܳܪܰܟ݂ܢܐ ܐܝ ܕܰܝܪܐ",
  "ܡܰܚܟܝܰܠܟ݂ܘ ܥܰܠ ܬܪܶܐ ܡܰܣ  ܣܝܣܬܰܡܰܝܕ݂ܰܢ ܚܰܐ ܡܷܢܢܷܗ ܗܰܢܐ ܝܐ",
  "ܘܓ݂ܰܠܰܒܶܐ ܡܰܕ ܕܘܟܰܢܶܐ ܕܷܦܬܝܚ ܣܬܶܐ ܒܟܘܠ ܡܶܕܶܐ ܡܥܰܘܰܢܠܶܠܷܢ",
  "ܘܦܰܐܝܫܐ ܣܟ݂ܷܪܬܐ ܗܘܠ ܠܰܦ ܐܝ ܫܰܬܐ ܕܰܐܢ ܐܰܠܦܐ ܬܫܰܥܡܐ ܘܚܰܡܫܝ",
  "ܐܘ ܚܰܐ ܕܟܳܐܬ݂ܶܐ ܠܓܳܪܰܢ ܕܘ ܝܘܠܦܳܢܐ ܕܟܷܬܠܶܗ ܟܳܡܳܝܰܕ ܗܷܪܓܶܐ",
  "ܡܬܰܪܓܰܡܡܶܗ ܐܘ ܡܓܰܠܝܘܢ ܘܐܘ ܦܷܠܝܡ ܕܷܡܫܝܚܐ ܠܘ ܠܶܫܳܢܐ ܛܘܪܳܝܐ",
  "ܦܰܐܝܫܝ ܬܰܡܐ ܐܘ ܠܰܠܝܰܘܐ ܠܰܫܰܢ ܕܡܷܬ݂ܢܳܚܝ ܡܘ ܬܰܥܒܐ ܕܘ ܕܰܪܒܐ",
  "ܗܘܠ ܐܘܥܕܐ ܐܰܥ ܥܰܠܰܡܰܬ ܕܘ ܟܶܘܐ ܕܟܳܡܰܚܘܷܢ ܒܰܢ ܢܳܫܶܐ ܗܰܢܝܢܶܗ",
  "ܘܒܕܰܠܠܶܗ ܕܡܶܐ ܚܰܬ݂ܐ ܣܘܟ݂ܪܝ ܐܰܡ ܡܰܕܷܪܫܳܬ݂ܶܐ ܘܰܐܫ ܫܘܓ݂ܠܳܢܶܐ",
  "ܥܰܠ ܕܒܰܩ ܩܰܝܕܰܬ ܕܰܥ ܥܘܬ݂ܡܰܢܳܝܶܐ ܡܷܟܬ݂ܰܘܘܰܐ ܐܷܫܡܰܗ ܗܰܘܟ݂ܰܐ",
  "ܓ݂ܰܠܰܒܶܐ ܟܬ݂ܳܘܶܐ ܟܬ݂ܝܘܝ ܒܐܝܕ݂ܶܗ ܕܰܕ ܕܰܝܪܳܝܶܐ ܥܰܠ ܐܘ ܓܰܠܕܐ",
  "ܡܶܩܷܡ ܟ݂ܘܕ ܐܰܕ ܕܰܝܪܶܐ ܚܪܶܢܶܐ، ܠܰܬܘܰܐ ܒܳܬܶܐ ܚܶܕ݂ܰܪ ܕܝ ܕܰܝܪܐ",
  "ܓ݂ܰܠܰܒܶܐ ܡܰܢ ܐܳܣܰܘܳܬ݂ܐ ܟܷܡܡܝ ܡܶܐ ܐܝܕ݂ܐ ܠܐܝܕ݂ܐ ܣܬܶܐ ܟܳܛܳܦܶܐ",
  "ܗܘܠ ܠܰܕܝܰܘܡܰܐ ܐܘ ܟܶܘܐ ܦܪܝܣ ܒܙܷܬܬܷܪ ܡܶܐ، ܡܳܐ ܘܰܐܪܒܥܝ ܕܰܘܠܰܬ",
  "ܘܬܰܪܬܶܗ ܕܰܝܪܳܝܳܬ݂ܶܐ ܕܣܰܝܡܷܢܢܶܗ ܡܘܟܠܐ ܒܝ ܥܝܬܐ ܕܐܝ ܡܰܪ ܫܡܘܢܝ",
  "ܘܕܪܰܠܠܶܗ ܐܰܒ ܒܷܢܝܳܢܰܝܕ݂ܰܗ ܕܡܰܥܰܡܪܷܢܢܶܗ ܐܰܡ ܡܰܠܟܶܐ ܡܗܰܝܡܢܶܐ",
  "ܘܒܝ ܥܰܘܰܢܰܐ ܕܘ ܥܰܡܐ ܡܰܥܡܰܪܪܶܗ ܥܡܰܪܰܬ ܚܰܬ݂ܶܐ ܠܘ ܦܝܳܫܰܬ݂ܬ݂ܶܗ",
  "ܒܰܐܡܰܪܝܟܰܐ ܐܘ ܡܶܢܝܳܢܐ ܕܰܡ ܡܝܬ݂ܶܐ ܗܰܘܝ ܡܰܐܬ݂ܶܐ ܘܬܠܶܬ݂ܝ ܐܰܠܦܐ",
  "ܐܘ ܚܰܣܝܐ ܕܷܣܘܝܣܪܰܐ ܘܕܰܐܘܣܬܘܪܝܰܐ ܡܳܪܝ ܕܝܘܢܘܣܝܘܣ ܥܝܣܰܐ ܓܘܪܒܘܙ",
  "ܗܘܠ ܠܰܕܝܰܘܡܰܐ ܟܰܠܰܗ ܥܰܡܷܪܬܐ ܘܟܳܡܷܩܪܳܝܐ ܐܝ ܩܘܒܐ ܕܰܡ ܡܶܨܪܳܝܶܐ",
  "ܥܰܠ ܕܐܝ ܕܰܝܪܐ ܕܡܳܪܝ ܓܰܒܪܐܶܝܠ ܣܬܶܐ ܒܘ ܫܷܟܷܠ ܕܐܘܪܝܫܠܶܡ ܥܰܡܝܪܐ",
  "ܫܘܢܳܝܐ؛ 2005) ، ܡܶܐ ܚܰܬ݂ܐ ܡܕܰܪܡܰܢܠܰܗ ܐܰܒ ܒܪܝܢܰܝܕ݂ܰܗ ܘܥܰܡܝܪܐ",
  "ܥܰܡ ܚܒܳܠ ܢܳܩܘܨܐ ܕܢܳܫܐ ܟ݂ܳܠܰܨ ܡܝܢܶܗ ܘܐܝ ܚܰܪܰܝܬܰܝܕ݂ܶܗ ܡܰܘܬܐ ܝܐ",
  "ܡܰܘܟ݂ܰܐ ܐܘ ܥܳܠܡܐ ܟܘܠܶܗ ܒܙܘܥܬ݂ܐ ܟܳܚܳܝܰܪ ܒܰܢ ܐܷܫܢܶܗ ܕܷܓܕܳܐܬ݂ܷܢ",
  "ܐܰܕܝܰܘܡܰܐ ܡܰܥܠܰܣܰܦ ܐܘ ܣܶܡܐ ܕܘ ܣܝܳܡܐ ܕܝ ܐܝܕ݂ܳܐ ܢܰܩܷܨ ܓ݂ܰܠܰܒܶܐ",
  "ܟܘܠ ܡܶܕܶܐ ܟܡܝܣܷܡ ܒܫܷܟܷܠ ܪܰܟܝܘܐ ܝܰܥܢܝ ܡܥܰܘܢܳܢܐ ܐܘ ܡܦܰܝܕܳܢܐ ܝܐ",
  "ܒܷܬ݂ܷܪ ܡܝ ܨܠܘܬ݂ܐ ܕܘ ܣܘܬܳܪܐ ܟܳܕܷܡܟ݂ܝ ܟܘܠ ܚܰܐ ܒܝ ܬܰܫܘܝܬ݂ܰܝܕ݂ܶܗ",
  "ܐܝ ܕܰܝܪܐ ܕܡܳܪܝ ܫܡܘܐܝܶܠ ܐܘ ܨܰܘܪܳܝܐ ܘܡܳܪܝ ܫܶܡܥܘܢ ܐܘ ܩܰܪܬܡܝܢܳܝܐ",
  "ܡܰܥܡܰܪܠܶܗ ܩܶܠܳܝܳܬ݂ܶܐ ܫܰܦܝܪܶܐ ܘܒܰܣܝܡܶܐ ܠܘ ܕܡܳܟ݂ܐ ܕܰܕ݂ ܕ݂ܰܝܦܶܐ",
  "ܡܶܩܷܡ ܐܘ ܣܶܡܐ ܕܡܝܙܰܒܰܢܘܰܐ ܒܡܷܕ݂ܝܰܕ݂ ܟܘܠܶܗ ܣܝܳܡܐ ܕܝ ܐܝܕ݂ܳܐ ܘܰܐ",
  "ܗܷܢ ܡܶܢܰܝܝܶܗ ܟܳܡܰܝܕܝ ܐܷܫܡܐ ܗܷܢ ܡܶܢܰܝܝܶܗ ܣܬܶܐ ܟܳܡܶܝܕܝ ܓ݂ܰܠܰܒܶܐ",
  "ܐܰܡ ܡܘܫܬܪܝـܝܰـܝܕ݂ܰܢ ܐܰܓ݂ܠܰܒ ܛܠܳܒܰܬ݂ܬ݂ܶܗ ܟܳܘܶܐ ܥܰܠ  ܐܘ ܘܰܬܣܰܦ݁",
  "ܡܝ ܫܰܬܐ ܕܰܬܪܰܠܦܐ ܘܰܐܪܒܰܥܣܰܪ ܗܘܠ ܠܰܕܝܰܘܡܰܐ ܟܳܡܳܠܰܦ ܒܝ ܡܰܕܪܰܫܬܐ",
  "ܐܘܥܕܐ ܩܘܡ ܕܷܐܙܙܰܢܐ ܡܰܥܰܡܪܝܢܰܐ ܥܰܠ ܐܘ ܡܶܕܶܐ ܕܷܒܠܰܠܝܐ ܡܒܰܝܰܢܠܰܢ",
  "ܐܝܢܰܩܩܰܐ ܕܡܳܪܝ ܫܡܘܐܝܶܠ ܚܙܶܠܶܗ ܐܘ ܡܶܕܰܢܐ، ܦܨܝܚ ܦܨܝܚܘܬ݂ܐ ܪܰܒܬ݂ܐ",
  "ܦܰܛܷܪܝܰܪܟ݂ܐ ܬܶܐܳܘܕܘܣܝܳܘܣ ܪܘܡܰܐܢܳܘܣ ܕܟܷܬܝܐ ܐܝܕ݂ܝܥܐ ܒܝ ܐܳܣܝܘܬ݂ܐ",
  "ܒܝ ܫܰܬܐ ܕܰܐܢ ܐܰܠܦܐ ܘܚܕ݂ܐ ܘܶܐܫܬܝ ܦܬܝܚܐ ܐܶܒܰܗ ܡܰܕܪܰܫܬܐ ܟܳܗܢܰܝܬܐ",
  "ܓܡܰܚܟܳܢܐ ܐܘ ܙܶܒܳܢܐ ܡܷܢ ܫܷܟܷܠ ܟܳܘܶܐ ܐܘ ܐܰܓ݂ܠܰܒ ܠܡܰܢ ܟܷܡܙܰܒܢܝܢܰܐ",
  "ܟܳܐܬ݂ܶܐ ܡܰܘ ܘܰܠܰܝܰܬ ܕܬܘܪܟܝـܝܰܐ ܟܘܠܰܗ ܢܳܫܶܐ ܟܰܪܳܟ݂ܶܐ ܠܛܘܪܥܰܒܕܝܢ",
  "ܘܰܐܩ ܩܳܢܘܢܰܝܕ݂ܰܗ ܡܰܚܬܶܢܶܐ ܥܰܠ ܐܘ ܝܘܠܦܳܢܐ ܕܘ ܟܬ݂ܳܘܳܐ ܩܰܕܝܫܐ ܢܶܐ",
  "ܘܡܷܪܠܶܠܶܗ؛ ܩܘܡ ܕܡܰܠܬܡܝܢܰܠܰܢ ܟܶܦܶܐ ܘܡܰܥܰܡܪܝܢܰܠܰܢ ܥܝܬܐ ܠܝ ܨܠܘܬ݂ܐ",
  "ܗܷܢ ܡܷܢܢܶܗ ܗܰܘܷܢ ܦܰܛܷܪܝܰܪܟ݂ܶܐ ܘܗܷܢ ܚܰܣܝܶܐ ܘܗܷܢ ܟܰܬ݂ܳܘܶܐ ܡܗܝܪܶܐ",
  "ܐܰܬ݂ܝ ܣܬܶܐ ܐܰܥܡܶܗ ܕܰܝܪܳܝܐ ܕܳܢܝܐܝܶܠ ܡܝ ܕܰܝܪܐ ܕܡܳܪܝ ܝܰܥܩܘܒ ܕܨܰܠܷܚ",
  "ܒܘ ܫܷܟܠܰܢܐ ܐܘ ܟܶܘܐ ܕܝ ܟܳܘܪܳܢܰܐ ܗܰܘܝ ܒܰܠܰܗ ܒܪܝܫܰܗ ܕܷܒܪܝܬ݂ܐ ܟܘܠܰܗ",
  "ܘܚܰܬܬܰܐ ܒܗܷܢ ܡܰܢ ܐܰܬ݂ܪܰܘܳܬ݂ܐ ܕܰܪܒܐ ܠܐ ܦܰܐܝܫܘܰܐ ܒܰܒ ܒܶܝܬ݂ ܟܪܝܗܶܐ",
  "ܐܘ ܡܶܢܝܳܢܐ ܪܰܒܐ ܕܰܡ ܡܝܬ݂ܶܐ ܘܕܰܟ ܟܰܐܝܘܶܐ ܒܘ ܐܰܬ݂ܪܐ ܕܰܐܡܰܪܝܟܰܐ ܝܐ",
  "ܒܟܰܠܝܦܳܪܢܰܝܐ ܡܫܰܪܶܠܶܗ ܕܫܳܓܷ݂ܠ ܥܰܠ ܡܰܟܝܢܰܐ ܕܘ ܓܪܳܫܐ ܕܰܨ ܨܘܪܳܬ݂ܶܐ",
  "ܥܰܡ ܗܰܢܝ ܣܬܶܐ ܦܬܷܚܚܶܗ ܕܰܦܐ ܕܘ ܢܰܘܠܐ ܥܰܠ ܐܘ ܡܰܟܬܰܒܙܰܒܢܐ ܕܝ ܕܰܝܪܐ",
  "ܟܷܬܘܰܐ ܣܬܶܐ ܒܶܬ݂ܐܰܪܟܶܐ ܡܫܰܡܗܶܐ ܘܥܰܬܝܪܶܐ ܒܝ ܕܰܝܪܐ ܕܡܳܪܝ ܓܰܒܪܐܶܝܠ",
  "ܥܰܠ ܕܒܰܛܝܠܳܘܰܐ ܐܝ ܟܬ݂ܰܘܬܐ ܣܛܪܰܢܓܶܠܰܝܬܐ ܒܛܘܪܥܰܒܕܝܢ ܠܰܦ ܡܐ ܐܷܫܢܶܐ",
  "ܒܘ ܙܰܒܢܰܝܕ݂ܶܗ ܐܝ ܕܰܝܪܐ، ܝܰܘܡܐ ܒܝܰܘܡܐ ܘܫܰܬܐ ܒܷܬ݂ܪܶܗ ܫܰܬܐ ܡܫܰܘܫܛܐ",
  "ܐܰܫ̰ ܫ̰ܰܬܐ ܡܶܐ ܚܰܬ݂ܐ ܐܝ ܕܰܘܠܶܗ ܦܪܷܫܠܰܗ ܙܘܙܶܐ ܠܘ ܚܘܕܳܬ݂ܐ ܕܝ ܕܰܝܪܐ",
  "ܡܰܚܰܬܬܶܗ ܛܶܒܠܳܝܳܬ݂ܶܐ ܘܟܘܪܶܣܝ ܘܡܩܰܕܰܡܡܶܗ ܫܬܳܝܐ ܘܟܘܟܐ ܠܰܕ݂ ܕ݂ܰܝܦܶܐ",
  "ܗܰܢܝ ܣܬܶܐ ܥܰܝܢܝ ܒܘ ܫܷܟܷܠ ܕܰܒ ܒܶܝܬ݂ ܩܰܕܝܫܶܐ ܕܝ ܕܰܝܪܐ ܕܘ ܙܰܥܦܰܪܰܐܢ",
  "ܒܘ ܪܝܫܐ ܕܟܘܠܠܶܗ ܣܬܶܐ ܐܰܠܡܰܢܝܰܐ ܘܦܪܰܢܣܰܐ ܘܐܝܣܦ݁ܰܢܝܰܐ ܘܐܝܢܓܝܠܬܶܪܰܐ",
  "ܘܡܶܐ ܬܰܡܳܐ ܟܘܠܠܶܗ ܥܰܡ ܚܕ݂ܳܕ݂ܶܐ ܟܳܪܰܘܟ݂ܝ ܒܘ ܒܰܨܐ ܟܳܕܘܥܪܝ ܠܝ ܕܰܝܪܐ",
  "ܒܷܬ݂ܷܪ ܡܶܐ ܕܡܳܪܝ ܫܡܘܐܝܶܠ ܡܰܢܷܚܠܶܗ ܡܘ ܟܶܘܰܝܕ݂ܶܗ، ܗܰܘܝܠܶܗ ܬܰܠܡܝܕ݂ܐ",
  "ܗܷܢ ܡܷܢܢܶܗ ܢܷܦܩܝܘܰܐ ܠܰܡ ܡܥܰܪܶܐ ܕܚܶܕ݂ܰܪ ܐܝ ܕܰܝܪܐ ܕܥܷܒܕܝ ܘܕܷܡܨܰܠܷܢ",
  "ܒܝ ܚܰܪܰܝܬܐ ܟܳܢܷܚܬܝ ܠܝ ܫܘܩܐ ܕܡܷܕ݂ܝܰܕ݂ ܟܳܫܷܩܠܝ ܐܘ ܡܶܕܶܐ ܕܟܳܠܳܙܰܡܡܶܗ",
  "ܒܝ ܫܰܬܐ ܕܐܰܠܦܐ ܬܫ̰ܰܥܡܐ ܘܚܰܡܷܫ ܥܷܣܪܝ ܡܷܕܠܶܗ ܐܘ ܦܰ݁ܬܶܢܬ ܕܘ ܬܰܠܰܘܝܣܪ",
  "ܒܷܬ݂ܷܪ ܡܝ ܫܰܬܐ ܕܐܰܠܦܐ ܬܫ̰ܰܥܡܐ ܘܬܠܶܬ݂ܝ ܡܫܰܘܫܷܛ ܒܰܐܡܶܪܝܟܰܐ ܓ݂ܰܠܰܒܶܐ",
  "ܦܰܠܓܰܝܝܶܗ ܟܐܘܙܙܷܢ ܠܰܩ ܩܷܪܝܰܘܳܬ݂ܶܐ ܕܡܰܫܰܦܥܝ ܒܷܛܠܳܢܐ ܒܰܐ ܒܳܬܰܬ݂ܬ݂ܶܗ",
  "ܡܟܰܡܶܠܶܗ ܐܘ ܝܘܠܦܳܢܰܝܕ݂ܶܗ ܣܘܪܝܳܝܐ ܘܬܘܪܟܳܝܐ ܒܝ ܕܰܝܪܐ ܕܡܳܪܝ ܓܰܒܪܐܶܝܠ",
  "ܡܶܩܷܡ ܡܶܐ ܕܡܰܥܰܡܪܝ ܐܝ ܕܰܝܪܐ، ܥܷܡܪܝܘܰܐ ܐܰܬ ܬܪܶܐ ܒܝ ܩܪܝܬ݂ܐ ܕܩܰܪܬܡܝܢ",
  "ܐܳܢܐ ܒܝ ܪܰܕ݂ܳܝܬܐ ܒܘ ܕܰܪܒܐ ܟܘܠܶܗ ܡܷܦܬܰܟܰܪܘܰܝܢܐ ܥܰܠ ܐܘ ܡܶܕܶܐ ܕܷܚܙܶܠܝ",
  "ܐܰܡ ܡܳܕܶܠܶܐ ܡܷܩܩܰܐ  ܕܟܳܙܶܝܕܝ ܐܘ ܕܰܗܘܐ ܐܘ ܣܶܡܐ ܗܰܩܩܰܐ ܣܬܶܐ ܟܡܝܙܰܒܢܝ",
  "ܐܘ ܡܶܕܶܐ ܕܩܷܕܪܝ ܘܕܟܳܐܬ݂ܶܐ ܡܶܢܰܝܝܶܗ  ܟܳܡܙܰܒܢܝܠܶܗ ܒܗܰܘܟ݂ܰܐ ܕܷܟܟܳܬ݂ܶܐ",
  "ܟܳܡܫܰܕܪܝ ܐܝ ܨܷܪܬܳܐ ܠܓܳܪܰܢ ܕܰܘܟ݂ܰܐ ܕܗܳܘܶܐ ܒܐܝܕ݂ܰܝܢܰܐ  ܟܳܡܫܰܕܪܝܢܰܠܷܢ",
  "ܡܰܘܠܰܕ݂ ܒܝ ܩܪܝܬ݂ܐ ܕܡܰܪܒܳܒܐ ܒܝ ܫܰܬܐ ܕܰܐܢ ܐܰܠܦܐ ܘܫ̰ܰܥܡܐ ܘܚܕ݂ܐ ܘܫܰܘܥܝ",
  "ܐܝ ܕܰܝܪܐ ܕܡܳܪܝ ܓܰܒܪܐܶܝܠ، ܒܰܐܪܒܥܐ ܐܷܫܡܳܢܶܐ ܟܳܡܝܕ݂ܳܥܐ ܒܘ ܡܰܟܬܰܒܙܰܒܢܐ",
  "ܡܙܰܢܓܰܢܠܶܗ ܐܰܒ ܒܶܬܐܰܪܟܶܐ ܕܝ ܕܰܝܪܐ، ܒܰܟܬ݂ܳܘܶܐ ܕܝ ܬܰܘܪܰܐ ܘܕܘ ܡܓܰܠܝܘܢ",
  "ܐܝ ܕܷܪܬܐ ܕܝ ܕܰܝܪܐ ܡܰܠܝܳܘܰܐ ܡܰܢ ܢܳܛܘܪܶܐ ܘܡܰܡ ܡܕܰܒܪܳܢܶܐ ܘܡܰܫ ܫܰܓ݂ܳܠܶܐ",
  "ܡܰܘܟ݂ܰܐ ܟܳܠܳܙܰܡ ܩܰܡܰܝܬܐ ܕܡܰܢܕܦܝܢܰܐ ܘܕܡܰܥܰܡܪܝܢܰܠܰܗ ܘܕܢܷܦܩܝܢܰܠܰܗ ܡܳܪܐ",
  "ܘܗܰܘܟ݂ܰܐ ܐܝ ܡܰܕܪܰܫܬܐ ܕܷܣܟ݂ܝܪܐ ܘܰܐ ܒܝ ܫܰܬܐ ܕܘ ܣܰܝܦܐ܆ ܦܬܝܚܐ ܡܶܐ ܚܰܬ݂ܐ",
  "ܘܒܘ ܡܰܕܢܚܰܝܕ݂ܰܗ ܐܝ ܩܪܝܬ݂ܐ ܕܝ ܟܰܦܰܪܒܶܗ ܕܟܳܡܝܕ݂ܳܥܐ ܒܘ ܣܘܪܝܳܝܐ ܦܳܦܝܰܬ݂",
  "ܐܝ ܕܰܝܪܐ ܕܡܳܪܝ ܓܰܒܪܐܶܝܠ، ܟܳܦܰܝܫܐ ܒܘ ܐܶܩܠܝܡܐ ܕܡܰܕܢܰܚ ܬܰܝܡܰܢ ܕܬܘܪܟܝܝܰܐ",
  "ܘܐܘ ܩܛܳܪܐ ܣܬܶܐ ܡܟ݂ܰܡܰܠܠܶܗ ܒܘ ܡܳܙܰܐܝܩ ܕܘ ܕܰܗܘܐ ܕܟܳܦܳܝܰܫ ܗܘܠ ܠܰܕܝܰܘܡܰܐ",
  "ܗܷܢ ܡܷܢܢܶܗ ܠܐ ܝܷܬܘܝܘܰܐ ܐܘ ܝܰܘܡܐ ܟܘܠܶܗ ܘܠܐ ܣܷܡܟ݂ܝܘܰܐ ܪܘܚܰܝܝܶܗ ܠܘ ܫܘܪܐ",
  "ܚܙܶܠܝ ܩܷܫܬܳܬ݂ܶܐ ܢܰܥܝܡܶܐ ܒܓܰܘܶܗ ܕܘ ܫܘܪܐ ܕܟܷܬܘܰܝܢܶܐ ܐܰܩ ܩܰܘܪܶܐ ܐܰܦ݁ܦ݁ܶܗ",
  "ܕܰܝـܝܡܰܐ ܒܦܳܬ݂ܐ ܓܰܚܷܟ݂ܬܐ ܒܝ ܩܰܚܘܶܐ ܘܒܘ ܫ̰ܰܝ ܘܒܝ ܟ݂ܷܕܡܶܐ ܟܷܡܥܰܘܢܝܢܰܠܷܢ",
  "ܐܶܠܐ ܥܰܡ ܚܒܳܠ ܠܐ ܚܙܶܐ ܫܪܳܝܐ، ܔܓ݂ܘܪ ܡܘ ܝܘܠܦܳܢܐ ܕܡܶܐ ܪܘܚܩܐ ܕܥܰܠ ܐܘ ܢܰܘܠܐ",
  "ܐܘ ܣܶܡܐ ܕܘ ܣܝܳܡܐ ܕܝ ܐܝܕ݂ܐ ܟܳܡܝܕ݂ܰܥ ܒܬܘܪܟܝـܝܰܐ ܟܘܠܰܗ ܕܟܳܡܝܣܷܡ ܒܡܷܕ݂ܝܰܕ݂",
  "ܘܝܰܘܡܐ ܒܝܰܘܡܐ ܙܳܝܰܕ ܘܰܐ ܐܘ ܡܷܢܝܳܢܐ ܕܰܝ ܝܰܠܝܦܶܐ ܘܕܰܫ ܫܰܡܳܫܶܐ ܒܛܘܪܥܰܒܕܝܢ",
  "ܐܝ ܐܰܝܟܰܢܳܝܘܬ݂ܐ ܕܘ ܒܶܝܬܣܶܦܪܐ ܟܳܗܢܳܝܐ ܕܝ ܕܰܝܪܐ ܕܡܳܪܝ ܓܰܒܪܐܶܝܠ ܐܰܕܝܰܘܡܰܐ",
  "ܘܐܘ ܟܬ݂ܳܘܐ ܕܘ ܣܳܒܐ ܕܟܷܬܝܐ ܬܰܫܥܝܳܬ݂ܶܐ ܕܰܐܢ ܐܰܒܳܗܳܬ݂ܐ ܩܰܕܝܫܶܐ ܘܝܚܝܕ݂ܳܝܶܐ",
  "ܐܝ ܕܷܟܟܰܢܐ ܕܟܳܫܷܓ݂ܠܳܢܐ ܐܶܒܰܗ ܒܝ ܕܰܘܠܶܐ ܕܬܘܪܟܝـܝܰܐ ܓ݂ܰܠܰܒܶܐ ܐܝܕ݂ܷܥܬܳܐ ܝܐ",
  "ܥܰܨܪܝܝܶܐ ܐܝ ܢܰܩܩܰܐ ܕܡܰܬܝܡܝ܆ ܢܰܩܠܰܐ ܚܪܶܬܳܐ ܟܳܕܘܥܪܝ ܘܟܳܠܷܬܡܝ ܒܝ ܡܰܪ ܫܡܘܢܝ",
  "ܒܰܢ ܐܷܫܢܰܢܝ ܐܰܚ ܚܰܪܳܝܶܐ ܛܒܷܥܥܶܗ ܘܦܪܷܣܣܶܗ ܐܘ ܟܬ݂ܳܘܐ ܕܰܩ ܩܶܪܝܳܢܶܐ ܕܝ ܥܝܬܐ",
  "ܘܦܰܛܷܪܝܰܪܟ݂ܐ ܒܶܗܢܰܡ ܕܡܝ ܩܪܝܬ݂ܐ ܕܚܶܕܷܠ ܕܟܷܬܝܐ ܛܒܝܒܐ ܒܘ ܟܬ݂ܳܘܐ ܕܰܡ ܡܝܡܪܶܐ",
  "ܡܰܢܩܶܠܶܗ ܥܰܦܪܐ ܡܶܐ ܕܘܟܟܳܬ݂ܶܐ ܪܰܚܘܩܶܐ ܘܣܷܡܠܶܗ ܐܰܪܥܳܬ݂ܶܐ ܠܘ ܙܪܳܥܐ ܕܘ ܙܰܐܕ",
  "ܛܒܝܒܬܐ ܝܐ ܒܰܝ ܝܳܠܘܦܶܐ ܘܒܰܟ ܟܳܗܢܶܐ ܕܢܰܝܦܝܩܝ ܡܝ ܡܰܕܪܰܫܬܰܝܕ݂ܰܗ ܐܝ ܟܳܗܢܳܝܬܐ",
  "ܘܡܶܐ ܓܰܒܐ ܚܪܶܢܐ ܡܰܠܝܐ ܣܰܒܪܐ ܘܦܨܝܚܘܬ݂ܐ ܒܝ ܚܙܰܝܬܐ ܕܝ ܕܰܝܪܰܬ݂ܶܐ ܐܝ ܡܫܰܡܰܗܬܐ",
  "ܘܒܙܰܒܢܐ ܟܰܪܝܐ، ܩܰܡܰܝܬܐ ܠܘ ܨܝܢ ܟܘܠܶܗ ܘܒܷܬ݂ܷܪ ܛܰܦܝ ܘܡܒܰܪܒܰܙ ܒܷܒܪܝܬ݂ܐ ܟܘܠܰܗ",
  "ܐܘܥܕܐ ܚܳܙܝܢܰܐ ܐܘ ܡܰܟܬܰܒ ܙܰܒܢܐ ܕܘ ܬܰܠܰܘܷܙܝܳܢ ܡܰܢ ܚܙܶܠܶܗ ܘܰܐܝܕܰܪܒܐ ܚܙܰܠܠܶܗ",
  "ܘܐܘܥܕܐ ܟܳܦܘܠܚܝ ܥܰܠ ܐܘ ܛܒܳܥܐ ܕܘ ܟܬ݂ܳܘܐ ܕܘ ܐܝܬ݂ܝܩܘܢ ܘܕܘ ܦܘܫܳܩܐ ܕܒܰܪ ܨܰܠܝܒܝ",
  "ܕܰܝܪܐ ܡܫܰܡܰܗܬܐ ܝܐ ܒܰܢ ܐܰܠܦܰܝܐ ܕ݂ܰܝܦܶܐ ܕܟܳܙܰܝܪܝܠܰܗ ܡܶܟܘܠ ܟ݂ܰܣܪܰܐ ܕܷܒܪܝܬ݂ܐ",
  "ܦܰܠܓܶܗ ܕܝܰܘܡܐ ܟܳܐܬ݂ܷܢ ܠܝ ܡܰܪ ܫܡܘܢܝ ܟܐܘܟ݂ܠܝ ܘܟܐܘܙܙܷܢ ܕܝܣܰܐ ܠܰܡ ܡܰܕܷܪܫܳܬ݂ܶܐ",
  "ܘܟܘܠ ܚܰܐ ܡܷܢܢܶܗ ܐܰܕܝܰܘܡܰܐ ܒܘ ܕܰܪܓܰܝܕ݂ܶܗ ܟܳܡܫܰܡܰܫ ܐܝ ܥܝܬܐ ܘܐܘ ܥܰܡܐ ܣܘܪܝܳܝܐ",
  "ܒܷܬ݂ܷܪ ܗܘܠܶܗ ܚܘܛܐ ܠܡܳܪܝ ܫܶܡܥܘܢ ܠܰܫܰܢ ܕܡܰܟܝܠܝ ܐܘ ܝܘܪܟ݂ܐ ܘܐܘ ܦܬ݂ܳܝܐ ܕܝ ܥܝܬܐ",
  "ܡܷܐ ܕܟܳܢܷܦܩܝ ܡܶܐ ܣܝܕܰܢ ܟܷܐܡܡܝܠܰܢ؛ ܦܰܝܷܫ ܡܰܢ ܕܳܐܬ݂ܶܐ ܓܷܡܫܰܕܪܝܢܰܠܶܗ ܣܝܕܰܝܟ݂ܘ",
  "ܐܘ ܬܰܠܰܘܷܙܝܳܢ ܒܰܫ ܫܰܠܩܰܬ ܕܟܳܬܷ݂ܢ ܡܰܕ ܕܰܘܩܶܐ ܟܳܦܳܪܰܣ ܩܳܠܐ ܣܘܪܛܐ ܠܰܡܦܰܪܔܳܢܶܐ",
  "ܒܘ ܡܰܕܷܢܚܐ ܕܡܰܪܕܶܐ ܘܒܘ ܬܰܝܡܢܐ ܕܡܷܕ݂ܝܰܕ݂ ܐܝ ܐܶܡܐ ܕܰܩ ܩܷܪܝܰܘܳܬ݂ܶܐ ܕܛܘܪܥܰܒܕܝܢ",
  "ܡܳܠܰܦܠܶܗ ܠܰܢ ܐܰܒܢܶܐ ܕܘ ܐܰܚܘܢܰܝܕ݂ܶܗ ܘܗܷܢܢܷܟ ܣܬܶܐ ܡܷܠܦܰܠܠܶܗ ܠܰܝ ܝܳܠܘܦܰܬ݂ܬ݂ܶܗ",
  "ܠܰܫܰܢ ܕܡܝܫܰܪܟܝ ܒܰܗ ܗܶܪܓܶܐ، ܟܳܠܳܙܰܡܡܶܗ ܟܳܡܦ݁ܝܘܬܶܪ ܐܰܘ ܬܶܠܶܦܘܢ ܐܘ ܣܬܶܐ ܬܰܒܠܶܬ",
  "ܒܪܝܫܶܗ ܕܘ ܝܰܪܚܐ ܕܰܐܝܠܘܠ ܟܘܠܠܶܗ ܟܳܠܷܬܡܝ ܘܟܳܡܚܰܕ݂ܪܝ ܪܘܚܰܝܝܶܗ ܠܘ ܡܰܟܬܰܦ݁ ܬܷܪܟܝ",
  "ܒܝ ܚܰܪܰܝܬܐ ܗܰܟܟܰܐ ܝܱܠܷܦ ܛܰܘܘܐ܆ ܐܘ ܚܰܣܝܐ ܟܳܡܰܣܪܰܚ ܠܶܗ ܫܰܡܳܫܳܐ ܐܘ ܐܰܦܷܕ݂ܝܰܩܢܐ",
  "ܐܝ ܕܰܝܪܐ ܕܡܳܪܝ ܓܰܒܪܐܶܝܠ، ܪܰܚܘܩܬܐ ܝܐ ܡܶܐ ܡܷܕ݂ܝܰܕ݂ ܠܰܦ ܬܪܶܐ ܘܥܷܣܪܝ ܟܝܠܳܡܰܬܪܰܬ",
  "ܒܷܬ݂ܷܪܟܶܐ ܐܰܡ ܡܫܰܠܶܐ ܕܝ ܬܰܪܡܝܬ݂ܐ ܕܘ ܚܘܕܳܬ݂ܐ ܡܰܚܟܰܠܠܶܗ ܥܰܠ ܐܘ ܫܘܓ݂ܠܐ ܕܟܳܣܰܝܡܝ",
  "ܒܰܢ ܐܰܬ݂ܪܰܘܳܬ݂ܐ ܕܰܐܡܰܪܝܟܰܐ ܐܝ ܬܰܝܡܢܳܝܬܐ ܣܬܶܐ ܐܘ ܡܶܢܝܳܢܐ ܝܰܘܡܐ ܒܝܰܘܡܐ ܟܳܙܳܝܰܕ",
  "ܥܰܠ ܕܘ ܣܶܡܐ  ܕܟܳܫܷܩܠܝ ܡܶܢܰܝܢܰܐ ܗܷܢܢܶܐ ܣܬܶܐ ܟܡܰܚܬܝ ܦܰܝܕܰܐ ܐܰܥܠܶܗ  ܟܳܡܙܰܒܢܝܠܶܗ",
  "ܡܳܦܰܩܠܰܗ ܐܰܟ ܟܘܪܕܳܝܶܐ ܣܬܶܐ ܡܝ ܕܰܝܪܐ ܘܡܰܣܰܠܡܳܠܰܗ ܠܰܥ ܥܳܡܘܪܰܝܕ݂ܰܗ ܐܰܣ ܣܘܪܝܳܝܶܐ",
  "ܒܢܶܠܶܗ ܒܶܢܝܳܢܐ ܒܷܬܠܳܬ݂ܐ ܩܰܬܰܬ ܠܘ ܕܡܳܟ݂ܐ ܕܰܝ ܝܳܠܘܦܶܐ ܘܣܶܕܪܶܐ ܠܘ ܝܘܠܦܳܢܰܬ݂ܬ݂ܶܗ",
  "ܒܷܬ݂ܷܪ ܛܠܷܒܠܰܢ ܟ݂ܰܬܷܪ ܡܷܢܢܶܗ ܘܗܘܠܰܢ ܦܳܬ݂ܰܢ ܠܡܷܕ݂ܝܰܕ݂ ܘܠܝ ܕܰܝܪܐ ܕܡܳܪܝ ܓܰܒܪܐܝܶܠ",
  "ܒܝ ܫܰܬܐ ܕܰܐܠܦܐ ܬܫ̰ܰܥܡܳܐ ܘܥܷܣܪܝ ܝܘܚܰܢܷܢ ܠܳܓܝ ܒܰܐܪܕ ܣܷܡܠܶܗ ܐܘ ܬܰܠܰܘܷܙܝܳܢ ܩܰܡܳܝܐ",
  "ܓ݂ܰܠܰܒܶܐ ܝܳܠܘܦܶܐ ܣܘܪܝܳܝܶܐ ܡܶܐ ܐܰܘܪܘܦ݁ܰܐ ܣܬܶܐ ܒܐܘ ܩܰܝܛܐ ܟܳܐܬ݂ܷܢ ܕܝܷܠܦܝ ܣܘܪܝܳܝܐ",
  "ܒܷܬ݂ܷܪܟܶܐ ܐܘ ܘܰܠܝ ܡܰܚܟܶܠܶܗ ܥܰܠ ܐܝ ܐܳܠܨܳܝܘܬ݂ܐ ܕܝ ܕܰܝܪܐ ܘܥܰܠ ܐܘ ܢܝܫܐ ܕܝ ܬܰܪܡܝܬ݂ܐ",
  "ܒܝ ܫܰܬܐ ܕܰܐܠܦܐ ܫ̰ܥܡܐ ܘܫܶܬ ܬܠܶܬ݂ܝ ܐܰܙܙܶܝܐ ܠܝܢܓܝܠܬܰܪܰܐ ܕܫܳܓܷ݂ܠ ܒܝ ܫܷܪܟܶܐ ܕܒܰܐܝܪܕ",
  "ܘܒܷܒܪܝܬ݂ܐ ܟܘܠܰܗ ܐܘ ܡܷܢܝܳܢܐ ܕܰܟ ܟܰܐܝܘܶܐ ܡܰܛܝ ܠܰܦ ܬܠܳܬ݂ܐ ܘܰܐܪܒܥܝ ܡܷܠܝܘܢܶܐ ܘܦܰܠܓܶܗ",
  "ܒܘ ܙܰܒܢܐ ܕܰܐܪܩܰܕܝܘܣ ܐܘ ܡܰܠܟܐ  ܕܩܘܣܛܰܢܛܝܢܳܘܦܳܘܠܝܣ ܘܐܢܘܪܝܳܘܣ ܐܘ ܡܰܠܟܐ ܕܰܪ ܪܘܡܳܝܶܐ",
  "ܡܚܰܠܩܝܘܰܐ ܪܘܚܰܝܝܶܗ ܥܰܠ ܐܝ ܐܰܪܥܐ ܘܒܩܳܠܐ ܥܶܠܳܝܐ ܡܨܰܠܷܢܘܰܐ ܠܘ ܫܰܝܢܐ ܕܘ ܥܳܠܡܐ ܟܘܠܶܗ",
  "ܠܦܘܬ݂ ܕܘ ܪܶܥܝܳܢܐ ܕܗܷܢ ܡܰܡ ܡܰܠܦܳܢܶܐ، ܐܘ ܐܷܫܡܐ ܕܘ ܟܶܘܐ ܕܟܳܘܪܳܢܰܐ، ܐܷܫܡܐ ܣܘܪܝܳܝܐ ܝܐ",
  "ܘܕܠܐ ܩܛܳܥܐ ܡܕܰܘܰܡ ܠܰܗ ܗܘܠ ܠܝ ܫܰܬܐ ܕܰܐܢ ܐܰܠܦܐ ܘܬܫܰܥܡܐ ܘܰܐܪܒܰܥܣܰܪ ܐܝ ܫܰܬܐ ܕܘ ܣܰܝܦܐ",
  "ܒܗܷܢ ܡܰܢ ܐܷܫܢܶܗ ܟܳܣܳܠܰܩ ܐܘ ܡܶܢܝܳܢܰܬ݂ܬ݂ܶܗ ܠܰܐܪܒܥܝ ܘܢܰܩܰܘܰܬ ܠܚܰܡܫܝ ܘܢܰܩܰܘܰܬ ܠܐܷܫܬܝ",
  "ܟܘܠ ܕܟܳܚܳܙܶܠܶܗ ܟܳܡܝܕܰܘܡܰܪ ܘܟܳܡܫܰܒܰܚ ܠܰܐܠܳܗܐ ܘܠܰܩ ܩܰܕܝܫܶܐ ܕܷܢܛܷܪܪܶܗ ܗܘܠ ܠܰܕܝܰܘܡܰܐ",
  "ܒܘ ܙܰܒܢܐ ܕܡܳܪܝ ܓܰܒܪܐܶܝܠ ܣܬܶܐ ܡܰܛܝܘܰܐ ܐܘ ܡܷܢܝܳܢܐ ܕܰܐܢ ܐܰܚܶܐ ܠܷܬܡܳܢܶܡܐ ܘܗܘܠ ܠܰܐܠܦܐ",
  "ܒܰܫ ܫܰܘܥܝܝܰܬ ܣܬܶܐ ܥܰܡܷܪ ܟܡܐ ܒܶܢܝܳܢܶܐ ܫܰܦܝܪܶܐ ܒܰܟ ܟܶܦܶܐ ܢܚܝܬܶܐ ܘܡܢܰܩܫܶܐ ܕܡܷܕ݂ܝܰܕ݂",
  "ܡܰܛܝܢܰܐ ܘܚܙܶܠܰܢ ܕܐܘ ܘܰܠܝ ܥܰܡ ܐܰܡܕܰܒܪܳܢܰܝܕ݂ܶܗ ܘܰܐܢ ܢܳܛܘܪܰܝܕ݂ܶܗ ܡܰܛܝ ܡܶܩܷܡ ܡܝܢܰܝܢܰܐ",
  "ܒܷܬ݂ܷܪ ܡܰܢܝ ܟܳܡܝܬܰܘܣܰܪ ܐܘ ܒܰܪܢܳܫܐ ܒܝ ܡܰܟܝܢܰܐ ܠܰܫܰܢ ܐܘ ܢܰܦܰܣ ܘܐܘ ܬܷܥܘܝܕܐ ܕܰܟ ܟܷܠܰܘ",
  "ܚܰܐ ܡܰܦ ܦܶܪܥܶܐ ܪܰܒܶܐ ܕܷܚܙܶܠܶܗ ܟ݂ܣܰܪܰܐ ܓ݂ܰܠܰܒܶܐ ܡܘ ܟܶܘܐ ܕܝ ܟܳܘܪܳܢܰܐ، ܐܘ ܝܘܠܦܳܢܐ ܝܐ",
  "ܐܘ ܥܰܡܡܐ ܣܠܰܝܡܰܢ ܕܒܶܐ ܚܰܕܕܐ ܚܰܐ ܡܰܗ ܗܳܣܬܰܘܰܬ ܥܰܬܝܩܶܐ ܕܘ ܣܝܳܡܐ ܕܘ ܣܶܡܐ ܕܝ ܐܝܕ݂ܐ ܝܐ",
  "ܐܰܘ ܟܳܛܷܠܒܝ ܣܬܶܐ ܐܰܘ ܟܳܪܷܚܡܝ ܕܫܷܩܠܝ ܕܳܫܢܶܐ ܓ݂ܰܠܰܒܶܐ ܕܟܳܚܳܙܷܢ ܒܘ ܣܶܡܐ   ܘܡܢܰܩܰܠܠܶܗ",
  "ܓ݂ܰܠܰܒܶܐ ܡܰܢ ܢܳܫܶܐ ܟܳܫܷܡܥܝ ܥܰܠ  ܐܘ ܣܶܡܐ ܕܡܷܕ݂ܝܰܕ݂ ܕܟܷܬܝܐ ܓ݂ܰܠܰܒܶܐ ܫܰܦܝܪܐ ܘܟܰܝـܝܣܐ",
  "ܒܘ ܡܷܕ݂ܝܳܪܐ ܬܰܚܬܳܝܐ ܟܝܬܐ ܐܰܩ ܩܶܠܳܝܳܬ݂ܶܐ ܕܘ ܕܡܳܟ݂ܐ ܘܰܒ ܒܶܝܬ݂ܣܷܠܝܶܐ ܘܰܒ ܒܶܝܬ݂ܚܰܘܦܶܐ",
  "ܥܰܨܪܝܝܶܐ ܒܝ ܕܰܝܪܐ ܟܳܡܨܰܠܷܢ ܐܝ ܨܠܘܬ݂ܐ ܕܥܰܨܪܝܝܶܐ ܘܟܳܡܰܚܰܫܡܝ ܥܰܡ ܚܕ݂ܳܕ݂ܶܐ ܒܘ ܦܳܬ݂ܘܪܐ",
  "ܒܰܬܠܳܬ݂ܐ ܝܰܪܚܶܐ ܕܘ ܩܰܝܛܐ ܣܬܶܐ܆ ܟܳܐܬܷ݂ܢ ܝܳܠܘܦܶܐ ܓ݂ܰܠܰܒܶܐ ܡܰܢ ܐܰܬܪܰܘܳܬ݂ܐ ܕܰܐܘܪܘܦ݁ܰܐ",
  "ܥܰܠ ܕܐܝ ܕܰܝܪܐ ܡܫܰܘܫܛܐ ܓ݂ܰܠܰܒܶܐ ܒܘ ܙܰܒܢܰܝܕ݂ܶܗ ܘܠܰܬܷܡܘܰܐ ܐܶܒܰܗ ܠܰܦ ܬܡܳܢܶܡܐ ܕܰܝܪܳܝܶܐ",
  "ܒܘ ܕܳܪܰܐ ܢܐ ܐܘ ܚܰܪܳܝܐ ܒܰܩ ܩܰܝܕܰܬ ܪܘܫܡܳܝܶܐ ܕܝ ܕܰܘܠܰܐ ܕܬܘܪܟܝܝܰܐ ܟܬ݂ܝܘܐ ܕܰܝܪܐ ܕܥܘܡܪܐ",
  "ܚܙܰܠܠܶܗ ܟܰܠܰܐ ܟܶܦܐ ܥܶܠܰܝܬܐ ܡܝ ܐܰܪܥܐ ܘܰܐܟ ܟܶܦܶܐ ܚܪܶܢܶܐ ܕܟܷܬܢܶܐ ܡܰܚܬܶܐ ܟ݂ܘܕ ܝܰܕ݂ܥܶܐ",
  "ܡܫܰܡܗܳܐ ܝܐ ܒܬܷܪܟܝـܝܰܐ ܟܘܠܰܗ ܒܝ ܨܷܢܥܰܝܕ݂ܶܗ ܒܝ ܕܘܪܘܣܬܝـܝܰـܝܕ݂ܶܗ ܘܒܝ ܡܪܰܚܡܳܢܘܬ݂ܰܝܕ݂ܶܗ",
  "ܘܡܝ ܫܰܬܐ ܕܰܬܪܰܠܦܐ ܘܚܰܡܷܫ ܗܘܠ ܠܰܕܝܰܘܡܰܐ ܟܳܡܳܠܰܦ ܒܝ ܡܰܕܪܰܫܬܐ ܟܳܗܢܳܝܬܐ ܕܡܳܪܝ ܓܰܒܪܐܶܝܠ",
  "ܐܝܢܰܩܩܰܐ ܕܷܡܫܰܢܰܠܠܶܗ ܣܬܶܐ ܡܬܰܚܬܝ ܐܰܦ ܦܰܓ݂ܪܰܬ݂ܬ݂ܶܗ ܒܷܚܕ݂ܐ ܩܘܒܐ ܕܒܰܢܝܐ ܥܰܠ ܐܷܫܡܰܝܝܶܗ",
  "ܒܷܬ݂ܷܪ ܐܝܢܰܩܩܰܐ ܕܳܐܒܰܥ ܓܬܳܘܶܐ ܕܰܝܪܳܝܐ ܐܰܘ ܟܳܗܢܐ ܐܰܘ ܩܰܫܐ ܐܰܘ ܣܬܶܐ ܡܫܰܡܫܳܢܐ ܒܝ ܥܝܬܐ",
  "ܡܰܛܝܐ ܠܘ ܕܳܪܐ ܕܰܥ ܥܷܣܪܝ، ܒܰܛܷܠܬܐ ܘܚܰܪܘܬܐ ܡܩܰܒܷܠ ܕܰܢ ܢܰܗܝܒܰܬ ܘܥܰܔܷܙܬܐ ܡܰܝ ܝܰܩܕ݂ܳܢܶܐ",
  "ܘܡܫܰܕܰܪܘܰܐ ܐܰܝ ܝܳܠܘܦܶܐ ܠܰܡ ܡܰܕܪܰܫܝܳܬ݂ܶܐ ܕܡܷܕ݂ܝܰܕ݂ ܠܰܫܰܢ ܕܝܘܠܦܝ ܠܶܫܳܢܐ ܬܷܪܟܳܝܐ ܣܬܶܐ",
  "ܡܰܬ݂ܠܐ ܒܘ ܐܰܬ݂ܪܐ ܕܷܒܪܶܙܝܠܝܰܐ، ܐܘ ܡܶܢܝܳܢܐ ܕܰܟ ܟܰܐܝܘܶܐ ܗܰܘܝ ܙܷܬܬܷܪ ܡܶܐ ܚܰܡܫܐ ܡܶܠܝܘܢܶܐ",
  "ܐܰܙ ܙܰܒܢܶܐ ܩܰܡܳܝܶܐ ܡܰܚܘܶܘܰܐ ܡܶܕܳܢܶܐ ܕܰܐ ܛܘܪܳܢܶܐ ܐܰܘ ܕܰܚ ܚܰܝܘܬ݂ܐ ܕܟܷܡܝܢܰܠܶܗ ܒܰܠܓܰܣܰܠ",
  "ܘܐܘ ܢܝܫܰܝܕ݂ܰܗ ܝܘܠܦܳܢܐ ܕܟܳܡܰܪܕ݂ܶܐ ܠܰܐܠܳܗܐ ܘܟܳܡܰܘܬ݂ܰܪ ܠܟܘܠܰܗ ܐܝ ܢܳܫܘܬ݂ܐ ܓܰܘܳܢܳܐܝܬ݂ ܝܐ",
  "ܪܨܷܦܦܶܗ ܐܝ ܐܰܪܥܐ ܕܘ ܡܰܕ݂ܒܚܐ ܒܘ ܡܳܙܰܐܝܩ ܚܶܘܳܪܐ، ܟܳܡܐ، ܫ̰ܶܢܝ، ܣܶܡܳܩܐ، ܝܰܪܳܩܐ ܘܫܰܥܘܬ݂ܐ",
  "ܒܷܬ݂ܷܪ ܦܪܝܫ ܡܶܐ ܒܰܛܡܰܢ ܐܰܙܙܶܗ ܠܩܰܣܬܰܡܳܢܘ ܐܝ ܡܕ݂ܝܬܐ ܐܘܥܕܐ ܟܳܡܳܠܰܦ ܬܰܡܐ ܒܘ ܒܶܝܬ݂ ܨܰܘܒܐ",
  "ܐܰܕ ܕܘܟܰܢܶܐ ܘܰܐܦ ܦܝܪܡܰܬ ܪܰܒܶܐ ܕܘ ܫܘܓ݂ܠܐ ܣܬܶܐ ܣܟ݂ܝܪܝ ܘܰܐܫ ܫܘܓ݂ܠܳܢܶܐ ܟܘܠܳܢܳܐܝܬ݂ ܒܰܛܝܠܝ",
  "ܐܝܢܰܩܩܰܐ ܕܟܳܐܬ݂ܶܐ ܢܳܫܶܐ ܬܘܪܝܣܬ ܠܛܘܪܥܰܒܕܝܢ ܟܷܐܕ݂ܥܝ ܒܡܷܕ݂ܝܰܕ݂ ܕܟܳܡܝܣܷܡ ܘܟܳܡܝܙܰܒܷܢ ܣܶܡܐ",
  "ܒܷܬ݂ܷܪ ܡܰܪܟܶܐ ܐܰܙܙܶܝܐ ܠܘ ܒܶܬ݂ܨܰܘܒܐ ܕܷܐܫܡܶܐ ܓܠܰܣܓܰܘ ܬܰܡܐ ܣܷܡܠܶܗ ܡܰܣܬܷܪ ܥܰܠ  ܐܘ ܔܰܝܪܰܢ",
  "ܡܶܐ ܦܰܠܓܶܗ ܕܘ ܝܰܪܚܐ ܕܷܚܙܝܪܷܢ ܗܘܠ ܦܰܠܓܶܗ ܕܰܐܝܠܘܠ ܐܰܡ ܡܰܕܷܪܫܳܬ݂ܶܐ ܕܝ ܕܰܘܠܰܐ ܟܳܡܷܣܟ݂ܳܪܝ",
  "ܡܰܠܦܳܢܐ ܫܷܟܪܝ ܐܰܩܛܰܫ܆ ܡܰܘܠܰܕ݂ ܒܝ ܩܪܝܬ݂ܐ ܕܒܶܩܘܣܝܳܢܶܐ ܒܝ ܫܰܬܐ ܕܰܐܢ ܐܰܠܦܐ ܘܫܰܥܡܐ ܘܬܡܳܢܝ",
  "ܐܷܫܡܐ ܠܘܓܰܒ ܠܰܦ ܐܘ ܓܰܪܒܝܐ، ܡܰܚܘܶܠܶܠܶܗ ܟܶܦܐ ܚܪܶܬܐ ܘܡܷܪܠܶܗ؛ ܗܰܪܟܶܐ ܣܬܶܐ ܐܘ ܬܰܪܥܐ ܚܪܶܢܐ",
  "ܒܷܬ݂ܷܪ ܡܶܐ ܕܡܳܪܝ ܫܶܡܥܘܢ ܕܰܡܷܟ݂، ܡܳܪܝ ܫܡܘܐܝܶܠ ܩܰܝܷܡ ܕܷܡܨܰܠܶܐ ܐܝ ܨܠܘܬ݂ܐ ܕܦܰܠܓܶܗ ܕܠܰܠܝܐ",
  "ܐܰܝܢܰܐ ܕܟ݂ܰܠܝܨܝ ܡܰܝ ܝܰܩܕ݂ܳܢܶܐ ܐܰܘ ܕܠܐ ܡܰܢܗܒܝ ܣܬܶܐ، ܡܬܰܘܒܠܝ ܠܰܒ ܒܶܬ݂ܐܰܪܟܶܐ ܕܰܐܘܪܘܦ݁ܰܐ",
  "ܘܒܕܰܠܠܶܗ ܒܘ ܐܬ݂ܪܐ ܕܘ ܨܝܢ ܘܒܰܐܘܪܘܦ݁ܰܐ ܕܡܳܚܷܢܠܰܗ ܩܰܡܰܝܬܐ ܠܰܫ ܫܰܓ݂ܳܠܶܐ ܕܒܰܒ ܒܶܝܬ݂ ܟܪܝܗܶܐ",
  "ܐܘ ܚܰܐ ܕܡܰܚܷܬ ܐܷܫܡܐ ܦܰܝܕܰܐ، ܟܘܠ ܢܰܩܠܰܐ  ܟܳܡܙܰܒܷܢ ܙܷܬܬܷܪ ܡܰܘܐ  ܕܟܳܡܰܚܷܬ ܦܰܝܕܰܐ ܙܳܝܘܬܬܐ",
  "ܐܰܩ ܩܪܳܒܶܐ ܘܰܐܢ ܢܰܗܝܒܰܬ ܘܐܰܝ ܝܰܩܕ݂ܳܢܶܐ ܕܗܰܘܷܢ، ܡܰܚܪܰܘܘܶܗ ܘܡܰܕ݂ܷܪܪܶܗ ܓ݂ܰܠܰܒܶܐ ܠܝ ܕܰܝܪܐ",
  "ܡܘ ܝܰܘܡܐ ܕܷܡܫܰܪܶܠܶܗ ܕܡܷܦܪܰܣ ܐܘ ܟܶܘܐ، ܒܕܰܠܠܶܗ ܕܣܘܟ݂ܪܝ ܐܰܡ ܡܰܕܷܪܫܳܬ݂ܶܐ ܘܰܐܒ ܒܳܬܰܝ ܨܰܘܒܶܐ",
  "ܟܳܥܰܘܕܳܢܐ ܒܝ ܕܘܟܰܢܐ ܕܝ ܙܝܦܟܰܪܝܝܶܐ ܕܟܷܬܝܐ ܐܝ ܕܘܟܰܢܐ ܕܘ ܣܠܰܝܡܰܢ ܬܳܩ ܕܒܶܐ ܚܰܕܕܐ ܡܷܕ݂ܝܳـܝܐ",
  "ܐܝ ܩܪܝܬ݂ܐ ܕܩܰܪܬܡܝܢ ܥܰܠ ܕܟܷܬܝܐ ܩܰܪܘܬܐ ܠܝ ܕܰܝܪܐ، ܡܰܘܟ݂ܰܐ ܡܷܕܠܰܗ ܐܷܫܡܰܗ ܒܘ ܕܳܪܐ ܕܰܚ ܚܰܡܫܐ",
  "ܡܰܕܥܰܪܠܶܗ ܐܘ ܬܰܠܡܝܕ݂ܰܝܕ݂ܶܗ ܐܰܥܠܶܗ ܘܡܷܪܠܶܗ؛ ܐܝܢ ܝܰܐ ܐܘ ܡܳܪܰܝܕ݂ܝ ܛܪܳܘܶܐ ܐܘ ܨܷܒܝܳܢܰܝܕ݂ܘܟ݂",
  "ܒܷܬ݂ܷܪ ܡܶܐ ܟ݂ܢܘܫܝܶܐ ܘܒܘܚܳܢܶܐ ܓ݂ܰܠܰܒܶܐ ܕܣܝܡܝ، ܒܷܬ݂ܷܪ ܒܫܰܬܐ ܚܙܰܠܠܶܗ ܡܚܰܛܐ ܕܡܰܢܝܚܐ ܐܘ ܟܶܘܐ",
  "ܝܰܘܡܐ ܒܝܰܘܡܐ ܘܝܰܪܚܐ ܒܷܬ݂ܪܶܗ ܕܝܰܪܚܐ، ܐܘ ܡܶܢܝܳܢܐ ܕܰܟ ܟܰܐܝܘܶܐ ܘܕܰܡ ܡܝܬ݂ܶܐ ܟܳܙܳܝܰܕ ܒܷܒܪܝܬ݂ܐ",
  "ܒܰܢ ܐܰܬ݂ܪܰܘܳܬ݂ܐ ܕܰܐܘܪܘܦ݁ܰܐ ܣܬܶܐ، ܘܰܠܰܘ ܢܰܩܰܘܰܬ ܐܘ ܡܶܢܝܳܢܐ ܕܰܟ ܟܰܐܝܘܶܐ ܘܕܰܡ ܡܝܬ݂ܶܐ ܢܰܩܷܨ",
  "ܘܗܰܢܐ ܣܬܶܐ ܠܰܬܝܐ ܡܰܟܦܝܳܢܐ ܕܷܡܟܰܡܰܠ ܐܝ ܣܢܝܩܘܬ݂ܐ ܘܕܡܳܠܰܦ ܐܘ ܝܘܠܦܳܢܐ ܕܟܷܬܝܐ ܣܢܝܩܳܝܐ ܐܰܥܠܶܗ",
  "ܐܘ ܬܰܠܰܘܷܙܝܳܢ ܒܝ ܫܰܬܐ ܕܐܰܠܦܐ ܫ̰ܰܥܡܐ ܘܬܠܶܬ݂ܝ ܣܝܡܐ ܐܝ ܦܰܒܪܝܩܶܕ݂ܶܐ ܘܡܙܰܒܷܢ ܠܝ ܒܪܝܬ݂ܐ ܟܘܠܰܐ",
  "ܡܰܠܦܳܢܐ ܥܝܣܰܐ ܬܰܡܝܙ܆ ܒܝ ܫܰܬܐ ܕܰܐܢ ܐܰܠܦܐ ܘܫ̰ܰܥܡܐ ܘܬܡܳܢܶܐ ܘܬܡܳܢܝ ܡܰܘܠܰܕ݂ ܒܝ ܩܪܝܬ݂ܐ ܕܡܝܕܷܢ",
  "ܒܷܬ݂ܷܪ ܡܶܐ ܕܫܰܡܝܥܝ ܥܰܠ ܐܝ ܩܰܕܝܫܘܬ݂ܐ ܕܝ ܕܰܝܪܐ، ܕܠܐ ܟܠܳܝܐ ܐܰܬܷ݂ܢ ܠܝ ܕܰܝܪܐ ܘܗܰܘܷܢ ܕܰܝܪܳܝܶܐ",
  "ܒܰܡ ܡܰܠܦܳܢܶܐ ܘܒܰܝ ܝܳܠܘܦܶܐ ܕܡܶܟܘܠ ܕܘܟܬ݂ܐ ܟܳܐܬ݂ܷܢ ܕܩܳܪܷܢ ܘܝܘܠܦܝ ܠܶܫܳܢܐ ܘܡܰܪܕܘܬ݂ܐ ܣܘܪܝܳܝܬܐ",
  "ܒܘ ܡܰܥܷܪܒܐ ܕܐܝܣܟܳܫ̰ܝܰܐ ܒܘ ܒܶܬ݂ ܨܶܦܪܐ ܬܰܟܢܝܟ ܟܳܠܶܙ̰ ܡܟܰܡܶܠܶܗ ܐܘ ܒܶܬ݂ ܨܶܦܪܐ ܒܦܘܚܳܡܶܐ ܛܰܘܶܐ",
  "ܒܷܬ݂ܷܪ ܝܰܪܚܐ ܘܦܰܠܓܶܗ ܗܰܢܷܟ ܕܰܐܙܙܷܢ ܟܳܕܘܥܪܝ܆ ܘܰܚܪܶܢܶܐ ܕܦܰܝܫܝ ܒܝ ܕܰܝܪܳܐ ܟܐܘܙܙܷܢ ܠܘ ܒܷܛܠܳܢܐ",
  "ܟܳܡܷܦܪܰܫ ܐܘ ܕܰܪܒܰܝܕ݂ܰܗ ܒܘ ܣܶܡܳܠܐ ܡܶܩܷܡ ܡܝ ܩܪܝܬ݂ܐ ܕܩܰܪܬܡܝܢ ܡܘ ܕܰܪܒܐ ܪܰܒܐ ܕܟܐܘܙܙܶܗ ܠܷܓܙܝܪܐ",
  "ܒܷܬ݂ܷܪ ܡܶܐ ܕܷܡܟܰܡܶܠܶܗ ܐܝ ܨܠܘܬ݂ܰܝܕ݂ܶܗ، ܡܩܰܕܰܡܠܶܗ ܓܰܒ ܐܘ ܬܰܠܡܝܕ݂ܰܝܕ݂ܶܗ ܘܡܰܩܷܡܠܶܗ ܡܝ ܫܰܢܬ݂ܐ",
  "ܡܩܰܒܷܠ ܕܰܥ ܥܰܣܩܳܬ݂ܰܢܝ ܟܘܠܠܶܗ، ܐܰܠܳܗܐ ܫܘܒܚܐ ܠܷܐܫܡܶܗ ܠܐ ܛܪܶܠܶܗ ܕܚܘܪܘܐ ܘܟܘܠ ܢܰܩܩܰܐ ܢܛܝܪܳܠܶܗ",
  "ܘܟܰܡܝܠܐ ܐܝ ܡܶܠܬ݂ܐ ܕܡܷܪܠܶܗ ܐܘ ܡܰܠܰܟ݂ܐ ܠܡܳܪܝ ܫܶܡܥܘܢ، ܕܓܷܕܦܰܝܫܐ ܐܝ ܕܰܝܪܐ ܥܰܡܷܪܬܐ ܗܘܠ ܠܥܳܠܰܡ",
  "ܐܝܢܰܩܠܰܐ ܕܷܚܙܶܠܶܗ ܐܘ ܚܰܣܝܐ، ܒܝܩܳܪܐ ܩܰܝܷܡ ܘܡܷܪܠܶܗ؛ ܒܫܰܝܢܐ ܘܒܰܫܠܳܡܐ ܐܰܬ݂ܰܬ ܝܰܐ ܐܘ ܚܰܣܝܰܝܕ݂ܝ",
  "ܘܗܰܘܝ ܟ݂ܣܰܪܰܐ ܪܰܒܬ݂ܐ ܒܝ ܫܰܬܐ ܕܰܬܪܰܠܦܐ ܘܥܷܣܪܝ ܥܰܠ ܐܝ ܢܳܫܘܬ݂ܐ ܡܘ ܓܰܒܐ ܕܘ ܝܘܠܦܳܢܐ ܘܕܘ ܡܳܡܘܢܐ",
  "ܓ݂ܰܠܰܒܶܐ ܐܰܒܢܶܐ ܕܝܰܩܪܳܬ݂ܶܐ ܡܶܣܟܝܢܶܐ، ܠܐ ܩܰܕܝܪܝ ܕܥܰܠ ܐܘ ܢܰܘܠܐ ܣܬܶܐ ܡܝܫܰܪܟܝ ܒܰܗ ܗܶܪܓܰܬ݂ܬ݂ܶܗ",
  "ܐܝܕ݂ܰܐ ܕܷܐܒܥܝ  ܟܳܡܫܰܕܪܝܢܰܠܶܗ ܒܘ ܩܰܪܓܐ (ܡܫܰܕܪܳܢܐ)  ܘܐܰܓܠܰܒ ܒܷܬܪܶܐ ܝܰܘܡܶܐ ܟܳܡܳܛܶܐ ܣܝܕܰܝـܝܶܗ",
  "ܐܝܢܰܩܩܰܐ ܕܡܳܪܝ ܫܡܘܐܝܶܠ ܫܰܡܷܥ ܐܰܡ ܡܶܠܰܢܝ ܡܝܢܶܗ، ܐܰܕ݂ܷܥ ܕܷܚܙܶܠܶܗ ܚܘܠܡܐ ܘܠܐ ܟ݂ܰܠܝܐ ܟܳܡܷܔܓ݂ܰܠ",
  "ܡܳܪܝ ܝܘܚܰܢܳܢ ܐܘ ܣܝܪܝܢܳܝܐ ܕܟܷܬܘܰܐ ܐܘ ܚܰܣܝܐ ܕܝ ܕܰܝܪܐ، ܟܬ݂ܘܘܰܝܠܶܗ ܫܰܘܥܝ ܟܬ݂ܳܘܶܐ ܥܰܠ ܐܘ ܓܰܠܕܐ",
  "ܐܶܠܐ ܒܷܬ݂ܷܪ ܐܝ ܕܰܘܠܰܐ ܡܳܦܰܩܠܰܗ ܩܳܢܘܢܐ ܕܟܘܠ ܚܰܐ ܕܳܥܰܪ ܘܝܳܬܰܘ ܒܝ ܩܪܝܬ݂ܰܝܕ݂ܶܗ ܘܒܘ ܒܰܝܬܰܝܕ݂ܶܗ",
  "ܟ݂ܘܕ ܟܘܕܥܘܬܘ ܚܰܣܢܐ ܕܟܶܦܐ ܣܬܶܐ ܓܦܰܝܫܐ ܬܰܚܬܶܐ ܕܰܐ ܡܰܝܶܐ ܘܗܰܘ ܟܳܐܬ݂ܶܐ ܢܳܫܶܐ ܠܝ ܣܳܥܘܪܘܬ݂ܰܝܕ݂ܰܗ",
  "ܝܘܚܰܢܷܢ ܡܰܚܰܬܠܶܗ ܒܓܰܘܶܗ ܕܘ ܣܰܢܕܘܩܐ ܕܝ ܫ̰ܰܝܶܐ ܣܝܣܬܶܡ ܐܰܠܰܟܬܪܳܢܝܟ ܘܡܰܚܰܬܠܶܗ ܐܷܫܡܶܗ ܬܰܠܰܘܝܣܷܪ",
  "ܘܡܰܪܟܶܐ ܡܫܰܘܫܰܛ ܘܩܰܘܝ ܐܘ ܠܝܫܳܢܐ ܣܘܪܝܳܝܐ ܒܰܝܢ ܐܰܢ ܢܰܥܝܡܶܐ ܕܟܳܥܰܝܫܝ ܘܰܐ ܒܰܩ ܩܷܪܝܰܘܳܬ݂ܶܐ ܣܬܶܐ",
  "ܡܝ ܫܰܬܐ ܕܰܐܢ ܐܰܠܦܐ ܘܫ̰ܰܥܡܐ ܘܫܶܬ ܘܬܷܫܥܝ ܗܘܠ ܠܰܕܝܰܘܡܰܐ ܡܰܠܦܳܢܐ ܝܐ ܒܝ ܡܰܕܪܰܫܬܐ ܕܡܳܪܝ ܓܰܒܪܐܶܝܠ",
  "ܡܰܠܦܳܢܐ ܫܰܠܝܛܐ ܐܰܔܰܪ܆ ܡܰܘܠܰܕ݂ ܒܝ ܩܪܝܬ݂ܐ ܕܒܶܩܘܣܝܳܢܶܐ ܒܝ ܫܰܬܐ ܕܰܐܢ ܐܰܠܦܐ ܘܫ̰ܰܥܡܐ ܘܫܘܰܥ ܘܬܡܳܢܝ",
  "ܘܕܰܦܐ ܕܘ ܦܰܝܣܒܘܟ ܕܡܰܫܰܡܥܝ ܐܰܛ ܛܶܒܶܐ ܝܰܘܡܳܝܶܐ ܕܝ ܚܰܣܝܘܬ݂ܐ ܘܕܝ ܡܰܪܥܝܬ݂ܐ ܠܘ ܥܰܡܐ ܣܘܪܝܳܝܐ ܟܘܠܶܗ",
  "ܐܶܠܐ ܡܰܕܥܰܪܠܶܗ ܐܰܥܠܶܗ ܘܡܷܪܠܶܠܶܗ؛ ܫܪܳܪܐ ܝܐ ܐܘ ܐܰܒܪܰܝܕ݂ܝ ܡܰܟܝܠܰܢ ܘܡܒܰܝܰܢܠܰܢ ܐܝ ܕܘܟܬ݂ܐ ܕܝ ܥܝܬܐ",
  "ܗܷܢ ܡܷܢܢܶܗ ܣܬܶܐ ܐܝܢܰܩܠܰܐ ܕܳܐܬ݂ܶܘܰܠܠܶܗ ܫܰܢܬ݂ܐ، ܡܥܰܠܩܝܘܰܐ ܚܰܘܠܐ ܒܷܩܕ݂ܳܠܰܝܝܶܗ ܠܰܫܰܢ ܕܠܐ ܕܷܡܟ݂ܝ",
  "ܡܰܚܰܬܘܰܠܠܶܗ ܨܷܪܬܳܬ݂ܶܐ ܥܰܬܝܩܶܐ ܒܝ ܕܷܪܬܐ ܕܡܰܚܘܷܢܘܰܐ ܐܝ ܐܰܝܟܰܢܳܝܘܬ݂ܐ ܕܝ ܕܰܝܪܐ ܕܡܶܩܷܡ ܡܘ ܚܘܕܳܬ݂ܐ",
  "ܐܘ ܥܰܡܐ ܣܬܶܐ ܒܕܶܠܶܗ ܕܷܡܫܰܕܰܪ ܐܰܢ ܢܰܥܝܡܰܝܕ݂ܶܗ ܠܝ ܕܰܝܪܐ ܕܝܘܠܦܝ ܠܝܫܳܢܐ ܘܛܷܟܣܐ ܘܰܩ ܩܳܠܶܐ ܕܝ ܥܝܬܐ",
  "ܗܰܘܟ݂ܰܐ ܡܷܪܠܶܗ؛ ܐܰܚܢܰܐ ܟ݂ܘܕ ܐܝ ܡܕ݂ܝܬܐ ܕܒܰܛܡܰܢ، ܒܷܬ݂ܷܪ ܡܝ ܚܰܣܢܐ ܕܟܶܦܐ ܠܰܬܠܰܢ ܕܘܟܟܳܬ݂ܶܐ ܥܰܬܝܩܶܐ",
  "ܐܘ ܥܰܡܡܐ ܣܠܰܝܡܰܢ ܩܰܪܝܘܐ ܠܚܰܡܫܰܥܣܰܪ ܐܷܫܢܶܐ ܡܝ ܣܰܝܒܘܬ݂ܐ ܡܰܣܠܰܡܠܶܗ ܐܝ ܕܘܟܰܢܐ ܠܘ ܐܰܒܪܐ ܝܰܥܩܘܒ ܬܳܩ",
  "ܘܟܷܬܘܰܐ ܩܳܢܘܢܐ ܒܘ ܛܘܪܐ ܕܟܘܠ ܐܝܩܰܪܬ݂ܐ ܡܫܰܕܪܐ ܐܘ ܐܰܒܪܰܝܕ݂ܰܗ ܐܘ ܒܷܟܷܪ ܠܝ ܡܰܕܪܰܫܬܐ ܕܡܳܪܝ ܓܰܒܪܐܶܝܠ",
  "ܡܰܠܰܟ݂ܠܰܢ ܒܝ ܪܰܕ݂ܳܝܬܐ ܠܰܦ ܣܰܥܰܝܶܐ، ܡܶܩܷܡ ܕܡܳܛܝܢܰܐ ܠܒܰܛܡܰܢ ܒܥܷܣܪܐ ܟܝܠܳܡܰܬܪܰܬ، ܡܰܝܶܠܰܢ ܠܘ ܝܰܡܝܢܐ",
  "ܘܰܐܝܢܰܐ ܫܘܓ݂ܠܳܢܶܐ ܐܳܠܨܳܝܶܐ ܢܶܐ ܡܶܩܷܡ ܕܳܐܬ݂ܶܐ ܐܘ ܣܰܬ݂ܘܐ ܕܟܳܠܳܙܰܡ ܕܡܝܣܳܡܝ ܠܰܫܰܢ ܕܠܐ ܗܰܝܕܝ ܘܢܷܦܠܝ",
  "ܟܝܬܐ ܓ݂ܰܠܰܒܶܐ ܡܰܝ ܝܳܠܘܦܶܐ ܟܘܠ ܫܰܬܐ ܒܘ ܩܰܝܛܐ ܟܳܐܬ݂ܷܢ ܠܝ ܡܰܕܪܰܫܬܐ ܗܘܠ ܕܟܳܡܟܰܡܠܝ ܐܘ ܝܘܠܦܳܢܰܬ݂ܬ݂ܶܗ",
  "ܒܰܩ ܩܷܪܝܰܘܳܬ݂ܰܢܝ ܟܘܠܠܶܗ ܡܶܩܷܡ ܟܷܬܘܰܐ ܣܘܪܝܳܝܶܐ، ܐܶܠܐ ܐܰܕܝܰܘܡܰܐ ܠܰܝܬܐ ܘܠܐ ܚܕ݂ܐ ܐܝܩܰܪܬ݂ܐ ܣܘܪܝܰܝܬܐ",
  "ܒܷܬ݂ܷܪ ܡܶܐ ܕܷܡܟܰܡܰܠܠܶܗ ܐܰܨ ܨܠܰܘܳܬ݂ܰܬ݂ܬ݂ܶܗ، ܛܷܠܒܒܶܗ ܡܶܐ ܐܰܠܳܗܐ ܕܷܡܚܰܕ݂ܰܪܪܶܗ ܕܘܟܬ݂ܐ ܕܥܘܡܪܝ ܐܶܒܰܗ",
  "ܒܷܬ݂ܷܪ ܡܷܐ ܕܟܳܟܳܡܷܠ  ܐܘ ܝܰܪܚܐ ܐܰܢܢܰܩܰܐ  ܟܳܡܫܰܕܪܝ ܐܘ ܣܶܡܐ ܕܠܐ ܩܰܕܝܪܝ ܕܷܡܙܰܒܢܝܠܶܗ ܠܰܚܢܰܐ ܒܘ ܩܰܪܓܐ",
  "ܒܷܬ݂ܷܪܟܶܐ ܗܘܠܶܗ ܪܘܚܶܗ ܕܡܷܫܰܘܫܷܛ  ܥܰܠ  ܐܘ ܬܰܠܰܘܷܙܝܳܢ ܡܰܘܟ݂ܰܐ ܡܰܛܥܰܢܠܶܗ ܐܘ ܒܰܝܬܶܕ݂ܶܗ ܠܟܰܠܝܦܳܪܢܝܰܐ",
  "ܡܝ ܫܰܬܐ ܕܰܐܢ ܐܰܠܦܐ ܘܫ̰ܥܰܡܐ ܘܬܡܳܢܶܐ ܘܫܰܘܥܝ ܗܘܠ ܠܰܕܝܰܘܡܰܐ، ܗܰܢܝ ܐܰܪܒܥܝ ܐܷܫܢܶܐ ܟܳܡܕܰܘܡܝ ܒܘ ܫܷܟܠܰܢܐ",
  "ܒܘ ܕܳܪܐ ܕܰܚ ܚܰܐ ܘܥܷܣܪܝ ܚܰܐ ܡܰܐ ܡܶܕܳܢܶܐ ܕܘ ܬܶܟܢܳܠܳܙ̰ܝ ܕܟܷܬܝܐ ܒܰܐ ܒܳܬܶܐ ܕܟܘܠ ܢܳܫܐ ܐܘ ܬܰܠܰܘܷܙܝܳܢ ܝܐ",
  "ܘܐܘ ܚܰܝܠܐ ܕܡܰܥܠܶܠܶܗ ܐܝ ܟܶܦܰܬ݂ܶܗ ܠܝ ܗܰܘܰܐ، ܗܝܝܶܗ ܓܡܰܥܡܰܪ ܐܝ ܥܝܬܰܬ݂ܶܗ ܘܓܷܕܦܰܝܫܐ ܗܘܠ ܠܥܳܠܰܡ ܥܰܡܷܪܬܐ",
  "ܘܡܰܠܰܟ݂ܠܰܢ ܠܰܦ ܥܷܣܪܐ ܟܝܠܳܡܰܬܪܰܬ ܒܰܝܢ ܕܰܩ ܩܷܪܝܰܘܳܬ݂ܶܐ ܗܘܠ ܕܡܰܛܝܢܰܐ ܠܝ ܩܪܝܬ݂ܐ ܕܟܷܬܝܐ ܐܶܒܰܗ ܐܝ ܕܰܝܪܐ",
  "ܓ݂ܰܠܰܒܶܐ ܡܰܝ ܝܳܠܘܦܰܢܝ ܒܷܬܷ݂ܪ ܡܶܐ ܕܷܡܟܰܡܰܠܠܶܗ ܠܝܣܰܐ ܩܪܰܠܠܶܗ ܒܶܝܬܨܰܘܒܐ ܘܝܰܠܝܦܝ ܐܘܡܳܢܘܳܬ݂ܳܐ ܡܫܰܚܠܦܶܐ",
  "ܒܘ ܙܰܒܢܐ ܕܟܳܦܰܝܫܝ ܒܝ ܕܰܝܪܐ܆ ܟܳܩܳܪܷܢ ܘܟܳܝܘܠܦܝ ܘܟܳܡܰܫܰܦܥܝ ܙܰܒܢܐ ܒܰܣܝܡܐ ܥܰܡ ܐܝ ܐܰܚܘܬܐ ܕܝ ܕܰܝܪܐ ܟܘܠܰܗ",
  "ܘܒܝ ܫܰܬܐ ܕܰܐܢ ܐܰܠܦܐ ܘܫ̰ܰܥܡܐ ܘܫ̰ܰܥ ܘܬܷܫܥܝ ܐܰܬ݂ܝ ܠܝ ܕܰܝܪܐ ܕܡܳܪܝ ܓܰܒܪܐܶܝܠ ܕܟܷܬܝܐ ܐܶܒܰܗ ܗܘܠ ܠܰܕܝܰܘܡܰܐ",
  "ܒܩܳܠܐ ܬܰܚܬܳܝܐ ܡܷܪܠܶܠܶܗ؛ ܩܘܡ ܝܰܐ ܐܘ ܐܰܒܪܰܝܕ݂ܝ ܕܷܐܙܙܰܢܐ ܡܰܚܬܝܢܰܐ ܐܘ ܪܷܟܷܢ ܕܝ ܥܡܰܪܰܐ ܕܦܰܝܫܝܢܰܐ ܐܶܒܰܗ",
  "ܐܰܡ ܡܰܠܦܳܢܶܐ ܕܝ ܡܰܕܪܰܫܬܐ܆ ܥܰܡ ܐܝ ܡܰܠܦܳܢܘܬ݂ܐ܆ ܟܳܦܷܠܚܝ ܒܘ ܛܒܳܥܐ ܕܷܟܬܳܘܶܐ ܚܰܬ݂ܶܐ ܘܒܘ ܦܪܳܣܰܬ݂ܬ݂ܶܗ ܣܬܶܐ",
  "ܟ݂ܘܕ ܟܬ݂ܘܠܰܢ ܠܰܠܥܰܠ، ܐܝ ܕܰܝܪܰܬ݂ܶܐ ܥܰܡܝܪܐ ܒܐܝܕ݂ܳܬ݂ܶܗ ܕܷܬ ܬܪܶܐ ܩܰܕܝܫܶܐ ܘܰܐܥܡܰܝܝܶܗ ܐܘ ܡܰܠܰܟ݂ܐ ܕܘ ܡܳܪܝܐ",
  "ܟܷܒܥܝܢܰܐ ܕܣܰܝܡܘܬܘ ܫܘܓ݂ܠܐ ܢܰܕ݂ܝܦܐ ܘܕܟܳܡܰܠܷܩ ܠܘ ܡܰܟܬܰܒܙܰܒܢܐ ܠܰܫܰܢ ܕܕܘܥܪܐ ܒܰܠܟܝ ܠܘ ܫܘܒܚܰܝܕ݂ܰܗ ܐܘ ܩܰܡܳܝܐ",
  "ܘܡܰܕܥܰܪܪܶܗ ܦܳܬ݂ܰܝܝܶܗ ܠܘ ܬܰܝܡܢܐ، ܡܰܚܘܶܠܶܠܶܗ ܟܶܦܐ ܚܪܶܬܐ ܘܡܷܪܠܶܗ؛ ܗܰܪܟܶܐ ܣܬܶܐ ܓܬܳܘܶܐ ܐܘ ܬܰܪܥܐ ܕܘ ܬܰܝܡܢܐ",
  "ܐܝܢܰܩܩܰܐ ܕܷܚܙܶܠܶܗ ܡܳܪܝ ܫܶܡܥܘܢ ܐܝ ܪܰܒܘܬ݂ܐ ܘܐܝ ܪܘܝܚܘܬ݂ܐ ܡܷܪܠܶܗ ܠܘ ܡܰܠܰܟ݂ܐ؛ ܐܰܚܢܰܐ ܬܪܶܐ ܢܳܫܶܐ ܬܰܢܶܐ ܢܰܐ",
  "ܥܰܡܷܪܬܐ ܝܐ ܒܘ ܡܰܕܷܢܚܐ ܕܘ ܛܘܪܐ ܕܩܰܪܕܘ ܝܰܢܝ ܔܘܕܝ ܘܒܘ ܬܰܝܡܢܐ ܕܘ ܛܘܪܐ ܕܐܝܙܠܐ ܕܟܳܡܝܕ݂ܰܥ ܐܘ ܛܘܪܐ ܕܝ ܒܰܓܳܟܶܐ",
  "ܐܶܠܐ ܥܰܡ ܚܒܳܠ، ܥܰܡ ܐܘ ܥܒܳܪܐ ܕܰܙ ܙܰܒܢܶܐ ܡܰܝ ܝܰܩܕ݂ܳܢܶܐ ܘܡܰܚ ܚܰܪܒܰܬ، ܐܰܟ ܟܬ݂ܳܘܰܢܝ ܠܐ ܡܰܛܷܢ ܗܘܠ ܠܰܕܝܰܘܡܰܐ",
  "ܐܘ ܟܶܘܐ ܒܝ ܩܰܡܰܝܬܐ ܚܙܶܐ ܒܘ ܨܝܢ ܒܰܕ ܕܘܟܝܳܬ݂ܐ ܕܟܝܬܐ ܚܰܝܶܘܷܢ ܕܘ ܒܰܚܰܪ ܘܒܰܕ ܕܘܟܝܳܬ݂ܐ ܕܟܳܡܝܙܰܒܢܝ ܐܰܚ ܚܝܶܘܷܢ",
  "ܘܗܰܘܟ݂ܰܐ ܥܰܡܰܢܘܐܝܶܠ ܐܘ ܐܰܒܪܐ ܕܘ ܐܰܚܘܢܐ ܕܘ ܚܰܣܝܐ، ܟܬ݂ܘܠܶܗ ܙܷܬܬܷܪ ܡܶܐ ܫܰܘܥܝ ܟܬ݂ܳܘܶܐ ܒܘ ܩܰܢܝܐ ܣܛܪܰܢܓܶܠܳܝܐ",
  "ܗܷܢ ܡܷܢܢܶܗ ܗܰܘܷܢ ܦܰܛܷܪܝܰܪܟܶܐ ܘܗܷܢ ܚܰܣܝܶܐ ܘܗܷܢ ܕܰܝܪܳܝܶܐ ܘܗܷܢ ܩܰܫܶܐ ܘܗܷܢ ܡܫܰܡܫܳܢܶܐ ܘܡܰܠܦܳܢܶܐ ܕܠܳܐ ܡܷܢܝܳܢܐ",
  "ܘܒܝ ܫܰܬܐ ܕܰܐܢ ܐܰܠܦܐ ܘܚܰܡܷܫ ܘܐܷܫܬܝ ܐܝ ܕܰܘܠܰܐ ܕܬܘܪܟܝܝܰܐ، ܦܬܷܚܠܰܠܰܗ ܕܰܪܒܐ ܕܰܪ ܪܰܕ݂ܳܝܳܬ݂ܶܐ ܗܘܠ ܩܘܡ ܐܘ ܬܰܪܥܐ",
  "ܐܘ ܚܰܐ ܕܟܳܐܒܷܥ ܡܙܰܒܷܢ ܓ݂ܰܠܰܒܶܐ ܟܷܐܙܙܶܗ ܟܳܟܳܪܷܟܼ ܐܰܒ ܒܶܝܬ ܟܪܝܗܶܐ، ܐܰܡ ܡܰܕܪܰܫܝܳܬ݂ܶܐ، ܐܰܚ ܚܰܠܳܩܶܐ ܕܰܢ ܢܝܫܶܐ",
  "ܡܰܘܟ݂ܰܐ ܟܝܒܰܢ ܕܷܐܡܝܢܰܐ ܐܘ ܚܰܙܳܝܐ ܕܘ ܬܰܠܰܘܷܙܝܳܢ ܕܟܳܡܝܬܷܣܬܰܥܡܷܠ ܒܰܒ ܒܳܬܶܐ ܟܘܠܶܗ ܐܰܕܝܳܡܰܐ  ܦ݁ܗܝܠܐ ܬܰܝܠܷܪ ܝܐ",
  "ܒܷܬ݂ܷܪ ܡܶܐ ܕܕܰܡܝܟ݂ܝ، ܒܠܰܠܝܐ ܐܰܬ݂ܝ ܐܘ ܡܰܠܰܟ݂ܐ ܕܰܐܠܳܗܐ ܓܰܒ ܡܳܪܝ ܫܶܡܥܘܢ ܒܘ ܫܷܟܷܠ ܕܡܳܪܝ ܫܡܘܐܝܶܠ ܐܘ ܪܰܒܰܝܕ݂ܶܗ",
  "ܐܰܢܰܣܛܰܐܣ ܐܘ ܡܰܠܟܐ ܕܰܒ ܒܝܙܰܢܛܳܝܶܐ، ܡܫܰܕܰܪܠܶܗ ܐܰܗ ܗܳܣܬܰܘܝܢܰܝܕ݂ܶܗ ܬܶܐܳܘܕܳܘܣܝ ܘܬܶܐܳܘܕܳܘܪܝ ܐܰܢ ܐܰܒܢܶܐ ܕܫܘܦܢܝ",
  "ܘܗܷܢ ܡܷܢܢܶܗ ܣܬܶܐ ܡܰܥܰܒܪܝܘܰܐ ܐܰܚ ܚܰܝܰܬ݂ܬ݂ܶܗ ܒܘ ܫܘܓ݂ܠܐ ܘܒܝ ܬܷܫܡܷܫܬܐ ܕܰܕ ܕܰܝܪܳܝܶܐ ܚܪܶܢܶܐ ܐܰܢ ܐܰܚܘܢܳܢܰܬ݂ܬ݂ܶܗ",
  "ܐܘ ܡܓܰܠܝܘܢ ܕܝ ܕܰܝܪܐ ܐܰܥܡܰܝܝܶܘܰܐ ܛܠܷܒܠܝ ܡܷܢܢܶܗ ܘܡܷܪܠܝ؛ ܗܰܘܘܠܝ ܐܘ ܡܓܰܠܝܘܢ ܕܡܳܒܰܢܢܶܗ ܠܝ ܕܰܝܪܐ ܕܡܳܪܝ ܓܰܒܪܐܝܶܠ",
  "ܐܘ ܡܰܠܰܟ݂ܐ ܘܡܳܪܝ ܫܶܡܥܘܢ، ܒܷܬ݂ܷܪ ܡܶܐ ܕܷܡܟܰܡܰܠܠܶܗ ܫܘܓ݂ܠܰܝܝܶܗ، ܕܰܥܝܪܝ ܠܝ ܕܘܟܬ݂ܐ ܕܟܷܬܘܰܐ ܡܳܪܝ ܫܡܘܐܝܶܠ ܕܰܡܝܟ݂ܐ",
  "ܐܝ ܕܰܝܪܐ ܕܡܳܪܝ ܓܰܒܪܐܶܝܠ، ܒܘ ܙܰܒܢܐ ܕܝ ܪܝܫܳܢܘܬ݂ܰܝܕ݂ܶܗ، ܟܳܥܰܝܫܐ ܚܰܐ ܡܰܕ ܕܳܪܶܐ ܕܰܗܒܳܢܳܝܶܐ ܕܘ ܡܰܟܬܰܒܙܰܒܢܰܝܕ݂ܰܗ",
  "ܒܘ ܟܬ݂ܳܘܐ ܕܘ ܡܰܟܬܰܒܙܰܒܢܐ ܕܝ ܕܰܝܪܐ܆ ܟܬ݂ܝܘܐ ܝܐ ܕܐܝ ܡܰܕܪܰܫܬܐ ܟܳܗܢܳܝܬܐ ܦܬܝܚܐ ܒܘ ܕܳܪܐ ܕܰܚ ܚܰܡܫܳܐ ܒܷܬ݂ܷܪ ܡܶܐ ܡܫܝܚܐ",
  "ܒܝ ܫܰܬܐ ܕܰܐܢ ܐܰܠܦܳܐ ܘܬܫܰܥܡܐ ܘܬܡܳܢܶܐ ܘܫܰܘܥܝ ܡܫܰܕܰܪ ܠܶܗ ܐܰܝ ܝܳܠܘܦܶܐ ܠܡܷܕ݂ܝܰܕ݂ ܕܩܳܪܷܢ ܒܰܡ ܡܰܕܷܪܫܳܬ݂ܶܐ ܕܝ ܕܰܘܠܰܐ",
  "ܥܰܡܷܪܬܐ ܝܐ ܗܘܠ ܠܰܕܝܰܘܡܰܐ ܟ݂ܘܕ ܩܰܠܥܐ ܩܘܝܬ݂ܐ ܘܟܳܡܝܫܰܠܛܐ ܟ݂ܘܕ ܐܰܪܝܐ ܥܰܠ ܪܝܫܶܗ ܕܛܘܪܐ ܒܰܝܢ ܕܰܐܢ ܐܝܠܳܢܶܐ ܕܘ ܒܰܠܘܛܐ",
  "ܐܝ ܢܰܩܠܰܐ ܕܡܰܬܝܡܝ ܘܰܐ ܣܬܶܐ܆ ܡܝܫܰܕܪܝ ܘܰܐ ܠܰܡ ܡܰܕܷܪܫܳܬ݂ܶܐ ܕܰܩ ܩܷܪܝܰܘܳܬ݂ܶܐ ܘܗܳܘܷܢ ܘܰܐ ܡܷܠܦܳܢܶܐ ܕܘ ܠܶܫܳܢܐ ܣܘܪܝܳܝܐ",
  "ܕܟܷܬܢܶܗ ܣܬܶܐ ܡܫܰܡܗܶܐ ܒܘ ܡܰܟܬܰܒܙܰܒܢܐ ܕܝ ܥܝܬܐ، ܡܳܪܝ ܦܝܠܘܟܣܝܢܘܣ ܕܡܰܒܘܓ݂ ܪܰܒܐ ܕܰܝ ܝܰܕ݂ܘܥܬ݂ܳܢܶܐ ܘܪܝܫܐ ܕܰܡ ܡܰܠܦܳܢܶܐ",
  "ܐܘ ܡܝܬ݂ܐ ܩܰܡܳܝܐ ܕܡܰܐܝܷܬ݂ ܒܬܷܪܟܝܰܐ ܡܘ ܟܶܘܐ ܕܝ ܟܳܘܪܳܢܰܐ ܚܕ݂ܰܥܣܪ ܒܘ ܝܰܪܚܐ ܕܳܐܕ݂ܳܪ ܒܝ ܫܰܬܐ ܕܰܬܪܰܠܦܐ ܘܥܷܣܪܝ ܡܰܐܝܷܬ݂",
  "ܐܰܒܘܢ ܡܥܰܠܝܐ ܡܷܪܠܶܗ ܣܬܶܐ ܠܘ ܘܰܠܝ ܘܠܰܚ ܚܰܕ݂ܝܪܶܐ ܚܪܶܢܶܐ؛ ܐܝ ܕܰܝܪܰܬ݂ܶܐ ܒܰܢܝܐ ܘܥܰܡܝܪܐ ܒܘ ܫܷܟܷܠ ܕܝ ܕܰܝܪܐ ܕܘ ܙܰܥܦܰܪܰܐܢ",
  "ܟܝܬܐ ܒܗܷܢ ܒܳܬܶܐ ܙܷܬ ܡܶܐ ܬܪܶܐ ܬܰܠܰܘܙܝܳܢܶܐ ܗܝـܝܶܐ ܛܰܘܐ ܘܒܰܣܝܡܳܝܐ ܐܘ ܦܶܪܳܔܶܕ݂ܶܐ ܐܶܠܐ ܡܰܡܷܬܠܶܗ ܐܰܔ ܔܷܒܰܬܰܬ ܕܰܒ ܒܳܬܶܐ",
  "ܐܝ ܡܕܰܒܪܳܢܘܬ݂ܐ ܕܝ ܡܰܪܕܘܬ݂ܐ ܘܕܘ ܬܘܪܝܙܡ ܕܝ ܗܝܓ݂ܡܳܢܘܬ݂ܐ ܕܒܰܛܡܰܢ، ܗܰܢܝ ܡܶܐ ܙܰܒܢܐ ܒܕܰܠܠܶܗ ܕܷܡܚܰܕܬ݂ܝ ܘܕܡܰܢܕ݂ܦܝ ܐܝ ܕܰܝܪܐ",
  "ܘܝܰܘܡܳܐܝܬ ܣܬܶܐ ܐܰܡ ܡܰܠܦܳܢܶܐ ܘܰܐܝ ܝܳܠܘܦܶܐ ܟܳܡܷܔܓ݂ܳܠܝ ܟܬ݂ܳܒܳܢܳܝܐ ܠܰܫܰܢ ܕܦܳܝܰܫ ܠܶܫܳܢܐ ܚܰܝܐ ܘܡܷܢܛܰܪ ܠܰܕ ܕܳܪܶܐ ܕܳܐܬ݂ܷܢ",
  "ܡܰܘܠܰܕ݂ ܒܝ ܫܰܬܐ ܕܰܐܢ ܐܰܠܦܐ ܘܫ̰ܰܥܡܐ ܘܚܕ݂ܐ ܘܫܰܘܥܝ ܒܰܐܪܟܰܚ ܐܝ ܩܪܝܬ݂ܐ܇ ܩܪܶܠܶܗ ܘܝܰܠܷܦ ܐܘ ܣܘܪܝܳܝܐ ܒܝ ܕܰܝܪܐ ܕܡܳܪܝ ܡܰܠܟܶܐ",
  "ܘܐܰܝ ܝܰܩܪܳܬ݂ܶܐ ܕܟܷܬܢܶܐ ܡܳܪܶܐ ܕܢܰܥܝܡܶܐ ܓ݂ܰܠܰܒܶܐ، ܠܐ ܟܳܩܘܕܪܝ ܕܙܰܘܢܝ ܠܟܘܠ ܚܰܐ ܡܰܢ ܢܰܥܝܡܰܬ݂ܬ݂ܶܗ ܟܳܡܦ݁ܝܘܬܶܪ ܐܰܘ ܬܶܠܶܦܘܢ",
  "ܒܝ  ܫܰܬܐ ܕܰܐܠܦܐ ܬܫ̰ܰܥܡܐ ܘܬܠܶܬ݂ܝ ܡܷܕܠܶܗ ܐܘ ܦܰ݁ܬܶܢܬ ܕܘ ܬܰܠܰܘܷܙܝܳܢ ܕܘ ܬܘܦ݁ ܘܡܰܫܦܰܥܠܶܗ ܐܷܫܡܶܐ ܠܘ ܡܰܟܬܰܒ ܙܰܒܢܐ ܕܷܒܪܝܬ݂ܐ",
  "ܒܢܶܠܶܗ ܫܘܪܐ ܚܶܕ݂ܰܪ ܐܝ ܕܰܝܪܐ ܕܟܷܬܝܐ ܐܘ ܝܷܪܟ݂ܰܝܕ݂ܶܗ ܬܠܳܬ݂ܐ ܟܝܠܳܡܰܬܪܰܬ، ܠܘ ܢܛܳܪܐ ܘܠܝ ܣܷܬܪܰܐ ܕܝ ܕܰܝܪܐ ܘܕܰܥ ܥܳܡܘܪܰܝܕ݂ܰܗ",
  "ܡܝ ܫܰܬܐ ܕܥܰܡܝܪܐ ܗܘܠ ܠܰܕܝܰܘܡܰܐ، ܕܠܐ ܩܛܳܥܐ ܟܳܡܫܰܡܫܐ ܐܝ ܥܝܬܐ ܘܐܘ ܥܰܡܐ ܣܘܪܝܳܝܐ ܕܝܠܳܢܳܐܝܬ݂ ܘܟܘܠܰܗ ܐܝ ܢܳܫܘܬ݂ܐ ܓܰܘܳܢܳܐܝܬ݂",
  "ܠܰܦ ܦܰܠܓܶܗ ܕܘ ܕܳܪܐ ܕܰܥ ܥܷܣܪܝ، ܒܘ ܙܰܒܢܐ ܕܟܷܬܘܰܐ ܕܰܝܪܳܝܐ ܝܶܫܘܥ ܔܝܔܰܟ ܐܘ ܪܝܫܕܰܝܪܐ (ܒܷܬ݂ܷܪ ܐܘ ܚܰܣܝܐ ܕܰܐܘܪܘܦ݁ܰܐ ܡܶܨܥܰܝܬܐ",
  "ܐܶܠܐ ܒܷܬ݂ܷܪ ܒܙܰܒܢܐ ܟܰܪܝܐ ܡܰܛܝ ܐܘ ܡܷܢܝܳܢܐ ܕܰܕ ܕܰܝܪܳܝܶܐ ܕܥܘܡܪܝܘܰܐ ܐܶܒܰܗ، ܠܰܐܪܒܰܥܡܐ ܒܘ ܙܰܒܢܐ ܕܝ ܪܝܫܳܢܘܬ݂ܐ ܕܡܳܪܝ ܫܡܘܐܝܶܠ",
  "ܘܰܐܝܢܰܐ ܕܫܳܡܰܥܘܰܐ ܥܰܠ ܰܐܚ ܚܰܝܰܬ݂ܬ݂ܶܗ ܐܰܒ ܒܪܝܟ݂ܶܐ، ܪܳܗܰܛܘܰܐ ܠܝ ܕܰܝܪܐ ܕܥܳܝܰܫ ܒܰܝܢܳܬܰܝܝܶܗ ܘܗܰܟܟܰܐ ܕܫܳܘܶܐ ܕܗܳܘܶܐ ܕܰܝܪܳܝܐ",
  "ܒܘ ܣܰܝܦܐ ܕܗܰܘܝ ܒܝ ܫܰܬܐ ܕܰܐܢ ܐܰܠܦܐ ܘܫ̰ܰܥܡܐ ܘܚܰܡܫܰܥܣܰܪ، ܐܰܟ ܟܘܪܕܳܝܶܐ ܩܛܷܠܠܶܗ ܐܰܕ ܕܰܝܪܳܝܶܐ ܕܝ ܕܰܝܪܐ ܘܝܰܬܝܘܝ ܒܕܘܟܬ݂ܰܝܝܶܗ",
  "ܐܝ ܡܥܰܠܝܘܬ݂ܐ ܕܡܳܪܝ ܛܝܡܳܬ݂ܶܐܘܳܣ ܫܡܘܐܝܶܠ ܐܰܩܛܰܫ، ܒܙܰܒܢܐ ܡܰܐܝܪܐ ܘܡܰܠܝܐ ܥܰܣܩܳܬ݂ܐ ܗܰܘܝ ܪܝܫ ܕܰܝܪܐ ܘܒܷܬ݂ܷܪ ܚܰܣܝܐ ܠܛܘܪܥܰܒܕܝܢ",
  "ܗܷܢ ܡܷܢܢܶܗ ܗܰܘܷܢ ܐܳܣܰܘܳܬ݂ܐ ܘܗܷܢ ܣܦܰܪܝܰܘܡܳܝܶܐ ܘܗܷܢ ܣܢܐܓܪܶܐ ܘܗܷܢ ܡܰܚܳܪܶܐ ܘܗܷܢ ܐܰܪܟܶܐܳܠܳܘܓ ܘܗܷܢ ܚܰܫܳܘܶܐ ܕܘ ܡܳܡܘܢܐ ܘܫܰܪܟܐ",
  "ܒܷܬ݂ܷܪ ܡܷܕ ܕܩܰܘܷܢ ܗܰܢܝ ܥܰܠ ܠܘ ܢܳܫܐ ܟܳܩܷܠܒܝ ܠܘ ܟܶܘܐ ܕܝ ܙܰܛܘܪܝܰܐ، ܟܳܕ݂ܷܥܦܝ ܐܰܟ ܟܷܠܰܘ، ܐܘ ܟܰܐܝܘܐ ܗܰܘ ܟܳܩܳܕܰܪ ܕܡܳܝܰܕ ܢܰܦܰܣ",
  "ܠܦܘܬ ܕܘ ܒܘܚܳܢܐ ܕܣܷܡܠܶܗ ܐܘ ܫܘܬܳܣܐ ܕܐܘܢܶܣܟܐ، ܒܰܡܡܐ ܬܷܫܥܝ ܕܰܝ ܝܳܠܘܦܶܐ ܡܰܕ݂ܝܪܝ ܡܘ ܟܶܘܐ ܕܝ ܟܳܘܪܳܢܰܐ ܘܡܥܰܘܰܩ ܐܘ ܝܘܠܦܳܢܰܬ݂ܬ݂ܶܗ",
  "ܗܘܠ ܠܘ ܙܰܒܢܰܘܐ ܒܝܒܝܣܝ ܡܚܰܕ݂ܰܪܘܰܐ ܘܡܰܚܘܶܘܰܐ ܟܘܠܡܶܕܐ ܕܘ ܬܰܠܰܘܷܙܝܳܢ ܒܷܬ݂ܷܪ ܡܘ ܙܰܒܢܰܘܐ ܣܝܡ ܣܝܣܬܶܡ ܐܰܠܰܟܬܪܳܢܝܟ ܕܘ ܬܰܠܰܘܷܙܝܳܢ",
  "ܐܰܒܘܢ ܡܥܰܠܝܐ ܡܳܪܝ ܛܝܡܳܬ݂ܶܐܘܳܣ ܫܡܘܐܝܶܠ ܐܰܩܛܰܫ ܣܬܶܐ ܡܷܪܠܶܗ؛ ܐܳܢܐ ܐܝܢܰܩܠܰܐ ܩܰܡܰܝܬܐ ܒܝ ܫܰܬܐ ܕܰܬܡܳܢܝ ܗܶܫ ܕܰܝܪܳܝܐ ܐܰܬ݂ܝܢܐ ܠܰܪܟܶܐ",
  "ܒܷܬ݂ܷܪ ܡܘ ܠܰܠܝܰܢܐ ܓ݂ܰܠܰܒܶܐ ܡܰܚܘܶܠܶܗ ܐܘ ܥܰܡܐ ܠܗܝܩܘܬ݂ܐ ܠܘ ܬܰܠܰܘܝܣܷܪ ܘܒܕܶܠܶܗ ܝܘܚܰܢܷܢ ܕܥܳܠܶܗ ܒܘ ܦܷܪܥܰܢܐ ܘܗܳܘܶܐ ܡܫܰܡܗܐ ܓ݂ܰܠܰܒܶܐ",
  "ܒܝ ܡܰܕܪܰܫܬܐ ܟܳܗܢܳܝܬܐ ܕܡܳܪܝ ܓܰܒܪܐܶܝܠ ܩܪܰܠܠܶܗ ܘܝܰܠܝܦܝ ܘܗܰܘܷܢ ܚܰܣܝܶܐ ܘܟܳܡܕܰܒܪܝ ܐܰܡ ܡܰܪܥܝܳܬ݂ܰܬ݂ܬ݂ܶܗ ܒܟܘܠ ܚܰܟܝܡܘܬ݂ܳܐ ܘܫܰܪܝܪܘܬ݂ܐ",
  "ܐܰܕ ܕܰܝܪܳܝܶܐ ܕܥܷܡܪܝܘܰܐ ܒܷܚܕ݂ܐ ܪܘܚܐ ܘܒܚܰܐ ܨܶܒܝܳܢܐ ܘܒܷܚܕ݂ܐ ܢܰܦܫܐ ܒܝ ܕܰܝܪܐ، ܟ݂ܘܕ ܐܰܡ ܡܰܠܰܟ݂ܶܐ ܡܶܐ ܨܰܦܪܐ ܗܘܠ ܥܰܨܪܝܝܶܐ ܡܨܰܠܷܢܘܰܐ",
  "ܒܷܬ݂ܷܪ ܡܶܐ ܕܷܡܟܰܡܶܠܶܗ ܐܘ ܝܘܠܦܳܢܰܝܕ݂ܶܗ ܐܘ ܬܘܪܟܳܝܐ ܘܐܘ ܣܘܪܝܳܝܐ ܒܝ ܕܰܝܪܐ ܕܡܳܪܝ ܓܰܒܪܐܶܝܠ܆ ܐܰܙܙܶܗ ܠܝܢܓܝܠܬܶܪܶܐ ܕܩܳܪܶܐ ܬܶܐܘܳܠܘܓ݂ܝܰܐ",
  "ܐܘ ܗܝܓ݂ܡܘܢܐ ܝܰܢܝ ܐܘ ܘܰܠܝ ܕܒܰܛܡܰܢ ܗܘܠܘܣܝ ܫܰܐܗܝܢ، ܡܶܩܷܡ ܒܷܟܡܐ ܝܰܘܡܶܐ ܐܰܒܷܥ ܕܷܐܙܙܶܗ ܘܕܣܳܝܰܡ ܟܳܢܬܪܳܠ ܐܘ ܫܘܓ݂ܠܐ ܕܟܳܡܕܰܘܰܡ ܒܝ ܕܰܝܪܐ",
  "ܡܷܩܩܰܐ ܕܗܳܘܶܘܰܐ ܟܰܝـܝܘܐ ܣܬܶܐ ܡܰܚܰܬܘܰܝܠܶܗ ܒܗܰܘܢܶܗ ܕܷܡܫܰܘܫܷܛ ܪܘܚܶܗ ܒܘ ܬܰܠܰܘܷܙܝܳܢ ܐܰܟ ܟܶܘܶܐ ܠܐ ܩܘܕܪܝܘܰܐ ܕܡܰܕܰܥܪܝܠܶܗ ܡܘ ܚܷܠܡܶܕ݂ܶܐ",
  "ܒܷܬ݂ܷܪ ܐܘ ܥܰܡܐ ܟܘܪܕܳܝܐ ܕܝ ܩܪܝܬ݂ܐ ܘܗܷܢ ܡܰܪ ܪܝܫܳܢܶܐ ܕܒܰܛܡܰܢ ܩܰܐܝܡܝ ܡܩܰܒܷܠ ܕܝܕ݂ܶܗ ܘܡܗܰܕܰܕܶܗ ܔܒܝܪ ܕܛܳܪܶܐ ܡܝ ܬܰܪܡܝܬ݂ܐ ܕܘ ܥܶܕܳܠܰܝܕ݂ܰܗ",
  "ܒܝ ܫܰܬܐ ܕܐܰܠܦܐ ܬܫܰܥܡܐ ܘܬܠܰܬ ܚܰܡܫܝ ܠܚܘܕ݂ܶܐ ܝܰܘܡܶܐ ܕܘܥܪܘܬܐ ܟܷܬܘܰܐ ܡܶܕܳܢܶܐ ܠܦܶܪܔܶܐ ܡܝ ܫܳܥܬ݂ܐ ܫܶܬ݂ ܕܥܰܣܷܪܝـܝܶܐ ܗܘܠ ܠܰܫ ܫܶܬ݂ ܘܦܰܠܓܶܐ",
  "ܠܓܳܪܰܢ ܕܘ ܡܰܟܬܰܒܙܰܒܢܐ، ܐܰܢܰܣܛܰܐܣ ܐܘ ܡܰܠܟܐ ܗܘܘܰܝܠܶܗ ܫܘܰܥ ܩܷܪܝܰܘܳܬ݂ܶܐ ܕܟܳܡܫܰܪܶܐ ܐܷܫܡܰܝܝܶܗ ܒܝ ܐܳܬ݂ܘܬ݂ܐ ܕܝ ܟܳܦ، ܠܝ ܕܰܝܪܐ ܟ݂ܘܕ ܕܳܫܢܐ",
  "ܒܝ ܫܰܬܐ ܕܰܫ̰ ܫ̰ܰܥܡܐ ܘܬܡܳܢܶܐ ܘܬܶܫܥܝ ܡܫܝܚܰܝܬܐ، ܡܚܰܕܰܬ݂ܠܶܗ ܐܝ ܟܬ݂ܰܘܬܐ ܣܛܪܰܢܓܶܠܰܝܬܐ ܡܶܐ ܚܰܬ݂ܐ ܥܰܠ ܕܛܰܥܝܳܘܰܐ ܒܛܘܪܥܰܒܕܝܢ ܠܰܦ ܡܐ ܐܷܫܢܶܐ",
  "ܒܝ ܚܰܪܰܝܬܐ ܡܰܠܰܟ݂ܟ݂ܶܗ ܠܘ ܡܰܕܷܢܚܐ، ܐܘ ܡܰܠܰܟ݂ܐ ܡܰܥܠܶܠܶܗ ܡܝ ܐܰܪܥܐ ܟܶܦܐ ܪܰܒܬ݂ܐ ܕܟܷܬܘܰܐ ܢܩܷܫܬܐ ܡܰܙ ܙܰܒܢܐ ܩܰܡܳܝܶܐ، ܘܡܰܟܰܠܝܳܠܶܗ ܒܝ ܗܰܘܰܐ",
  "ܘܒܝ ܫܰܬܐ ܕܐܰܠܦܐ ܬܫܰܥܡܐ ܘܬܡܰܢܝܐ ܘܥܷܣܪܝ ܩܰܕܷܪ ܕܡܰܚܘܶܐ ܐܘ ܬܰܠܰܘܝܣܷܪ ܒܠܰܠܝܐ ܕܟܷܬܘܰܐ ܥܰܡܐ ܓ݂ܰܠܰܒܶܐ ܠܰܝـܝܡܐ ܒܬܰܚܪܰܣܬܐ ܪܰܒܬ݂ܐ ܕܝ ܩܳܛܢܘܬ݂ܐ",
  "ܓ݂ܰܠܰܒܶܐ ܢܳܫܶܐ ܢܳܩܘܨܶܐ ܕܟܷܐܙܙܷܢ ܠܕܘܟܬ݂ܐ ܚܪܶܬܐ ܐܰܓ݂ܠܰܒܰܐ ܡܰܢ ܢܳܫܶܐ ܕܠܳܐ ܐܳܬ݂ܷܢ ܚܳܙܷܢ ܐܝ ܕܷܟܟܰܢܐ ܕܝ ܙܝܦܟܰܪܝـܝܰـܝܕ݂ܰܢ ܠܐ ܟܷܐܙܙܷܢ ܡܰܪܟܶܐ",
  "ܡܣܰܓܰܠܠܶܗ ܐܘ ܒܝܬ݂ܓܰܙܐ ܠܓܳܪܰܢ ܕܰܩ ܩܝܢܳܬ݂ܶܐ ܕܝ ܕܰܝܪܐ ܘܦܪܝܣ ܒܝ ܬܰܚܪܰܙܬܐ ܕܰܬ ܬܰܠܰܦܘܢܶܐ ܠܰܫܰܢ ܕܟܘܠ ܝܳܠܘܦܐ ܕܪܳܚܰܡ ܩܳܕܰܪ ܫܳܡܰܥܠܶܗ ܘܝܳܠܰܦܠܶܗ",
  "ܒܰܦ ܦܘܠܚܳܢܶܐ ܕܣܷܡܠܶܗ ܒܘ ܙܰܒܢܐ ܕܝ ܪܝܫܳܢܘܬ݂ܰܝܕ݂ܶܗ ܗܰܡ ܒܝ ܕܰܝܪܐ ܗܰܡ ܣܬܶܐ ܒܛܘܪܥܰܒܕܝܢ، ܗܰܘܝ ܪܳܥܝܐ ܫܰܪܝܪܐ ܘܡܕܰܒܪܳܢܐ ܚܰܟܝܡܐ ܕܘ ܥܰܡܐ ܣܘܪܝܳܝܐ",
  "ܡܬ݂ܰܒܰܬ ܬܠܳܬ݂ܰܥܣܰܪ ܒܘ ܝܰܪܚܐ ܩܰܡܳܝܐ ܕܰܬܪܰܠܦܐ ܘܥܷܣܪܝ ܒܰܥ ܥܰܠܰܡܰܬ ܕܷܚܙܷܢ ܒܢܳܫܶܐ ܟ݂ܘܕ، ܚܷܪܰܪܰܐ ܫܥܘܠܐ ܢܰܫܝܦܐ ܘܐܘ ܡܰܥܝܩܘܬ݂ܐ ܕܘ ܡܝܳܕܐ ܕܘ ܢܰܦܰܣ",
  "ܥܰܠ ܗܰܬ݂ܶܐ ܓ݂ܰܠܰܒܶܐ ܝܳܠܘܦܶܐ ܡܰܢ ܐܰܪܒܰܥ ܟ݂ܰܣܰܘܷܪ ܕܷܒܪܝܬ݂ܐ ܕܟܳܪܷܚܡܝ ܐܘ ܝܘܠܦܳܢܐ ܐܰܠܳܗܳܝܐ ܘܐܘ ܠܶܫܳܢܐ ܣܘܪܝܳܝܐ ܟܳܐܬܷ݂ܢ ܕܝܘܠܦܝ ܒܝ ܡܰܕܪܰܫܬܰܬ݂ܶܐ",
  "ܒܰܠܟܝ ܓ݂ܰܠܰܒܶܐ ܡܰܒܪܝܢܰܬ ܕܝ ܟܳܘܪܳܢܰܐ ܥܰܡ ܐܘ ܙܰܒܢܐ ܡܝܕܰܪܡܢܝ ܘܢܰܝܚܝ، ܐܶܠܐ ܐܝ ܣܦܝܩܘܬ݂ܐ ܕܗܰܘܝܐ ܒܘ ܦܶܪܥܐ ܕܘ ܝܘܠܦܳܢܐ ܓܡܰܕ݂ܝܪܐ ܐܰܕ ܕܳܪܶܐ ܕܳܐܬ݂ܷܢ",
  "ܟܳܘܶܐ ܒܬܘܪܟܝـܝܰܐ ܟܘܠܰܗ ܢܳܫܶܐ ܥܰܘܳܕܶܐ ܕܷܐܡܡܝܢܰܐ ܟܳܘܷܢ ܡܰܠܦܷܢܝܳܬ݂ܶܐ، ܐܳܣܰܘܳܬܶܐ ܘܡܥܰܘܢܳܢܶܐ ܕܰܢ ܐܳܣܰܘܳܬ݂ܶܐ ܐܰܘ ܝܳܠܘܦܶܐ  ܕܟܳܩܳܪܷܢ ܒܶܝܬ݂ ܨܰܘܒܶܐ",
  "ܐܰܝ ܝܳܠܘܦܶܐ ܕܝ ܕܰܝܪܐ ܕܡܳܪܝ ܓܰܒܪܐܶܝܠ܆ ܡܝ ܫܰܬܐ ܕܰܐܢ ܐܰܠܦܐ ܘܫ̰ܰܥܡܐ ܘܬܡܳܢܶܐ ܘܫܰܘܥܝ ܗܘܠ ܠܰܕܝܰܘܡܰܐ܆ ܥܰܡ ܐܘ ܣܘܪܝܳܝܐ܆ ܟܳܩܳܪܷܢ ܠܝܫܳܢܐ ܬܘܪܟܳܝܐ ܣܬܶܐ",
  "ܒܷܬ݂ܷܪ ܡܶܐ ܕܷܡܟܰܡܶܠܶܗ ܐܘ ܝܘܠܦܳܢܰܝܕ݂ܶܗ ܐܘ ܬܘܪܟܳܝܐ ܘܐܘ ܣܘܪܝܳܝܐ ܒܝ ܡܰܕܪܰܫܬܐ ܟܳܗܢܳܝܬܐ܆ ܒܝ ܫܰܬܐ ܕܰܐܢ ܐܰܠܦܐ ܘܫ̰ܰܥܡܐ ܘܬܡܳܢܶܐ ܘܬܷܫܥܝ ܗܰܘܝ ܡܰܠܦܳܢܐ",
  "ܒܷܬ݂ܷܪ ܡܘ ܡܰܣܬܷܪ ܡܫܰܪܶܠܶܗ ܕܫܳܓܷ݂ܠ ܒܫܷܪܟܰܬ ܪܰܒܶܐ ܕܟܷܬܝܐ ܐܘ ܦܷܪܥܰܬ݂ܶܐ ܔܰܝܪܰܢ، ܐܶܠܐ ܥܰܠ ܕܟܷܬܘܰܝܠܶܗ ܟܶܘܐ ܠܐ ܩܰܕܷܪ ܡܕܰܘܷܡ ܒܰܕ ܕܷܟܳܬ݂ܶܐ ܒܘ ܫܘܓܠܰܘܐ",
  "ܒܘ ܙܰܒܢܐ ܕܟܶܬܢܶܐ ܐܰܡ ܡܰܕܪܫܳܬ݂ܶܐ ܕܝ ܩܘܛܢܘܬ݂ܐ ܦܬܝܚܶܐ܆ ܟܘܙܙܷܢ ܠܡܷܕ݂ܝܰܕ݂ ܕܩܳܪܷܢ ܬܘܪܟܳܝܐ ܗܷܢ ܒܝ ܡܰܕܪܰܫܬܐ ܡܷܨܥܳܝܬܐ ܘܗܷܢ ܡܷܢܢܶܗ ܒܝ ܡܰܕܪܰܫܬܐ ܥܶܠܰܝܬܐ",
  "ܡܙܰܗܰܪܪܶܗ ܐܰܢ ܢܳܫܶܐ ܕܠܐ ܢܷܦܩܝ ܡܰܒ ܒܳܬܶܐ ܠܰܫܰܢ ܕܠܐ ܡܷܦܪܰܣ ܐܘ ܟܶܘܐ ܘܕܠܐ ܛܳܦܶܐ ܡܰܢ ܢܳܫܶܐ ܟܰܐܝܘܶܐ ܠܰܢ ܢܰܐܝܚܶܐ، ܐܰܕ ܕܘܘܰܠ ܣܟ݂ܷܪܪܶܗ ܐܰܡ ܡܰܕܷܪܫܳܬ݂ܶܐ",
  "ܡܰܕܥܰܪܠܶܗ ܐܰܥܠܶܗ ܡܳܪܝ ܫܶܡܥܘܢ؛ ܝܰܐ ܐܘ ܡܳܪܰܝܕ݂ܝ ܡܰܐ ܒܠܰܠܝܐ ܟܘܠܶܗ ܠܐ ܡܰܟܝܠܰܢ ܕܡܰܥܰܡܪܝܢܰܐ؟ ܘܡܰܚܰܬܠܰܢ ܬܠܰܬ݂ ܟܶܦܶܐ ܕܗܳܘܷܢ ܝܰܕ݂ܥܶܐ ܠܝ ܥܡܰܪܰܐ ܕܝ ܥܝܬܐ",
  "ܠܰܫܰܢ ܕܡܶܐ ܚܰܬ݂ܐ ܡܰܥܰܡܪܝ ܐܰܒ ܒܷܢܝܳܢܶܐ ܕܢܰܦܝܠܝ ܘܡܰܩܘܷܢ ܐܰܫ ܫܘܪܳܢܶܐ ܕܗܰܐܝܕܝ ܘܡܰܢܕܦܝ ܐܝ ܕܰܝܪܐ ܠܰܫܰܢ ܕܡܷܢܛܳܪܐ ܟ݂ܘܕ ܡܰܪܓܳܢܝܬ݂ܐ ܕܘ ܡܰܟܬܰܒܙܰܒܢܐ ܣܘܪܝܳܝܐ",
  "ܐܰܢ ܐܳܣܰܘܳܬ݂ܐ ܘܰܐܪ ܪܝܫܳܢܶܐ ܕܰܕ ܕܘܘܰܠ ܕܷܒܪܝܬ݂ܐ، ܟܘܠ ܟܡܐ ܝܰܘܡܶܐ ܟܳܠܷܬܡܝ ܘܟܳܡܷܔܓ݂ܳܠܝ ܠܰܫܰܢ ܕܚܳܙܷܢ ܕܰܪܡܳܢܐ ܐܰܘ ܡܶܕܶܐ ܚܪܶܢܐ ܕܡܰܟܠܶܗ ܘܕܡܰܢܷܚ ܐܘ ܟܶܘܰܢܐ",
  "ܟܷܬܘܰܐ ܒܘ ܙܰܒܢܰܘܐ ܓܰܒܪܐ ܚܰܐ ܒܰܐܡܶܪܝܟܰܐ ܐܷܫܡܶܐ ܦ݁ܗܝܠܐ ܬܰܝܠܷܪ ܦܪܰܢܣܘܪܬ݂ ܐܘ ܓܰܒܪܰܢܐ ܐܰܒܪܐ ܕܰܐܟܳܪܐ ܕܝ ܩܪܝܬ݂ܳܘܰܐ ܟܷܬܘܰܝܠܶܗ ܡܰܪܰܩ ܓ݂ܰܠܰܒܶܐ ܠܘ ܐܰܠܰܟܬܪܳܢܝܟ",
  "ܐܝܢܰܩܠܰܐ ܕܰܥܷܪ ܠܷܣܛܰܢܒܷܠ ܡܫܰܪܶܠܶܗ ܕܡܰܣܷܡ ܐܘ ܣܝܣܬܶܡ ܕܰܐ ܕܰܘܩܶܐ ܒܘ ܒܶܬ݂ܨܰܘܒܐ ܘܒܘ ܙܰܒܢܰܘܐ ܡܬܰܝܬܶܐ ܥܰܣܪܐ ܬܰܠܰܘܷܙܝܳܢܶܗ ܠܷܣܛܰܢܒܷܠ ܘܡܫܰܪܶܠܶܗ ܐܘ ܦܪܳܣܐ ܬܰܡܐ",
  "ܐܘ ܘܰܠܝ ܡܷܐܪܠܶܗ؛ ܚܰܐ ܒܘ ܝܰܪܚܐ ܕܬܶܫܪܝܢ ܐܘ ܩܰܡܳܝܐ ܝܰܘܡܶܐ ܕܷܬܠܳܬ݂ܐ ܒܝ ܫܰܬܐ ܕܰܬܪܰܠܦܐ ܘܫ̰ܰܥܣܰܪ ܒܝ ܣܰܥܰܝܶܐ ܚܰܡܷܫ ܓܚܳܙܝܢܰܐ ܚܕ݂ܳܕ݂ܶܐ ܒܝ ܕܰܝܪܐ ܕܡܳܪܝ ܩܘܪܝܰܩܘܣ",
  "ܒܝ ܫܰܬܐ ܕܐܰܠܦܐ ܫ̰ܰܥܡܐ ܘܫܶܬ ܬܠܶܬ݂ܝ ܐܝܢܰܩܠܰܐ ܕܣܝܡܝ ܐܰܢ ܐܳܠܝܡܦ݁ܝܰܬܰܬ ܕܰܐܠܡܰܢܝܰܐ ܐܰܢ ܐܰܠܡܰܢ ܒܰܒ ܒܳܬܰܬ݂ܶܐ ܡܦܰܪܰܔܔܶܐ ܐܰܢ ܐܳܠܝܡܦ݁ܝܰܬܰܬ ܒܰܬ ܬܰܠܰܘܙܝܳܢܰܬ݂ܬ݂ܶܗ",
  "ܐܘ ܡܰܠܦܳܢܰܐ ܢܐ ܟܰܪܷܟ݂ ܘܰܐ ܒܛܘܪܥܰܒܕܝܢ ܐܰܥ ܥܝܬܳܬ݂ܐ ܐܰܕ ܕܰܝܪܶܐ ܟܘܠܠܶܗ ܡܨܰܘܪܝܠܶܗ ܘܡܰܠܬܰܡܠܶܗ ܡܰܘܕ݂ܥܳܢܘܬ݂ܐ ܐܰܥܠܰܝـܝܶܗ ܘܟܷܬܠܶܗ ܢܝܫܐ ܕܣܳܝܰܡܠܷܢ ܟܬ݂ܳܘܐ ܠܰܩܷܕܰܡ",
];
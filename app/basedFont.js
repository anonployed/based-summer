// basedFont.js
const unicodeMap = {
  A: "ᗩ",
  B: "ᗷ",
  C: "ᑕ",
  D: "ᗪ",
  E: "E",
  F: "ᖴ",
  G: "G",
  H: "ᕼ",
  I: "I",
  J: "ᒍ",
  K: "K",
  L: "ᒪ",
  M: "ᗰ",
  N: "ᑎ",
  O: "O",
  P: "ᑭ",
  Q: "ᑫ",
  R: "ᖇ",
  S: "ᔑ",
  T: "T",
  U: "ᑌ",
  V: "ᐯ",
  W: "ᗯ",
  X: "᙭",
  Y: "Y",
  Z: "ᘔ",
  a: "ᗩ",
  b: "ᗷ",
  c: "ᑕ",
  d: "ᗪ",
  e: "E",
  f: "ᖴ",
  g: "G",
  h: "ᕼ",
  i: "I",
  j: "ᒍ",
  k: "K",
  l: "ᒪ",
  m: "ᗰ",
  n: "ᑎ",
  o: "O",
  p: "ᑭ",
  q: "ᑫ",
  r: "ᖇ",
  s: "ᔑ",
  t: "T",
  u: "ᑌ",
  v: "ᐯ",
  w: "ᗯ",
  x: "᙭",
  y: "Y",
  z: "ᘔ",
};

const basedFont = (inputText) => {
  return inputText
    .split("")
    .map((char) => unicodeMap[char] || char)
    .join("");
};

export { basedFont };

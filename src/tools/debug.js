/**
 * /src/tools/debug.js
 */



const GOLDEN_ANGLE = 180 * (3 - Math.sqrt(5))



// https://stackoverflow.com/a/20129594/1927589
// https://qph.fs.quoracdn.net/main-qimg-aaa9a544d797f1109b29c55814319195.webp
export const getGoldenColor = ({ number, s = 0.5, l = 0.33 }) => {
  const h = number * GOLDEN_ANGLE

  s = Math.max(0, Math.min(s, 1))
  l = Math.max(0, Math.min(l, 1))

  return `hsl(${h},${s * 100}%,${l * 100}%)`;
}

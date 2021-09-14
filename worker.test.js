
const work = require("./worker")

test('aaa', () => {
  startPoint={
    lat: '31.81654',
    lon: '35.18962'
  }
  endPoint={
    lat: '31.81489',
    lon: '35.19168'
  }
   expect(work.calcDistance(startPoint, endPoint)).toBe('268 m');
  });
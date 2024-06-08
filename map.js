// const img = document.createElement('img')
// img.setAttribute('src', 'smoke-fill-svgrepo-com.svg')
const emojis = {
    "-": " ",
    O: "📕",
    X: "☁️",
    I: "🗺️",
    PLAYER: "🚶‍♂️",
    BOMB_COLLISION: "🔥",
    GAME_OVER: "👎",
    WIN: "🏆",
  };

  const emojisMap = [
    {
      "-": " ",
      O: "📕",
      X: '☁️',
      I: "🗺️",
      PLAYER: "🚶",
      BOMB_COLLISION: "🔥",
      GAME_OVER: "👎",
      WIN: "🏆",
    },
    {
      "-": " ",
      O: "🏫",
      X: "☁️",
      I: "🪜",
      PLAYER: "🚶‍♂️",
      BOMB_COLLISION: "🔥",
      GAME_OVER: "👎",
      WIN: "🏆",
    },
    {
      "-": " ",
      O: "🏴‍☠️",
      X: "☁️",
      I: "💰",
      PLAYER: "🚶‍♂️",
      BOMB_COLLISION: "🔥",
      GAME_OVER: "👎",
      WIN: "🏆",
    },
    {
      "-": " ",
      O: "🏴‍☠️",
      X: "☁️",
      I: "🕹️",
      PLAYER: "🚶‍♂️",
      BOMB_COLLISION: "🔥",
      GAME_OVER: "👎",
      WIN: "🏆",
    },
    {
      "-": " ",
      O: "🏴‍☠️",
      X: "☁️",
      I: "🌄",
      PLAYER: "🚶‍♂️",
      BOMB_COLLISION: "🔥",
      GAME_OVER: "👎",
      WIN: "🏆",
    }
  ]

const maps = [];
  maps.push(`
    XXXXXXXXXX
    XXXXXXXXXX
    XXXXXXXXXX
    XXX---XXXX
    XXX-I-XXXX
    XXX---XXXX
    XX----XXXX
    X----XXXXX
    ----XXXXXX
    O-XXXXXXXX
  `);
  maps.push(`
    O--XXXXXXX
    X--XXXXXXX
    XX----XXXX
    X--XX-XXXX
    X-XXX--XXX
    X-XXXX-XXX
    XX--XX--XX
    XX--XXX-XX
    XXXX---IXX
    XXXXXXXXXX
    `);
  maps.push(`
    XO----XXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX----IXXX
    XXXXXXXXXX
  `);
  maps.push(`
    XXXXXIXXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-OXXXXXX
    XXXXXXXXXX
  `);
  maps.push(`
    XXXXXOXXXX
    XXXXX-XXXX
    XXXXX-XXXX
    XXXXX-XXXX
    XXXXX-XXXX
    XXXXX-XXXX
    XXXXX-XXXX
    XXXXX-XXXX
    XXXX---XXX
    XXXX-I-XXX
  `);

  
  
  // IXXXXXXXXX
  // -XXXXXXXXX
  // -XXXXXXXXX
  // -XXXXXXXXX
  // -XXXXXXXXX
  // -XXXXXXXXX
  // -XXXXXXXXX
  // -XXXXXXXXX
  // -XXXXXXXXX
  // OXXXXXXXXX
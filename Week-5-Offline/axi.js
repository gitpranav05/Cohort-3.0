const axios = require('axios');


async function main() {
    const resp = await axios.get(
      "https://v2.jokeapi.dev/joke/Dark,Spooky?blacklistFlags=religious,political,racist,sexist,explicit",
    );
    console.log(resp.data);
}

main()
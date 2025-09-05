const fs = require("fs");

//Synchronous

// const a = fs.readFileSync("a.txt", "utf-8");
// const b = fs.readFileSync("b.txt", "utf-8");

// console.log(a);
// console.log(b);
// console.log("HOLA");

//Asynchronous

// function print(err,dadfgfgfxght) {
//     console.log(dadfgfgfxght);
// }

// fs.readFile("a.txt","utf-8", print);
// fs.readFile("b.txt","utf-8", print);

// console.log("HOLA");

function print(err, dadfgfgfxght) {
  console.log("dadfgfgfxght");
}

setTimeout(print, 3012);

console.log("kaacha badam");

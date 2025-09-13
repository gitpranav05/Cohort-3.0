// class Rectangle{
//   constructor(width, height, color){
//     this.width=width;
//     this.height=height;
//     this.color=color;
//   }

//   area(){
//     const area = this.width * this.height;
//     console.log(this);
//     return area;
//   }

//   paint(){
//     console.log(`The color ia ${this}`);
//     // return this.color;
//   }
// }

// const rect = new Rectangle(12,3, "red");
// const area = rect.area();
//  rect.paint()
// console.log(area);

//Date
// const date = new Date();
// console.log(date);

// console.log(date.toLocaleDateString());

// const mpp = new Map();

// mpp.set("Como", "How");
// mpp.set("Hello", 123);

// console.log(mpp.get("Hello"));


//Promises

// function wai(res){
//     setTimeout(res, 3000);
// }

// function main(){
//     console.log("I am the main fun");
// }

// wai(main)

// function setTimeoutPromisified(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// function callback() {
//   console.log("3 seconds have passed");
// }

// setTimeoutPromisified(3000).then(callback);

// function fun(resolve  ){
//     resolve()
// }


// let p = new Promise(fun);

// function call(){
//     console.log("Called");
// }
// p.then(call)
// console.log(p);





//प्रॉमिसीफाईड fs.readFile()

// const { randomBytes } = require("crypto");
// const fs= require("fs")

// function printm(err,dadfgfgfxght) {
//         console.log(dadfgfgfxght);
//     }
    
//     fs.readFile("a.txt","utf-8", print);
//     fs.readFile("b.txt","utf-8", print);
    
//     console.log("HOLA");
    


// function asd() {
  //   console.log("Hello");
  // }
  
  // function random(asd){
    //   asd();
    // }
    
    // let p = new Promise(random);
    
    // function kaacha() {
      //   console.log("Promised");
      // }
      
      // p.then(kaacha)
      
// const fs = require("fs");

// function readFiler(resolve,reject){
//   fs.readFile("a.txt","utf-8",(err,data)=>{
//     if(err) reject(err);
//     else resolve(data);
//   });
// }

// function readFilePromise(){
//   return new Promise(readFiler)
// }


// readFilePromise()
//   .then((data)=>{
//     console.log(data);
//   })


fetch("https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

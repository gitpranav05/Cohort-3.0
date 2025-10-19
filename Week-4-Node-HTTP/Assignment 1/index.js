// const fs = require("fs")
// const { program } = require("commander");

// program
//     .name('Counter')
//     .description('CLI to do files')
//     .version('0.8.0') 
    
// program.command('count')
//     .description('Count the no. of words')
//     .argument('<file>', 'file to count')
//     .action((file)=>{
//         fs.readFile(file,'utf-8',(err,data)=>{
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 const words = data.split(" ").length;
//                 console.log(`There are ${words} words in ${file}`);
//             }
//         })
//     }
// );

// program
//   .command("count_lines")
//   .description("Count the no. of lines")
//   .argument("<file>", "file to count")
//   .action((file) => {
//     fs.readFile(file, "utf-8", (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         let lines = 0;
//         for(let i=0; i<data.length; i++){
//             if(data[i]==="\n"){
//                 lines++;
                
//             } 
//         }
//         console.log(`There are ${lines+1} lines in ${file}`);
//       }
//     });
//   });

// program.parse();

const fs = require("fs");
const { Command } = require("commander");
const program = new Command();

program
  .name("counter")
  .description("CLI to do file based tasks")
  .version("0.8.0");

program
  .command("count")
  .description("Count the number of lines in a file")
  .argument("<file>", "file to count")
  .action((file) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const lines = data.split(" ").length;
        console.log(`There are ${lines} words in ${file}`);
      }
    });
  });

program.parse();
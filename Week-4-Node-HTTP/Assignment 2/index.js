const fs = require("fs");
const { Command } = require("commander");
const path = require('path');
const program = new Command();
const filePath = path.resolve("todos.json");

if(!fs.existsSync(filePath)){
    fs.writeFileSync(filePath, JSON.stringify([]));
}

function getTodos(){
    return JSON.parse(fs.readFileSync(filePath), 'utf-8');
}

function saveTodos(todos){
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
}

program
.name("Todo-List")
.description("A program to make a Todos List")
.version("0.6.9");

program
.command('add <task>')
.description('Add a new todo')
.action((task)=>{
        let id=todos.length;
        const todos = getTodos();
        todos.push({id: id, task, done:false});
        saveTodos(todos);
        console.log("Task Added!");
        id++;
    });
program
    .command("delete <id>")
    .description("Delete a todo")
    .action((id) => {
        let todos = getTodos();
        const before = todos.length;
        todos = todos.filter(t=> t.id != id);
        saveTodos(todos);
        console.log(before===todos.length ? `No todo found with id:${id}` : `Deleted todo with id:${id}`);
    });                   

program
  .command("done <id>")
  .description("Mark a todo")
  .action((id) => {
    const todos = getTodos().map((t) =>
      t.id == id ? { ...t, done: true } : t
    );
    saveTodos(todos);
    console.log(`✔️ Marked todo ${id} as done`);
  });

program
  .command('list')
  .description('List all the todos')
  .action(()=>{
    const todos = getTodos();
    if(todos.length===0) return console.log("No todos found");
    for(let i=0; i<todos.length; i++){
        console.log(`${i+1}:${todos[i].task}`);
    }
    // todos.forEach((t) =>
    //   console.log(`${t.id}: ${t.done ? "✅" : "❌"} ${t.task}`)
    // );
  });

program.parse();
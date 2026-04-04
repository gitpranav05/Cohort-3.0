const a =2
export a ;




// function getFirstEl<T>(arr: T[]): T {
//   return arr[0];
// }
 
// const el = getFirstEl<string>(["harkirat", "raman"]);
// // const el2 = getFirstEl([2,3]);
// console.log(el.toLowerCase());

// interface User {
//     name:string;
//     age: number;
//     email:string
// }

// type Update = Pick<User, 'age' | 'email'>

// type UpdateOpt = Partial<Update>

// function updateUser(upda:Update) {

// }

// interface Manager {
//   name: string,
//   department: string
// }

// interface Employee {
//   name: string,
//   age: number
// }

// type TeamLead = Employee & Manager;

// let t:TeamLead={
//   name:"Pranav",
//   age:21,
//   department:"ENTC "
// }

// type SumInput = string | number;

// interface UserType {
//   firstname : string,
//   lastname : string,
//   age : number
// }

// function greet(user: UserType ) {
//   console.log("Hello "+user.firstname);
// }

// greet({
//   firstname:"Pranav",
//   lastname:"asda",
//   age:123
// })

// function ab() {
//   console.log("Called the function");
// }

// function caller(fun: ()=> void) {
//   setTimeout(fun, 2000);
// }

// caller(ab);

// function sum (a:number , b:number) :number{
//     return a+b;
// }

// console.log(sum(321,1123));

// function greet(name:string | number){
//     console.log(`Hello ${name}`);
// }

// greet("Pranav")
// greet(123)

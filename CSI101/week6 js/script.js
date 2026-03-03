let x = 5;
let y = 2;
let z = x + y;

const a = 5;
const b = 6;
const c = a + b;
console.log("Result c : " + c);

// string
let color = "Yellow";
let lastName = "Thanakon";

// Number
let lenth = 16;
let weight = 7.5;
//BigInt
let xx = 1234567890123456789012345678901234567890n;
let yy = BigInt(12345678901234567890123456789012345);
//Boolean
let xxx = true;
let yyy = false;
//Object
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue",
};
//array
const cars = ["Saab", "Volvo", "BMW"];
//data Object
const data = new Date(2025 - 10 - 17);
//underfined
let xxxx;
let yyyy;
//Null
let x5 = null;
let y5 = null;
//symbol
const x6 = Symbol();
const y6 = Symbol();
typeof ""; // Returns "string"
typeof "john"; // Returns "string"
typeof "John Doe"; // Returns "string"
typeof 0; // Returns "number"
typeof 123; // Returns "number"
typeof 3.14; // Returns "number"

let Result = ""
//1.การคูณ/หาร มาก่อน บวก/ลบ
Result += "1+2*3 = " + (1 + 2 * 3) + "\n"; // ผลลัพธ์คือ 7
//2.วงเล็บ มาก่อน
Result += "(1+2)*3 = " + ((1 + 2) * 3) + "\n"; // ผลลัพธ์คือ 9
//3. การเปรียบเทียบ มาก่อน AND%&/OR||
Result += "3 > 2 && 1 < 2 = " + (3 > 2 && 1 < 2) + "\n"; // ผลลัพธ์คือ false
//4. NOT มาก่อน AND%&/OR||
Result += "false || false = " + (!false && false) + "\n";
let x7 = 5;
let y7 = 10;
Result += "x = y + 2 =>" + (x7 = y7 + 2) + "\n"; // x = 12
document.getElementById("output").innerText = Result;


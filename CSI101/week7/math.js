//1.ค่าคงที่ทางคณิตศาสตร์
console.log(Math.PI);
console.log(Math.E);
console.log(Math.SQRT2);

//2.การปัดเศษทศนิยม
console.log(Math.round(4.7)); //5
console.log(Math.trunc(4.3)); //4
console.log(Math.ceil(4.3)); //5
console.log(Math.floor(4.3)); //4

//3.ค่าบวกลบคูณหาร
console.log(Math.abs(-15)); //15
console.log(Math.pow(2, 3)); //8
console.log(Math.sqrt(16)); //4

//4.ค่ามากสุดน้อยสุด
console.log(Math.max(5, 10, 15, 20)); //20
console.log(Math.min(5, 10, 15, 20)); //5

//5.ค่าสุ่ม
console.log(Math.random()); //0.0 - 1.0
console.log(Math.floor(Math.random() * 100)); //0 - 99

//6.ฟังชันตรีโกณมิติ
console.log(Math.sin(Math.PI / 2)); //1
console.log(Math.cos(0)); //1
console.log(Math.tan(Math.PI / 4)); //1

let text = "Hello JavaScript";
// ความยาว
console.log(text.length); // 16
// ตัวอักษรตัวแรก
console.log(text.toUpperCase()); // "HELLO JAVASCRIPT"
console.log(text.toLowerCase()); // "hello javascript"
// การค้นหาตำแหน่ง
console.log(text.indexOf("Java")); // 6
// การค้นหาคำ
console.log(text.includes("Script")); // true
// ถ้าเริ่มต้นมีคำว่า Hello จะรีเทิร์นค่า true
console.log(text.startsWith("Hello")); // true
// ถ้าลงท้ายมีคำว่า World จะรีเทิร์นค่า false
console.log(text.endsWith("World")); // false

// การตัดคำข้อความ
console.log(text.slice(6, 10)); // "Java"
console.log(text.substring(0, 5)); // "Hello"
console.log(text.substr(6, 4)); // "Java"

// การแทนที่
console.log(text.replace("JavaScript", "World")); // "Hello World"

//การแบ่งข้อความ
let fruits = "Apple, Banana, Orange";
console.log(fruits.split(", ")); // ["Apple", "Banana", "Orange"]

//การ trim ข้อความ
let messy = "    spaced text    ";
console.log(messy.trim()); // "spaced text"

//การเข้าถึงตัวอักษร
console.log(text.charAt(0)); // "H"
console.log(text[1]); // "e"

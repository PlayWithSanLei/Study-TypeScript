// 布尔类型
let a: boolean = true;
let b: Boolean = false;
let c: Boolean = new Boolean(1);
let d: boolean = Boolean(1);

console.log(a)
console.log(b)
console.log(c)
console.log(d)

// 数值类型
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;

// 字符串
let myName: string = 'Tom';
let myAge: number = 21;

// 模板字符串
let sentence: string = `Hello, my name is ${myName}. I'll be ${myAge + 1} years old next month.`

console.log(sentence)

let anyThing: any = 'hello';
console.log(anyThing.myName);
// 下面这个语法没问题，但是不能作为js运行
// console.log(anyThing.myName.firstName);

// 这些也是同理
// anyThing.setName('Tom');
// anyThing.setName('Tom').sayHello();
// anyThing.myName.setFirstName('Cat');


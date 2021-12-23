// 布尔类型
var a = true;
var b = false;
var c = new Boolean(1);
var d = Boolean(1);
console.log(a);
console.log(b);
console.log(c);
console.log(d);
// 数值类型
var decLiteral = 6;
var hexLiteral = 0xf00d;
// ES6 中的二进制表示法
var binaryLiteral = 10;
// ES6 中的八进制表示法
var octalLiteral = 484;
var notANumber = NaN;
var infinityNumber = Infinity;
// 字符串
var myName = 'Tom';
var myAge = 21;
// 模板字符串
var sentence = "Hello, my name is ".concat(myName, ". I'll be ").concat(myAge + 1, " years old next month.");
console.log(sentence);
var anyThing = 'hello';
console.log(anyThing.myName);
// 下面这个语法没问题，但是不能作为js运行
// console.log(anyThing.myName.firstName);
anyThing.setName('Tom');
anyThing.setName('Tom').sayHello();
anyThing.myName.setFirstName('Cat');

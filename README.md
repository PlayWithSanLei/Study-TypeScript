# TypeScript笔记

## 原始数据类型

包括布尔值，数值，字符串，null，undefined，symbol，BigInt

### 布尔值

```typescript
let isDone: boolean = false;
```

用构造函数Boolean创建的对象不是布尔值；

`new Boolean()`返回的是`Boolean`对象;

但是直接调用Boolean返回的是一个boolean类型；

boolean是基本类型，但是Boolean是构造函数

### 数值

```typescript
let decLiteral: number = 6;
let hexLiteral: number = 0Xf00d;
```

其中二进制和八进制表示的数字会被编译成十进制数字。

### 字符串

使用string定义字符串类型;

```typescript
let myName: string = 'Tom';
let myAge: number = 21;

// 模板字符串
let sentence: string = `Hello, my name is ${myName}. I'll be ${myAge + 1} years old next month.`
```

### 空值

ts中可以 用void表示没有返回值的函数

```typescript
function alertName(): void {
    alert('My name is Tom');
}
```

但是声明一个void类型变量并没有什么用，因为只能将它赋值为undefined和null

### Null和Undefined

在TS中，可以使用null和undefined来定义这两个原始数据类型；

```tsx
let u: undefined = undefined;
let n: null = null;
```

和void的区别就是，undefined和null是所有类型的子类型，也就是说undefined类型的变量可以赋值给number类型的变量；但是反过来不行；

## 任意值

Any表示允许赋值为任何类型

### 什么是任意值类型

一个普通类型在复制过程中是不允许改变类型的，但是any类型允许被赋值为任意类型

### 任意值的属性和方法

在任意值上访问任何属性都是允许的，并且允许调用任何方法，**只要声明了任意值之后，对它的任何操作返回的内容类型都是任意值**

### 未声明类型的变量

变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型（any）

## 类型推论

如果没有明确的指定类型，那么TS会按照类型推论的规则推断出一个类型。

### 什么是类型推论

以下代码虽然没有指定类型，但是会在编译的时候报错：

```ts
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

事实上，它等价于：

```ts
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。

**如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 `any` 类型而完全不被类型检查**：

```ts
let myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

## 联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种

### 简单的例子

```ts
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
let myFavoriteNumber: string | number;
myFavoriteNumber = true;

// index.ts(2,1): error TS2322: Type 'boolean' is not assignable to type 'string | number'.
//   Type 'boolean' is not assignable to type 'number'.
```

联合类型使用 `|` 分隔每个类型。

这里的 `let myFavoriteNumber: string | number` 的含义是，允许 `myFavoriteNumber` 的类型是 `string` 或者 `number`，但是不能是其他类型。

### 访问联合类型的属性或方法

当TS不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法

```ts
function getLength(something: string | number): number {
    return something.length;
}

// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
```

上例中，`length` 不是 `string` 和 `number` 的共有属性，所以会报错。

访问 `string` 和 `number` 的共有属性是没问题的：

```ts
function getString(something: string | number): string {
    return something.toString();
}
```

联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型

```ts
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 编译时报错

// index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.
```

上例中，第二行的 `myFavoriteNumber` 被推断成了 `string`，访问它的 `length` 属性不会报错。

而第四行的 `myFavoriteNumber` 被推断成了 `number`，访问它的 `length` 属性时就报错了。

## 对象的类型——接口

TS中，使用接口定义对象的类型

### 什么是接口

在面向对象语言中，接口是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由class去实现（implement）

TS接口除了可以对类的一部分行为进行抽象以外，也常用于对对象的形状进行描述

### 简单的例子

```ts
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25
}
```

上面的例子中，我们定义了一个接口 `Person`，接着定义了一个变量 `tom`，它的类型是 `Person`。这样，我们就约束了 `tom` 的形状必须和接口 `Person` 一致。

接口一般首字母大写。[有的编程语言中会建议接口的名称加上 `I` 前缀](https://msdn.microsoft.com/en-us/library/8bc1fexb(v=vs.71).aspx)。

定义的变量比接口少一些 多一些属性都是不允许的。

**赋值的时候，变量的形状必须和接口的形状保持一致**

### 可选属性

有时候不希望完全匹配一个形状，那么可以用可选属性

```ts
interface Person {
    name: string,
    age?: number
}

let tom: Person = {
    name: 'Tom'
}
```

```ts
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25
};
```

可选属性的含义是该属性可以不存在。但是仍然不允许添加未定义的属性

```ts
interface Person {
    name: string,
    age?: number
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
}
```

编译会报错

### 任意属性

有时候我们希望一个接口有任意的属性，可以使用如下方式：

```ts
interface Person {
    name: string,
    age?: number,
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
}
```

使用`[propName: string]`定义了任意属性取string类型的值。

需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集。

```ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: string;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};

// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Index signatures are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.
```

上例中，任意属性的值允许是 `string`，但是可选属性 `age` 的值却是 `number`，`number` 不是 `string` 的子属性，所以报错了。

另外，在报错信息中可以看出，此时 `{ name: 'Tom', age: 25, gender: 'male' }` 的类型被推断成了 `{ [x: string]: string | number; name: string; age: number; gender: string; }`，这是联合类型和接口的结合。

一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：

```ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: string | number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
```

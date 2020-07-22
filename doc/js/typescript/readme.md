
知识点
### 1、安装

```
cmd 
npm init
npm i typescript --save
.> hello.ts

pageage.json 配置{"scripts": "build" :"./node_modules/.bin/tsc"}

编译
tsc hello.ts
```

### 2、编译即使报错仍然会输出hello.js

### 3、配置报错不输出

```
.> tsconfig.json
{"noEmitOnError":true}
//https://www.typescriptlang.org/docs/handbook/compiler-options.html
```

### 4、原始数据类型

undefined null Number String Symbol Boolean

### 5 是 ES6 中的二进制和八进制表示法

0b1010 和 0o744

### 6、 在 TypeScript 中，我们使用 : 指定变量的类型

https://www.typescriptlang.org/docs/handbook/basic-types.html

```
定义变量
let a:number =1;
let b:boolean = true;
let c:string = "sdsdf"
let u: undefined;
let u: null;
let u:number[] =[1,2]
let x: [string, number];
let u:Array[number] = [1,2]
function a(b:boolean){

}

```
### 7 void
```
function alertName(): void {
    alert('My name is Tom');
}
let unusable: void = undefined;只能赋值给undefined，null
let unusable: void = null;
```

### enum
```
enum Color {Red, Green, Blue}
let c: Color = Color.Green;//1

enum Color {Red=1, Green, Blue}
let c: Color = Color.Green;//2

enum Color {Red, Green, Blue}
let c: string = Color[1];//Green
```

### any 和 never

never针对函数内部有 throw or while


### 断言

let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;

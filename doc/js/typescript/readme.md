
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

### 联合类型
联合类型使用 | 分隔每个类型。

只能访问此联合类型的所有类型里共有的属性或方法《https://ts.xcatliu.com/basics/union-types.html》

###接口
任意属性
```
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}
```
一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：
一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型或者any
有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 readonly 定义只读属性：
注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：
用接口表示数组

```
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```

arguments 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口：

```
function sum() {
    let args: {
        [index: number]: number;
        length: number;
        callee: Function;
    } = arguments;
}
```
### 函数
输入多余的（或者少于要求的）参数，是不被允许的：
```
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
```
注意不要混淆了 TypeScript 中的 => 和 ES6 中的 =>。

在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

前面提到，输入多余的（或者少于要求的）参数，是不允许的。那么如何定义可选的参数呢？

与接口中的可选属性类似，我们用 ? 表示可选的参数：
可选参数后面不允许再出现必需参数了：
可以使用 ...rest 的方式获取函数中的剩余参数（rest 参数） 
items 是一个数组。所以我们可以用数组的类型来定义它：
```
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let a = [];
push(a, 1, 2, 3);
```

## 重载
允许一个函数接受不同数量或类型的参数时，作出不同的处理。

## 断言
https://ts.xcatliu.com/basics/type-assertion.html
window.foo = 1;

// index.ts:1:8 - error TS2339: Property 'foo' does not exist on type 'Window & typeof globalThis'.
上面的例子中，我们需要将 window 上添加一个属性 foo，但 TypeScript 编译时会报错，提示我们 window 上不存在 foo 属性。

此时我们可以使用 as any 临时将 window 断言为 any 类型：

(window as any).foo = 1;
在 any 类型的变量上，访问任何属性都是允许的。

亡羊补牢

可以对已有的数据断言 as

联合类型可以被断言为其中一个类型
父类可以被断言为子类
任何类型都可以被断言为 any
any 可以被断言为任何类型
要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可
除非迫不得已，千万别用双重断言。

## 定义全局
```
declare var jQuery: (selector: string) => any;
```
声明文件必需以 .d.ts 为后缀。
##
全局变量是声明

全局变量的声明文件主要有以下几种语法：
declare var 声明全局变量
declare function 声明全局方法
declare class 声明全局类
declare enum 声明全局枚举类型
declare namespace 声明（含有子属性的）全局对象
interface 和 type 声明全局类型

## export

与全局变量的声明文件类似，interface 前是不需要 declare 的。

## npm包
与该 npm 包绑定在一起。判断依据是 package.json 中有 types 字段，或者有一个 index.d.ts 声明文件。

tsconfig.json
```
{
    "compilerOptions": {
        "module": "commonjs",
        "baseUrl": "./",
        "paths": {
            "*": ["types/*"]
        }
    }
}
```
## 默认导出
在 ES6 模块系统中，使用 export default 可以导出一个默认值，使用方可以用 import foo from 'foo' 而不是 import { foo } from 'foo' 来导入这个默认值。

只有 function、class 和 interface 可以直接默认导出，其他的变量需要先定义出来，再默认导出19：
https://ts.xcatliu.com/basics/declaration-files.html#npm-%E5%8C%85

## 导入
在 ts 中，针对这种模块导出，有多种方式可以导入，第一种方式是 const ... = require：

// 整体导入
const foo = require('foo');
// 单个导入
const bar = require('foo').bar;
第二种方式是 import ... from，注意针对整体导出，需要使用 import * as 来导入：

// 整体导入
import * as foo from 'foo';
// 单个导入
import { bar } from 'foo';
第三种方式是 import ... require，这也是 ts 官方推荐的方式：

// 整体导入
import foo = require('foo');
// 单个导入
import bar = foo.bar;

上例中使用了 export = 之后，就不能再单个导出 export { bar } 了。所以我们通过声明合并，使用 declare namespace foo 来将 bar 合并到 foo 里。

## UMD 
既可以通过 <script> 标签引入，又可以通过 import 导入的库，称为 UMD 库
    
ts 提供了一个新语法 export as namespace。

## 扩展

直接扩展全局变量
使用interface 
```
interface String {
    prependHello(): string;
}

'foo'.prependHello();
```
declare namespace 给已有的命名空间添加类型声明
```
// types/jquery-plugin/index.d.ts

declare namespace JQuery {
    interface CustomOptions {
        bar: string;
    }
}

interface JQueryStatic {
    foo(options: JQuery.CustomOptions): string;
}
```
```
// src/index.ts

jQuery.foo({
    bar: ''
});
```

## declare global

使用 declare global 可以在 npm 包或者 UMD 库的声明文件中扩展全局变量的类型25：
```
// types/foo/index.d.ts

declare global {
    interface String {
        prependHello(): string;
    }
}

export {};
```
注意即使此声明文件不需要导出任何东西，仍然需要导出一个空对象，用来告诉编译器这是一个模块的声明文件，而不是一个全局变量的声明文件。

## 模块插件 declare module
```
// types/moment-plugin/index.d.ts

import * as moment from 'moment';

declare module 'moment' {
    export function foo(): moment.CalendarKey;
}
// src/index.ts

import * as moment from 'moment';
import 'moment-plugin';

moment.foo();
```

## 三斜线指令
与 import 的区别是，当且仅当在以下几个场景下，我们才需要使用三斜线指令替代 import：

##
在全局变量的声明文件中，是不允许出现 import, export 关键字的。一旦出现了，那么他就会被视为一个 npm 包或 UMD 库，就不再是全局变量的声明文件了
```
// types/jquery-plugin/index.d.ts

/// <reference types="jquery" />

declare function foo(options: JQuery.AjaxSettings): string;


```
三斜线指令必须放在文件的最顶端，三斜线指令的前面只允许出现单行或多行注释。 

tsconfig.json
```
{
    "compilerOptions": {
        "module": "commonjs",
        "outDir": "lib",
        "declaration": true,//declaration 选项，设置为 true，表示将会由 ts 文件自动生成 .d.ts 声明文件，也会输出到 lib 目录下
        declarationDir 设置生成 .d.ts 文件的目录
        declarationMap 对每个 .d.ts 文件，都生成对应的 .d.ts.map（sourcemap）文件
        emitDeclarationOnly 仅生成 .d.ts 文件，不生成 .js 文件
    }
}
```

## 将声明文件和源码放在一起
NPM包的配置
如果声明文件是通过 tsc 自动生成的，那么无需做任何其他配置
如果是手动写的声明文件，给 package.json 中的 types 或 typings 字段指定一个类型声明文件地址
在项目根目录下，编写一个 index.d.ts 文件
针对入口文件（package.json 中的 main 字段指定的入口文件），编写一个同名不同后缀的 .d.ts 文件

先识别 package.json 中是否存在 types 或 typings 字段。发现不存在，那么就会寻找是否存在 index.d.ts 文件。如果还是不存在，那么就会寻找是否存在 lib/index.d.ts 文件。假如说连 lib/index.d.ts 都不存在的话，就会被认为是一个没有提供类型声明文件的库了

如果我们是在给别人的仓库添加类型声明文件，但原作者不愿意合并 pull request，那么就需要将声明文件发布到 @types 下。

npm install @types/node --save-dev

## 别名
```
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```

## 字符串字面量类型
字符串字面量类型用来约束取值只能是某几个字符串中的一个。
```
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dblclick'); // 报错，event 不能为 'dblclick'
```

## 元组
数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。

## 枚举项有两种类型：
常数项（constant member）和计算所得项（computed member）。

// index.ts(7,47): error TS2345: Argument of type '"dblclick"' is not assignable to parameter of type 'EventNames'.

接口（Interfaces）可以用于对「对象的形状（Shape）」进行描述。

## 常见的面向对象语言中，接口是不能继承类的，但是在 TypeScript 中却是可以的：
 ```
class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```
## 当我们在声明 class Point 时，除了会创建一个名为 Point 的类之外，同时也创建了一个名为 Point 的类型（实例的类型）
```
const p = new Point(1, 2);

function printPoint(p: Point) {
    console.log(p.x, p.y);
}

```

# TypeScript 常用语法
## 基础类型
<br>
TypeScript支持与JavaScript几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用。

### 布尔值
<br>
最基本的数据类型就是简单的true和false值，在js和ts里叫Boolean

```ts
let isDone : boolean = false
```

### 数字
<br>
和JavaScript一样，typeScript里所有数字都是浮点数，这些浮点数的类型时number，除了支持十进制和十六进制字面量，ts还支持ECMAScript 2015中引入的二进制和八进制字面量。

```ts
let decLiteral: number = 20
let hexLiteral: number = 0x14
let binaryLiteral: number = 0b10100
let otcalLiteral: number = 0o24
```
### 字符串
<br>
javascript程序的另一项基本操作是处理网页或服务器的文本数据，像其他语言一样，我们使用string表示文本数据类型，和js一样，可以使用双引号和单引号表示字符串。

```ts
let name: string = 'invi'
let age: number = 22
let sentence = `Helle, my name is ${name}, i'll be ${ age + 1 } year old next moth.`
```
### 数组

```ts
// 定义方法一
let list: number [] = [1, 2, 3]
// 定义方法二
let list2: Array<number> = [4, 5, 6] 
```
### 元组 Tuple
元组在使用过程中最好不要越界使用。因为只有在3.1之前的版本才可以，在之后的版本里访问越界元素的时候并不会使用联合类型进行替代，所以请注意。
```ts
// 定义一个2个长度的数组，第一个元素为字符串类型，第二个元素为数字类型
let x: [string, number]
x = ['hello', 22]
x = [22, 'hello']   // 报错，类型不匹配
console.log(x[0].substr(1)) //访问元组的第一个元素的substr方法。
console.log(x[1].substr(1)) // 访问第二个元素的substr方法，报错，因为数字类型不存在substr方法。
// 对于越界元素，它实际上就是一个联合类型
x[3] = 1 // 成功
x[4] = 'world' // 也成功
console.log(x[5].toString())    // 可以访问，因为string和number都有这个方法。其实只需要包含一种就都可以
x[6] = true // 报错，因为true不包含在元组任何一种类型里
```
### 枚举
<br>
枚举数据类型其实是对js标准数据类型的一个补充，像c#一样它可以为一组数之赋一个很好用的名字。

```ts
enum Color {
    Red,
    Green,
    Blue
}

let c: Color = Color.Red
let colorName: string = Color[2]
console.log(colorName)  // 输出Blue. 枚举可以通过索引对枚举值进行反查，这里的索引值可以自行定义或者默认按照顺序从0开始,当初始定义了第一个枚举值的索引后，后面不进行定义的话，后面默认从定义的开始顺序添加（比如：Red = 4 ,那么后面依次就是，5 ，6）
enum Color {
    Red = 1,
    Green = 3,
    Blue = 5
}
```
### any
<br>
有时候我们在编程阶段还不清楚变量值的类型，或者用户的输入数据，或者第三方库的一些动态内容，我们都不清楚他们具体是什么数据类型，而且我们也不希望进行类型审核的时候，就可以使用 any 。

```js
let notSource: any = 4
notSource = 'maybe a string instead'
// 定义一个任意类型的数组
let list : any [] = [2, 'afd', true]
liet[0] = 'xiugai'
```
### void
<br>
void和any可以说就是完全相反的存在，any表示任意类型，void表示没有任何类型。通常在函数传值会用到void

```js
// 如下定义一个没有任何返回值的函数
function warnUser(): void {
    console.log('this is a waring message')
}
// 通常来说，声明一个void类型的变量是没有任何意义的,这类型的变量只能赋值为null或者undefined，其他类型赋值都会报错
let unusable: void = undefined
```
### null和undefined
<br>
null和undefined在JavaScript中实际上是2个值，

```js
let u: undefined = undefined
let n: null = null
let x: null = undefined
let y: undefined = null
// 为什么这里null和undefined可以相互赋值，因为null和undefined是所有类型的子类型，子类型是可以赋值给父类型的
```

### never
<br>
never类型表示永远不存在的一个数据类型，它通常用于函数中，比如函数没有返回值或者函数不会返回（不能结束或者抛出异常）。never他是任何类型的子类型，他就可以赋值给任何类型，但是任何类型都不是他的子类型，也就是没有任何类型可以赋值个never

```js
// never类型常用场景
function error(message: string) : never {
    throw new Error(meaage)
}
function fail() {
    // 这样就能使用error函数，error函数的定义就是返回值为never类型
    return error('一些错误信息')
}

// 一个无限循环的函数
function inifiteLoop(): never {
    while (true) {

    }
}
```
### object
<br>
他表示非原始的数据类型

```ts
// 声明一个create 方法，用于生成各种基本类型的object类型
declare function crete(o: object | null) : void;

create( {prop: 0})
create(null)

create(23)
create('string')
create(undefined)
create(false)
```
### 类型断言
<br>
有时候，你会遇到你比typeScript更了解值的类型信息，你会知道比typescript推断的类型更加确切的类型信息，相当于你在告诉编译器，你可以相信我，我就觉得他就是这样一个类型，我知道我在干什么。

```ts
let someValue: any = 'this is a string'

someValue.length  // 此时编译器是找不到这个属性的，那么如何找到呢？

// 方法一,使用尖括号进行强制类型转换，这样他就有这个属性了
let strLength: number = (<string>someValue).length

// 方法二，使用as的语法进行强转 （即我们断言他就是string类型）
let strLength: number = (someValue as string).length
```

***

## 变量声明


### var声明

```ts
function f() {
    var a = 109
    return function g() {
        var b = a + 100
        return b
    }
}

var g = f()
g()     // 209

function f(shouldInitialize) {
    if (shouldInitialize) {
        var x = 10
    }
    return x
}
f(true)     // 10
f(false)    // undefined

// 矩阵运算
function sumMatrix(matrix) {
    var sum = 0
    for (var i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i]
        for (var j = 0; j< currentRow.length; j++) {
            sum += currentRow[j]
        }
    }
    return sum
}

var matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

console.log(sumMatrix(matrix))  // 45

for (var i = 0; i < 10; i ++) {
    setTimeout(function () {
        console.log(i)
    }, 100 * i)
}
// 10 10 10 10 10 10 10 10 10 10

for (var i = 0; i < 10; i ++) {
    (function (j) {
        setTimeout(function () {
            console.log(j)
        }, 100 * j)
    })(i)
}
// 0 1 2 3 4 5 6 7 8 9
```

### let声明

```ts
let hello = 'hello'

function f(input: boolean) {
    let a = 100 

    if (input) {
        let b = a +1
        return b
    }

    return b // 报错，访问不到b，外部作用域无法访问内部作用域
}

try {
    throw 'Oh no'
} catch (e) {
    console.log('Catch it')
}

console.log(e)  // 同样也会报错，因为try catch也是块级作用域
```

### const声明

1、与let声明相似，但被赋值后不能再改（常量）
2、实际上const变量的内部状态是可修改的。 幸运的是，TypeScript允许你将对象的成员设置成只读的。
3、定义了一个const之后不能取重新赋值，因为重新赋值就相当于修改了他的引用，这是不被允许的，但是你可以修改他的成员，因为修改成员并不修改引用

```ts

let person = {
  username: 'luohao',
  password: '123456'
}
 
const pointer = person;
pointer.username = '1234';
console.log(pointer.username);
person.username = 'logic';
console.log(pointer.username);
//pointer = 123;
```

### let Vs const

最小特权原则：所有变量除了你计划去修改的都应该使用const

### 解构

```ts
1.解构数组

let input = [1, 2];
let [first, second] = input;
console.log(first); // outputs 1
console.log(second); // outputs 2

a) 运用于函数

function f([first, second]: [number, number]) {
    console.log(first);
    console.log(second);
}
f([6,8]);  
//6
//8

b) 剩余语法 ...(注意...之前的空格)

let [one, ...rest] = [1,2,3,4,5,6];
console.log(one);   //1
console.log(rest)   //[2,3,4,5,6]

let [first] = [1,2,3,4,5,6]
console.log(first)  //1

let [,two,,four] = [1,2,3,4];
console.log(two)    //2
console.log(four)   //4

2.对象解构

let o = {
    a: "foo",
    b: 12,
    c: "test"
}
let { a, b } = o;
console.log(a)  //"foo"
console.log(b)  //12


// 该函数传递一个参数（wholeObject) ,这个参数的类型添加一个对象解构，a是string， b是一个可选参数，这里因为b是可选的，所以有可能是undefined，所以给b在对象解构赋值的时候赋予一个默认值，这样既可以实现即便在b不传的时候我们也可以拿到a,b两个值
function keepWholeObject(wholeObject: {a: string, b?: number}) {
    let {a, b = 1001} = wholeObject
}

a)  剩余语法 ...


let o = {
    a: "foo",
    b: 12,
    c: "test"
}
let { c, ...rest } = o;
console.log(c);  //"test"
console.log(rest)   //{ a: 'foo', b: 12 }

b)运用于函数

type C = { a: string, b?: number }
function f({ a, b }: C): void {
    // ...
}
// 当上面我们的函数声明需要指定一个默认值的时候，可以这样做(当函数参数为一个空对象的时候，我们给a,b一个默认值)
function f({a = '', b = 0} = {}) : void {
    // ...
}
// 上面表示传递参数默认值为空的情况，下面表示当你不传a的值，默认给a赋值‘’
function f({a, b = 0} = {a: ''}): void {
    // ...
}
f({a:'yes'}) // a= 'yes' b = 0
f() // a='' b = 0
f({}) // 报错，因为传入一个对象，但是这个对象里没有a属性，但是在我们函数里面是给传入参数设置了默认值a=''的，所以当调用的时候，传参必须有a属性

```

### 展开

```ts
它允许你将一个数组展开为另一个数组，或将一个对象展开为另一个对象。

复制代码
let a1 = ["aa", "bb"];
let a2 = [0, 1];
let a3 = ["a", ...a1, "m", ...a2];
console.log(a3) //[ 'a', 'aa', 'bb', 'm', 0, 1 ]

let o1 = { name: "test", age: 20 };
let o2 = { ...o1, height: 180 }
console.log(o2);    //{ name: 'test', age: 20, height: 180 }
```

***

## 接口
### 接口初探

TypeScript的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

下面通过一个简单示例来观察接口是如何工作的：
```ts
function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
```

类型检查器会查看printLabel的调用。 printLabel有一个参数，并要求这个对象参数有一个名为label类型为string的属性。 需要注意的是，我们传入的对象参数实际上会包含很多属性，但是编译器只会检查那些必需的属性是否存在，并且其类型是否匹配。 然而，有些时候TypeScript却并不会这么宽松，我们下面会稍做讲解。

下面我们重写上面的例子，这次使用接口来描述：必须包含一个label属性且类型为string：

```ts
interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```
LabelledValue接口就好比一个名字，用来描述上面例子里的要求。 它代表了有一个 label属性且类型为string的对象。 需要注意的是，我们在这里并不能像在其它语言里一样，说传给 printLabel的对象实现了这个接口。我们只会去关注值的外形。 只要传入的对象满足上面提到的必要条件，那么它就是被允许的。

还有一点值得提的是，类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。

### 可选属性

接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。 可选属性在应用“option bags”模式时很常用，即给函数传入的参数对象中只有部分属性赋值了。属性加？表示这是一个可选属性

下面是应用了“option bags”的例子：

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"});
```

带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?符号。

可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误。 比如，我们故意将 createSquare里的color属性名拼错，就会得到一个错误提示：

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = {color: "white", area: 100};
  if (config.clor) {
    // Error: Property 'clor' does not exist on type 'SquareConfig'
    newSquare.color = config.clor;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"});
```

### 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 readonly来指定只读属性:

```ts
interface Point {
    readonly x: number;
    readonly y: number;
}
```

你可以通过赋值一个对象字面量来构造一个Point。 赋值后， x和y再也不能被改变了。

```ts
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error
```

TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：

```ts
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!
```

上面代码的最后一行，可以看到就算把整个ReadonlyArray赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写：

```ts
a = ro as number[];
```

readonly vs const
最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 const，若做为属性则使用readonly。

### 额外属性检查

我们在第一个例子里使用了接口，TypeScript让我们传入{ size: number; label: string; }到仅期望得到{ label: string; }的函数里。 我们已经学过了可选属性，并且知道他们在“option bags”模式里很有用。

然而，天真地将这两者结合的话就会像在JavaScript里那样搬起石头砸自己的脚。 比如，拿 createSquare例子来说：

```ts
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
}

let mySquare = createSquare({ colour: "red", width: 100 });
```

注意传入createSquare的参数拼写为colour而不是color。 在JavaScript里，这会默默地失败。

你可能会争辩这个程序已经正确地类型化了，因为width属性是兼容的，不存在color属性，而且额外的colour属性是无意义的。

然而，TypeScript会认为这段代码可能存在bug。 对象字面量会被特殊对待而且会经过 额外属性检查，当将它们赋值给变量或作为参数传递的时候。 如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误。

```ts
// error: 'colour' not expected in type 'SquareConfig'
let mySquare = createSquare({ colour: "red", width: 100 });
```

绕开这些检查非常简单。 最简便的方法是使用类型断言：

```ts
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
```

然而，最佳的方式是能够添加一个字符串索引签名，前提是你能够确定这个对象可能具有某些做为特殊用途使用的额外属性。 如果 SquareConfig带有上面定义的类型的color和width属性，并且还会带有任意数量的其它属性，那么我们可以这样定义它：

```ts
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
```

稍后会讲到索引签名，但在这我们要表示的是SquareConfig可以有任意数量的属性，并且只要它们不是color和width，那么就无所谓它们的类型是什么。

还有最后一种跳过这些检查的方式，这可能会让你感到惊讶，它就是将这个对象赋值给一个另一个变量： 因为 squareOptions不会经过额外属性检查，所以编译器不会报错。

```ts
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);
```

要留意，在像上面一样的简单代码里，你可能不应该去绕开这些检查。 对于包含方法和内部状态的复杂对象字面量来讲，你可能需要使用这些技巧，但是大部额外属性检查错误是真正的bug。 就是说你遇到了额外类型检查出的错误，比如“option bags”，你应该去审查一下你的类型声明。 在这里，如果支持传入 color或colour属性到createSquare，你应该修改SquareConfig定义来体现出这一点。

### 函数类型

接口能够描述JavaScript中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型。

为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}
```

这样定义后，我们可以像使用其它接口一样使用这个函数类型的接口。 下例展示了如何创建一个函数类型的变量，并将一个同类型的函数赋值给这个变量。

```ts
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}
```

对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。 比如，我们使用下面的代码重写上面的例子：

```ts
let mySearch: SearchFunc;
mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
}
```

函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的。 如果你不想指定类型，TypeScript的类型系统会推断出参数类型，因为函数直接赋值给了 SearchFunc类型变量。 函数的返回值类型是通过其返回值推断出来的（此例是 false和true）。 如果让这个函数返回数字或字符串，类型检查器会警告我们函数的返回值类型与 SearchFunc接口中的定义不匹配。

```ts
let mySearch: SearchFunc;
mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
}
```

### 可索引类型

与使用接口描述函数类型差不多，我们也可以描述那些能够“通过索引得到”的类型，比如a[10]或ageMap["daniel"]。 可索引类型具有一个 索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。 让我们看一个例子：

```ts
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
```

上面例子里，我们定义了StringArray接口，它具有索引签名。 这个索引签名表示了当用 number去索引StringArray时会得到string类型的返回值。

TypeScript支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。 这是因为当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象。 也就是说用 100（一个number）去索引等同于使用"100"（一个string）去索引，因此两者需要保持一致。

```ts
class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}

// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
interface NotOkay {
    [x: number]: Animal;
    [x: string]: Dog;
}
```

字符串索引签名能够很好的描述dictionary模式，并且它们也会确保所有属性与其返回值类型相匹配。 因为字符串索引声明了 obj.property和obj["property"]两种形式都可以。 下面的例子里， name的类型与字符串索引类型不匹配，所以类型检查器给出一个错误提示：

```ts
interface NumberDictionary {
  [index: string]: number;
  length: number;    // 可以，length是number类型
  name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配。类型“string”的属性“name”不能赋给字符串索引类型“Number”。
}
```

最后，你可以将索引签名设置为只读，这样就防止了给索引赋值：

```ts
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // error!
```

你不能设置myArray[2]，因为索引签名是只读的。

### 类类型
* #### 实现接口

    与C#或Java里接口的基本作用一样，TypeScript也能够用它来明确的强制一个类去符合某种契约

    ```ts
    interface ClockInterface {
        currentTime: Date;
    }

    class Clock implements ClockInterface {
        currentTime: Date;
        constructor(h: number, m: number) { }
    }
    ```

    你也可以在接口中描述一个方法，在类里实现它，如同下面的setTime方法一样：

    ```ts
    interface ClockInterface {
        currentTime: Date;
        setTime(d: Date);
    }

    class Clock implements ClockInterface {
        currentTime: Date;
        setTime(d: Date) {
            this.currentTime = d;
        }
        constructor(h: number, m: number) { }
    }
    ```

    接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。

* #### 类静态部分与实例部分的区别

    当你操作类和接口的时候，你要知道类是具有两个类型的：静态部分的类型和实例的类型。 你会注意到，当你用构造器签名去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误：

    ```ts
    interface ClockConstructor {
        new (hour: number, minute: number);
    }
    // 报错： 类“Clock”错误实现接口“ClockContructor”。类型“Clock”提供的内容与签名“new (hour: number, minute: number): any”不匹配。
    class Clock implements ClockConstructor {
        currentTime: Date;
        constructor(h: number, m: number) { }
    }
    ```

    这里因为当一个类实现了一个接口时，只对其实例部分进行类型检查。 constructor存在于类的静态部分，所以不在检查的范围内。

    因此，我们应该直接操作类的静态部分。 看下面的例子，我们定义了两个接口， ClockConstructor为构造函数所用和ClockInterface为实例方法所用。 为了方便，我们定义一个构造函数 createClock，它用传入的类型创建实例。

    ```ts
    interface ClockConstructor {
        new (hour: number, minute: number): ClockInterface;
        <!-- 构造器接口返回的是一个ClockInterface实例接口类型 -->
    }
    interface ClockInterface {
        tick();
    }

    <!-- 创建一个工厂方法,去创建不同的实例,他的参数:第一个是一个构造器(类型为构造器类型),第二个是我们对应传入的hour,minute,他的返回类型是实例接口类型 -->
    function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
        return new ctor(hour, minute);
    }

    // 接下来定义2个类,这两个类都要实现这个实例接口
    // 类1 数字时钟 这个类实现(implement) ClockInterface实例接口
    class DigitalClock implements ClockInterface {
        constructor(h: number, m: number) { }
        // 实现实例方法
        tick() {
            console.log("beep beep");
        }
    }
    // 类2 指针时钟,这个类也实现(implement) ClockInterface实例接口
    class AnalogClock implements ClockInterface {
        constructor(h: number, m: number) { }
        tick() {
            console.log("tick tock");
        }
    }

    // 然后我们想去创建这两个类的时候,就可以调用这里的createClock方法
    let digital = createClock(DigitalClock, 12, 17);
    let analog = createClock(AnalogClock, 7, 32);
    ```

    因为createClock的第一个参数是ClockConstructor类型，在createClock(AnalogClock, 7, 32)里，会检查AnalogClock是否符合构造函数签名。

### 继承接口

和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。

```ts
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = <Square>{};
// 或者使用as进行断言
// let square = {} as Square
square.color = "blue";
square.sideLength = 10;
```

一个接口可以继承多个接口，创建出多个接口的合成接口。

```ts
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```

### 混合类型

先前我们提过，接口能够描述JavaScript里丰富的类型。 因为JavaScript其动态灵活的特点，有时你会希望一个对象可以同时具有上面提到的多种类型。

一个例子就是，一个对象可以同时做为函数和对象使用，并带有额外的属性。

```ts
interface Counter {
    // 函数类型,有一个number类型的参数,返回类型为string
    (start: number): string;
    // 作为对象,他有个interval属性,是一个number类型
    interval: number;
    // reset方法,返回void
    reset(): void;
}

// 定义一个getCounter函数,返回一个Counter类型数据
function getCounter(): Counter {
    // 声明一个counter类型的函数
    let counter = <Counter>function (start: number) { };
    // as 断言
    // let counter = (function (start: number) {}) as Counter
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
// c可以是一个函数
c(10);
// c可以是一个对象,他有reset方法
c.reset();
// c可以是一个对象,他有interval属性
c.interval = 5.0;
```

在使用JavaScript第三方库的时候，你可能需要像上面那样去完整地定义类型。

### 接口继承类

当接口继承了一个类类型时，它会继承类的成员但不包括其实现。 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。 接口同样会继承到类的private和protected成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。

当你有一个庞大的继承结构时这很有用，但要指出的是你的代码只在子类拥有特定属性时起作用。 这个子类除了继承至基类外与基类没有任何关系。 例：

```ts
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {
    select() { }
}

// 错误：“Image”类型缺少“state”属性。
class Image implements SelectableControl {
    select() { }
}

class Location {

}
```
在上面的例子里，SelectableControl包含了Control的所有成员，包括私有成员state。 因为 state是私有成员，所以只能够是Control的子类们才能实现SelectableControl接口。 因为只有 Control的子类才能够拥有一个声明于Control的私有成员state，这对私有成员的兼容性是必需的。

在Control类内部，是允许通过SelectableControl的实例来访问私有成员state的。 实际上， SelectableControl接口和拥有select方法的Control类是一样的。 Button和TextBox类是SelectableControl的子类（因为它们都继承自Control并有select方法），但Image和Location类并不是这样的。

***

## 类
### 介绍

传统的JavaScript程序使用函数和基于原型的继承来创建可重用的组件，但对于熟悉使用面向对象方式的程序员来讲就有些棘手，因为他们用的是基于类的继承并且对象是由类构建出来的。 从ECMAScript 2015，也就是ECMAScript 6开始，JavaScript程序员将能够使用基于类的面向对象的方式。 使用TypeScript，我们允许开发者现在就使用这些特性，并且编译后的JavaScript可以在所有主流浏览器和平台上运行，而不需要等到下个JavaScript版本。

### 类

下面看一个使用类的例子：

```ts
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
```

如果你使用过C#或Java，你会对这种语法非常熟悉。 我们声明一个 Greeter类。这个类有3个成员：一个叫做 greeting的属性，一个构造函数和一个 greet方法。

你会注意到，我们在引用任何一个类成员的时候都用了 this。 它表示我们访问的是类的成员。

最后一行，我们使用 new构造了 Greeter类的一个实例。 它会调用之前定义的构造函数，创建一个 Greeter类型的新对象，并执行构造函数初始化它。

继承
在TypeScript里，我们可以使用常用的面向对象模式。 基于类的程序设计中一种最基本的模式是允许使用继承来扩展现有的类。

看下面的例子：

```ts
class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();
```

这个例子展示了最基本的继承：类从基类中继承了属性和方法。 这里， Dog是一个 派生类，它派生自 Animal 基类，通过 extends关键字。 派生类通常被称作 子类，基类通常被称作 超类。

因为 Dog继承了 Animal的功能，因此我们可以创建一个 Dog的实例，它能够 bark()和 move()。

下面我们来看个更加复杂的例子。

```ts
class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);
```

这个例子展示了一些上面没有提到的特性。 这一次，我们使用 extends关键字创建了 Animal的两个子类： Horse和 Snake。

与前一个例子的不同点是，派生类包含了一个构造函数，它 必须调用 super()，它会执行基类的构造函数。 而且，在构造函数里访问 this的属性之前，我们 一定要调用 super()。 这个是TypeScript强制执行的一条重要规则。

这个例子演示了如何在子类里可以重写父类的方法。 Snake类和 Horse类都创建了 move方法，它们重写了从 Animal继承来的 move方法，使得 move方法根据不同的类而具有不同的功能。 注意，即使 tom被声明为 Animal类型，但因为它的值是 Horse，调用 tom.move(34)时，它会调用 Horse里重写的方法：

```ts
Slithering...
Sammy the Python moved 5m.
Galloping...
Tommy the Palomino moved 34m.
```

### 公共，私有与受保护的修饰符

* #### 默认为 public

    在上面的例子里，我们可以自由的访问程序里定义的成员。 如果你对其它语言中的类比较了解，就会注意到我们在之前的代码里并没有使用 public来做修饰；例如，C#要求必须明确地使用 public指定成员是可见的。 在TypeScript里，成员都默认为 public。

    你也可以明确的将一个成员标记成 public。 我们可以用下面的方式来重写上面的 Animal类：

    ```ts
    class Animal {
        public name: string;
        public constructor(theName: string) { this.name = theName; }
        public move(distanceInMeters: number) {
            console.log(`${this.name} moved ${distanceInMeters}m.`);
        }
    }
    ```
* #### 理解 private

    当成员被标记成 private时，它就不能在声明它的类的外部访问。比如：

    ```ts
    class Animal {
        private name: string;
        constructor(theName: string) { this.name = theName; }
    }

    new Animal("Cat").name; // 错误: 'name' 是私有的.
    ```
    TypeScript使用的是结构性类型系统。 当我们比较两种不同的类型时，并不在乎它们从何处而来，如果所有成员的类型都是兼容的，我们就认为它们的类型是兼容的。

    然而，当我们比较带有 private或 protected成员的类型的时候，情况就不同了。 如果其中一个类型里包含一个 private成员，那么只有当另外一个类型中也存在这样一个 private成员， 并且它们都是来自同一处声明时，我们才认为这两个类型是兼容的。 对于 protected成员也使用这个规则。

    下面来看一个例子，更好地说明了这一点：

    ```ts
    class Animal {
        private name: string;
        constructor(theName: string) { this.name = theName; }
    }

    class Rhino extends Animal {
        constructor() { super("Rhino"); }
    }

    class Employee {
        private name: string;
        constructor(theName: string) { this.name = theName; }
    }

    let animal = new Animal("Goat");
    let rhino = new Rhino();
    let employee = new Employee("Bob");

    animal = rhino;
    animal = employee; // 错误: Animal 与 Employee 不兼容.
    ```

    这个例子中有 Animal和 Rhino两个类， Rhino是 Animal类的子类。 还有一个 Employee类，其类型看上去与 Animal是相同的。 我们创建了几个这些类的实例，并相互赋值来看看会发生什么。 因为 Animal和 Rhino共享了来自 Animal里的私有成员定义 private name: string，因此它们是兼容的。 然而 Employee却不是这样。当把 Employee赋值给 Animal的时候，得到一个错误，说它们的类型不兼容。 尽管 Employee里也有一个私有成员 name，但它明显不是 Animal里面定义的那个。

* #### 理解 protected

    protected修饰符与 private修饰符的行为很相似，但有一点不同， protected成员在派生类中仍然可以访问。例如：

    ```ts
    class Person {
        protected name: string;
        constructor(name: string) { this.name = name; }
    }

    class Employee extends Person {
        private department: string;

        constructor(name: string, department: string) {
            super(name)
            this.department = department;
        }

        public getElevatorPitch() {
            return `Hello, my name is ${this.name} and I work in ${this.department}.`;
        }
    }

    let howard = new Employee("Howard", "Sales");
    console.log(howard.getElevatorPitch());
    console.log(howard.name); // 错误
    ```

    注意，我们不能在 Person类外使用 name，但是我们仍然可以通过 Employee类的实例方法访问，因为 Employee是由 Person派生而来的。

    构造函数也可以被标记成 protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承。比如，

    ```ts
    class Person {
        protected name: string;
        protected constructor(theName: string) { this.name = theName; }
    }

    // Employee 能够继承 Person
    class Employee extends Person {
        private department: string;

        constructor(name: string, department: string) {
            super(name);
            this.department = department;
        }

        public getElevatorPitch() {
            return `Hello, my name is ${this.name} and I work in ${this.department}.`;
        }
    }

    let howard = new Employee("Howard", "Sales");
    let john = new Person("John"); // 错误: 'Person' 的构造函数是被保护的.
    ```

### readonly修饰符

你可以使用 readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。

```ts
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.
```

* #### 参数属性

    在上面的例子中，我们必须在Octopus类里定义一个只读成员 name和一个参数为 theName的构造函数，并且立刻将 theName的值赋给 name，这种情况经常会遇到。 参数属性可以方便地让我们在一个地方定义并初始化一个成员。 下面的例子是对之前 Octopus类的修改版，使用了参数属性：

    ```ts
    class Octopus {
        readonly numberOfLegs: number = 8;
        constructor(readonly name: string) {
        }
    }
    ```

    注意看我们是如何舍弃了 theName，仅在构造函数里使用 readonly name: string参数来创建和初始化 name成员。 我们把声明和赋值合并至一处。

    参数属性通过给构造函数参数前面添加一个访问限定符来声明。 使用 private限定一个参数属性会声明并初始化一个私有成员；对于 public和 protected来说也是一样。

### 存取器

TypeScript支持通过getters/setters来截取对对象成员的访问。 它能帮助你有效的控制对对象成员的访问。

下面来看如何把一个简单的类改写成使用 get和 set。 首先，我们从一个没有使用存取器的例子开始。

```ts
class Employee {
    fullName: string;
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}
```

我们可以随意的设置 fullName，这是非常方便的，但是这也可能会带来麻烦。

下面这个版本里，我们先检查用户密码是否正确，然后再允许其修改员工信息。 我们把对 fullName的直接访问改成了可以检查密码的 set方法。 我们也加了一个 get方法，让上面的例子仍然可以工作。

```ts
let passcode = "secret passcode";

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}
```

我们可以修改一下密码，来验证一下存取器是否是工作的。当密码不对时，会提示我们没有权限去修改员工。

对于存取器有下面几点需要注意的：

首先，存取器要求你将编译器设置为输出ECMAScript 5或更高。 不支持降级到ECMAScript 3。 其次，只带有 get不带有 set的存取器自动被推断为 readonly。 这在从代码生成 .d.ts文件时是有帮助的，因为利用这个属性的用户会看到不允许够改变它的值。

### 静态属性

到目前为止，我们只讨论了类的实例成员，那些仅当类被实例化的时候才会被初始化的属性。 我们也可以创建类的静态成员，这些属性存在于类本身上面而不是类的实例上。 在这个例子里，我们使用 static定义 origin，因为它是所有网格都会用到的属性。 每个实例想要访问这个属性的时候，都要在 origin前面加上类名。 如同在实例属性上使用 this.前缀来访问属性一样，这里我们使用 Grid.来访问静态属性。

```ts
class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
```

### 抽象类

抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 不同于接口，抽象类可以包含成员的实现细节。 abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。

```ts
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log('roaming the earch...');
    }
}
```

抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 抽象方法的语法与接口方法相似。 两者都是定义方法签名但不包含方法体。 然而，抽象方法必须包含 abstract关键字并且可以包含访问修饰符。

```ts
abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
        console.log('Department name: ' + this.name);
    }

    abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {

    constructor() {
        super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
    }

    printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.');
    }

    generateReports(): void {
        console.log('Generating accounting reports...');
    }
}

let department: Department; // 允许创建一个对抽象类型的引用
department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
department.generateReports(); // 错误: 方法在声明的抽象类中不存在
```

### 高级技巧

* #### 构造函数

    当你在TypeScript里声明了一个类的时候，实际上同时声明了很多东西。 首先就是类的 实例的类型。

    ```ts
    class Greeter {
        greeting: string;
        constructor(message: string) {
            this.greeting = message;
        }
        greet() {
            return "Hello, " + this.greeting;
        }
    }

    let greeter: Greeter;
    greeter = new Greeter("world");
    console.log(greeter.greet());
    ```

    这里，我们写了 let greeter: Greeter，意思是 Greeter类的实例的类型是 Greeter。 这对于用过其它面向对象语言的程序员来讲已经是老习惯了。

    我们也创建了一个叫做 构造函数的值。 这个函数会在我们使用 new创建类实例的时候被调用。 下面我们来看看，上面的代码被编译成JavaScript后是什么样子的：

    ```ts
    let Greeter = (function () {
        function Greeter(message) {
            this.greeting = message;
        }
        Greeter.prototype.greet = function () {
            return "Hello, " + this.greeting;
        };
        return Greeter;
    })();

    let greeter;
    greeter = new Greeter("world");
    console.log(greeter.greet());
    ```

    上面的代码里， let Greeter将被赋值为构造函数。 当我们调用 new并执行了这个函数后，便会得到一个类的实例。 这个构造函数也包含了类的所有静态属性。 换个角度说，我们可以认为类具有 实例部分与 静态部分这两个部分。

    让我们稍微改写一下这个例子，看看它们之间的区别：

    ```ts
    class Greeter {
    static standardGreeting = "Hello, there";
    greeting: string;
    greet() {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return Greeter.standardGreeting;
            }
        }
    }

    let greeter1: Greeter;
    greeter1 = new Greeter();
    console.log(greeter1.greet());

    let greeterMaker: typeof Greeter = Greeter;
    greeterMaker.standardGreeting = "Hey there!";

    let greeter2: Greeter = new greeterMaker();
    console.log(greeter2.greet());
    ```

    这个例子里， greeter1与之前看到的一样。 我们实例化 Greeter类，并使用这个对象。 与我们之前看到的一样。

    再之后，我们直接使用类。 我们创建了一个叫做 greeterMaker的变量。 这个变量保存了这个类或者说保存了类构造函数。 然后我们使用 typeof Greeter，意思是取Greeter类的类型，而不是实例的类型。 或者更确切的说，"告诉我 Greeter标识符的类型"，也就是构造函数的类型。 这个类型包含了类的所有静态成员和构造函数。 之后，就和前面一样，我们在 greeterMaker上使用 new，创建 Greeter的实例。

* #### 把类当做接口使用

    如上一节里所讲的，类定义会创建两个东西：类的实例类型和一个构造函数。 因为类可以创建出类型，所以你能够在允许使用接口的地方使用类。

    ```ts
    class Point {
        x: number;
        y: number;
    }

    interface Point3d extends Point {
        z: number;
    }

    let point3d: Point3d = {x: 1, y: 2, z: 3};
    ```

***

## 函数

### 介绍

函数是JavaScript应用程序的基础。 它帮助你实现抽象层，模拟类，信息隐藏和模块。 在TypeScript里，虽然已经支持类，命名空间和模块，但函数仍然是主要的定义 行为的地方。 TypeScript为JavaScript函数添加了额外的功能，让我们可以更容易地使用。

### 函数

和JavaScript一样，TypeScript函数可以创建有名字的函数和匿名函数。 你可以随意选择适合应用程序的方式，不论是定义一系列API函数还是只使用一次的函数。

通过下面的例子可以迅速回想起这两种JavaScript中的函数：

```ts
// Named function
function add(x, y) {
    return x + y;
}

// Anonymous function
let myAdd = function(x, y) { return x + y; };
```

在JavaScript里，函数可以使用函数体外部的变量。 当函数这么做时，我们说它‘捕获’了这些变量。 至于为什么可以这样做以及其中的利弊超出了本文的范围，但是深刻理解这个机制对学习JavaScript和TypeScript会很有帮助。

```ts
let z = 100;

function addToZ(x, y) {
    return x + y + z;
}
```

### 函数类型

* #### 为函数定义类型

    让我们为上面那个函数添加类型：

    ```ts
    function add(x: number, y: number): number {
        return x + y;
    }

    let myAdd = function(x: number, y: number): number { return x + y; };
    ```

    我们可以给每个参数添加类型之后再为函数本身添加返回值类型。 TypeScript能够根据返回语句自动推断出返回值类型，因此我们通常省略它。

* #### 书写完整函数类型

    现在我们已经为函数指定了类型，下面让我们写出函数的完整类型。

    ```ts
    let myAdd: (x: number, y: number) => number =
        function(x: number, y: number): number { return x + y; };
    ```

    只要参数类型是匹配的，那么就认为它是有效的函数类型，而不在乎参数名是否正确。

    第二部分是返回值类型。 对于返回值，我们在函数和返回值类型之前使用( =>)符号，使之清晰明了。 如之前提到的，返回值类型是函数类型的必要部分，如果函数没有返回任何值，你也必须指定返回值类型为 void而不能留空。

    函数的类型只是由参数类型和返回值(箭头后面的那个类型)组成的。 函数中使用的捕获变量不会体现在类型里。 实际上，这些变量是函数的隐藏状态并不是组成API的一部分。

* #### 推断类型

    尝试这个例子的时候，你会发现如果你在赋值语句的一边指定了类型但是另一边没有类型的话，TypeScript编译器会自动识别出类型：

    ```ts
    // myAdd has the full function type
    let myAdd = function(x: number, y: number): number { return x + y; };

    // The parameters `x` and `y` have the type number
    let myAdd: (baseValue: number, increment: number) => number =
        function(x, y) { return x + y; };
    ```

    这叫做“按上下文归类”，是类型推论的一种。 它帮助我们更好地为程序指定类型。

### 可选参数和默认参数

TypeScript里的每个函数参数都是必须的。 这不是指不能传递 null或undefined作为参数，而是说编译器检查用户是否为每个参数都传入了值。 编译器还会假设只有这些参数会被传递进函数。 简短地说，传递给一个函数的参数个数必须与函数期望的参数个数一致。

```ts
    function buildName(firstName: string, lastName: string) {
        return firstName + " " + lastName;
    }

    let result1 = buildName("Bob");                  // error, too few parameters
    let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
    let result3 = buildName("Bob", "Adams");         // ah, just right
```

JavaScript里，每个参数都是可选的，可传可不传。 没传参的时候，它的值就是undefined。 在TypeScript里我们可以在参数名旁使用 ? 实现可选参数的功能。 比如，我们想让last name是可选的：

```ts
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}

let result1 = buildName("Bob");  // works correctly now
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");  // ah, just right
```

<font color=#1890ff>可选参数必须跟在必须参数后面。 如果上例我们想让first name是可选的，那么就必须调整它们的位置，把first name放在后面。</font>

在TypeScript里，我们也可以为参数提供一个默认值当用户没有传递这个参数或传递的值是undefined时。 它们叫做有默认初始化值的参数。 让我们修改上例，把last name的默认值设置为"Smith"。

```ts
function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // works correctly now, returns "Bob Smith"
let result2 = buildName("Bob", undefined);       // still works, also returns "Bob Smith"
let result3 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result4 = buildName("Bob", "Adams");         // ah, just right
```

在所有必须参数后面的带默认初始化的参数都是可选的，与可选参数一样，在调用函数的时候可以省略。 也就是说可选参数与末尾的默认参数共享参数类型。

```ts
function buildName(firstName: string, lastName?: string) {
    // ...
}
```

和

```ts
function buildName(firstName: string, lastName = "Smith") {
    // ...
}
```

共享同样的类型(firstName: string, lastName?: string) => string。 默认参数的默认值消失了，只保留了它是一个可选参数的信息。

<font color=#1890ff>与普通可选参数不同的是，带默认值的参数不需要放在必须参数的后面。 如果带默认值的参数出现在必须参数前面，用户必须明确的传入 undefined值来获得默认值。</font> 例如，我们重写最后一个例子，让 firstName是带默认值的参数：

```ts
function buildName(firstName = "Will", lastName: string) {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // error, too few parameters
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");         // okay and returns "Bob Adams"
let result4 = buildName(undefined, "Adams");     // okay and returns "Will Adams"
```

### 剩余参数

必要参数，默认参数和可选参数有个共同点：它们表示某一个参数。 有时，你想同时操作多个参数，或者你并不知道会有多少参数传递进来。 在JavaScript里，你可以使用 arguments来访问所有传入的参数。

在TypeScript里，你可以把所有参数收集到一个变量里：

```ts
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```

剩余参数会被当做个数不限的可选参数。 可以一个都没有，同样也可以有任意个。 编译器创建参数数组，名字是你在省略号（ ...）后面给定的名字，你可以在函数体内使用这个数组。

这个省略号也会在带有剩余参数的函数类型定义上使用到：

```ts
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let buildNameFun: (fname: string, ...rest: string[]) => string = buildName;
```

<br>

### this

<br>

* #### this和箭头函数

    <br>

    JavaScript里，this的值在函数被调用的时候才会指定。 这是个既强大又灵活的特点，但是你需要花点时间弄清楚函数调用的上下文是什么。 但众所周知，这不是一件很简单的事，尤其是在返回一个函数或将函数当做参数传递的时候。

    下面看一个例子：

    ```ts
    // 定义一个扑克牌的对象
    let deck = {
        // 定义花色数组(红心,黑桃,草花,方片)
        suits: ["hearts", "spades", "clubs", "diamonds"],
        cards: Array(52),
        // 抽牌器
        createCardPicker: function() {
            return function() {
                // 随机一张牌
                let pickedCard = Math.floor(Math.random() * 52);
                // 随机花色
                let pickedSuit = Math.floor(pickedCard / 13);
                
                // 随机点数
                return {suit: this.suits[pickedSuit], card: pickedCard % 13};
            }
        }
    }

    let cardPicker = deck.createCardPicker();
    let pickedCard = cardPicker();

    alert("card: " + pickedCard.card + " of " + pickedCard.suit);
    ```

    可以看到createCardPicker是个函数，并且它又返回了一个函数。 如果我们尝试运行这个程序，会发现它并没有弹出对话框而是报错了。 因为 createCardPicker返回的函数里的this被设置成了window而不是deck对象。 因为我们只是独立的调用了 cardPicker()。 顶级的非方法式调用会将 this视为window。 （注意：在严格模式下， this为undefined而不是window）。

    为了解决这个问题，我们可以在函数被返回时就绑好正确的this。 这样的话，无论之后怎么使用它，都会引用绑定的‘deck’对象。 我们需要改变函数表达式来使用ECMAScript 6箭头语法。 箭头函数能保存函数创建时的 this值，而不是调用时的值：

    ```ts
    let deck = {
        suits: ["hearts", "spades", "clubs", "diamonds"],
        cards: Array(52),
        createCardPicker: function() {
            // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
            return () => {
                let pickedCard = Math.floor(Math.random() * 52);
                let pickedSuit = Math.floor(pickedCard / 13);

                return {suit: this.suits[pickedSuit], card: pickedCard % 13};
            }
        }
    }

    let cardPicker = deck.createCardPicker();
    let pickedCard = cardPicker();

    alert("card: " + pickedCard.card + " of " + pickedCard.suit);

    ```

    更好事情是，TypeScript会警告你犯了一个错误，如果你给编译器设置了--noImplicitThis标记。 它会指出 this.suits[pickedSuit]里的this的类型为any。

    <br>

* #### this参数

    <br>

    不幸的是，this.suits[pickedSuit]的类型依旧为any。 这是因为 this来自对象字面量里的函数表达式。 修改的方法是，提供一个显式的 this参数。 this参数是个假的参数，它出现在参数列表的最前面：

    ```ts
    function f(this: void) {
        // make sure `this` is unusable in this standalone function
        // 确保this在这个方法里是不可用状态
    }
    ```

    让我们往例子里添加一些接口，Card 和 Deck，让类型重用能够变得清晰简单些：

    ```ts
    interface Card {
        suit: string;
        card: number;
    }
    interface Deck {
        suits: string[];
        cards: number[];
        createCardPicker(this: Deck): () => Card;
    }
    let deck: Deck = {
        suits: ["hearts", "spades", "clubs", "diamonds"],
        cards: Array(52),
        // NOTE: The function now explicitly specifies that its callee must be of type Deck
        createCardPicker: function(this: Deck) {
            return () => {
                let pickedCard = Math.floor(Math.random() * 52);
                let pickedSuit = Math.floor(pickedCard / 13);

                return {suit: this.suits[pickedSuit], card: pickedCard % 13};
            }
        }
    }

    let cardPicker = deck.createCardPicker();
    let pickedCard = cardPicker();

    alert("card: " + pickedCard.card + " of " + pickedCard.suit);
    ```

    现在TypeScript知道createCardPicker期望在某个Deck对象上调用。 也就是说 this是Deck类型的，而非any，因此--noImplicitThis不会报错了。

    <br>

* #### this参数在回调函数里

    <br>

    你可以也看到过在回调函数里的this报错，当你将一个函数传递到某个库函数里稍后会被调用时。 因为当回调被调用的时候，它们会被当成一个普通函数调用， this将为undefined。 稍做改动，你就可以通过 this参数来避免错误。 首先，库函数的作者要指定 this的类型：

    ```ts
    interface UIElement {
        addClickListener(onclick: (this: void, e: Event) => void): void;
    }
    ```

    this: void means that addClickListener expects onclick to be a function that does not require a this type. Second, annotate your calling code with this:
     this: void 表示addClickListener期望onclick是不需要此类型的函数。 其次，用以下注释您的调用代码：

    ```ts
    class Handler {
        info: string;
        onClickBad(this: Handler, e: Event) {
            // oops, used this here. using this callback would crash at runtime
            this.info = e.message;
        }
    }
    let h = new Handler();
    uiElement.addClickListener(h.onClickBad); // error!
    ```

    指定了this类型后，你显式声明onClickBad必须在Handler的实例上调用。 然后TypeScript会检测到 addClickListener要求函数带有this: void。 改变 this类型来修复这个错误：

    ```ts
    class Handler {
        info: string;
        onClickGood(this: void, e: Event) {
            // can't use this here because it's of type void!
            console.log('clicked!');
        }
    }
    let h = new Handler();
    uiElement.addClickListener(h.onClickGood);
    ```

    因为onClickGood指定了this类型为void，因此传递addClickListener是合法的。 当然了，这也意味着不能使用 this.info. 如果你两者都想要，你不得不使用箭头函数了：

    ```ts
    class Handler {
        info: string;
        onClickGood = (e: Event) => { this.info = e.message }
    }
    ```

    这是可行的因为箭头函数不会捕获this，所以你总是可以把它们传给期望this: void的函数。 缺点是每个 Handler对象都会创建一个箭头函数。 另一方面，方法只会被创建一次，添加到 Handler的原型链上。 它们在不同 Handler对象间是共享的。

### 重载

JavaScript本身是个动态语言。 JavaScript里函数根据传入不同的参数而返回不同类型的数据是很常见的。

```ts
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x): any {
    // 检查我们是否正在处理对象/数组
    // 如果是这样，他们给了我们套牌，我们将挑选卡片
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // 否则就让他们拿起卡片
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```

pickCard方法根据传入参数的不同会返回两种不同的类型。 如果传入的是代表纸牌的对象，函数作用是从中抓一张牌。 如果用户想抓牌，我们告诉他抓到了什么牌。 但是这怎么在类型系统里表示呢。

方法是为同一个函数提供多个函数类型定义来进行函数重载。 编译器会根据这个列表去处理函数的调用。 下面我们来重载 pickCard函数。

```ts
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };

// 下面这个不是重载的一部分,他是一个重载函数的实现
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);

```

这样改变后，重载的pickCard函数在调用的时候会进行正确的类型检查。

<font color = #dd2233>为了让编译器能够选择正确的检查类型，它与JavaScript里的处理流程相似。 它查找重载列表，尝试使用第一个重载定义。 如果匹配的话就使用这个。 因此，在定义重载的时候，一定要把最精确的定义放在最前面。</font>

注意，function pickCard(x): any并不是重载列表的一部分，因此这里只有两个重载：一个是接收对象另一个接收数字。 以其它参数调用 pickCard会产生错误。


***

## 泛型
### 介绍

软件工程中，我们不仅要创建一致的定义良好的API，同时也要考虑可重用性。 组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。

在像C#和Java这样的语言中，可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。 这样用户就可以以自己的数据类型来使用组件。

### 泛型之Hello World

下面来创建第一个使用泛型的例子：identity函数。 这个函数会返回任何传入它的值。 你可以把这个函数当成是 echo命令。

不用泛型的话，这个函数可能是下面这样：

```ts
function identity(arg: number): number {
    return arg;
}
```

或者，我们使用any类型来定义函数：

```ts
function identity(arg: any): any {
    return arg;
}
```

使用any类型会导致这个函数可以接收任何类型的arg参数，这样就丢失了一些信息：传入的类型与返回的类型应该是相同的。如果我们传入一个数字，我们只知道任何类型的值都有可能被返回。

因此，我们需要一种方法使返回值的类型与传入参数的类型是相同的。 这里，我们使用了 <font color=#ddf2233>类型变量，它是一种特殊的变量，只用于表示类型而不是值。</font>

```ts
function identity<T>(arg: T): T {
    return arg;
}
```

我们给identity添加了类型变量T。 T帮助我们捕获用户传入的类型（比如：number），之后我们就可以使用这个类型。 之后我们再次使用了 T当做返回值类型。现在我们可以知道参数类型与返回值类型是相同的了。 这允许我们跟踪函数里使用的类型的信息。

我们把这个版本的identity函数叫做泛型，因为它可以适用于多个类型。 不同于使用 any，它不会丢失信息，像第一个例子那像保持准确性，传入数值类型并返回数值类型。

我们定义了泛型函数后，可以用两种方法使用。 第一种是，传入所有的参数，包含类型参数：

```ts
let output = identity<string>("myString");  // type of output will be 'string'
```

这里我们明确的指定了T是string类型，并做为一个参数传给函数，使用了<>括起来而不是()。

第二种方法更普遍。利用了类型推论 -- 即编译器会根据传入的参数自动地帮助我们确定T的类型：

```ts
let output = identity("myString");  // type of output will be 'string'
```

注意我们没必要使用尖括号（<>）来明确地传入类型；编译器可以查看myString的值，然后把T设置为它的类型。 类型推论帮助我们保持代码精简和高可读性。如果编译器不能够自动地推断出类型的话，只能像上面那样明确的传入T的类型，在一些复杂的情况下，这是可能出现的。

### 使用泛型变量

使用泛型创建像identity这样的泛型函数时，编译器要求你在函数体必须正确的使用这个通用的类型。 换句话说，你必须把这些参数当做是任意或所有类型。

看下之前identity例子：

```ts
function identity<T>(arg: T): T {
    return arg;
}
```

如果我们想同时打印出arg的长度。 我们很可能会这样做：

```ts
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);  // Error: T doesn't have .length
    return arg;
}
```

如果这么做，编译器会报错说我们使用了arg的.length属性，但是没有地方指明arg具有这个属性。 记住，这些类型变量代表的是任意类型，所以使用这个函数的人可能传入的是个数字，而数字是没有 .length属性的。

现在假设我们想操作T类型的数组而不直接是T。由于我们操作的是数组，所以.length属性是应该存在的。 我们可以像创建其它数组一样创建这个数组：

```ts
function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}
```

你可以这样理解loggingIdentity的类型：泛型函数loggingIdentity，接收类型参数T和参数arg，它是个元素类型是T的数组，并返回元素类型是T的数组。 如果我们传入数字数组，将返回一个数字数组，因为此时 T的的类型为number。 这可以让我们把泛型变量T当做类型的一部分使用，而不是整个类型，增加了灵活性。

我们也可以这样实现上面的例子：

```ts
function loggingIdentity<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}
```
使用过其它语言的话，你可能对这种语法已经很熟悉了。 在下一节，会介绍如何创建自定义泛型像 Array<T>一样。

### 泛型类型

上一节，我们创建了identity通用函数，可以适用于不同的类型。 在这节，我们研究一下函数本身的类型，以及如何创建泛型接口。

泛型函数的类型与非泛型函数的类型没什么不同，只是有一个类型参数在最前面，像函数声明一样：

```ts
function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: <T>(arg: T) => T = identity;
```

我们也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以。

```ts
function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: <U>(arg: U) => U = identity;
```

我们还可以使用带有调用签名的对象字面量来定义泛型函数：

```ts
function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: {<T>(arg: T): T} = identity;
```

这引导我们去写第一个泛型接口了。 我们把上面例子里的对象字面量拿出来做为一个接口：

```ts
interface GenericIdentityFn {
    <T>(arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn = identity;
```

一个相似的例子，我们可能想把泛型参数当作整个接口的一个参数。 这样我们就能清楚的知道使用的具体是哪个泛型类型（比如： Dictionary<string>而不只是Dictionary）。 这样接口里的其它成员也能知道这个参数的类型了。

```ts
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

注意，我们的示例做了少许改动。 不再描述泛型函数，而是把非泛型函数签名作为泛型类型一部分。 当我们使用 GenericIdentityFn的时候，还得传入一个类型参数来指定泛型类型（这里是：number），锁定了之后代码里使用的类型。 对于描述哪部分类型属于泛型部分来说，理解何时把参数放在调用签名里和何时放在接口上是很有帮助的。

除了泛型接口，我们还可以创建泛型类。 注意，无法创建泛型枚举和泛型命名空间。

### 泛型类

泛型类看上去与泛型接口差不多。 泛型类使用（ <>）括起泛型类型，跟在类名后面。

```ts
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

GenericNumber类的使用是十分直观的，并且你可能已经注意到了，没有什么去限制它只能使用number类型。 也可以使用字符串或其它更复杂的类型。

```ts
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function(x, y) { return x + y; };

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
```

与接口一样，直接把泛型类型放在类后面，可以帮助我们确认类的所有属性都在使用相同的类型。

我们在类那节说过，<font color=#d28>类有两部分：静态部分和实例部分。 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。</font>

### 泛型约束

你应该会记得之前的一个例子，我们有时候想操作某类型的一组值，并且我们知道这组值具有什么样的属性。 在 loggingIdentity例子中，我们想访问arg的length属性，但是编译器并不能证明每种类型都有length属性，所以就报错了。

```ts
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);  // Error: T doesn't have .length
    return arg;
}
```

相比于操作any所有类型，我们想要限制函数去处理任意带有.length属性的所有类型。 只要传入的类型有这个属性，我们就允许，就是说至少包含这一属性。 为此，我们需要列出对于T的约束要求。

为此，我们定义一个接口来描述约束条件。 创建一个包含 .length属性的接口，使用这个接口和extends关键字来实现约束：

```ts
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}
```

现在这个泛型函数被定义了约束，因此它不再是适用于任意类型：

```ts
loggingIdentity(3);  // Error, number doesn't have a .length property
```

我们需要传入符合约束类型的值，必须包含必须的属性：

```ts
loggingIdentity({length: 10, value: 3});
```

* ####  在泛型约束中使用类型参数

    你可以声明一个类型参数，且它被另一个类型参数所约束。 比如，现在我们想要用属性名从对象里获取这个属性。 并且我们想要确保这个属性存在于对象 obj上，因此我们需要在这两个类型之间使用约束。

    ```ts
    function getProperty(obj: T, key: K) {
        return obj[key];
    }

    let x = { a: 1, b: 2, c: 3, d: 4 };

    getProperty(x, "a"); // okay
    getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
    ```

* #### 在泛型里使用类类型

    在TypeScript使用泛型创建工厂函数时，需要引用构造函数的类类型。比如，
    
    ```ts
    function create<T>(c: {new(): T; }): T {
        return new c();
    }
    ```
    
    一个更高级的例子，使用原型属性推断并约束构造函数与类实例的关系。

    ```ts
    class BeeKeeper {
        hasMask: boolean;
    }

    class ZooKeeper {
        nametag: string;
    }

    class Animal {
        numLegs: number;
    }

    class Bee extends Animal {
        keeper: BeeKeeper;
    }

    class Lion extends Animal {
        keeper: ZooKeeper;
    }

    function createInstance<A extends Animal>(c: new () => A): A {
        return new c();
    }

    createInstance(Lion).keeper.nametag;  // typechecks!
    createInstance(Bee).keeper.hasMask;   // typechecks!
    ```
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
元组在使用过程中最好不要越界使用。因为只有在3.1之前的版本才可以
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
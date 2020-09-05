class User {
    fullName: string
    firstName: string
    lastName: string

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName
        this.lastName = lastName
        this.fullName = firstName + ' ' + lastName
    }
}

interface Person {
    firstName: string
    lastName: string
}

function greeter(person: Person) {
    return 'Hello,' + person.firstName + ' ' +person.lastName
}

let user:Person = {
    firstName: 'invi',
    lastName: '1998'
}

console.log(greeter(user))

// 正方形接口
interface Square {
    color: string
    area: number
}
// 正方形配置接口 属性加？表示这是一个可选属性
interface SquareConfig {
    color?: string
    width?: number
}

function createSquare(config: SquareConfig): Square {
    let newSquare = {color: 'white', area: 100}
    if(config.color) {
        newSquare.color = config.color
    }
    if (config.width) {
        newSquare.area = config.width * config.width
    }
    return newSquare
}

let mySquare = createSquare({color: 'red'})

interface Point {
    readonly x: number
    readonly y: number
}

let p1: Point = {x: 10, y: 20}

// p1.x = 5

let g: number [] = [1, 2, 3, 4]
let ro : ReadonlyArray<number> = g

interface SeachFunc {
    (source: string, subString: string) : boolean
}

let mySearch: SeachFunc
mySearch = function (src: string, sub: string) : boolean {
    let result = src.search(sub)

    return result > -1
}

interface StringArray {
    [index: number]: string
}

let myArray: StringArray

myArray = ['safd','biog']

let myStr: string = myArray[0]


interface NumberDictionary {
    [index: string]: Number
    length: number

    // name: string // 报错
}

interface ClockInterface {
    currentTime: Date

    setTime(d: Date)
}

interface ClockContructor {
    new(hour: number, minute: number)
}

class Clock implements ClockInterface {
    currentTime: Date
    constructor(h: number, m: number) {

    }

    setTime(d: Date) {
        this.currentTime = d
    }
}

class Greeter {
    greeting: string
    constructor (message: string) {
        this.greeting = message
    }

    greet() {
        return 'Hello, ' + this.greeting
    }
}

let greeters = new Greeter('world')
greeters.greet()

class Animal {
    name:string
    constructor(name:string) {
        this.name = name
    }
    move(distance: number = 0) {
        console.log(`${this.name} moved ${distance} Km`)
    }
}

class Dog extends Animal {
    barck () {
        console.log('woof! woof!')
    }
}

const dog = new Dog('狗')

dog.barck()

dog.move(111)

class Snake extends Animal {
    constructor (name: string) {
        super (name)
    }
    move(distance: number = 5) {
        console.log('si si si ..... ')
        super.move(distance)
    }
}

class Horse extends Animal {
    constructor (name:string = '马') {
        super (name)
    }
    move(distance: number = 1000) {
        console.log('deng deng deng ... ')
        super.move(distance)
    }
}

let sam = new Snake('Samy')

let tom = new Horse('大仲马')

sam.move(32)

tom.move(46643)

let passcode = 'secret passcode'

class Employee {
    private _fullName : string
    // fullName: string
    get fullName(): string {
        return this._fullName
    }

    set fullName(fullName: string) {
        if(passcode && passcode === 'secret passcode') {
            this._fullName = fullName
        } else {
            console.error('unauthorized update of employee')
        }
    }
}

let emplopyee = new Employee()
emplopyee.fullName = 'Bob Smith'
if (emplopyee.fullName) {
    console.log(emplopyee.fullName)
}

class Grid {
    static origin = {x: 0, y: 0 }
     scale: number 
     constructor(scale:number) {
         this.scale = scale
     }
     claculateDistanceFromOrigin(point: {x:number; y:number}) {
         let xDist = point.x - Grid.origin.x
         let yDist = point.y - Grid.origin.y

         return Math.sqrt(xDist*xDist + yDist*yDist) * this.scale
     }
}

let grid1 = new Grid(2.3)

let grid2 = new Grid(6.2)

console.log(grid1.claculateDistanceFromOrigin({x:4, y:3}))

console.log(grid2.claculateDistanceFromOrigin({x:5, y:9}))

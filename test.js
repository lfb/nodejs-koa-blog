var a = 10;

function f1() {
    b = 20

    function f2() {
        c = 30
        console.log(a) // 10
    }

    f2()
}

f1()

// b和c变量被隐式声明到全局变量了，所以能访问到，这也叫变量提升机制
console.log(b) // 10
console.log(c) // 20

// 但a，b，c也被挂载在window对象（全局作用域）上面了
console.log(window.a) // 10
console.log(window.b) // 20
console.log(window.c) // 30

# js相关

## js中有哪些数据类型，并解释清楚原始数据类型和引用数据类型

js中共有null,undefined,string,number,boolean,object六种数据类型。
原始数据类型:null,undefined, string,number,boolean
引用数据类型:object,array,function

**区别：**

值存储方式不同
原始数据类型：将变量名和值都存储在栈内存中

引用数据类型：将变量名存储在栈内存中，将值存储在堆内存中，并在栈内存中存储值的地址，该地址指向堆内存中的值。

赋值方式不同
当给b赋予另一个a的值

若a值为原始数据类型，直接在栈内存中生成b值，两个变量以后进行值改变不会相互影响

若a值为引用数据类型，赋予b变量的是值地址，通过这个地址，两者指向的其实是堆内存中的同一个值，所以以后a,b任一变量对值进行改变，会直接影响另一个变量的值

> ### 思考：为什么会有栈内存和堆内存之分？**
> 通常与垃圾回收机制有关。为了使程序运行时占用的内存最小。
> 
> 当一个方法执行时，每个方法都会建立自己的内存栈，在这个方法内定义的变量将会逐个放入这块栈内存里，随着方法的执行结束，这个方法的内存栈也将自然销毁了。因此，所有在方法中定义的变量都是放在栈内存中的；
> 
> 当我们在程序中创建一个对象时，这个对象将被保存到运行时数据区中，以便反复利用（因为对象的创建成本通常较大），这个运行时数据区就是堆内存。堆内存中的对象不会随方法的结束而销毁，即使方法结束后，这个对象还可能被另一个引用变量所引用（方法的参数传递时很常见），则这个对象依然不会被销毁，只有当一个对象没有任何引用变量引用它时，系统的垃圾回收机制才会在核实的时候回收它。

## 2.null与undefined的区别？==与===的区别？
null表示"没有对象"，即该处不应该有值。undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义。

null是一个表示"无"的对象，转为数值时为0；undefined是一个表示"无"的原始值，转为数值时为NaN。
```js
  null == undefined true
  null === undefined false
```

## 3.如何判断某一个变量是数组？
```js
arr instanceof Array
arr.constructor === Array
```
`Object.prototype.toString.call(arr) === '[object Array]'` 建议这种 `Object.prototype.toString.call(o).slice(8,-1)`判断一个对象类型

## 4.变量提升、函数名提升问题，哪些情况会有变量、函数名的提升？比如a() function a(){}之类的问题

`function add(){}`这种写法叫做函数声明

`var add=function(){}`这种写法叫做函数表达式

`function(){}`这种是匿名函数
函数声明名称和变量声明名称重复的时候，变量声明优先 
函数声明才会提升，函数表达式是属于变量提升

## 5.作用域的问题？
var没有块级作用域，let与const有。es5常用函数作用域来实现块级作用域。
es5中只有全局作用域和函数作用域，没有块级作用域 利用IIFE(立即调用函数表达式)来实现块级作用域
```js
(function(){
  for(var i =0;i<10;i++){

  }
})()
console.log(i)
undefined
```
es6在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

let实际上为 JavaScript 新增了块级作用域。

const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。

对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。

但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。

## 6.什么是闭包？请手写一个闭包？闭包的原理？
闭包就是能够读取其他函数内部变量的函数。

作用：一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中，不会在f1调用后被自动清除。

使用场景：

* 采用函数引用方式的setTimeout调用
* 将函数关联到对象的实例方法
* 封装相关的功能集

## 7.如何深度复制一个对象？(基本类型+引用类型)
`var newObject = JSON.parse(JSON.stringify(object))`
 object里面有function不行
```js
function deepClone(obj){
    var result;
    var oClass=isClass(obj);
    if(oClass==="Object"){
        result={};
    }else if(oClass==="Array"){
        result=[];
    }else{
        return obj;
    }
    for(var key in obj){
        if(obj.hasOwnProperty(key)){
            var copy=obj[key];
            if(isClass(copy)=="Object" || isClass(copy)=="Array"){
                result[key]=arguments.callee(copy);//递归调用
            }else{
                result[key]=obj[key];
            }
        }
    }
    return result;
}
//判断对象的数据类型
function isClass(o){
    return Object.prototype.toString.call(o).slice(8,-1);
}
```

## map和reduce
```js
["1", "2", "3"].map(parseInt)
[[3,2,1].reduce(Math.pow), [].reduce(Math.pow)]
```
## promise
```js
// 定义
var promise = new Promise(function(resolve, reject) {
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
// 使用
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
//等价于：
promise.then(function(){
  //success
}).catch(function(){
  //failure
})

// 静态方法
Promise.resolve() // 直接返回resolved状态的
Promise.reject()
```
### promise实现ajax
```js
// 定义
const myHttpClient = url => {
  return new Promise((resolve, reject) => {
    let client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();
    function handler() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    }
  });
};
// 使用
myHttpClient('https://www.baidu.com').then(res => {
  console.log(res);
}).catch(error => {
  console.log(error);
});
```
## 闭包
待补充

## 什么是立即执行函数？使用立即执行函数的目的是什么？
常见两种方式：
```js
(function(){...})()
(function(x){

console.log(x);
})(12345)

(function(){...}())
(function(x){

console.log(x);
}(12345))
```

作用 

不破坏污染全局的命名空间，若需要使用，将其用变量传入如
`（function(window){...}(window)）`

## 数组去重
定义一个新数组，并存放原数组的第一个元素，然后将元素组一一和新数组的元素对比，若不同则存放在新数组中

先将原数组排序，在与相邻的进行比较，如果不同则存入新数组。

利用对象属性存在的特性，如果没有该属性则存入新数组。

### 使用es6 set
```js
let arr= [1, 2, 3, 3, 5, 7, 2, 6, 8];
console.log([...new Set(arr)]);
```
## 正则实现trim()功能
```js
function myTrim(str) {
  let reg = /^\s+|\s+$/g;
  return str.replace(reg, "");
}
```

## js实现继承

使用原型继承（既继承了父类的模板，又继承了父类的原型对象。优点是继承了父类的模板，又继承了父类的原型对象，缺点就是父类实例传参，不是子类实例化传参，不符合常规语言的写法）

使用call的方式（继承了父类的模板，不继承了父类的原型对象。优点是方便了子类实例传参，缺点就是不继承了父类的原型对象）

## 手写jquery插件
```js
(function ($) {
    $.fn.myPlugins = function (options) {
      //参数赋值
      options = $.extend(defaults, options);//对象合并
      this.each(function () {
          //执行代码逻辑
      });
    };
})(jQuery);

$(selector).myPlugins({参数});
```
## call apply bind

[参考](https://segmentfault.com/a/1190000014433299)

## 事件流向
1. 冒泡：子节点一层层冒泡到根节点
2. 捕获顺序与冒泡相反
3. addEventListener最后个参数true代表捕获反之代表冒泡
4. 阻止冒泡不停止父节点捕获

## 阻止冒泡阻止默认行为

[参考](https://segmentfault.com/n/1330000016035722#articleHeader17)

## 事件委托
事件委托就是利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件 好处：给重复的节点添加相同操作，减少dom交互，提高性能 实现思路：给父组件添加事件，通过事件冒泡，排查元素是否为指定元素，并进行系列操作
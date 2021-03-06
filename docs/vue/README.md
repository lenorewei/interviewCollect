# vue
## 计算属性（computed）、方法（methods）和侦听属性（watch）的区别与使用场景
### methods VS 计算属性
我们可以将同一函数定义为一个 method 而不是一个计算属性。对于最终的结果，两种方式确实是相同的。然而，不同的是**计算属性是基于它们的依赖进行缓存的**。计算属性只有在它的相关依赖发生改变时才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。相比而言，只要发生重新渲染，method 调用总会执行该函数。总之，重新计算开销很大的话请选计算属性，不希望有缓存的请选methods。
### watch VS 计算属性
当你在模板内使用了复杂逻辑的表达式时，你应当使用计算属性。
侦听属性是一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。 当你有一些数据需要随着其它数据变动而变动时，或者当需要**在数据变化时执行异步或开销较大的操作时**，你可以使用 watch。

## Vue 生命周期的理解

![](https://lenore-1254182071.cossh.myqcloud.com/blog/2018-10-09-090645.jpg)

[如何解释vue的生命周期才能令面试官满意？ - 闰土哥的前端路 - SegmentFault 思否](https://segmentfault.com/a/1190000014376915)

## Vue 双向绑定，为什么不能通过修改下标来通知视图发生变化
并不是说 JS 不能支持响应式数组，没有这种限制，而是一般开发者使用数组与使用对象的方法有区别。数组在 JS 中常被当作栈，队列，集合等数据结构的实现方式，会储存批量的数据以待遍历。并且编译器对对象与数组的优化也有所不同。
所以对数组的处理需要特化出来以提高性能。
Vue 中是通过对 每个键设置 getter/setter 来实现响应式的，开发者使用数组，目的往往是遍历，此时调用 getter 开销太大了，所以 Vue 不在数组每个键上设置，而是在数组上定义 __ob__ ，并且替换了 push 等等能够影响原数组的原型方法。

## 简述 Vue 中的 MVVM 模型
Vue是以数据为驱动的，Vue自身将DOM和数据进行绑定，一旦创建绑定，DOM和数据将保持同步，每当数据发生变化，DOM会跟着变化。
ViewModel是Vue的核心，它是Vue的一个实例。Vue实例是作用在某个HTML元素上的，这个HTML元素可以是body，也可以是某个id所指代的元素。 DOM Listeners和Data Bindings是实现双向绑定的关键。DOM Listeners监听页面所有View层DOM元素的变化，当发生变化，Model层的数据随之变化；Data Bindings监听Model层的数据，当数据发生变化，View层的DOM元素随之变化。

## 单页面路由中 hash 模式和 history 模式区别
### hash模式
hash 出现在 URL 中，但不会被包含在 http 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。
特点：hash虽然在URL中，但不被包括在HTTP请求中；用来指导浏览器动作，hash不会重加载页面。

### history模式
history 利用了 html5 history interface 中新增的 pushState() 和 replaceState() 方法。这两个方法应用于浏览器记录栈，在当前已有的 back、forward、go 基础之上，它们提供了对历史记录修改的功能。只是当它们执行修改时，虽然改变了当前的 URL ，但浏览器不会立即向后端发送请求。

### 原理：
hash 模式的原理是 onhashchange 事件，可以在 window 对象上监听这个事件。 
history：hashchange 只能改变 # 后面的代码片段，history api （pushState、replaceState、go、back、forward） 则给了前端完全的自由，通过在window对象上监听popState()事件。




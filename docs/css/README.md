# css
## 盒子模型
ie盒模型算上border、padding及自身（不算margin），标准的只算上自身窗体的大小 css设置方法如下

```css
/* 标准模型 */
box-sizing:content-box;
 /*IE模型*/
box-sizing:border-box;
```
margin、border、padding、content由外到里

几种获得宽高的方式
```js
dom.style.width/height
```

  这种方式只能取到dom元素内联样式所设置的宽高，也就是说如果该节点的样式是在style标签中或外联的CSS文件中设置的话，通过这种方法是获取不到dom的宽高的。

```js
dom.currentStyle.width/height
```
  这种方式获取的是在页面渲染完成后的结果，就是说不管是哪种方式设置的样式，都能获取到。但这种方式只有IE浏览器支持。

```js
window.getComputedStyle(dom).width/height
```
  这种方式的原理和2是一样的，这个可以兼容更多的浏览器，通用性好一些。

```js
dom.getBoundingClientRect().width/height
```
  这种方式是根据元素在视窗中的绝对位置来获取宽高的

```js
dom.offsetWidth/offsetHeight
```
  这个就没什么好说的了，最常用的，也是兼容最好的。
`clientheight`：内容的可视区域，不包含border。
`clientheight=padding+height`-横向滚动轴高度。

`offsetheight`：它包含padding、border、横向滚动轴高度。 
`offsetheight=padding+height+border+横向滚动轴高度`

`scrollheight`：可滚动高度，就是将滚动框拉直，不再滚动的高度，这个很好理解。scrollHeight通常用在iframe自适应内容高度的情况。

## 边距重叠解决方案(BFC) BFC原理
BFC 即 Block Formatting Contexts (块级格式化上下文)

具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。

通俗一点来讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。

只要元素满足下面任一条件即可触发 BFC 特性：
```
body 根元素
浮动元素：float 除 none 以外的值
绝对定位元素：position (absolute、fixed)
display 为 inline-block、table-cells、flex
overflow 除了 visible 以外的值 (hidden、auto、scroll)
```
### BFC特性及应用

同一个 BFC 下外边距会发生折叠
```html
<head>
div{
    width: 100px;
    height: 100px;
    background: lightblue;
    margin: 100px;
}
</head>
<body>
    <div></div>
    <div></div>
</body>
```
从效果上看，因为两个 div 元素都处于同一个 BFC 容器下 (这里指 body 元素) 所以第一个 div 的下边距和第二个 div 的上边距发生了重叠，所以两个盒子之间距离只有 100px，而不是 200px。

首先这不是 CSS 的 bug，我们可以理解为一种规范，如果想要避免外边距的重叠，可以将其放在不同的 BFC 容器中。
```html
// style
.container {
    overflow: hidden;
}
p {
    width: 100px;
    height: 100px;
    background: lightblue;
    margin: 100px;
}

<div class="container">
    <p></p>
</div>
<div class="container">
    <p></p>
</div>
```
这时候，两个盒子边距就变成了 200px

BFC 可以包含浮动的元素（清除浮动）
我们都知道，浮动的元素会脱离普通文档流，来看下下面一个例子
```
<div style="border: 1px solid #000;">
    <div style="width: 100px;height: 100px;background: #eee;float: left;"></div>
</div>
```
由于容器内元素浮动，脱离了文档流，所以容器只剩下 2px 的边距高度。如果使触发容器的 BFC，那么容器将会包裹着浮动元素。(也就是我们常见的如何清除浮动，撑开父组件高宽)
```
<div style="border: 1px solid #000;overflow: hidden">
    <div style="width: 100px;height: 100px;background: #eee;float: left;"></div>
</div>
```
BFC 可以阻止元素被浮动元素覆盖
先来看一个文字环绕效果：
```
<div style="height: 100px;width: 100px;float: left;background: lightblue">我是一个左浮动的元素</div>
<div style="width: 200px; height: 200px;background: #eee">我是一个没有设置浮动, 
也没有触发 BFC 元素, width: 200px; height:200px; background: #eee;</div>
```
这时候其实第二个元素有部分被浮动元素所覆盖，(但是文本信息不会被浮动元素所覆盖) 如果想避免元素被覆盖，可触第二个元素的 BFC 特性，在第二个元素中加入 `overflow: hidden`.

这个方法可以用来实现两列自适应布局，效果不错，这时候左边的宽度固定，右边的内容自适应宽度(去掉上面右边内容的宽度)。

## 居中方法
水平居中
针对inline, 内联块inline-block, 内联表inline-table, inline-flex元素及img,span,button等元素
```
.text_div{
    text-align:center;
}
```
不定宽块状元素居中
```
.text_div{
    margin:0 auto;//且需要设置父级宽度
}
```
通过给父元素设置 float，然后给父元素设置 position:relative 和 left:50%，子元素设置 position:relative 和 left: -50% 来实现水平居中。(不建议，语意不明确)
```
.wrap{
    float:left;
    position:relative;
    left:50%;
    clear:both;
}
.wrap-center{
    left:-50%;
}
```
## 垂直居中
单行内联(inline-)元素垂直居中 
通过设置内联元素的高度(height)和行高(line-height)相等，从而使元素垂直居中。
```
.text_div{
    height: 120px;
    line-height: 120px;
}
```
利用表布局
```
.father {
    display: table;
}
.children {
    display: table-cell;
    vertical-align: middle;
     text-align: center; 
}
```
flex布局
```
.center-flex {
    display: flex;
    flex-direction: column;//上下排列
    justify-content: center;
}
```
绝对布局方式
已知高度
```
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  height: 100px;
  margin-top: -50px; 
}
```
未知高度
```
.parent {
    position: relative;
}
.child {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
```
## 水平垂直居中
[css水平垂直n种方式](https://juejin.im/post/5b9a4477f265da0ad82bf921?utm_source=gold_browser_extension)

## css优先级确定

!important>id>class

内敛样式>当前文件样式>外部样式

## 如何清除浮动
clear清除浮动（添加空div法）在浮动元素下方添加空div,并给该元素写css样式： {clear:both;height:0;overflow:hidden;}

给浮动元素父级设置高度

父级同时浮动（需要给父级同级元素添加浮动）

父级设置成inline-block，其margin: 0 auto居中方式失效

给父级添加overflow:hidden 清除浮动方法

万能清除法 after伪类 清浮动（现在主流方法，推荐使用）

## css画三角形
```
{
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-top: 50px solid transparent;
    border-bottom: 50px solid blue;
    background: white;
}
```

## link与@import区别

1. link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；
2. @import属于CSS范畴，只能加载CSS。
3. link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。
4. link无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。
5. link支持使用Javascript控制DOM去改变样式；而@import不支持。
## animation和transition区别
[animation和transition区别](https://www.jianshu.com/p/3befa0f2fa02)

## flex专栏
[教程](https://www.jianshu.com/p/3befa0f2fa02)

## 浏览器兼容性
可以把浏览器分为3类：IE6 ；IE7和遨游；其他（IE8 chrome ff safari opera等）

◆IE6认识的hacker 是下划线_ 和星号 *

◆IE7 遨游认识的hacker是星号 *

[最全面的浏览器兼容问题](https://blog.csdn.net/weixin_38536027/article/details/79375411)

## css层叠
[资料](https://juejin.im/post/5ba4efe36fb9a05cf52ac192?utm_source=gold_browser_extension)
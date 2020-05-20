flex已经出来很久了，一直没怎么去研究

目前使用flex实现如下效果

目前发现fieldset元素是设置flex设置无效。
https://stackoverflow.com/questions/28078681/why-cant-fieldset-be-flex-containers

水平等高

水平自动响应宽度（不固定宽度+自适应宽度）


使用display 属性 + position属性 + float属性是很难实现

flex-direction的意义：
```
<div class="box">
<div class="box1"></div>
<div class="box1"></div>
</div>
```

对应这样的结构，都是块状那么
.box { flex-direction:column }效果是一样的，这样就没有任何意义，这个设置的意义在于，可以将子类全部变为block，
也就是box1不管是什么元素可以统一设置为block元素

(默认)
.box { flex-direction:row}统一设置为inline-block元素，但是要比inline-block元素没有间隙

同时提供反方向的布局

flex-wrap

这个属性必须在flex-direction:row才有效，用于控制是否换行

默认是nowrap

在内部容器设置了width的时候，子容器的宽度会固定到框内，不会超出，如果没有设置width，那么子容器的撑出到框外,
当设置width，且子宽度和要大于框的时候，子宽度会更加内容的宽度来平分宽度，直到撑到子宽度的和；

那么利用这个可以水平自动响应宽度（不固定宽度+自适应宽度）

子宽度和为100%；那么如果有一方宽度小了，会自动挤压空闲的宽度


如align-items属性定义项目在交叉轴上如何对齐。这种父类容器对子类容器的约束是整体的约束，那么如何调整单个元素的布局方式

可以对子容器设置  align-self: auto | flex-start | flex-end | center | baseline | stretch;

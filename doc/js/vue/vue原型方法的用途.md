```
$delete: ƒ del(target, key)
$destroy: ƒ ()
$emit: ƒ (event)
$forceUpdate: ƒ ()
$inspect: ƒ ()
$mount: ƒ ( el, hydrating )
$nextTick: ƒ (fn)
$off: ƒ (event, fn)
$on: ƒ (event, fn)
$once: ƒ (event, fn)
$set: ƒ (target, key, val)
$watch: ƒ ( expOrFn, cb, options )
__patch__: ƒ patch(oldVnode, vnode, hydrating, removeOnly)
_b: ƒ bindObjectProps( data, tag, value, asProp, isSync )
_d: ƒ bindDynamicKeys(baseObj, values)
_e: ƒ (text)
_f: ƒ resolveFilter(id)
_g: ƒ bindObjectListeners(data, value)
_i: ƒ looseIndexOf(arr, val)
_init: ƒ (options)
_k: ƒ checkKeyCodes( eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName )
_l: ƒ renderList( val, render )
_m: ƒ renderStatic( index, isInFor )
_n: ƒ toNumber(val)
_o: ƒ markOnce( tree, index, key )
_p: ƒ prependModifier(value, symbol)
_q: ƒ looseEqual(a, b)
_render: ƒ ()
_s: ƒ toString(val)
_t: ƒ renderSlot( name, fallback, props, bindObject )
_u: ƒ resolveScopedSlots( fns, // see flow/vnode res, // the following are added in 2.6 hasDynamicKeys, contentHashKey )
_update: ƒ (vnode, hydrating)
_v: ƒ createTextVNode(val)
```

https://www.cnblogs.com/dotnet261010/p/10223632.html  
$delete: ƒ del(target, key)  
$set: ƒ (target, key, val)  

$set重要观点
如果在实例创建之后添加新的属性到实例上，不会触发视图更新。
但是当其他已有属性变化，视图会更新，而且会更新之前新添加的属性
所以这里就容易触发一个bug就是很容易误以为新属性变化会导致视图更新

$delete

```
delete target[key];
    if (!ob) {
      return
    }
    // 核心就是在删除后通知了依赖更新
    ob.dep.notify();
```


$destroy
$remove
https://segmentfault.com/q/1010000011521940
https://ask.csdn.net/questions/274528
https://blog.csdn.net/zjh1002492540/article/details/79603584

$destroy只是完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。并不能清除已有的页面上的DOM，
remove 只是会清除掉这个实例渲染到页面上的dom节点，绑定的实例并没有清除


$emit
1.父组件可以使用 props 把数据传给子组件。
1.子组件可以使用 $emit 触发父组件的自定义事件。
$off
$on
$once

$forceUpdate
http://www.qiutianaimeili.com/html/page/2019/03/7802qotr1x9.html
vue强制更新$forceUpdate()
调用强制更新方法this.$forceUpdate()会更新视图和数据，触发updated生命周期。

$inspect
是vue的debug工具，具体用法未知

$nextTick
https://www.cnblogs.com/jin-zhe/p/9985436.html
this.$nextTick()将回调延迟到下次 DOM 更新循环之后执行
如
而在created()里使用this.$nextTick()可以等待dom生成以后再来获取dom对象

$watch
提供了一种分离式的写法

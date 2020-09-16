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

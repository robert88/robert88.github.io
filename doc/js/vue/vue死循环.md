TypeError: Converting circular structure to JSON

vue在解析模板的适合，会对模板变量进行toString

```
  /**
   * Convert a value to a string that is actually rendered.
   */
  function toString (val) {
    return val == null
      ? ''
      : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
        ? JSON.stringify(val, null, 2)
        : String(val)
  }
```

可以看到对象会被stringfiy
那么哪些对象不能stringify呢
vue对象
window对象

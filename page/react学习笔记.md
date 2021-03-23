## 搭建环境

  1、安装
 ```
 npm i yarn -g
 npm i create-react-app -g
 yarn create react-app antd-demo-ts --template typescript
 yarn add antd
 ```
 
 2、而外添加工程打包项( react-app-rewired(https://github.com/timarney/react-app-rewired) 和 customize-cra(https://github.com/arackaf/customize-cra) 也是可行的)
 
  ①添加less
```
yarn add @craco/craco
yarn add  craco-less
```


```
/* package.json */
"scripts": {
-   "start": "react-scripts start",
-   "build": "react-scripts build",
-   "test": "react-scripts test",
+   "start": "craco start",
+   "build": "craco build",
+   "test": "craco test",
}

```

```
/* craco.config.js */
module.exports = {
    plugins:[
        {
            plugin:CracoLessPlugin,
            options:{
                lessLoaderOptions:{
                    lessOptions:{
                        modifyVals:{},
                        javascriptEnabled:true
                    }
                }
            }
        }
    ]
}
```

## 使用

 1、tsx中使用
```
import { Button } from 'antd';
```

```
// less-load
//https://www.npmjs.com/package/less-loader
// the loader will try to resolve @import inside node_modules. Just prepend them with a ~ which tells webpack to look up the modules.


@import '~antd/dist/antd.css';
```

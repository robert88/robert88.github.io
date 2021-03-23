## 搭建环境

  1、安装
 ```
 npm i yarn -g
 npm i create-react-app -g
 yarn create react-app antd-demo-ts --template typescript
 yarn add antd
 ```
 
 2、而外添加工程打包项
 
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

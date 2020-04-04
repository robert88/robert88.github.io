下载地址 https://ibotpeaches.github.io/Apktool/install/
需要环境java sdk

下载之后
java -v

如果可以得到版本号，那么就可以开始下面的代码

下载的apktool是带版本号的
我们可以统一改名为apktool.jar

java -jar apktool.jar apk名.apk

会在本地生成一个和apk同名的文件夹

java -jar apktool.jar apk名 b -out apk新名.apk

打包之后的apk不带签名

二、怎么给apk带上签名

keytool -genkey -alias abc.keystore -keyalg RSA -validity 20000 -keystore abc.keystore

得到一个rsa加密的abc.keystore文件

jarsigner -verbose -keystore abc.keystore -signedjar rap.apk Auto.js.apk abc.keystore

https://blog.csdn.net/qq_25506203/article/details/80899521

编译出来apk闪退

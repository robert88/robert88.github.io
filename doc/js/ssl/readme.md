https
需要带上ssl加密才可以运行起来

如何创建ssl证书呢

有pfx文件
有cer文件
有key文件

keytool生成公钥、私钥

https://github.com/FiloSottile/mkcert/releases/download/mkcert-v1.4.1-windows-amd64.exe
https://github.com/FiloSottile/mkcert/releases/download/mkcert-v1.4.1-linux-amd64

mkcert -key-file example.key -cert-file example.crt example.com *.example.com

 {
      key: fs.readFileSync(path.join(certPath, domain + ".key")),
      cert: fs.readFileSync(path.join(certPath, domain + ".crt"))
    }

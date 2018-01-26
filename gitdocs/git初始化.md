# Git 初始化

1. 配置 Git 当前用户的姓名和邮件地址
```sh
git config --global user.name "Your user name"
git config --global user.email "example@xxx.com"
```

2. 设置 Git 别名
```sh
git config --global alias.st status
git config --global alias.ci commit
git config --global alias.co checkout
git config --global alias.br branch
```
3. 在 Git 命令输出中开启颜色显示
```sh
git config --global color.ui true
```

4. 初始化版本库
```sh
git init
```

5. Git 版本库所在的目录称为工作区。将文件添加到工作区的命令是
```sh
git add fileName/folderName
```

6. 为添加到工作区的文件提供提交说明，此操作会自动打开一个编辑器，在其中输入提交说明即可
```sh
git ci
```
或者使用下面这种方式提供提交说明：
```sh
git ci -m "提交说明"
```


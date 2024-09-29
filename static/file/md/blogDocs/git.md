## git创建新分支


### 1.创建本地分支

git branch 分支名，例如：git branch 2.0.1.20120806
注：2.0.1.20120806是分支名称，可以随便定义。


### 2.切换本地分支

git checkout 分支名，例如从master切换到分支：git checkout 2.0.1.20120806


### 3.远程分支就是本地分支push到服务器上。比如master就是一个最典型的远程分支（默认）。

```cmd
git push origin 2.0.1.20120806
```

### 4.远程分支和本地分支需要区分好，所以，在从服务器上拉取特定分支的时候，需要指定远程分支的名字。

```cmd
git checkout --track origin/2.0.1.20120806
```
注意该命令由于带有--track参数，所以要求git1.6.4以上！这样git会自动切换到分支。


### 5.提交分支数据到远程服务器

```cmd
git push origin <local_branch_name>:<remote_branch_name>
```


例如：

```cmd
git push origin 2.0.1.20120806:2.0.1.20120806
```

一般当前如果不在该分支时，使用这种方式提交。如果当前在 2.0.1.20120806 分支下，也可以直接提交

```cmd
git push
```

### 6.删除远程分支

```cmd
git push origin :develop
```


-----------------------------------------------------------



### 1,从已有的分支创建新的分支(如从master分支),创建一个dev分支


```cmd
Git checkout -b dev
```

### 2,创建完可以查看一下,分支已经切换到dev

```cmd
git branch

    * dev

    master
```

### 3,提交该分支到远程仓库

```cmd
git push origin dev
```


### 4,测试从远程获取dev

```cmd
git pull origin dev
```

或者：

如果用命令行，运行 git fetch，可以将远程分支信息获取到本地，再运行 git checkout -b local-branchname origin/remote_branchname  就可以将远程分支映射到本地命名为local-branchname  的一分支


### 5,我觉得现在重要的就是设置git push,pull默认的提交获取分支,这样就很方便的使用git push 提交信息或git pull获取信息


```cmd
git branch --set-upstream-to=origin/dev
```

取消对master的跟踪

```
git branch --unset-upstream master
```


### 6,现在随便修改一下工程文件的内容,然后git commit ,git push,之后就可以直接提交到远程的dev分支中,而不会是master

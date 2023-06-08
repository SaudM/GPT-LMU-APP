进入docker 镜像服务器：
```
//查看镜像名称
1. docker ps 

//更具名称进入镜像服务器
2.docker exec -it pg bash

//登录pg 数据库，此处root 为用户名， fastgpt 为数据库，请更换为自己的
3.psql -v ON_ERROR_STOP=1 --username root --dbname fastgpt 

4. 执行更新3.8.2 版本需要执行的命令，再次之前，需要先更新到 3.8.1。
ALTER TABLE modeldata ADD COLUMN source VARCHAR(100);

exit;

```
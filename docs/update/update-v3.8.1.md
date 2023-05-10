进入docker 镜像服务器：
```
//查看镜像名称
1. docker ps 

//更具名称进入镜像服务器
2.docker exec -it pg bash

//登录pg 数据库，此处root 用户和 fastgpt 数据库更换为自己的
3.psql -v ON_ERROR_STOP=1 --username root --dbname fastgpt 

4. 执行更新3.8.1版本需要执行的命令，其他时候执行命令可能不同。
CREATE INDEX IF NOT EXISTS modelData_userId_index ON modelData USING HASH (user_id);

CREATE INDEX IF NOT EXISTS modelData_kbId_index ON modelData USING HASH (kb_id);

CREATE INDEX IF NOT EXISTS idx_model_data_md5_q_a_user_id_kb_id ON modelData (md5(q), md5(a), user_id, kb_id);

CREATE INDEX IF NOT EXISTS vector_index ON modelData USING ivfflat (vector vector_cosine_ops) WITH (lists = 1000);

exit;

```
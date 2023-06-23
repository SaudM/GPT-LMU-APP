# 初始化 初始化 mongo 的 share.intro 字段
1. 首先，需要找到正在运行的MongoDB容器的名称或ID。打开终端，输入以下命令：

```bash
docker ps
```

这将显示所有正在运行的Docker容器及其详细信息。在这里，找到你的MongoDB容器的名字或ID，应该是`mongo`。

2. 接下来，你需要进入这个MongoDB容器的shell环境。在终端中输入以下命令，其中`mongo`是你的MongoDB容器的名字或ID：

```bash
docker exec -it mongo bash
```

现在，你已经在MongoDB容器的shell环境中了。

3. 在容器的shell环境中，输入以下命令来启动MongoDB shell：

```bash
mongo
```
> 如果在执行 mongo 出错，提示为找到mongo，可以执行 exit退出，然后执行 `docker exec -it mongo mongosh`，然后继续后面步骤

4. 首先，在MongoDB shell中，您需要切换到admin数据库:
```bash
use admin

```

5. 然后，您需要使用db.auth()函数来进行认证，这需要提供用户名和密码。例如：
```bash
db.auth('username', 'password')

```

6. 连接到你需要进行操作的数据库，你的数据库名为`fastgpt-mongodb`：

```bash
use fastgpt-mongodb
```

7. 在MongoDB shell中，你可以运行你的脚本了。将下面的脚本复制并粘贴到shell中：

```javascript
db.models.find({ "share.intro": { $exists: true } }).forEach(
    function (elem) {
        db.models.updateOne(
            {
                _id: elem._id
            },
            {
                $set: {
                    intro: elem.share.intro
                }
            }
        );
    }
);
```

按回车键，你的脚本将开始运行。这段脚本将遍历`models`集合中所有包含`share.intro`字段的文档，并将`share.intro`字段的值复制到`intro`字段。

8. 完成后，你可以使用`exit`命令退出MongoDB shell，然后再次使用`exit`命令退出容器的shell环境。
1. 该版本增加的后台管理系统，所以两个系统的环境需要分开配置
2. 将admin 和 client 目录下的.env.template 修改为 .env.local
3. 如果你是升级的版本根目录的配置 .env.local 完成两个系统的环境变量配置
4. 在client 目录下输入`pnpm dev ` 启动服务
5. 在admin 目录下输入`pnpm i` 安装，然后在执行 `pnpm dev` 启动后台

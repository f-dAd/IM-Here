部署：

1.分别进入客户端和服务器目录下，cmd运行安装命令npm install (或 cnpm install)。

2.进入IMHere_server\conf目录下，找到imhere.sql，执行它；找到db.js，修改mysql数据库信息。

3.分别运行服务端(node app.js)和客户端(npm run serve)，开始测试。

说明：

1.目前前端页面只展示了登录、websocket连接功能。

2.其余功能(增删改查)可以通过调用api进行测试。


### 将包变成全局的

- 先创建可执行的脚本 #! /usr/bin/env node
- 配制 package.json 中的 bin 字段
- npm link 连接到本地环境(默认以 name) 更新的时候 npm link --force

- link 相当于将本地模块连接到 npm 全局环境中 以后就可以直接使用了

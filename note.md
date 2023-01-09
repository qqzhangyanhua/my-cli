### 将包变成全局的

- 先创建可执行的脚本 #! /usr/bin/env node
- 配制 package.json 中的 bin 字段
- npm link 连接到本地环境(默认以 name) 更新的时候 npm link --force

- link 相当于将本地模块连接到 npm 全局环境中 以后就可以直接使用了
- github 建个组织,然后根据组织获取 api (详细再研究)

推送 tag
git push --tags

处于想要添加 tag 的分支，为其打 tag
git tag -a tag_name -m "tag 的描述语"
通过 tag 的名字，将 tag 推送到远程
git push -u origin tag_name

获取当前目录下的文件
https://api.github.com/repos/typecho-fans/plugins/contents/

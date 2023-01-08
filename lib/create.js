const path = require("path");
const fs = require("fs-extra");
const Inquirer = require("inquirer");
const Creator = require("./Creator");
module.exports = async function (projectName, options) {
  console.log("name", projectName);
  console.log("args", options);

  const cwd = process.cwd(); //获取当前命令执行时候的文件夹地址
  console.log("cwd", cwd);
  const target = path.join(cwd, projectName); //拼接出一个绝对路径
  if (fs.existsSync(target)) {
    //目录存在
    if (options.force) {
      //强制创建 需要先删除之前的
      await fs.remove(target);
    } else {
      //提示用户是否需要强制创建
      let { action } = await Inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: "当前路径已经存在是否覆盖",
          choices: [
            { name: "覆盖", value: true },
            { name: "取消", value: false },
          ],
        },
      ]);
      if (!action) {
        return;
      } else {
        console.log(`\r\nRemoving...`);
        await fs.remove(target);
      }
    }
  }

  //创建项目
  const creator = new Creator(projectName, target);
  creator.create();
};

const { fetchRepoList, fetchTagList } = require("./request");
const Inquirer = require("inquirer");
const ora = require("ora");
const downloadGitRepo = require("download-git-repo"); //不支持promise的api进行promise化
const util = require("util");
const path = require("path");
async function wrapLoading(fn, msg, ...args) {
  //封装loading效果
  const spinner = ora(msg);
  spinner.start();
  try {
    const result = await fn(...args);
    spinner.succeed();
    return result;
  } catch (error) {
    spinner.fail("拉取失败,网络故障或者模板库异常");
  }
}
class Creator {
  constructor(projectName, target) {
    this.projectName = projectName;
    this.target = target;
    //将这个方法转化成pending状态的promise
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }
  async fetchRepo() {
    let repos = await wrapLoading(fetchRepoList, "waiting fetch template");
    if (!repos) {
      return;
    }
    repos = repos.map((item) => item.name);
    let { repo } = await Inquirer.prompt([
      {
        name: "repo",
        type: "list",
        message: "请选择一个模板",
        choices: repos,
      },
    ]);
    return repo;
  }
  async fetchTag(repo) {
    let tags = await wrapLoading(fetchTagList, "等待拉去模板tag...", repo);
    if (!tags) return;
    tags = tags.map((item) => item.name);
    let { tag } = await Inquirer.prompt([
      {
        name: "tag",
        type: "list",
        message: "请选择一个版本",
        choices: tags,
      },
    ]);
    console.log("tags=====", tags);
  }
  async download(repo, tag) {
    // 需要拼接出下载路径
    //zyh-temp/vue-template#master  拼接的地址
    let requestUrl = `zyh-temp/${repo}${tag ? "#" + tag : ""}`;

    // 把资源下载到某个路径上
    await this.downloadGitRepo(
      requestUrl,
      path.resolve(process.cwd(), this.projectName)
    );
    return this.target;
  }
  async create() {
    //开始创建
    console.log("开始创建项目:", this.projectName, this.target);
    //真实开始创建了
    //1.拉去模板
    let repo = await this.fetchRepo();
    console.log("repos", repo);

    //2.找到对应的版本号
    let tag = await this.fetchTag(repo);
    //3 下载
    let downloadUrl = await this.download(repo, tag);
  }
}
module.exports = Creator;

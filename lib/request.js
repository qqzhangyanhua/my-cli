//通过axios拉取结果
const axios = require("axios");

axios.interceptors.response.use((res) => {
  return res.data;
});
async function fetchRepoList() {
  //可以通过配制文件
  return axios.get("https://api.github.com/orgs/zyh-temp/repos");
}

async function fetchTagList(repo) {
  return axios.get(`https://api.github.com/repos/zyh-temp/${repo}/tags`);
}
module.exports = {
  fetchRepoList,
  fetchTagList,
};

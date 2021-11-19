import { Promise } from "core-js";
import { GetCategoryAll, GetList } from "@/api/news";

const actions = {
  // 获取分类列表
  getInfoCategory(content, requestData) {
    return new Promise((resolve, reject) => {
      GetCategoryAll({})
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 获取信息列表
  getInfoList(content, requestData) {
    return new Promise((resolve, reject) => {
      GetList(requestData)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
export default {
  namespaced: true,
  actions,
};

import { Promise } from "core-js";
import { GetCategoryAll, GetList, DeleteInfo } from "@/api/news";

const actions = {
  // 分类获取
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
  // 信息获取
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
  // 信息删除
  deleteInfo(content, requestData) {
    return new Promise((resolve, reject) => {
      // id: "1,2,3" 或  id: "1"
      DeleteInfo(requestData)
        .then((response) => {
          resolve(response);
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

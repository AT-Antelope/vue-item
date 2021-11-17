import { Promise } from "core-js";
import { GetCategoryAll } from "@/api/news";

const actions = {
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
};
export default {
  namespaced: true,
  actions,
};

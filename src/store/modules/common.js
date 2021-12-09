import { Promise } from "core-js";
import {
  GetCategoryAll,
  GetList,
  DeleteInfo,
  EditInfo,
  QiniuToken,
} from "@/api/news";
import { LoadTableData, CityPicker, UserAdd, UserDelete } from "@/api/user";
const state = {
  qiniuUrl: "http://r35ov7o36.hn-bkt.clouddn.com/",
};

const getters = {
  qiniuUrl: (state) => state.qiniuUrl,
};

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
  // 信息修改
  editInfo(content, requestData) {
    return new Promise((resolve, reject) => {
      EditInfo(requestData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 七牛云Token获取
  qiniuToken(content, requestData) {
    return new Promise((resolve, reject) => {
      QiniuToken(requestData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 获取用户列表
  loadTableData(content, requestData) {
    return new Promise((resolve, reject) => {
      LoadTableData(requestData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 省市地区获取
  cityPicker(content, requestData) {
    return new Promise((resolve, reject) => {
      CityPicker(requestData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 用户添加
  userAdd(content, requestData) {
    return new Promise((resolve, reject) => {
      UserAdd(requestData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  userDelete(content, requestData) {
    return new Promise((resolve, reject) => {
      UserDelete(requestData)
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
  state,
  getters,
  actions,
};

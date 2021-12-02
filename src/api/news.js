import service from "@/utils/request";
/**
 * 信息获取
 * getList
 * {
    categoryId: 1,
    title: "vue3",
    id: 1,
    pageNumber: 1,
    pageSize: 10
}
 */
export function GetList(data) {
  return service.request({
    method: "post",
    url: "/news/getList/",
    data,
  });
}

/**
 * 信息新增
 * add
 * {
    "category_id": "18"
    "content": "<p>Vue3.js真的很不错</p>"
    "create_date": "2021-06-25 16:39:38"
    "image_url": "http://qv18xxim7.hn-bkt.clouddn.com/1-7.jpg"
    "status": "1"
    "title": "Vue3.js真的很不错"
}
 */
export function AddInfo(data) {
  return service.request({
    method: "post",
    url: "/news/add/",
    data,
  });
}

/**
 * 信息修改
 * {
        "id": 20,
        "categoryId": "18",
        "content": "<p>Vue3.js真的很不错</p>",
        "create_date": "2021-06-25 16:39:38",
        "image_url": "http://qv18xxim7.hn-bkt.clouddn.com/1-7.jpg",
        "status": "1",
        "title": "Vue3.js真的很不错",
    }
 */
export function EditInfo(data) {
  return service.request({
    method: "post",
    url: "/news/editInfo/",
    data,
  });
}

/**
 * 信息删除
 * {
     id: "1,2,3" 或  id: "1"
     实际为
     id:[1,2,3]
    }
 */
export function DeleteInfo(data) {
  return service.request({
    method: "post",
    url: "/news/deleteInfo/",
    data,
  });
}

/**
 * 分类编辑
 * edit
 *  {
        "categoryName":"vue3.0",
        "id":"18"
    }
 */
export function EditCategory(data) {
  return service.request({
    method: "post",
    url: "/news/editCategory/",
    data,
    // data: data，(key:value)，key和value同名的情况下，写成单一个即可
  });
}

/**
 * 分类删除
 *  {
        "categoryId":"244"
    }
 */
export function DeleteCategory(data) {
  return service.request({
    method: "post",
    url: "/news/deleteCategory/",
    data,
    // data: data，(key:value)，key和value同名的情况下，写成单一个即可
  });
}

/**
 * 分类添加
 *  {
        "categoryName":"人工智能"
    }
 */
export function AddFirstCategory(data) {
  return service.request({
    method: "post",
    url: "/news/addFirstCategory/",
    data,
    // data: data，(key:value)，key和value同名的情况下，写成单一个即可
  });
}

/**
 * 分类获取_全部(包含子级)
 * {}
 */
export function GetCategoryAll(data) {
  return service.request({
    method: "post",
    url: "/news/getCategoryAll/",
    data,
    // data: data，(key:value)，key和value同名的情况下，写成单一个即可
  });
}

/**
 * 分类添加_子级
 *{
        "categoryName":"智能家居",
        "parentId":"243"
    }
 */
export function AddChildrenCategory(data) {
  return service.request({
    method: "post",
    url: "/news/addChildrenCategory/",
    data,
  });
}

/**
 * 七牛云token获取
 * 秘钥accessKey，秘钥secretKey，空间名称buckety
 * {
    "ak":"woophX7ugZ1c1KJ15hfIITG04C6viIzww4guqo7E",
    "sk":"FgTvVc5e2buBLuWjjtKF-qlcc2CzPBBaV5n7B-XD",
    "buckety":"vue-item"
    }
 */
export function QiniuToken(data) {
  return service.request({
    method: "post",
    url: "/uploadImgToken/",
    data,
  });
}

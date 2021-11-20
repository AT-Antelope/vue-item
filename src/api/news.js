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
 * 信息编辑
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
 * 分类获取
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

import service from "@/utils/request";
/**
 * 列表
 * list
 */

/**
 * 新增
 * add
 */

/**
 * 编辑
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
 * 删除
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
 * 获取分类
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

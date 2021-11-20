<template>
  <div id="category">
    <el-button type="danger" @click="addFirst({ type: 'category_first_add' })"
      >添加一级分类</el-button
    >
    <hr class="hr-e9e9e9" />
    <div class="category-outter">
      <el-row :gutter="38">
        <el-col :span="8">
          <div class="category-wrap">
            <div
              class="category-item"
              v-for="firstItem in categoryData.item"
              :key="firstItem.id"
            >
              <!-- 一级分类 -->
              <h4>
                <svg-icon iconID="plus" />
                {{ firstItem.category_name }}
                <div class="button-group">
                  <el-button
                    type="danger"
                    size="mini"
                    round
                    @click="
                      editCategory({ data: firstItem, type: 'category_first_edit' })
                    "
                    >编辑</el-button
                  >
                  <el-button type="success" size="mini" round>添加子级</el-button>
                  <el-button size="mini" round @click="deleteCategoryFirst(firstItem.id)"
                    >删除</el-button
                  >
                </div>
              </h4>
              <!-- 子级分类 -->
              <ul>
                <li v-for="childrenItem in firstItem.children" :key="childrenItem.id">
                  {{ childrenItem.category_name }}
                  <div class="button-group">
                    <el-button type="danger" size="mini" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级分类编辑</h4>
          <el-form
            ref="formCategory"
            :model="formLabelAlign"
            label-width="142px"
            class="form-wrap"
          >
            <el-form-item label="一级分类名称：" v-if="category_first_input">
              <el-input
                v-model="formLabelAlign.categoryName"
                :disabled="category_first_input_disabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称：" v-if="category_second_input">
              <el-input
                v-model="formLabelAlign.categoryNameSecond"
                :disabled="category_children_input_disabled"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                @click="commit"
                :loading="submit_button_loading"
                :disabled="category_button_disabled"
                >确定</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { ref, reactive, onMounted, watch } from "@vue/composition-api";
import { global } from "@/utils/global";
import {
  AddFirstCategory,
  GetCategoryAll,
  EditCategory,
  DeleteCategory,
} from "@/api/news";
export default {
  name: "category",
  setup(props, { root, refs }) {
    const { Comfirm, categoryItem, getInfoCategory } = global();
    /**
     * data
     */
    const submit_button_type = ref("");
    // 右侧一二级分类菜单输入框的显示切换
    const category_first_input = ref(true);
    const category_second_input = ref(true);
    const submit_button_loading = ref(false);
    const category_first_input_disabled = ref(true);
    const category_children_input_disabled = ref(true);
    const category_button_disabled = ref(true);
    // 储存删除的ID暂存值
    const deleteID = ref("");

    /**
     * reactive
     */
    // 表单数据
    const categoryData = reactive({
      item: [],
      // 用于储存当前对象
      current: [],
    });
    // 右侧一二级菜单输入框值
    const formLabelAlign = reactive({
      categoryName: "",
      categoryNameSecond: "",
    });

    /**
     * methods
     */
    // 添加一级分类按钮
    const addFirst = (param) => {
      category_first_input.value = true;
      category_second_input.value = false;
      category_first_input_disabled.value = false;
      category_button_disabled.value = false;
      formLabelAlign.categoryName = "";

      // 暂存提交按钮的类型
      submit_button_type.value = param.type;
    };

    // 确定按钮(提交)
    const commit = () => {
      // 输入验证
      if (!formLabelAlign.categoryName) {
        root.$message({
          type: "error",
          message: "分类名称不能为空!",
        });
        return false;
      }
      if (submit_button_type.value == "category_first_add") {
        AddFirstCategoryFn();
      }
      if (submit_button_type.value == "category_first_edit") {
        EditCategoryFn();
      }
    };
    // 确定按钮_增加一级分类
    const AddFirstCategoryFn = () => {
      // 修改按钮状态为加载中
      submit_button_loading.value = true;
      let data = { categoryName: formLabelAlign.categoryName };
      AddFirstCategory(data)
        .then((response) => {
          let data = response.data;
          if (data.resCode === 0) {
            root.$message({
              type: "success",
              message: data.message,
            });
            /**
             *添加后更新data
             * 两种方法:
             * 1.请求获取分类接口，缺点:浪费资源
             * 2.直接push请求接口后返回的数据
             */
            categoryData.item.push(data.data); // push，添加到数组末尾
          }
          // 修改按钮状态为可点击，无论是否添加成功
          submit_button_loading.value = false;
          // 重置表单
          formLabelAlign.categoryName = "";
          formLabelAlign.categoryNameSecond = "";
        })
        .catch((error) => {
          submit_button_loading.value = false;
          formLabelAlign.categoryName = "";
          formLabelAlign.categoryNameSecond = "";
        });
    };
    // 确定按钮_修改一级分类
    const EditCategoryFn = () => {
      Comfirm({
        msg: "是否修改信息?",
        title: "提示",
        fn: editCategoryFn,
        catchFn: () => {},
      });
    };
    // 编辑按钮
    const editCategory = (params) => {
      category_first_input.value = true;
      category_first_input_disabled.value = false;
      category_second_input.value = false;
      category_children_input_disabled.value = true;
      category_button_disabled.value = false;

      // 一级名称输入还原名称
      formLabelAlign.categoryName = params.data.category_name;
      // 暂存提交按钮的类型
      submit_button_type.value = params.type;
      // 储存当前数据对象
      categoryData.current = params.data;
    };
    // 修改_确定提交时调用
    const editCategoryFn = () => {
      // 因修改后清除了categoryData.current，连续修改时，会出现无法正确传参的情况(参数不符)
      if (categoryData.current.length == 0) {
        root.$message({
          type: "error",
          message: "未选择分类",
        });
        return false;
      }
      let data = {
        categoryName: formLabelAlign.categoryName,
        id: categoryData.current.id,
      };
      EditCategory(data)
        .then((response) => {
          let responseData = response.data;
          root.$message({
            type: "success",
            message: responseData.message,
          });

          //   // 更新界面
          //   // 引用，也可直接用链式编程的方式
          //   let data = categoryData.item.filter(
          //     (item) => item.id == categoryData.current.id
          //   );
          //   data[0].category_name = responseData.data.data.categoryName;
          categoryData.current.category_name = responseData.data.data.categoryName;

          formLabelAlign.categoryName = ""; // 清空输入框名称
          categoryData.current = []; // 清空临时储存
        })
        .catch((error) => {
          console.log(error);
        });
    };
    // 删除一级数据
    const deleteCategoryFirst = (categoryId) => {
      deleteID.value = categoryId;
      Comfirm({
        msg: "是否删除所有已选中的信息?",
        title: "提示",
        fn: deleteCategoryFirstFn,
        catchFn: () => {
          // 清空暂存值
          deleteID.value = "";
        },
      });
    };
    // 删除操作执行方法
    const deleteCategoryFirstFn = () => {
      DeleteCategory({ categoryId: deleteID.value })
        .then((response) => {
          // 更新界面
          //   // 方法一
          //   // es6，findIndex，找到下标是多少，效率和性能稍微比filter好点
          //   let index = categoryData.item.findIndex((item) => item.id == deleteID.value);
          //   // splice(起始位置_下标，删除的数量，新数据)，两个参数是删除，三个参数是替换/插入(先执行删除，再插入)
          //   categoryData.item.splice(index, 1); // 删除数组指定元素

          // 方法二
          // es6，filter，进行数据过滤，留下符合要求的，适合数据量小的操作
          let newData = categoryData.item.filter((item) => item.id != deleteID.value);
          categoryData.item = newData;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    /**
     * 生命周期
     */
    onMounted(() => {
      // 方法二，vuex，异步，都在vuex内定义好，只需要下面一小段
      // 方法一，vue3.0全局方法，需要watch
      //   getInfoCategory();
      getInfoCategory();
    });
    watch(
      () => categoryItem.item,
      (value) => {
        categoryData.item = value;
      }
    );

    return {
      /* data */
      submit_button_type,
      category_first_input,
      category_second_input,
      submit_button_loading,
      category_first_input_disabled,
      category_children_input_disabled,
      category_button_disabled,
      deleteID,
      /* reactive */
      categoryData,
      formLabelAlign,
      /* methods */
      addFirst,
      commit,
      AddFirstCategoryFn,
      EditCategoryFn,
      editCategory,
      editCategoryFn,
      deleteCategoryFirst,
      deleteCategoryFirstFn,
    };
  },
};
</script>
<style lang="scss" scoped>
.hr-e9e9e9 {
  width: calc(100% + 60px);
  margin: 30px 0 28px -30px; /* 把内容拉出去 */
  /* 去除hr边框，用底部边框实现变色 */
  border: none;
  border-bottom: 1px solid #e9e9e9;
}
button {
  font-size: 12px;
  line-height: normal;
}
/* 消除虚线第一个的顶部突出 */
.category-wrap {
  div:first-child {
    &:before {
      top: 21px;
    }
  }
  div:last-child {
    &:before {
      bottom: 21px;
    }
  }
}

.category-item {
  position: relative;
  line-height: 44px;
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    width: 32px;
    /* 同时有top和bottom时，高度才会出现 */
    top: 0;
    bottom: 0;
    left: 22px;
    border-left: 1px dotted black;
  }
  h4 {
    position: relative;
    margin: 0 0 0 40px;
  }
  svg {
    position: absolute;
    top: 14px;
    left: -26px;
    font-size: 17px;
    /* 用于遮挡背景的虚线 */
    background-color: white;
  }
  ul {
    margin: 0;
    padding: 0;
    li {
      position: relative;
      margin-left: 24px;
      padding-left: 37px;
      list-style-type: none;
      &:before {
        content: "";
        position: absolute;
        width: 32px;
        top: 22px;
        left: 0;
        border-bottom: 1px dotted black;
      }
    }
  }
  li,
  h4 {
    /* 动画缓冲时间 */
    @include webkit(transition, all 0.5s ease 0s);
    &:hover {
      background-color: #f3f3f3;
      .button-group {
        /* 右侧按钮组的显示开关 */
        display: block;
      }
    }
  }
}
.button-group {
  display: none;
  position: absolute;
  right: 11px;
  top: -1px;
  z-index: 2;
}
.menu-title {
  line-height: 44px;
  margin: 0;
  margin-right: 30px;
  padding-left: 22px;
  background-color: #f6f6f6;
}
.form-wrap {
  width: 406px;
  margin-top: 26px;
}
</style>

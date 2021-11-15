<template>
  <div id="category">
    <el-button type="danger" @click="addFirst">添加一级分类</el-button>
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
              <h4>
                <svg-icon iconID="plus" />
                {{ firstItem.category_name }}
                <div class="button-group">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button type="success" size="mini" round>添加子级</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </h4>
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
              <el-input v-model="formLabelAlign.categoryName"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称：" v-if="category_second_input">
              <el-input v-model="formLabelAlign.categoryNameSecond"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                @click="commit"
                :loading="submit_button_loading_flag"
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
import { ref, reactive, onMounted } from "@vue/composition-api";
import { AddFirstCategory, GetCategoryAll } from "@/api/news";
export default {
  name: "category",
  setup(props, { root, refs }) {
    /**
     * data
     */
    // 右侧一二级分类菜单输入框的显示切换
    const category_first_input = ref(true);
    const category_second_input = ref(true);
    const submit_button_loading_flag = ref(false);

    /**
     * reactive
     */
    const categoryData = reactive({
      item: [],
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
    const addFirst = () => {
      category_first_input.value = true;
      category_second_input.value = false;
    };

    // 确定按钮
    const commit = () => {
      // 输入验证
      if (!formLabelAlign.categoryName) {
        root.$message({
          type: "error",
          message: "分类名称不能为空!",
        });
        return false;
      }
      // 修改按钮状态为加载中
      submit_button_loading_flag.value = true;
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
          submit_button_loading_flag.value = false;
          // 重置表单
          formLabelAlign.categoryName = "";
          formLabelAlign.categoryNameSecond = "";
        })
        .catch((error) => {
          submit_button_loading_flag.value = false;
          formLabelAlign.categoryName = "";
          formLabelAlign.categoryNameSecond = "";
        });
    };
    // 获取数据
    const getCategory = () => {
      GetCategoryAll({})
        .then((response) => {
          console.log("GetCategoryAll successful!");
          let data = response.data.data;
          categoryData.item = data;
        })
        .catch((error) => {});
    };

    /**
     * 生命周期
     */
    onMounted(() => {
      getCategory();
    });

    return {
      /* data */
      category_first_input,
      category_second_input,
      submit_button_loading_flag,
      /* reactive */
      categoryData,
      formLabelAlign,
      /* methods */
      addFirst,
      commit,
      getCategory,
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

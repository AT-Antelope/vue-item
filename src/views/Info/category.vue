<template>
  <div id="category">
    <el-button type="danger">添加一级分类</el-button>
    <hr class="hr-e9e9e9" />
    <div class="category-outter">
      <el-row :gutter="38">
        <el-col :span="8">
          <div class="category-wrap">
            <div class="category-item">
              <h4>
                <svg-icon iconID="plus" />
                新闻
                <div class="button-group">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button type="success" size="mini" round>添加子级</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </h4>
              <ul>
                <li>
                  国内
                  <div class="button-group">
                    <el-button type="danger" size="mini" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
                <li>
                  国际
                  <div class="button-group">
                    <el-button type="danger" size="mini" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
                <li>
                  数读
                  <div class="button-group">
                    <el-button type="danger" size="mini" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
                <li>
                  军事
                  <div class="button-group">
                    <el-button type="danger" size="mini" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
                <li>
                  航空
                  <div class="button-group">
                    <el-button type="danger" size="mini" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
                <li>
                  无人机
                  <div class="button-group">
                    <el-button type="danger" size="mini" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
            <div class="category-item">
              <h4>
                <svg-icon iconID="plus" />
                新闻
              </h4>
              <ul>
                <li>国内</li>
                <li>国际</li>
                <li>数读</li>
                <li>军事</li>
                <li>航空</li>
                <li>无人机</li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级分类编辑</h4>
          <el-form label-width="142px" :model="formLabelAlign" class="form-wrap">
            <el-form-item label="一级分类名称：">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称：">
              <el-input v-model="formLabelAlign.region"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger">确定</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
export default {
  name: "category",
  setup(props, { root }) {
    const formLabelAlign = reactive({
      name: "",
      region: "",
      type: "",
    });
    return {
      formLabelAlign,
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

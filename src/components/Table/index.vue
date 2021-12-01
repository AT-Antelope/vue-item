<template>
  <el-table :data="data.tableData" border style="width: 100%">
    <!-- 多选框 -->
    <el-table-column v-if="data.tableConfig.selectionFlag" type="selection" width="55">
    </el-table-column>

    <template v-for="tHeaderItem in data.tableConfig.tableHeaderOptions">
      <!-- v-slot -->
      <el-table-column
        v-if="tHeaderItem.columnType === 'slot'"
        :key="tHeaderItem.value"
        :prop="tHeaderItem.value"
        :label="tHeaderItem.label"
      >
        <template slot-scope="scope">
          <slot :name="tHeaderItem.slotName" :data="scope.row"></slot>
        </template>
      </el-table-column>
      <!-- 表头文本数据渲染 -->
      <el-table-column
        v-else
        :key="tHeaderItem.value"
        :prop="tHeaderItem.value"
        :label="tHeaderItem.label"
      >
      </el-table-column>
    </template>
  </el-table>
</template>
<script>
import { reactive, onBeforeMount } from "@vue/composition-api";
export default {
  /**
   * 组件目录: src/components/Table/index.vue
   * 引用方式: import TableComponent from "@c/Table";
   * template: <TableComponent :config="..."/>
   *                <template v-slot:...="data"></template>
   * 参数配置: configTable: {
                    selectionFlag: true,
                    tableHeaderOptions: [
                    { label: "邮箱/用户名", value: "email" },
                    { label: "真实姓名", value: "name" },
                    { label: "手机号", value: "phone" },
                    { label: "地区", value: "address" },
                    { label: "角色", value: "role" },
                    ],
                },
   *
   */
  name: "tableComponent",
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { root }) {
    const data = reactive({
      // table的数据
      tableData: [
        {
          email: "test@qq.com",
          name: "王小虎",
          phone: 13312341234,
          address: "上海市普陀区金沙江路 1518 弄",
          role: "超管",
          switchFlag: false,
        },
        {
          email: "test222@qq.com",
          name: "王小虎222",
          phone: 13322222222,
          address: "上海市普陀区金沙江路 2222 弄",
          role: "普通观众",
          switchFlag: false,
        },
        {
          email: "test333@qq.com",
          name: "王小虎333",
          phone: 13333333333,
          address: "上海市普陀区金沙江路 3333 弄",
          role: "大佬",
          switchFlag: false,
        },
      ],
      // 存储传进来的参数
      tableConfig: {
        // 多选框
        selectionFlag: true,
        // 表头的列名
        tableHeaderOptions: [],
      },
    });

    // 初始化table配置项，处理从父组件传来的数据
    const handlerDataFromParent = () => {
      let configDatas = props.config;
      for (let key in configDatas) {
        // 数据检验
        if (data.tableConfig[key]) {
          // 出现
          data.tableConfig[key] = configDatas[key];
        }
      }
    };

    /**
     * life cycle
     */
    // 挂载前
    onBeforeMount(() => {
      handlerDataFromParent();
    });

    return {
      /* data */
      data,
    };
  },
};
</script>
<style lang="scss" scoped></style>

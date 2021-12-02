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
import { recordPage } from "./recordPage.js";
import { loadData } from "./tableLoadData.js";
import { reactive, onBeforeMount, watch } from "@vue/composition-api";
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
    const { recordPage } = recordPage(); // 翻页记录
    const { tableData, tableLoadData } = loadData(); // 加载表格数据
    const data = reactive({
      // table的数据
      tableData: [
        {
          email: "test@qq.com",
          truename: "王小虎",
          phone: 13312341234,
          region: "上海市普陀区金沙江路 1518 弄",
          role: "超管",
          switchFlag: false,
        },
        {
          email: "test222@qq.com",
          truename: "王小虎222",
          phone: 13322222222,
          region: "上海市普陀区金沙江路 2222 弄",
          role: "普通观众",
          switchFlag: false,
        },
        {
          email: "test333@qq.com",
          truename: "王小虎333",
          phone: 13333333333,
          region: "上海市普陀区金沙江路 3333 弄",
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
        requestData: {},
      },
    });

    // 初始化table配置项，处理从父组件传来的数据
    const handlerDataFromParent = () => {
      let configDatas = props.config;
      let keys = Object.keys(data.tableConfig); // 将对象中的所有key提取成一个数组
      for (let key in configDatas) {
        // 数据检验
        // 如果包含返回true
        if (keys.includes(key)) {
          data.tableConfig[key] = configDatas[key];
        }
      }
    };

    /**
     * life cycle
     */
    // 监听数据数组是否改变，初始化为空，接口返回组件数据，发生改变后把组件内的数据数组，存到当前的数组中
    watch(
      () => tableData.item,
      (newValue) => (data.tableData = newValue)
    );
    // 挂载前
    onBeforeMount(() => {
      handlerDataFromParent();
      tableLoadData(data.tableConfig.requestData, root);
    });

    return {
      /* data */
      data,
    };
  },
};
</script>
<style lang="scss" scoped></style>

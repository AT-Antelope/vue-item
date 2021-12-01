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

    // 初始化请求数据
    let loadData = () => {
      let requestJson = data.tableConfig.requestData;
      let requestData = {
        url: requestJson.url,
        method: requestJson.method,
        data: requestJson.data,
      };
      // 获取用户列表
      root.$store
        .dispatch("common/loadTableData", requestData)
        .then((response) => {
          let responseData = response.data.data.data;
          // 数据检验
          if (responseData && responseData.length > 0) {
            data.tableData = responseData;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    // 初始化table配置项，处理从父组件传来的数据
    let handlerDataFromParent = () => {
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
    // 挂载前
    onBeforeMount(() => {
      handlerDataFromParent();
      loadData();
    });

    return {
      /* data */
      data,
    };
  },
};
</script>
<style lang="scss" scoped></style>

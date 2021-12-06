<template>
  <div class="overflow-h">
    <el-row :gutter="10">
      <!-- 省 -->
      <el-col :span="6" v-if="data.cityPickerInitDatas.province">
        <el-select
          v-model="cityPickerForm.selectProvince"
          placeholder="请选择"
          @change="selectHandlerProvince"
        >
          <el-option
            v-for="provinceItem in cityPickerData.provinceData"
            :key="provinceItem.PROVINCE_ID"
            :value="provinceItem.PROVINCE_CODE"
            :label="provinceItem.PROVINCE_NAME"
          ></el-option>
        </el-select>
      </el-col>
      <!-- 市 -->
      <el-col :span="6" v-if="data.cityPickerInitDatas.province">
        <el-select
          v-model="cityPickerForm.selectCity"
          placeholder="请选择"
          @change="selectHandlerCity"
          ><el-option
            v-for="cityItem in cityPickerData.cityData"
            :key="cityItem.CITY_ID"
            :value="cityItem.CITY_CODE"
            :label="cityItem.CITY_NAME"
          ></el-option>
        </el-select>
      </el-col>
      <!-- 区县 -->
      <el-col :span="6" v-if="data.cityPickerInitDatas.area">
        <el-select
          v-model="cityPickerForm.selectArea"
          placeholder="请选择"
          @change="selectHandlerArea"
        >
          <el-option
            v-for="areaItem in cityPickerData.areaData"
            :key="areaItem.AREA_ID"
            :value="areaItem.AREA_CODE"
            :label="areaItem.AREA_NAME"
          ></el-option
        ></el-select>
      </el-col>
      <!-- 街道 -->
      <el-col :span="6" v-if="data.cityPickerInitDatas.street">
        <el-select
          v-model="cityPickerForm.selectStreet"
          placeholder="请选择"
          @change="selectHandlerStreet"
          ><el-option
            v-for="streetItem in cityPickerData.streetData"
            :key="streetItem.STREET_ID"
            :value="streetItem.STREET_CODE"
            :label="streetItem.STREET_NAME"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { cityPicker } from "@/mixin/cityPicker.js";
import { reactive, onBeforeMount, watch } from "@vue/composition-api";
export default {
  /**
   * cityPicker组件
   * 参数:{
   *          // 初始化省市区街组件显示的显示个数，按顺序添加，不能跳过中间值，否则获取不到数据来选
   *          cityPickerInit: ["province", "city", "area", "street"]
   *          // 接收返回出来的结果值
   *          cityPickerDatas.sync: {}
   *      }
   * 模板: <CityPicker :cityPickerInit="data.cityPickerInitDatas" :cityPickerDatas.sync="data.cityPickerResults" />
   */
  name: "cityPicker",
  props: {
    cityPickerInit: {
      type: Array,
      default: () => [],
    },
    cityPickerDatas: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { root, emit }) {
    const {
      cityPickerData,
      cityPickerForm,
      resultData,
      getProvince,
      selectHandlerProvince,
      selectHandlerCity,
      selectHandlerArea,
      selectHandlerStreet,
    } = cityPicker();
    /**
     * data
     */
    const data = reactive({
      cityPickerInitDatas: {
        province: false,
        city: false,
        area: false,
        street: false,
      },
    });

    /**
     * methods
     */
    // 初始化cityPicker组件显示
    const initCityPickerData = () => {
      let initData = props.cityPickerInit;
      // 不传值时默认全显示
      if (initData.length == 0) {
        for (let key in data.cityPickerInitDatas) {
          data.cityPickerInitDatas[key] = true;
        }
      } else {
        // 传值时将传的值显示
        initData.forEach((item) => {
          data.cityPickerInitDatas[item] = true;
        });
      }
      //   data.cityPickerInit;
    };

    /**
     * watch
     */
    watch(
      [
        () => resultData.selectProvince,
        () => resultData.selectCity,
        () => resultData.selectArea,
        () => resultData.selectStreet,
      ],
      ([resultProvince, resultCity, resultArea, resultStreet]) => {
        emit("update:cityPickerDatas", resultData);
      }
    );

    /**
     * life cycle
     */
    onBeforeMount(() => {
      // 初始化
      initCityPickerData();
      // 获取省份数据
      getProvince();
    });

    return {
      /* data */
      data,
      cityPickerData,
      cityPickerForm,
      /**
       * methods
       */
      selectHandlerProvince,
      selectHandlerCity,
      selectHandlerArea,
      selectHandlerStreet,
    };
  },
};
</script>
<style lang="scss" scoped></style>

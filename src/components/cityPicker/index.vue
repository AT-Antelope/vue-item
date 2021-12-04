<template>
  <div class="overflow-h">
    <el-row :gutter="10">
      <!-- 省 -->
      <el-col :span="6">
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
      <el-col :span="6">
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
      <el-col :span="6">
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
      <el-col :span="6">
        <el-select v-model="cityPickerForm.selectStreet" placeholder="请选择"
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
import { reactive, onMounted } from "@vue/composition-api";
export default {
  name: "cityPicker",
  props: {
    cityPickerDatas: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { root }) {
    const {
      cityPickerData,
      cityPickerForm,
      getProvince,
      selectHandlerProvince,
      selectHandlerCity,
      selectHandlerArea,
    } = cityPicker();
    /**
     * data
     */

    /**
     * life cycle
     */
    onMounted(() => {
      getProvince(root);
    });

    return {
      /* data */
      cityPickerData,
      cityPickerForm,
      /**
       * methods
       */
      selectHandlerProvince,
      selectHandlerCity,
      selectHandlerArea,
    };
  },
};
</script>
<style lang="scss" scoped></style>

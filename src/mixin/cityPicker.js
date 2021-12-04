import { CityPicker } from "@/api/user";
import { reactive, toRefs } from "@vue/composition-api";
export function cityPicker() {
  /**
   * data
   */
  const cityPickerData = reactive({
    provinceData: [],
    cityData: [],
    areaData: [],
    streetData: [],
  });
  const cityPickerForm = reactive({
    selectProvince: "",
    selectCity: "",
    selectArea: "",
    selectStreet: "",
  });

  /**
   * methods
   */
  // 获取省份，需要传root进来
  // !!! 即使传一份root进来储存起来，在其他方法里调用vuex时，仍然报错找不到dispatch，先选用直接调接口同步获取
  const getProvince = () => {
    // 请求接口
    CityPicker({ type: "province" })
      .then((response) => {
        cityPickerData.provinceData = response.data.data.data;
        console.log(toRefs(cityPickerData));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // 选择省份后，获取城市
  const selectHandlerProvince = (value) => {
    // 清除表单残留值
    cityPickerForm.selectCity = "";
    cityPickerForm.selectArea = "";
    cityPickerForm.selectStreet = "";
    // 请求接口
    CityPicker({ type: "city", province_code: value })
      .then((response) => {
        cityPickerData.cityData = response.data.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // 选择城市后，获取区县
  const selectHandlerCity = (value) => {
    // 清除表单残留值
    cityPickerForm.selectArea = "";
    cityPickerForm.selectStreet = "";
    // 请求接口
    CityPicker({ type: "area", city_code: value })
      .then((response) => {
        cityPickerData.areaData = response.data.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // 选择区县后，获取街道
  const selectHandlerArea = (value) => {
    // 清除表单残留值
    cityPickerForm.selectStreet = "";
    // 请求接口
    CityPicker({ type: "street", area_code: value })
      .then((response) => {
        cityPickerData.streetData = response.data.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    /* data */
    cityPickerData,
    cityPickerForm,
    /* methods */
    getProvince,
    selectHandlerProvince,
    selectHandlerCity,
    selectHandlerArea,
  };
}

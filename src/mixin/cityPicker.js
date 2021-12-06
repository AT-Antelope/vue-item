import { CityPicker } from "@/api/user";
import { reactive, toRefs } from "@vue/composition-api";
export function cityPicker() {
  /**
   * data
   */
  // 储存获取的数据
  const cityPickerData = reactive({
    provinceData: [],
    cityData: [],
    areaData: [],
    streetData: [],
  });
  // 绑定的model值
  const cityPickerForm = reactive({
    selectProvince: "",
    selectCity: "",
    selectArea: "",
    selectStreet: "",
  });
  const resultData = reactive({
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
    getData({ type: "province" });
  };
  // 选择省份后，获取城市
  const selectHandlerProvince = (value) => {
    // 清空已选值
    selectResetData("city");
    // 请求接口
    getData({ type: "city", province_code: value });
  };
  // 选择城市后，获取区县
  const selectHandlerCity = (value) => {
    // 清空已选值
    selectResetData("area");
    // 请求接口
    getData({ type: "area", city_code: value });
  };
  // 选择区县后，获取街道
  const selectHandlerArea = (value) => {
    // 清空已选值
    selectResetData("street");
    // 请求接口
    getData({ type: "street", area_code: value });
  };
  // 选择街道后
  const selectHandlerStreet = (value) => {
    selectResetData();
  };
  // 请求接口
  const getData = (requestData) => {
    CityPicker(requestData)
      .then((response) => {
        cityPickerData[`${requestData.type}Data`] = response.data.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // 重置选项
  const selectResetData = (type) => {
    let formJson = {
      city: ["selectCity", "selectArea", "selectStreet"],
      area: ["selectArea", "selectStreet"],
      street: ["selectStreet"],
    };
    let dataJson = {
      city: ["cityData", "areaData", "streetData"],
      area: ["areaData", "streetData"],
      street: ["streetData"],
    };
    if (formJson[type] && dataJson[type]) {
      // 清空选定值
      formJson[type].forEach((formItem) => {
        cityPickerForm[formItem] = ""; // 清空指定的key对应的值
      });
      // 清空数据数组
      dataJson[type].forEach((dataItem) => {
        cityPickerData[dataItem] = [];
      });
    }
    // 返回选中数据出去
    returnResultDatas();
  };
  // 返回选中数据出去
  const returnResultDatas = () => {
    for (let key in cityPickerForm) {
      resultData[key] = cityPickerForm[key];
    }
  };

  return {
    /* data */
    cityPickerData,
    cityPickerForm,
    resultData,
    /* methods */
    getProvince,
    selectHandlerProvince,
    selectHandlerCity,
    selectHandlerArea,
    selectHandlerStreet,
  };
}

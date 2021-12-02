import { ref } from "@vue/composition-api";
// 翻页记录
export function recordPage() {
  const recordPage = ref("");

  return {
    recordPage,
  };
}

import { doughSpellingMap } from "@/common/constants";

export default {
  methods: {
    $doughText(sizeId, doughId, getter) {
      const size = getter("sizes", sizeId).name;
      const dough = getter("dough", doughId).name;

      return `${size}, на ${doughSpellingMap[dough]} тесте`;
    },
  },
};

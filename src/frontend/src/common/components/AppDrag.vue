<template>
  <div
    :draggable="true"
    @dragstart.self="dragHandler"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "AppDrag",
  props: {
    transferData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    dragHandler({ dataTransfer }) {
      dataTransfer.setData(
        "ingredient",
        JSON.stringify(this.transferData)
      );
    },
  },
};
</script>

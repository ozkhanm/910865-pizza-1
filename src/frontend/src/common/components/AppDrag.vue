<template>
  <div
    :draggable="isDraggable"
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
    isDraggable: {
      type: Boolean,
      default: true,
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

<style lang="scss" scoped>

</style>

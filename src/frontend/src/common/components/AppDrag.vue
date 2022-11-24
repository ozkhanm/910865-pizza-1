<template>
  <div
    :draggable="true"
    @dragstart.self="onDrag"
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
    onDrag({ dataTransfer }) {
      dataTransfer.setData(
        "ingredient",
        JSON.stringify(this.transferData)
      );
    },
  },
};
</script>

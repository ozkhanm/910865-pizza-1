<template>
  <div
    @drop.stop="onDrop"
    @dragover.prevent
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "AppDrop",
  methods: {
    onDrop({ dataTransfer }) {
      if (!dataTransfer) {
        return;
      }

      const payload = dataTransfer.getData("ingredient");

      if (payload) {
        const transferData = JSON.parse(payload);

        this.$emit("drop", transferData);
      }
    },
  },
};
</script>

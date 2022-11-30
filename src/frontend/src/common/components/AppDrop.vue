<template>
  <div
    @drop.stop="dropHandler"
    @dragover.prevent
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "AppDrop",
  methods: {
    dropHandler({ dataTransfer }) {
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

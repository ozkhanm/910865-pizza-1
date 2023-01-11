export default {
  methods: {
    $imageWithExtensionLink(link, extension) {
      const linkWithoutExtension = link.split(".")[0];

      return `${linkWithoutExtension}${extension}`;
    },
  },
};

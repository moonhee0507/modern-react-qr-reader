const config = {
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  stories: [
    "../src/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],

  docs: {
    autodocs: true,
  },

  // typescript: {
  //   reactDocgen: "react-docgen-typescript",
  // },

  // addons: ["@chromatic-com/storybook"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  babel: async (option) => {
    return {
      ...option,
      presets: [...option.presets, "@babel/preset-react"],
    };
  },
  core: {
    builder: "@storybook/builder-vite",
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import("vite");

    return mergeConfig(config, {
      // Add dependencies to pre-optimization
      optimizeDeps: {
        include: ["storybook-dark-mode"],
      },
    });
  },
};

export default config;

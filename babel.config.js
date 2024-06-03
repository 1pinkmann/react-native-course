module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["@babel/plugin-proposal-decorators", { "version": "legacy" }],
      ['@babel/plugin-proposal-class-properties'],
      ['@babel/plugin-transform-class-properties', { loose: true }],
      ['@babel/plugin-transform-private-methods'],
      ['@babel/plugin-transform-private-property-in-object'],
      'react-native-reanimated/plugin'
    ],
    assumptions: {
      setPublicClassFields: false
    }
  };
};
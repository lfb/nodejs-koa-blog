module.exports = {
  plugins: {
    'postcss-plugin-px2rem': {
      rootValue: 75,
      exclude: /(view-design)/,
    }
  }
}

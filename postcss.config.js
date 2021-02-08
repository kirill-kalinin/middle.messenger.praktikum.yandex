module.exports = (ctx) => ({
  map: ctx.options.map,
  plugins: [
      require('autoprefixer'),
      require('precss'),
      require('cssnano')({
          preset: 'default',
      })
  ],
});
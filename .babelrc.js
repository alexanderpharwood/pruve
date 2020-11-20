const presets = [["@babel/preset-env", {"modules": false} ]];
const plugins = ["@babel/plugin-transform-runtime"];

if (process.env.BABEL_ENV === 'commonjs') {
    plugins.push('@babel/plugin-transform-modules-commonjs')
    plugins.push('babel-plugin-add-module-exports')
}


module.exports = {
    presets,
    plugins
}

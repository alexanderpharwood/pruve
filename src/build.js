const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify').uglify;

const outputOptions = {
	file: 'dist/bundle.js',
	format: 'umd',
	name: 'pruve'
};

const inputOptions = {
	input: './src/index.js',
	plugins: [
      babel({
        exclude: 'node_modules/**',
		runtimeHelpers: true,
		
      })
    ]
};

const inputOptionsMin = {
	input: './src/index.js',
	plugins: [
      babel({
        exclude: 'node_modules/**',
		runtimeHelpers: true,
      }),
      uglify()
    ]
};

const outputOptionsMin = {
	file: 'dist/bundle.min.js',
	format: 'umd',
	name: 'pruve',
	sourcemap: true
};

async function build(inputOptions, outputOptions, callback) {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  // generate code and a sourcemap
  const { code, map } = await bundle.generate(outputOptions);

  // or write the bundle to disk
  await bundle.write(outputOptions);
  callback();
}

console.log('Starting build...');

console.log('Building bundle...');
build(inputOptions, outputOptions, function(){
	console.log('Finished bundle.');
});

console.log('Building minified bundle...');
build(inputOptionsMin, outputOptionsMin, function(){
	console.log('Finished minified bundle.');
});

#!/bin/bash

output=$(pwd)/dist
echo $output;

rm -r $output

# Build a commonjs version
echo "Building commonjs in dist"
env BABEL_ENV='commonjs' npx babel src --source-root src --out-dir "$output" --extensions .js --copy-files --quiet &&

# Build an esm version
echo "Building esm in dist/esm"
env BABEL_ENV='esm' npx babel src --source-root esm.index.js --out-dir "$output/esm" --extensions .js --copy-files --quiet
rm $output/esm.index.js
rm $output/esm/index.js
mv $output/esm/esm.index.js $output/esm/index.js

# Build a minified browser (umd) version using webpack
echo "Building minified bundle in dist/browser"
npx webpack

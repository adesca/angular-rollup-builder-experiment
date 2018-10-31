// import typescript from "rollup-plugin-typescript";
// import angular from "rollup-plugin-angular";

const rollup = require('rollup');
const typescript = require('rollup-plugin-typescript');

const inputOptions = {
    input: 'main.ts',
    plugins: [
        typescript(),
        // angular()
    ]
};

const outputOptions = {
    format: 'umd',
    file: '../sample-project/src/assets/out.js',
    name: 'rolled-up-app'
};

async function build() {
    const bundle = await rollup.rollup(inputOptions);

    // console.log(bundle.modules);

    await bundle.write(outputOptions);
}

build();

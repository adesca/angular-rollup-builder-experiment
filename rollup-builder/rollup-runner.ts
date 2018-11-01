import {OutputOptions, rollup, RollupFileOptions} from "rollup";

export async function build(inputOptions: RollupFileOptions, outputOptions: OutputOptions) {
    console.log('initializing rollup');

    try {
        const bundle = await rollup(inputOptions);
        console.log('bundle created, now writing bundle');
        await bundle.write(outputOptions);
    } catch (e) {
        console.log('caught error ', e);
    }


    // console.log(bundle.modules);


}
import {OutputOptions, rollup, RollupError, RollupFileOptions} from "rollup";
import * as ts from "typescript/lib/tsserverlibrary";
import {BuilderContext} from "@angular-devkit/architect";
import {LoggerApi} from "@angular-devkit/core/src/logger";

export async function build(inputOptions: RollupFileOptions, outputOptions: OutputOptions,
                            logger: LoggerApi) {
    logger.info('initializing rollup');
    try {
        const bundle = await rollup(inputOptions);
        logger.info('Bundle created, now writing bundle to destination ');
        await bundle.write(outputOptions);
    } catch (e) {
        const rollupException = e as RollupError;
        logger.error('Caught error while bundling ' + JSON.stringify(rollupException.message));


        throw e;
    }


    // console.log(bundle.modules);


}
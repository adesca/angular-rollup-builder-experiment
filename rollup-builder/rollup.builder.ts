import {Builder, BuilderConfiguration, BuilderContext, BuildEvent} from '@angular-devkit/architect';
import {build} from "./rollup-runner";
// import TypescriptPlugin = require('rollup-plugin-typescript')
// import {typescript} from "rollup-plugin-typescript/src/index"
// import * as TypescriptPlugin from 'rollup-plugin-typescript/dist/rollup-plugin-typescript.es'
// import {typescript} from 'rollup-plugin-typescript/';
import {InputOptions, OutputOptions, RollupFileOptions} from "rollup";
import {from, Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {Replacement, RollupOptionsSchema} from "./rollup-options.schema";
import {join} from "path";

const TypescriptPlugin = require('rollup-plugin-typescript');
const AngularPlugin = require('rollup-plugin-angular');
// const ResolvePlugin = require('rollup-plugin-node-resolve');
// const ReplacePlugin = require('rollup-plugin-replace');
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';

// const inputOptions = {
//     input: 'main.ts',
//     plugins: [
//         TypescriptPlugin()
//         // TypescriptPlugin
//         // typescript(),
//         // angular()
//     ]
// };

const outputOptions = {
    format: 'umd',
    file: '../sample-project/src/assets/out2.js',
    name: 'rolled-up-app'
} as OutputOptions;


export default class RollupBuilder implements Builder<RollupOptionsSchema> {
    constructor(private context: BuilderContext) {
    }

    run(builderConfig: BuilderConfiguration<RollupOptionsSchema>): Observable<BuildEvent> {


        let normalizedFileReplacements = normalizeFileReplacements(builderConfig.options.importReplacements);
        const replacementPlugin = setupReplacePlugin(normalizedFileReplacements);

        const resolvePlugin = setupResolvePlugin();
        const rollupInputOptions: RollupFileOptions = {
            input: builderConfig.options.main,
            plugins: [TypescriptPlugin(), resolvePlugin, replacementPlugin ]
        };

        const rollupOutputOptions: OutputOptions = {
            format: 'umd',
            name: 'some-project-name',
            file: join(builderConfig.options.outputPath, 'out.js')
        };

        this.context.logger.info('Builder setup: complete');
        return from(build(rollupInputOptions, rollupOutputOptions, this.context.logger))
            .pipe(
                map(() => ({success: true})),
                tap(() => this.context.logger.info("Bundle created")),
                catchError(e => {
                    this.context.logger.error("Bundle failed", e);
                    return of({success: false})
                })
            );

    }
}

const setupResolvePlugin = () => {
    return resolve({
        jsnext: true,
        main: true,
        browser: true
    })
};

const setupReplacePlugin = (fileReplacements: Replacement[]) => {
    const replacementValuesObj = {};
    fileReplacements.forEach(fileReplacement => {
       replacementValuesObj[fileReplacement.replace] = fileReplacement.with;
    });
    const configObj:  object = {
        values: replacementValuesObj
    };
    return replace(configObj);
};

const normalizeFileReplacements = (fileReplacements: Replacement[] | undefined) => {
    if(fileReplacements) {
        return fileReplacements;
    } else {
        return [];
    }
};

import {Builder, BuilderConfiguration, BuilderContext, BuildEvent} from '@angular-devkit/architect';
import {build} from "./rollup-runner";
// import TypescriptPlugin = require('rollup-plugin-typescript')
// import {typescript} from "rollup-plugin-typescript/src/index"
// import * as TypescriptPlugin from 'rollup-plugin-typescript/dist/rollup-plugin-typescript.es'
// import {typescript} from 'rollup-plugin-typescript/';
import {OutputOptions} from "rollup";
import {from, Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";

const TypescriptPlugin = require('rollup-plugin-typescript');

const inputOptions = {
    input: 'main.ts',
    plugins: [
        TypescriptPlugin()
        // TypescriptPlugin
        // typescript(),
        // angular()
    ]
};

const outputOptions = {
    format: 'umd',
    file: '../sample-project/src/assets/out2.js',
    name: 'rolled-up-app'
} as OutputOptions;

export interface RollupConfigurationSchema {

}

export default class RollupBuilder implements Builder<RollupConfigurationSchema> {
    constructor(private context: BuilderContext) {
    }

    run(builderConfig: BuilderConfiguration<Partial<RollupConfigurationSchema>>): Observable<BuildEvent> {
        console.log('running');
        return from(build(inputOptions, outputOptions))
            .pipe(
                map(() => ({success: true})),
                tap(() => this.context.logger.info("Bundle created")),
                catchError(e => {
                    this.context.logger.error("Bundle failed", e)
                    return of({success: false})
                })
            );

    }
}

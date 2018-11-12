// Copied and modified from the angular cli project
// Original source: https://github.com/angular/angular-cli/blob/master/packages/angular_devkit/build_angular/src/browser/schema.d.ts
// License: https://angular.io/license


export interface RollupOptionsSchema {

    /**
     * The name of the main entry-point file.
     */
    main: string;

    /**
     * The name of the TypeScript configuration file.
     */
    tsConfig: string;

    /**
     * Replace files with other files in the build.
     */
    importReplacements: Replacement[];

    /**
     * Path where output will be placed.
     */
    outputPath: string;

    /**
     * Output sourcemaps.
     */
    sourceMap: boolean;
}

export interface Replacement {
    /**
     * The value that should be replaced.
     */
    replace: string;

    /**
     * The value that should replace.
     */
    with: string;
}
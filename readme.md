# Angular rollup builder experiment
This repository is so I can explore how one could create an angular architect that bundles an app for easy consumption 
by other apps at runtime, rather than as a prepackaged library that apps include at build time.

v1.0
Features: 
- Can bundle an angular project by inlining the html and scss

ToDo:
- Not needed: ~Support adding polyfills~ 
- Support being able to set a specific tsconfig
- Support outputting sourcemaps based on configuration property
- Swap out file content instead of swapping import strings
- Add option to build factory instead of rolling up entire project
- NPM post install should add a rollup-builder command to angular.json in the project it was installed under
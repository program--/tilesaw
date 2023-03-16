# tilesaw

A TypeScript/JavaScript library that aims to provide robust methods of slicing/sawing vector data into vector tiles on the fly,
like [geojson-vt](https://github.com/mapbox/geojson-vt/), but for any vector type through adapters.

## Tooling
Currently this project uses the following tools:
- [vitest](https://vitest.dev/): Testing
- [Prettier](https://prettier.io/): Formatting
- [yarn](https://yarnpkg.com/): Dependency Management

## Licensing/Attribution

tilesaw draws most of its inspiration from [geojson-vt](https://github.com/mapbox/geojson-vt) and the [geoarrow spec](https://github.com/geoarrow/geoarrow),
and utilizes similar ideas from them. While the source code is not identical, licenses for both repositories are stored in the [NOTICE](./NOTICE) file.
tilesaw itself is MIT licensed.
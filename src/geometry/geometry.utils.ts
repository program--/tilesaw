import {
    LogicalPoint,
    LogicalLineStringOrMultiPoint,
    LogicalPolygonOrMultiLineString,
    LogicalMultiPolygon,
} from './geometry.types';

const cumsum = (sum: number) => (value: number) => (sum += value);

// Offsets are created by finding the lengths of each geometry,
// then computing the cumulative sum
function genGeometryOffsets(features: Array<LogicalLineStringOrMultiPoint>): Uint32Array;
function genGeometryOffsets(features: Array<LogicalPolygonOrMultiLineString>): Uint32Array;
function genGeometryOffsets(features: Array<LogicalMultiPolygon>): Uint32Array;
function genGeometryOffsets(features: Array<any>): Uint32Array {
    return new Uint32Array([0, ...features.map((x) => x.length).map(cumsum(0))]);
}

function genPartOffsets(features: Array<LogicalPolygonOrMultiLineString>): Uint32Array;
function genPartOffsets(features: Array<LogicalMultiPolygon>): Uint32Array;
function genPartOffsets(features: Array<any>): Uint32Array {
    return new Uint32Array([
        0,
        ...features
            .flat(1)
            .map((x) => x.length)
            .map(cumsum(0)),
    ]);
}

function genRingOffsets(features: Array<LogicalMultiPolygon>): Uint32Array {
    return new Uint32Array([
        0,
        ...features
            .flat(2)
            .map((x) => x.length)
            .map(cumsum(0)),
    ]);
}

function genBuffer(features: Array<LogicalPoint>): Float64Array;
function genBuffer(features: Array<LogicalLineStringOrMultiPoint>): Float64Array;
function genBuffer(features: Array<LogicalPolygonOrMultiLineString>): Float64Array;
function genBuffer(features: Array<LogicalMultiPolygon>): Float64Array;
function genBuffer(features: Array<any>): Float64Array {
    return new Float64Array(features.flat(4));
}

export {
    cumsum,
    genGeometryOffsets,
    genPartOffsets,
    genRingOffsets,
    genBuffer
}
import Geometry from '../geometry.abstract';
import { genBuffer, genGeometryOffsets, genPartOffsets, genRingOffsets } from '../geometry.utils';
import { GeometryType, LogicalMultiPolygon } from '../geometry.types';

export default class MultiPolygons extends Geometry {
    protected _type = GeometryType.MultiPolygon;
    protected _geometry_offsets!: Uint32Array;
    protected _part_offsets!: Uint32Array;
    protected _ring_offsets!: Uint32Array;
    protected init(features: Array<LogicalMultiPolygon>) {
        this._buffer = genBuffer(features);
        this._geometry_offsets = genGeometryOffsets(features);
        this._part_offsets = genPartOffsets(features);
        this._ring_offsets = genRingOffsets(features);
    }
}

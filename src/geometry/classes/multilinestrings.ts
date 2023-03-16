import Geometry from '../geometry.abstract';
import { genBuffer, genGeometryOffsets, genPartOffsets } from '../geometry.utils';
import { GeometryType, LogicalPolygonOrMultiLineString } from '../geometry.types';

export default class MultiLineStrings extends Geometry {
    protected _type = GeometryType.MultiLineString;
    protected _geometry_offsets!: Uint32Array;
    protected _part_offsets!: Uint32Array;
    protected init(features: Array<LogicalPolygonOrMultiLineString>) {
        this._buffer = genBuffer(features);
        this._geometry_offsets = genGeometryOffsets(features);
        this._part_offsets = genPartOffsets(features);
    }
}

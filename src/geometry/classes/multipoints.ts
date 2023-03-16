import Geometry from "../geometry.abstract";
import { genBuffer, genGeometryOffsets } from "../geometry.utils";
import { GeometryType, LogicalLineStringOrMultiPoint } from "../geometry.types";

export default class MultiPoints extends Geometry {
    protected _type = GeometryType.MultiPoint;
    protected _geometry_offsets!: Uint32Array;
    protected init(features: Array<LogicalLineStringOrMultiPoint>) {
        this._buffer = genBuffer(features);
        this._geometry_offsets = genGeometryOffsets(features);
    }
}

import Geometry from "../geometry.abstract";
import { genBuffer } from "../geometry.utils";
import { GeometryType, LogicalPoint } from "../geometry.types";

export default class Points extends Geometry {
    protected _type = GeometryType.Point;
    protected init(features: Array<LogicalPoint>) {
        this._buffer = genBuffer(features);
    }
}
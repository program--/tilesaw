import Geometry from './geometry.abstract';
import Points from './classes/points';
import LineStrings from './classes/linestrings';
import Polygons from './classes/polygons';
import MultiPoints from './classes/multipoints';
import MultiLineStrings from './classes/multilinestrings';
import MultiPolygons from './classes/multipolygons';
import { GeometryType } from './geometry.types';
import type {
    LogicalGeometry,
    LogicalPoint,
    LogicalLineStringOrMultiPoint,
    LogicalPolygonOrMultiLineString,
    LogicalMultiPolygon,
} from './geometry.types';

export { Geometry, Points, LineStrings, Polygons, MultiPoints, MultiLineStrings, MultiPolygons, GeometryType };
export type {
    LogicalGeometry,
    LogicalPoint,
    LogicalLineStringOrMultiPoint,
    LogicalPolygonOrMultiLineString,
    LogicalMultiPolygon,
};

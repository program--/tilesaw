// Logical Representations
// These types provide a logical representation of
// geometry, such as what you would find in a GeoJSON file.
type LogicalGeometry =
    | LogicalPoint
    | LogicalLineStringOrMultiPoint
    | LogicalPolygonOrMultiLineString
    | LogicalMultiPolygon;
type LogicalPoint = readonly [number, number];
type LogicalLineStringOrMultiPoint = Array<LogicalPoint>;
type LogicalPolygonOrMultiLineString = Array<LogicalLineStringOrMultiPoint>;
type LogicalMultiPolygon = Array<LogicalPolygonOrMultiLineString>;

enum GeometryType {
    Point,
    LineString,
    Polygon,
    MultiPoint,
    MultiLineString,
    MultiPolygon,
    GeometryCollection,
}

export type {
    LogicalGeometry,
    LogicalPoint,
    LogicalLineStringOrMultiPoint,
    LogicalPolygonOrMultiLineString,
    LogicalMultiPolygon
}

export {
    GeometryType
}
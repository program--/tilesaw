import { GeometryType, LogicalGeometry } from './geometry.types'

// Geometry implements a portion of the GeoArrow spec
export default abstract class Geometry {
    /** Type of geometry that is represented by this buffer */
    protected abstract _type: GeometryType;

    /**
     * Flat array of coordinates:
     * [x1, y1, x2, y2, x3, y3, ...]
     */
    protected _buffer!: Float64Array;

    /**
     * Geometry offests within buffer array or part offset.
     * Used by all geometry except Points.
     * Length of this array minus one is equivalent to the number of geometries.
     */
    protected _geometry_offsets?: Uint32Array;

    /** Geometry part offsets within buffer array or ring offset. Used by all geometry except Points and MultiPoints. */
    protected _part_offsets?: Uint32Array;

    /** Geometry ring offsets within buffer array. Used by MultiPolygons. */
    protected _ring_offsets?: Uint32Array;

    constructor(features: Array<LogicalGeometry>) {
        this.init(features);
    }

    /**
     * Returns the number of geometries within this object.
     * 
     * For points, this means the number of coordinate pairs (i.e. buffer length / 2).
     * 
     * For every other type, this is equivalent to the length of the geometry offsets - 1.
     */
    public get length(): number {
        return this._geometry_offsets != undefined
            ? this._geometry_offsets.length - 1 // other geometry types
            : this._buffer.length / 2; // points
    }

    /**
     * Returns a *readonly* buffer pointing to the geometry's
     * internal `Float64Array`.
     */
    public get buffer(): Readonly<Float64Array> {
        return this._buffer;
    }

    /**
     * Returns an object containing *readonly* references
     * to the geometry's internal offsets.
     */
    public get offsets(): {
        geometries?: Readonly<Uint32Array>;
        parts?: Readonly<Uint32Array>;
        rings?: Readonly<Uint32Array>;
    } {
        return {
            geometries: this._geometry_offsets,
            parts: this._part_offsets,
            rings: this._ring_offsets,
        };
    }

    /**
     * Returns the geometry's corresponding type enumerator.
     */
    public get type(): GeometryType {
        return this._type;
    }

    /**
     * Returns the bounds of the geometry as a 4-length array,
     * where the values correspond to: `[minX, minY, maxX, maxY]`.
     */
    public get bounds(): [number, number, number, number] {
        const x = this._buffer.filter((_, i) => i % 2 == 0);
        const y = this._buffer.filter((_, i) => i % 2 != 0);
        return [Math.min(...x), Math.min(...y), Math.max(...x), Math.max(...y)];
    }

    /**
     * Initialize buffer and parse features from logical to physical representation.
     * @param features Logical geometry representation
     */
    protected abstract init(features: Array<LogicalGeometry>): void;
}
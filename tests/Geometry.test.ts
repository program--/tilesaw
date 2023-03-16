import { GeometryType, MultiLineStrings, LineStrings, MultiPoints, MultiPolygons, Points, Polygons } from '../src/Geometry';
import { expect, test } from 'vitest';

const logicalPoints = [
    [0, 0],
    [0, 1],
    [0, 2],
]

const logicalMultiPoints = [
    [
        [0.0, 0.0],
        [0.0, 1.0],
        [0.0, 2.0],
    ],
    [
        [1.0, 0.0],
        [1.0, 1.0],
    ],
    [
        [2.0, 0.0],
        [2.0, 1.0],
        [2.0, 2.0],
    ],
]

const logicalMultiLineStrings = [
    [
        [
            [0, 0],
            [0, 1],
            [0, 2],
        ],
    ],
    [
        [
            [1, 0],
            [1, 1],
        ],
        [
            [2, 0],
            [2, 1],
            [2, 2],
        ],
    ],
    [
        [
            [3, 0],
            [3, 1],
        ],
    ],
]

const logicalMultiPolygons = [
    [
        [
            [
                [40, 40],
                [20, 45],
                [45, 30],
                [40, 40],
            ],
        ],
        [
            [
                [20, 35],
                [10, 30],
                [10, 10],
                [30, 5],
                [45, 20],
                [20, 35],
            ],
            [
                [30, 20],
                [20, 15],
                [20, 25],
                [30, 20],
            ],
        ],
    ],
    [
        [
            [
                [30, 10],
                [40, 40],
                [20, 40],
                [10, 20],
                [30, 10],
            ],
        ],
    ],
    [
        [
            [
                [30, 20],
                [45, 40],
                [10, 40],
                [30, 20],
            ],
        ],
        [
            [
                [15, 5],
                [40, 10],
                [10, 20],
                [5, 10],
                [15, 5],
            ],
        ],
    ],
]

const testData = {
    Point: {
        cls: Points,
        logical: logicalPoints,
        bounds: [0, 0, 0, 2],
        expectedOffsets: {
            geometries: undefined,
            parts: undefined,
            rings: undefined,
        },
    },
    MultiPoint: {
        cls: MultiPoints,
        logical: logicalMultiPoints,
        bounds: [0, 0, 2, 2],
        expectedOffsets: {
            geometries: new Uint32Array([0, 3, 5, 8]),
            parts: undefined,
            rings: undefined,
        },
    },
    LineString: {
        cls: LineStrings,
        logical: logicalMultiPoints,
        bounds: [0, 0, 2, 2],
        expectedOffsets: {
            geometries: new Uint32Array([0, 3, 5, 8]),
            parts: undefined,
            rings: undefined,
        },
    },
    MultiLineString: {
        cls: MultiLineStrings,
        logical: logicalMultiLineStrings,
        bounds: [0, 0, 3, 2],
        expectedOffsets: {
            geometries: new Uint32Array([0, 1, 3, 4]),
            parts: new Uint32Array([0, 3, 5, 8, 10]),
            rings: undefined,
        },
    },
    Polygon: {
        cls: Polygons,
        logical: logicalMultiLineStrings,
        bounds: [0, 0, 3, 2],
        expectedOffsets: {
            geometries: new Uint32Array([0, 1, 3, 4]),
            parts: new Uint32Array([0, 3, 5, 8, 10]),
            rings: undefined,
        },
    },
    MultiPolygon: {
        cls: MultiPolygons,
        logical: logicalMultiPolygons,
        bounds: [5, 5, 45, 45],
        expectedOffsets: {
            geometries: new Uint32Array([0, 2, 3, 5]),
            parts: new Uint32Array([0, 1, 3, 4, 5, 6]),
            rings: new Uint32Array([0, 4, 10, 14, 19, 23, 28]),
        },
    },
};

for (const key in testData) {
    test(key, () => {
        const coords = new testData[key].cls(testData[key].logical);
        const physical = new Float64Array(testData[key].logical.flat(Infinity));
        expect(coords.buffer).toStrictEqual(physical);
        expect(coords.type).toStrictEqual(GeometryType[key as keyof typeof GeometryType]);
        expect(coords.offsets).toStrictEqual(testData[key].expectedOffsets);
        expect(coords.bounds).toStrictEqual(testData[key].bounds)
        expect(coords.length).toStrictEqual(
            testData[key].expectedOffsets.geometries
                ? testData[key].expectedOffsets.geometries.length - 1
                : physical.length / 2
        );
    });
}

export interface tilesawOptions {
    tolerance: number;
    maxZoom: number;
    extent: number;
    promoteId?: string;
    generateId: boolean;
    lineMetrics?: boolean;
}

export const defaultTilesawOptions = {
    tolerance: 3,
    maxZoom: 14,
    extent: 4096,
    generateId: false,
    lineMetrics: false
}

class tilesaw {
    constructor(options: tilesawOptions) {}
}



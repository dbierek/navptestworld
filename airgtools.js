// Create a Grid:
function createWaypoint(neighbors, x, y, z, offsetSize, i) {
    return {
        "nNeighbor0": neighbors[0],
        "nNeighbor1": neighbors[1],
        "nNeighbor2": neighbors[2],
        "nNeighbor3": neighbors[3],
        "nNeighbor4": neighbors[4],
        "nNeighbor5": neighbors[5],
        "nNeighbor6": neighbors[6],
        "nNeighbor7": neighbors[7],
        "vPos": {
            "x": x,
            "y": y,
            "z": z,
            "w": 1
        },
        "nVisionDataOffset": i * offsetSize,
        "nLayerIndex": 0
    };
}
// Check if grid point exists
function inbounds(xi, yi, nx, ny) {
    return (xi >= 0 && xi < nx && yi >= 0 && yi < ny);
}
// Get Waypoint Index of grid point
function getGridI(xi, yi, nx, ny, beforeI) {
    // Use previous waypoint indices for first row
    if (yi == -1) {
        if (!inbounds(xi, 0, nx, ny)){
            return -1;
        }
        return beforeI + xi;
    }
    // Use next waypoint indices for last row
    if (yi == ny) {
        if (!inbounds(xi, ny - 1, nx, ny)){
            return -1;
        }
        return beforeI + nx + xi;
    }
    if (!inbounds(xi, yi, nx, ny)){
        return -1;
    }
    return yi * nx + xi;
}
// Get neighbor waypoint index for neighbor number
function getNeighbor(xi, yi, nx, ny, n, beforeI) {
    let d = [[0,-1], [1,-1], [1,0], [1,1], [0,1], [-1,1], [-1,0], [-1,-1]];
    return getGridI(xi + d[n][0], yi + d[n][1], nx, ny, beforeI)
}
// Create a grid.
// Params:
// oi: Initial waypoint index to use for this point
// ox, oy, oz: Coordinates for first waypoint
// nx, ny: Width and Depth of the grid in terms of point count
// dx, dy: Distance between grid points
// beforeI: The waypoint index of the point on the previous row (y) with an column (x) of 0
function createGrid(oi, ox, oy, z, nx, ny, dx, dy, beforeI) {
    let grid = [];
    let i = oi;
    for (let yi = 0; yi < ny; yi++) {
        for (let xi = 0; xi < nx; xi++) {
            let neighbors = [];
            for (let neighborI = 0; neighborI < 8; neighborI++) {
                let ni = getNeighbor(xi, yi, nx, ny, neighborI, beforeI);
                if (ni == -1) {
                    neighbors.push(65535);
                } else {
                    if ((yi == 0 && (neighborI == 0 || neighborI == 1 || neighborI == 7)) ||
                    (yi == ny - 1 && (neighborI == 5 || neighborI == 4 || neighborI == 3))) {
                        neighbors.push(ni);
                    } else {
                        neighbors.push(oi + ni);
                    }
                }
            }
            let waypoint = createWaypoint(neighbors, ox + dx * xi, oy + dy * yi, z, 556, i);
            grid.push(waypoint);
            i++;
        }
    }
    return grid;
}
// Create the grid for the APC Area. 23377 is the first waypoint of the APC area since 23376 was the last one in the AIRG file
// Must also connect the before and after rows, so that's why it also creates a grid for the smaller area. In a future enhancement
// it will automatically connect the before and after rows.
// 4837 // 23365
// let initialX = -1.6800037622451782;
// let initialY = 608.6499633789062;
// let initialZ = 1.2378876209259033;
// 4825 // 23353
// let initialX = -1.6800037622451782;
// let initialY = 608.949951171875;
// let initialZ = 1.2378876209259033;
createGrid(4825, initialX, initialY, initialZ, 12, 34, 0.29998779296875, -0.29998779296875)
// 4849 // 23377
let initialX = -1.6800037622451782;
let initialY = 608.3499755859375;
let initialZ = 1.2378876209259033;
createGrid(23377, initialX, initialY, initialZ, 12, 32, 0.29998779296875, -0.29998779296875)

// Create visibility data for APC Area
function generateVisibilityData(waypointCount, offset) {
    return new Array(offset * waypointCount).fill(0);
}
generateVisibilityData(556, * 384);

//////// Swap two areas (used to swap the flying train AIRG with the lower train AIRG)
let xDiff = 0
let yDiff = 1.099987745284984
let zDiff = 171.0000087022781397

function swapPoints() {
    // Swap points in two bboxes
    for (let i = 0; i < AIGrids['00F7EAFFD546CE00.NAVP']['m_WaypointList'].length; i++) {
        if (AIGrids['00F7EAFFD546CE00.NAVP']['m_WaypointList'][i]["vPos"]["z"] > zSplit) {
            AIGrids['00F7EAFFD546CE00.NAVP']['m_WaypointList'][i]["vPos"]["x"] += xDiff
            AIGrids['00F7EAFFD546CE00.NAVP']['m_WaypointList'][i]["vPos"]["y"] -= yDiff
            AIGrids['00F7EAFFD546CE00.NAVP']['m_WaypointList'][i]["vPos"]["z"] -= zDiff
        } else {
            if (AIGrids['00F7EAFFD546CE00.NAVP']['m_WaypointList'][i]["vPos"]["y"] > ySplit) {
                AIGrids['00F7EAFFD546CE00.NAVP']['m_WaypointList'][i]["vPos"]["x"] -= xDiff
                AIGrids['00F7EAFFD546CE00.NAVP']['m_WaypointList'][i]["vPos"]["y"] += yDiff
                AIGrids['00F7EAFFD546CE00.NAVP']['m_WaypointList'][i]["vPos"]["z"] += zDiff
            }
        }
    }
}
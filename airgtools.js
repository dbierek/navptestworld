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
function setNeighbors(waypoint, neighbors) {
    waypoint["nNeighbor0"] = neighbors[0];
    waypoint["nNeighbor1"] = neighbors[1];
    waypoint["nNeighbor2"] = neighbors[2];
    waypoint["nNeighbor3"] = neighbors[3];
    waypoint["nNeighbor4"] = neighbors[4];
    waypoint["nNeighbor5"] = neighbors[5];
    waypoint["nNeighbor6"] = neighbors[6];
    waypoint["nNeighbor7"] = neighbors[7];
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
    // // Use next waypoint indices for last row
    // if (yi == ny) {
    //     if (!inbounds(xi, ny - 1, nx, ny)){
    //         return -1;
    //     }
    //     return beforeI + nx + xi;
    // }
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

function generateVisibilityData(waypointCount, offset) {
    return new Array(offset * waypointCount).fill(0);
}

function insertGridAndAddVisibility(oi, ox, oy, z, nx, ny, dx, dy, beforeI) {
    let newNodeCount = nx * ny;
    let grid = createGrid(oi, ox, oy, z, nx, ny, dx, dy, beforeI);
    AIGrids["00F7EAFFD546CE00.NAVP"]["m_WaypointList"].push.apply(grid);
    let visibility = generateVisibilityData(556, newNodeCount);
    AIGrids["00F7EAFFD546CE00.NAVP"]["m_pVisibilityData"].push.apply(visibility);
    AIGrids["00F7EAFFD546CE00.NAVP"]["m_nSize"] += newNodeCount;
    AIGrids["00F7EAFFD546CE00.NAVP"]["m_nNodeCount"] += newNodeCount;
}
// 23762 (where 15384 would be)
let initialX = -1.380003809928894;
let initialY = 285.84994506835935;
let initialZ = 1.2378735542297363;
createGrid(23761, initialX, initialY, initialZ, 10, 30, 0.29998779296875, -0.29998779296875, 15374);


insertGridAndAddVisibility(23761, initialX, initialY, initialZ, 10, 30, 0.29998779296875, -0.29998779296875, 15374);

function connectRowToNext(waypointI, nextI, rowLength) {
    for (let i = 0; i < rowLength; i++) {
        let waypoint = AIGrids["00F7EAFFD546CE00.NAVP"]["m_WaypointList"][wayPointI];
        let neighbors = [];
        for (let n = 0; n < 8; n++) {
            let ni = getNeighbor(i, 0, rowLength, 1, n, waypointI - rowLength);
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
        setNeighbors(waypoint, neighbors);
    }
}


/*
// 3 New points to fill out the last row
            {
                "nNeighbor0": 24051,
                "nNeighbor1": 24052,
                "nNeighbor2": 24062,
                "nNeighbor3": 15393,
                "nNeighbor4": 15392,
                "nNeighbor5": 65535,
                "nNeighbor6": 65535,
                "nNeighbor7": 65535,
                "vPos": {
                    "x": -1.380003809928894,
                    "y": 276.8503112792969,
                    "z": 1.2378735542297363,
                    "w": 1
                },
                "nVisionDataOffset": 13372356,
                "nLayerIndex": 0
            },
            {
                "nNeighbor0": 24052,
                "nNeighbor1": 24053,
                "nNeighbor2": 24063,
                "nNeighbor3": 15394,
                "nNeighbor4": 15393,
                "nNeighbor5": 15392,
                "nNeighbor6": 24061,
                "nNeighbor7": 24051,
                "vPos": {
                    "x": -1.080016016960144,
                    "y": 276.8503112792969,
                    "z": 1.2378735542297363,
                    "w": 1
                },
                "nVisionDataOffset": 13372912,
                "nLayerIndex": 0
            },
            {
                "nNeighbor0": 24053,
                "nNeighbor1": 24054,
                "nNeighbor2": 15384,
                "nNeighbor3": 15395,
                "nNeighbor4": 15394,
                "nNeighbor5": 15393,
                "nNeighbor6": 24062,
                "nNeighbor7": 24052,
                "vPos": {
                    "x": -0.780028223991394,
                    "y": 276.8503112792969,
                    "z": 1.2378735542297363,
                    "w": 1
                },
                "nVisionDataOffset": 13373468,
                "nLayerIndex": 0
            }
*/

// APC:

// Create the grid for the APC Area. 23377 is the first waypoint of the APC area since 23376 was the last one in the AIRG file
// Must also connect the before and after rows, so that"s why it also creates a grid for the smaller area. In a future enhancement
// it will automatically connect the before and after rows.
// 4837 // 23365
// let initialX = -1.6800037622451782;
// let initialY = 608.6499633789062;
// let initialZ = 1.2378876209259033;
// 4825 // 23353
// let initialX = -1.6800037622451782;
// let initialY = 608.949951171875;
// let initialZ = 1.2378876209259033;
// createGrid(4825, initialX, initialY, initialZ, 12, 34, 0.29998779296875, -0.29998779296875)
// 4849 // 23377
// let initialX = -1.6800037622451782;
// let initialY = 608.3499755859375;
// let initialZ = 1.2378876209259033;
// createGrid(23377, initialX, initialY, initialZ, 12, 32, 0.29998779296875, -0.29998779296875, 4837)

// Create visibility data for APC Area
// generateVisibilityData(556, 384);


//////// Swap two areas (used to swap the flying train AIRG with the lower train AIRG)
let xDiff = 0
let yDiff = 1.099987745284984
let zDiff = 171.0000087022781397

function swapPoints() {
    // Swap points in two bboxes
    for (let i = 0; i < AIGrids["00F7EAFFD546CE00.NAVP"]["m_WaypointList"].length; i++) {
        if (AIGrids["00F7EAFFD546CE00.NAVP"]["m_WaypointList"][i]["vPos"]["z"] > zSplit) {
            AIGrids["00F7EAFFD546CE00.NAVP"]["m_WaypointList"][i]["vPos"]["x"] += xDiff
            AIGrids["00F7EAFFD546CE00.NAVP"]["m_WaypointList"][i]["vPos"]["y"] -= yDiff
            AIGrids["00F7EAFFD546CE00.NAVP"]["m_WaypointList"][i]["vPos"]["z"] -= zDiff
        } else {
            if (AIGrids["00F7EAFFD546CE00.NAVP"]["m_WaypointList"][i]["vPos"]["y"] > ySplit) {
                AIGrids["00F7EAFFD546CE00.NAVP"]["m_WaypointList"][i]["vPos"]["x"] -= xDiff
                AIGrids["00F7EAFFD546CE00.NAVP"]["m_WaypointList"][i]["vPos"]["y"] += yDiff
                AIGrids["00F7EAFFD546CE00.NAVP"]["m_WaypointList"][i]["vPos"]["z"] += zDiff
            }
        }
    }
}
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
function getGridIWithAdjacentRows(xi, yi, nx, ny, beforeI, afterI) {
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
        return afterI + xi;
    }
    if (!inbounds(xi, yi, nx, ny)){
        return -1;
    }
    return yi * nx + xi;
}
// Get neighbor waypoint index for neighbor number
function getNeighborWithAdjacentRows(xi, yi, nx, ny, n, beforeI, afterI) {
    let d = [[0,-1], [1,-1], [1,0], [1,1], [0,1], [-1,1], [-1,0], [-1,-1]];
    return getGridI(xi + d[n][0], yi + d[n][1], nx, ny, beforeI, afterI)
}
// Create a grid.
// Params:
// oi: Initial waypoint index to use for this point
// ox, oy, oz: Coordinates for first waypoint
// nx, ny: Width and Depth of the grid in terms of point count
// dx, dy: Distance between grid points
// beforeI: The waypoint index of the point on the previous row (y) with an column (x) of 0
function createGridWithAdjacentRows(oi, ox, oy, z, nx, ny, dx, dy, beforeI, afterI) {
    let grid = [];
    let i = oi;
    for (let yi = 0; yi < ny; yi++) {
        for (let xi = 0; xi < nx; xi++) {
            let neighbors = [];
            for (let neighborI = 0; neighborI < 8; neighborI++) {
                let ni = getNeighborWithAdjacentRows(xi, yi, nx, ny, neighborI, beforeI, afterI);
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
// Pipes 1
// 24064 (where 15571 would be)
// let initialX = -1.6800037622451782;
// let initialY = 270.84994506835935;
// let initialZ = 1.1378728151321411;
// createGrid(24064, initialX, initialY, initialZ,  9, 18, 0.29998779296875, -0.29998779296875, 15562, 15628);

// insertGridAndAddVisibility(24064, initialX, initialY, initialZ, 8, 18, 0.29998779296875, -0.29998779296875, 15562, 15628);

function moveToNextRowY(waypoint, dy) {
    waypoint["vPos"]["y"] += dy;
}
function getGridI(xi, yi, nx, ny) {
    if (!inbounds(xi, yi, nx, ny)){
        return -1;
    }
    return yi * nx + xi;
}
// Get neighbor waypoint index for neighbor number
function getNeighbor(xi, yi, nx, ny, n) {
    let d = [[0,-1], [1,-1], [1,0], [1,1], [0,1], [-1,1], [-1,0], [-1,-1]];
    return getGridI(xi + d[n][0], yi + d[n][1], nx, ny)
}
function createGrid(oi, ox, oy, z, nx, ny, dx, dy) {
    let grid = [];
    let i = oi;
    for (let yi = 0; yi < ny; yi++) {
        for (let xi = 0; xi < nx; xi++) {
            let neighbors = [];
            for (let neighborI = 0; neighborI < 8; neighborI++) {
                let ni = getNeighbor(xi, yi, nx, ny, neighborI);
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

// Pipes 2
// 24226 (where 15724 would be)
// -0.48000380396842957, y: 263.3499450683594, z: 1.137872576713562
// let initialX = -0.48000380396842957;
// let initialY = 263.04995727539065;
// let initialZ = 1.137872576713562;
// createGrid(24226, initialX, initialY, initialZ,  8, 18, 0.29998779296875, -0.29998779296875);
// Barrels
// 24370 (where 15417 would be)
//  -1.6800037622451782, y: 275.949951171875, z: 1.1378730535507202
let initialX = -1.6800037622451782;
let initialY = 275.64996337890625;
let initialZ = 1.1378730535507202;
createGrid(24370, initialX, initialY, initialZ,  5, 8, 0.29998779296875, -0.29998779296875);

// Example: connectRows([15715, 15727, 15731, 15735, ...], [15716, 24226, 24234, 24242, ...], true)
function connectRows(row1, row2, isNorthSouth) {
    for (let i = 0; i < row1.length; i++) {
        if (isNorthSouth) {
            // Modify north row's south neighbors
            let waypoint = AIGrids["00F7EAFFD546CE00.NAVP"]["m_WaypointList"][row1[i]];
            if (i != 0) {
                waypoint["nNeighbor1"] = row2[i - 1];
            }
            waypoint["nNeighbor2"] = row2[i];
            if (i != row1.length - 1) {
                waypoint["nNeighbor3"] = row2[i + 1];
            }
            // Modify south row's north neighbors
            waypoint = AIGrids["00F7EAFFD546CE00.NAVP"]["m_WaypointList"][row2[i]];
            if (i != 0) {
                waypoint["nNeighbor7"] = row2[i - 1];
            }
            waypoint["nNeighbor6"] = row2[i];
            if (i != row1.length - 1) {
                waypoint["nNeighbor5"] = row2[i + 1];
            }
        } else {
            // Modify east row's west neighbors
            let waypoint = AIGrids["00F7EAFFD546CE00.NAVP"]["m_WaypointList"][row1[i]];
            if (i != 0) {
                waypoint["nNeighbor5"] = row2[i - 1];
            }
            waypoint["nNeighbor4"] = row2[i];
            if (i != row1.length - 1) {
                waypoint["nNeighbor3"] = row2[i + 1];
            }
            // Modify west row's east neighbors
            waypoint = AIGrids["00F7EAFFD546CE00.NAVP"]["m_WaypointList"][row2[i]];
            if (i != 0) {
                waypoint["nNeighbor7"] = row2[i - 1];
            }
            waypoint["nNeighbor0"] = row2[i];
            if (i != row1.length - 1) {
                waypoint["nNeighbor1"] = row2[i + 1];
            }
        }
    }
}
// Pipes Area 2
// let north = [ 15715, 15727, 15731, 15735, 15739, 15743, 15747, 15751, 15755, 15759, 15763, 15767, 15771, 15775, 15779, 15783, 15787, 15791, 15795, 15799 ];
// let south = [ 15716, 24226, 24234, 24242, 24250, 24258, 24266, 24274, 24282, 24290, 24298, 24306, 24314, 24322, 24330, 24338, 24346, 24354, 24362, 15800 ];
// let rightEast = [ 15715, 15716, 15717, 15718, 15719, 15720, 15721, 15722, 15723 ];
// let rightWest = [ 15727, 24226, 24227, 24228, 24229, 24230, 24231, 24232, 24233 ];
// let leftEast = [ 15795, 24362, 24363, 24364, 24365, 24366, 24367, 24368, 24369 ];
// let leftWest = [ 15799, 15800, 15801, 15802, 15803, 15804, 15805, 15806, 15807 ];
// Barrels Area
let north = [15416, 24374, 24379, 24384, 24389, 24394, 24399, 24404, 24409, 15482];
let south = [15417, 15424, 15431, 15438, 15445, 15452, 15458, 15464, 15471, 15483];
let rightEast = [15412, 15413, 15414, 15415, 15416, 15417];
let rightWest = [24370, 24371, 24372, 24373, 24374, 15424];
let leftEast = [24405, 24406, 24407, 24408, 24409, 15471];
let leftWest = [15478, 15479, 15480, 15481, 15482, 15483];

connectRows(north, south, true);
connectRows(rightEast, rightWest, false)
connectRows(leftEast, leftWest, false)

/*
Three new waypoints for Logs area.
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

// Logs Area
// // 23762 (where 15384 would be)
// let initialX = -1.380003809928894;
// let initialY = 285.84994506835935;
// let initialZ = 1.2378735542297363;
// createGrid(23761, initialX, initialY, initialZ, 10, 30, 0.29998779296875, -0.29998779296875, 15374);
// insertGridAndAddVisibility(23761, initialX, initialY, initialZ, 10, 30, 0.29998779296875, -0.29998779296875, 15374);

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
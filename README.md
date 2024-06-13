# NAVP Test World
## A Hitman: World of Assassination Mod for testing Navmeshes
![Navp Test World](https://github.com/dbierek/NavpTestWorld/blob/main/blobs/images/atomicforce/navptestworld/background.jpg?raw=true)
![Current NAVP visualization](https://github.com/dbierek/NavpTestWorld/blob/main/blobs/images/navviewer/img.png?raw=true)
### Mod description:
This mod is designed to test custom Navmeshes created using NavTool in [ZHMTools](https://github.com/OrfeasZ/ZHMTools).  
To use the new updates to [NavTool](https://github.com/OrfeasZ/ZHMTools/tree/master/Tools/NavTool/Src), download the NavTool-win-x64.zip file from the latest release of ZHMTools and extract the contents. Then go to the folder where `NavTool.exe` is and launch the `NavTool.exe` executible with the appropriate arguments using the following instructions:  
It will read from NAVP or JSON depending on the filename in the first argument. If the filename contains JSON it will open and parse that JSON file.   
### Writing to NAVP:  
Use the `--navp` flag and enter the output filename.  
*Example:*  
`NavTool.exe 00F7EAFFD546CE00.NAVP.JSON --navp 00F7EAFFD546CE00.NAVP`  
### Writing to JSON:  
Use the `--json` flag and enter the output filename. I recommend naming the file `[HASHCODE].NAVP.JSON`, but it can be anything as long as it ends in .JSON.  
*Example:*  
`NavTool.exe 009F622BC6A91CC4.NAVP --json 009F622BC6A91CC4.NAVP.JSON`  
### Using the NAVP file in a scenario
Then once you have your NAVP file, you can set a scenario to use it by setting the `m_NavpowerResourceID` property of the `[modules:/zpathfinderconfiguration.class].pc_entitytype` entity of the scenario to your NAVP file.  
For instance, if you have a NAVP file with the ioi string `[assembly:/_pro/scenes/atomicforce/missions/navptestworld/scene_navp_test_world.navp].pc_navp`, name it `009F622BC6A91CC4.NAVP` and reference it like so.  
```
{
  "parent": "feeda7528f32d6f9",
  "name": "PathfinderConfiguration",
  "factory": "[modules:/zpathfinderconfiguration.class].pc_entitytype",
  "blueprint": "[modules:/zpathfinderconfiguration.class].pc_entityblueprint",
  "properties": {
    "m_NavpowerResourceID": {
      "type": "ZRuntimeResourceID",
      "value": {
        "resource": "[assembly:/_pro/scenes/atomicforce/missions/navptestworld/scene_navp_test_world.navp].pc_navp",
        "flag": "5F"
      }
    }
  }
}
```
### Visualizing the NAVP  
You can also view it using [NavViewer](https://github.com/OrfeasZ/ZHMTools/tree/master/Tools/NavViewer), which is also in ZHMTools.  
1. Run `NavTool.exe` with the only argument being the filename of the NAVP you want to visualize and output the contents to a file. For instance to output to `00F7EAFFD546CE00.js` like so `NavTool.exe 00F7EAFFD546CE00.NAVP > 00F7EAFFD546CE00.js`.  
2. Copy the contents of that file output to `NavMeshes.js` in the NavViewer folder.  
3. Start an http server in the NavViewer folder. One option is the npm package `http-server`, which you can install via `npm install --global http-server`. Then you can just run `http-server -c-1` from the NavViewer folder.  
4. Navigate to that URL, for instance `http://127.0.0.1:8080`.  
### Installation instructions:
1. Download a release zip file.
2. Import it using SMF (Simple Mod Framework: https://github.com/atampy25/simple-mod-framework).
3. Click Deploy.
4. Launch Hitman in Offline mode.

**Current release uses NavpJsonVersion 0.1.**  
**NavpJsonVersion 0.1**
Example:
```
{
  "Areas": [
    {
      "Area": { "Index": 1 },
      "Edges": [
        {
          "Position": { "X": -22.8499, "Y": -12.9597, "Z": -1.3357 },
          "Flags": 662
        },
        {
          "Position": { "X": -21.75, "Y": -15.85, "Z": -1.3504 },
          "Flags": 451
        },
        {
          "Adjacent Area": 2,
          "Position": { "X": -20.75, "Y": -12.9497, "Z": -1.3505 },
          "Flags": 1772
        }
      ]
    },
    {
      "Area": { "Index": 2, "Type": "Steps" },
      "Edges": [
        {
          "Adjacent Area": 3,
          "Position": { "X": -20.75, "Y": -8.4714, "Z": 1.6817 },
          "Flags": 1776
        },
        { "Position": { "X": -22.5496, "Y": -8.48, "Z": 1.6943 } },
        { "Position": { "X": -22.85, "Y": -8.55, "Z": 1.65 } },
        {
          "Adjacent Area": 1,
          "Position": { "X": -22.8499, "Y": -12.9597, "Z": -1.3357 },
          "Flags": 1772
        },
        { "Position": { "X": -20.75, "Y": -12.9497, "Z": -1.3505 } }
      ]
    },
    {
      "Area": { "Index": 3, "Type": "Steps" },
      "Edges": [
        { "Position": { "X": -22.55, "Y": -8.25, "Z": 1.85 } },
        {
          "Adjacent Area": 2,
          "Position": { "X": -22.5496, "Y": -8.48, "Z": 1.6943 },
          "Flags": 1776
        },
        { "Position": { "X": -20.75, "Y": -8.4714, "Z": 1.6817 } },
        {
          "Position": { "X": -20.75, "Y": -6.45, "Z": 3.0503 },
          "Type": "Portal",
          "Flags": 594
        }
      ]
    }
  ],
  "NavpJsonVersion": "0.1"
}
```

### Credits:

NavTool - NoFaTe and Anthony Fuller - https://github.com/AnthonyFuller/NavPower-Research,   https://github.com/OrfeasZ/ZHMTools, https://github.com/AnthonyFuller  
RPKG - Notex, AnthonyFuller, RDIL, 2kpr, Atampy25 - https://glaciermodding.org/rpkg/, https://github.com/glacier-modding/RPKG-Tool  
Simple Mod Framework - Atampy25 - https://github.com/atampy25/simple-mod-framework  
Quickentity Editor - Atampy25 - https://github.com/atampy25/quickentity-editor-next  
HM3CustomMaps / h3-custom-scenes- Notex - https://github.com/Notexe/HM3CustomMaps, https://github.com/Notexe/h3-custom-scenes  
AI Navigation Grid and Navmesh - 2kpr, Notex - https://github.com/2kpr  
ZHM Tools - OrfeasZ / NoFaTe, Anthony Fuller - https://github.com/OrfeasZ/ZHMTools  
Thanks to everyone at the Glacier 2 Modding discord! - https://discord.gg/6UDtuYhZP6  

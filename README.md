# NAVP Test World
## A Hitman: World of Assassination Mod for testing Navmeshes
![Navp Test World](https://github.com/dbierek/NavpTestWorld/blob/main/blobs/images/atomicforce/navptestworld/background.jpg?raw=true)
![Current NAVP visualization](https://github.com/dbierek/NavpTestWorld/blob/main/blobs/images/navviewer/img.png?raw=true)
### Mod description:
This mod is designed to test custom Navmeshes created using [some new enhancements to NavTool](https://github.com/OrfeasZ/ZHMTools/compare/master...dbierek:ZHMTools-dbierek:tony-navtool-updates) in [ZHMTools](https://github.com/OrfeasZ/ZHMTools)
### Installation instructions:
1. Download a release zip file.
2. Import it using SMF (Simple Mod Framework: https://github.com/atampy25/simple-mod-framework).
3. Click Deploy.
4. Launch Hitman in Offline mode.

Current release uses NavpJsonVersion 0.1.  
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

<p align="center">
  <img src="https://raw.githubusercontent.com/EmuLnk/emulnk/master/.github/assets/logo.svg" alt="EmuLnk" width="80"/>
</p>

<p align="center">
  <strong>EmuLnk Repository</strong><br/>
  Themes, game profiles, and system configurations for EmuLnk.
</p>

<p align="center">
  <a href="https://github.com/EmuLnk/emulnk"><img src="https://img.shields.io/badge/Main_Project-EmuLnk-B47CFF?style=for-the-badge&logo=github&logoColor=white" alt="EmuLnk"/></a>
</p>

---

## Contents

```
consoles.json                              # System definitions (id, console, port, packageNames)
index.json                                 # Theme catalog for the in-app gallery (v2)
profiles/*.json                            # Game profiles with memory data points
covers/                                    # Game cover images (WebP, named {profileId}.webp)
icons/                                     # Console icons (WebP, named {console}.webp)
themes/{console}/{profileId}/{themeId}/    # Theme, overlay, and bundle folders
scripts/validate.js                        # CI validation script
```

### Folder Structure

```
themes/
  GCN/
    GZL/
      GZLNavigator/        # theme  - minimap
      GZLSeaOverlay/       # overlay - draggable widgets
  GBC/
    PMC/
      PMCCompanion/        # theme  - companion
      PMCBattleOverlay/    # overlay - type badges + move effectiveness
  GBA/
    BPE/
      BPEPartyHUD/         # theme  - party viewer
  NDS/
    IPKE/
      IPKETypeBadges/      # overlay - type badges
      IPKEMoveEff/         # overlay - move effectiveness
  3DS/
    MH4U/
      MH4UMonsterIntel/    # overlay - monster HP
  PSP/
    MHFU/
      MHFUHunterHUD/       # theme  - HP bar + radar
  PS1/
    FF7/
      FF7BattleHUD/        # theme  - enemy HP + weaknesses
  SNES/
    SM/
      SMVisor/             # theme  - status HUD
  NES/
    M1/
      M1Automap/           # theme  - auto-map
  N64/
    GE/
      GEMissionHUD/        # theme  - mission HUD
  Genesis/
    PSIV/
      PSIVComboCodex/      # theme  - combo tracker
```

## Documentation

| Resource | Description |
|----------|-------------|
| [Getting Started](https://github.com/EmuLnk/emulnk-repo/wiki/Getting-Started) | First theme walkthrough |
| [Theme Format](https://github.com/EmuLnk/emulnk-repo/wiki/Theme-Format) | Manifest and file structure |
| [Theme API](https://github.com/EmuLnk/emulnk-repo/wiki/Theme-API) | JavaScript bridge methods |
| [Profile Format](https://github.com/EmuLnk/emulnk-repo/wiki/Profile-Format) | Data point definitions |
| [Platform Quirks](https://github.com/EmuLnk/emulnk-repo/wiki/Platform-Quirks) | System-specific memory notes |
| [Contributing](https://github.com/EmuLnk/emulnk-repo/wiki/Contributing) | How to submit themes and profiles |

## Project Repos

| Repo | Description |
|------|-------------|
| [`emulnk`](https://github.com/EmuLnk/emulnk) | Android companion app |
| **`emulnk-repo`** | **Themes, profiles, and system configs** |
| [`retroarch-lnk`](https://github.com/EmuLnk/retroarch-lnk) | RetroArch fork with UDP protocol |
| [`dolphin-lnk`](https://github.com/EmuLnk/dolphin-lnk) | Dolphin fork with UDP protocol |
| [`ppsspp-lnk`](https://github.com/EmuLnk/ppsspp-lnk) | PPSSPP fork with UDP protocol |
| [`melonds-lnk`](https://github.com/EmuLnk/melonDS-lnk) | melonDS fork with UDP protocol |
| [`azahar-lnk`](https://github.com/EmuLnk/azahar-lnk) | Azahar (3DS) fork with UDP protocol |

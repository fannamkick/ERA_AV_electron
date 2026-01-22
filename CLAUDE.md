# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

erAV_Ho v0.022 is a Japanese adult SLG (Simulation Game) built on the eramaker/erabasic platform, running via the Emuera emulator. This is a derivative/fan variant of the original erAV game.

**Language**: Japanese (UI, documentation, code comments)
**Runtime**: Emuera1824+v9.exe (erabasic interpreter)
**No build step required** - ERB files are interpreted at runtime.

## Running the Game

```
Emuera1824+v9.exe
```

The game loads ERB scripts from `ERB/` and character data from `CSV/`. Save games are stored in `sav/`.

## Project Structure

```
├── Emuera1824+v9.exe          # Game engine
├── emuera.config              # Runtime configuration
├── CSV/                       # Data files (characters, abilities, parameters)
├── ERB/                       # Source code (erabasic scripts)
├── 資料/                      # Documentation and templates
└── sav/                       # Save data
```

## ERB Code Architecture

ERB files are organized by feature domain under `ERB/`:

| Directory | Purpose |
|-----------|---------|
| `システム関係/` | Core systems (character info, shops, saves) |
| `イベント関係/` | Events (opening, ending, daily cycles, pregnancy) |
| `イベント関係/NTR関係/` | Relationship/NTR events |
| `イベント関係/職業素質系/` | Career paths (idol, model, club) |
| `指導関係/` | Training system (99 files, COMF0-COMF92 commands) |
| `能力上昇関係/` | Ability/skill level-up handlers |
| `娼館関係/` | Brothel/work systems |
| `訪問関係/` | Character visit/consultation systems |
| `ミッション関係/` | Character-specific missions |
| `実績関係/` | Achievement system |
| `ＡＶ撮影関係/` | AV filming mechanics |
| `クリアボーナス関係/` | Clear bonus features |
| `TIPS関係/` | In-game tips/help |

### Key Files

- **COMABLE.ERB** (148KB) - Command availability logic (largest file)
- **ZNAME.ERB** (65KB) - Character naming system
- **EVENT_TRAIN_MESSAGE_A/B.ERB** - Training event messages (~200KB combined)
- **ACTRESS_INFO.ERB** (143KB) - Character information display

### Training Command Pattern

Training commands follow a modular pattern with 92 individual files (`COMF0.ERB` through `COMF92.ERB`). Each command file handles a specific action type. `COMABLE.ERB` manages command availability conditions.

## CSV Data Structure

Character data files follow naming pattern: `Chara##_[Name].csv`

Key CSV files:
- `BASE.csv` - Base game configuration
- `Abl.csv` - Ability definitions
- `Palam.csv` - Parameter definitions
- `GameBase.csv` - Game settings
- `Chara*.csv` - Individual character data (100+ characters)

## Documentation

- `readme.txt` - Main documentation, license info
- `とりくみ.txt` - Detailed version changelog
- `todo.txt` - Outstanding work items
- `資料/フラグまとめ.txt` - Flag/condition documentation
- `資料/口上テンプレート/` - Dialogue templates for new content

## Erabasic Language Notes

- ERB files use erabasic syntax (era game scripting language)
- Labels defined with `@LABEL_NAME`
- Variables: `LOCAL`, `ARG`, character stats via arrays
- Control flow: `IF/ELSEIF/ELSE/ENDIF`, `SELECTCASE`, `FOR/NEXT`
- Output: `PRINT`, `PRINTL`, `PRINTFORM` (with variable interpolation)
- User input: `INPUT`, `INPUTS`, `ONEINPUT`

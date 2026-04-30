# Legacy Mapping Inventory

## 요약

- VariableSize family: 107
- family ownership entries: 107
- source addresses: 3108
- families in inventory: 116
- CSV definition addresses: 1449
- Chara seed addresses: 459
- ERB usage addresses: 1797
- ERH usage addresses: 1

## Mapping Actions

| action | count |
| --- | ---: |
| `define-pattern-mapping` | 30 |
| `definition-only` | 701 |
| `exclude-script-scratch` | 224 |
| `family-only-review` | 19 |
| `map-save-state` | 1215 |
| `map-session-state` | 365 |
| `needs-review` | 549 |
| `reserved-review` | 5 |

## Address Kinds

| kind | count |
| --- | ---: |
| `dynamic-index` | 39 |
| `family-declaration` | 107 |
| `fixed-index` | 2772 |
| `scalar-or-family` | 6 |
| `script-scratch` | 184 |

## Diagnostics

- Missing definition files: 0
- Decode warnings: 0
- Invalid Chara rows: 0
- Unmapped Chara row kinds: 0

## Families Referenced In Code But Not Declared In VariableSize

- `CALLNAME`
- `CHARANUM`
- `CHARASALES`
- `ISASSI`
- `ITEMPRICE`
- `NAME`
- `NICKNAME`
- `NO`
- `SAVEDATA`

## Families Without Current Family Ownership

- `CALLNAME`
- `CHARANUM`
- `CHARASALES`
- `ISASSI`
- `ITEMPRICE`
- `NAME`
- `NICKNAME`
- `NO`
- `SAVEDATA`

## Outputs

- `data/legacy-mapping/source-addresses.json`
- `data/legacy-mapping/source-addresses.tsv`

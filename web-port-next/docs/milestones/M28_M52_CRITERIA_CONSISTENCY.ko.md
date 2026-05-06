# M28~M52 Criteria Consistency Pass

Generated: 2026-05-05

This is the final criteria-side consistency pass. It verifies that completion criteria artifacts exist and agree at a high level. It does not claim implementation completion.

## Result

Criteria baseline status: **complete**

Evidence:
- Consistency report: `data/coverage/manifests/M28-M52-criteria-consistency.json`
- All M28~M52 source-unit manifests exist.
- 4 manifests currently have `completedAllowedNow: true`; 22 remain false.
- Aggregate manifest totals:
  - total units: 11,247
  - implemented-verified: 8,820
  - blocked: 2,036
  - scope-redesign-required: 99
  - approved-excluded: 273

M28 is now closed under the source-unit manifest rule:
- 24 SHOP_MAIN menu rows are `implemented-verified`.
- 3 BOYFRIEND event-local session rows are `approved-excluded` from M28 and remain owned by M47.
- `npm run gate:milestone-scope-closure -- M28` passes with `responsibilityIntegrity`.

M29 is now closed under the source-unit manifest rule:
- 83 purchase/listing/result rows are `implemented-verified`.
- 123 non-purchase/use/equipment/recruit/event/downstream rows are `approved-excluded` from M29 ownership and remain assigned to receiving owner milestones.
- All 123 M29 approved exclusions are explicit inbound responsibility in receiver manifests: M30 49, M31 48, M34 12, M35 2, M32 4, M37 2, M47 4, M48 1, M49 1.
- The newly added receiver rows are `blocked`, so they do not silently complete later milestones.
- `npm run gate:shop-purchase-coverage` and `npm run gate:milestone-scope-closure -- M29` pass with M29 ownedTotal 83.

M30 is now closed under the source-unit manifest rule:
- 37 immediate item-use flow/effect rows are `implemented-verified`.
- 37 non-M30 special training, clothing/cosplay, and training availability rows are `approved-excluded` from M30 ownership.
- All 37 M30 approved exclusions are explicit blocked inbound responsibility in receiver manifests: M34 3, M41 6, M42 18, M43 8, M44 2.
- `npm run gate:item-use-coverage` and `npm run gate:milestone-scope-closure -- M30` pass with M30 ownedTotal 37.

M31 is now closed under the source-unit manifest rule:
- 127 recruit listing, flow, visible listing session, and recruit session buffer rows are `implemented-verified`.
- 110 non-M31 character seed, lifecycle, event hook, unused source, and aggregate source-review rows are `approved-excluded` from M31 ownership.
- Receiver-owned M31 approved exclusions are explicit blocked inbound responsibility: M32 20, M33 74, M34 4, M35 1, M47 3.
- `npm run gate:recruit-coverage` and `npm run gate:milestone-scope-closure -- M31` pass with M31 ownedTotal 127.

## Registry Enforcement

`coverage-gate-registry.json` now has contracts for every M28~M52 manifest.

The registry is generated from `tools/build_coverage_gate_registry.mjs`. M28~M34 were added to the generated contract set, then `npm run coverage:gate-registry` regenerated the registry with 26 milestone contracts.

Validation:
- `npm run gate:coverage-hardening` passed with 26 contract(s), 20 coverage file(s), and 9 final script(s).
- `data/coverage/manifests/M28-M52-criteria-consistency.json` reports no missing registry contracts.

## Completion Rule

After this pass, criteria-side setup is complete enough to stop inventing new checklist rules ad hoc. Future work must close units by changing manifest status through evidence:

- `implemented-verified`
- `approved-excluded`
- `blocked`
- `scope-redesign-required`

No milestone may be marked complete from checklist text, mapped status, source-file-review, static profile, line index, or narrative sign-off.

## Next Work

The next work is no longer criteria discovery. It is closure/implementation work:

1. Resolve or redesign remaining M34.5~M52 `blocked` and `scope-redesign-required` units.
2. Keep registry contracts current by changing `tools/build_coverage_gate_registry.mjs`, then regenerating `coverage-gate-registry.json`.
3. Only after owned units are closed should implementation/verdict milestones advance.

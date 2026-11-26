# Week 5 – Findings (Part C)

Tools: Ruff (config in `week5/pyproject.toml`, max complexity 5) and Pylint, run on `legacy_fees.py`.
Raw output: `docs/week5/before.txt`.

- **Ruff:** 17 problems. The handout lists 16; our Ruff version also reports `PLR0917` (too many positional arguments).
- **Pylint:** 4.86/10.

## Findings table

| Rule | Count | Smell (lecture name) | Refactoring |
|---|---|---|---|
| F401 | 2 | Dead code (unused imports) | Delete the imports |
| PLR2004 | 6 | Magic numbers | Replace with named constants / an enum |
| C901 | 1 | Long method / complex conditional (`calc` complexity 9) | Replace the `if/elif` on the type code with a rate table |
| PLR0913 / PLR0917 | 1 + 1 | Long parameter list (6 arguments) | Remove the unused `y`; make `discount` and `extras` keyword-only |
| ARG001 | 1 | Dead code (unused parameter `y`) | Remove the parameter |
| B006 | 1 | Mutable default argument (`extra=[]`) | Use an immutable default `extras=()` |
| E711 / E712 | 1 + 1 | Non-idiomatic comparisons (`!= None`, `== True`) | `if summer:` and a default of `0` for the discount |
| F841 | 1 | Dead code (unused variable `tmp`) | Delete the variable |
| N802 | 1 | Inconsistent naming (`ProcessAll`) | Rename to `process_all` |

## C2. Smells the tools did not report
1. **Mysterious names:** `d`, `t`, `y`, `s`, `x`, `st`, `e` say nothing about what they hold; a comment is needed just to explain `t`.
2. **Primitive obsession:** student types are the numbers `1/2/3`, and a course is a dictionary `{"h": ...}` instead of a small class.
3. **Duplicated code:** `ProcessAll` has two almost identical `calc(...)` calls, and `report` repeats the same type checks as `calc`.
4. **Mixed responsibilities:** `report` and `ProcessAll` both calculate *and* print, so the results cannot be reused or tested without reading the console.

## The hidden bug in `ProcessAll`
Running the handout's example prints `Sara 1050` and `Omar 1050`, but Omar is a scholarship student and should pay 0.
`ProcessAll` only sets `fee` inside `if type == 1` and `if type == 2`; for type 3 neither runs, so `fee` still holds the previous student's value and Omar is charged Sara's fee.
If Omar were first in the list, `fee` would not exist yet and the function would crash with `UnboundLocalError`; Pylint already warns about this (`E0606: possibly-used-before-assignment`).
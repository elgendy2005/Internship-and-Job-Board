# Task C1: Code smells in legacy_invoice.py

| Smell | Where | Principle it breaks |
|---|---|---|
| Long if/elif chain on `kind` | loop body + after loop | OCP: a new student type means editing this function |
| Magic numbers (1200, 0.5, 2000, 5000) | fee lines inside and after the loop | Readability: values have no name, and 1200 is repeated |
| One function calculates, formats, writes a file and prints | whole `make_invoice` | SRP: four different reasons to change |
| File opened with `open()` and not `with`, hard-wired to the disk | `f = open(...)` lines | DIP: depends on a concrete file; can't be tested without writing to disk |
| Fee worked out per course although only total hours matter | `for code in student.courses` loop | Unnecessary complexity (KISS): `student.total_hours` already exists |
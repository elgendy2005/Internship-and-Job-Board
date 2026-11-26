"""Convert a numeric score into a letter grade."""

MIN_SCORE = 0
MAX_SCORE = 100
GRADE_BOUNDARIES = (
    (90, "A"),
    (80, "B"),
    (70, "C"),
    (60, "D"),
)
FAIL_GRADE = "F"


def letter_grade(score):
    """Return the letter grade for a score between 0 and 100."""
    if not MIN_SCORE <= score <= MAX_SCORE:
        raise ValueError("Score must be between 0 and 100")
    for boundary, grade in GRADE_BOUNDARIES:
        if score >= boundary:
            return grade
    return FAIL_GRADE

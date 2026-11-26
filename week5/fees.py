"""Tuition fee calculation, refactored from legacy_fees.py."""

from dataclasses import dataclass
from enum import Enum

FEE_PER_HOUR = 350
HIGH_FEE_LIMIT = 6000
HIGH_FEE_REDUCTION = 200
SUMMER_FEE = 150


class StudentType(Enum):
    """Kinds of student. Each kind pays a different share of the fee."""

    REGULAR = 1
    STAFF_CHILD = 2
    SCHOLARSHIP = 3


@dataclass(frozen=True)
class Course:
    """A registered course and its credit hours."""

    hours: int


RATES = {
    StudentType.REGULAR: 1,
    StudentType.STAFF_CHILD: 0.5,
    StudentType.SCHOLARSHIP: 0,
}

LABELS = {
    StudentType.REGULAR: "Student",
    StudentType.STAFF_CHILD: "Staff child",
    StudentType.SCHOLARSHIP: "Scholarship",
}


def tuition_fee(courses, kind, summer=False, *, discount=0, extras=()):
    """Return the tuition fee for a student's courses."""
    hours = sum(course.hours for course in courses)
    total = hours * FEE_PER_HOUR * RATES[kind]
    if total > HIGH_FEE_LIMIT:
        total -= HIGH_FEE_REDUCTION
    if summer:
        total += SUMMER_FEE
    return total - discount + sum(extras)


def report(courses, kind, summer=False):
    """Return the fee as printable text; printing is left to the caller."""
    fee = tuition_fee(courses, kind, summer)
    text = f"{LABELS[kind]} fee: {fee}"
    if fee > HIGH_FEE_LIMIT:
        text += "\nHigh fee"
    return text


def process_all(students):
    """Return every student's fee by name. All student types are handled."""
    return {
        student["name"]: tuition_fee(
            student["courses"], student["type"], student["summer"]
        )
        for student in students
    }

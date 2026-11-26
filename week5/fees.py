from enum import Enum

FEE_PER_HOUR = 350
HIGH_FEE_LIMIT = 6000
HIGH_FEE_REDUCTION = 200
SUMMER_FEE = 150


class StudentType(Enum):
    REGULAR = 1
    STAFF_CHILD = 2
    SCHOLARSHIP = 3


RATES = {
    StudentType.REGULAR: 1,
    StudentType.STAFF_CHILD: 0.5,
    StudentType.SCHOLARSHIP: 0,
}


def tuition_fee(courses, kind, summer=False, discount=0, extras=[]):
    hours = sum(course["h"] for course in courses)
    total = hours * FEE_PER_HOUR * RATES[kind]
    if total > HIGH_FEE_LIMIT:
        total -= HIGH_FEE_REDUCTION
    if summer:
        total += SUMMER_FEE
    return total - discount + sum(extras)


def report(courses, kind, summer=False):
    fee = tuition_fee(courses, kind, summer)
    if kind == StudentType.REGULAR:
        print("Student fee: " + str(fee))
    elif kind == StudentType.STAFF_CHILD:
        print("Staff child fee: " + str(fee))
    if fee > HIGH_FEE_LIMIT:
        print("High fee")
    return fee


def process_all(students):
    for student in students:
        if student["type"] == StudentType.REGULAR:
            fee = tuition_fee(
                student["courses"], StudentType.REGULAR, student["summer"]
            )
        if student["type"] == StudentType.STAFF_CHILD:
            fee = tuition_fee(
                student["courses"], StudentType.STAFF_CHILD, student["summer"]
            )
        print(student["name"], fee)
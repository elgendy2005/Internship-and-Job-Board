FEE_PER_HOUR = 1200


class RegularPolicy:
    def fee(self, hours):
        return hours * FEE_PER_HOUR


class ScholarshipPolicy:
    RATE = 0.5

    def fee(self, hours):
        return hours * FEE_PER_HOUR * self.RATE


class InternationalPolicy:
    RATE = 2000
    SERVICE_FEE = 5000

    def fee(self, hours):
        return hours * self.RATE + self.SERVICE_FEE


def make_invoice(student, kind):
    hours = student.total_hours
    total = 0
    if kind == "regular":
        total = RegularPolicy().fee(hours)
    elif kind == "scholarship":
        total = ScholarshipPolicy().fee(hours)
    elif kind == "international":
        total = InternationalPolicy().fee(hours)
    text = "Invoice for " + student.student_id + ": " + str(int(total)) + " EGP"
    f = open("invoice_" + student.student_id + ".txt", "w")
    f.write(text)
    f.close()
    print(text)
    return total
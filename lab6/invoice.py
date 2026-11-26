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


POLICIES = {
    "regular": RegularPolicy(),
    "scholarship": ScholarshipPolicy(),
    "international": InternationalPolicy(),
}


def make_invoice(student, kind):
    policy = POLICIES[kind]
    total = policy.fee(student.total_hours)
    text = f"Invoice for {student.student_id}: {int(total)} EGP"
    f = open("invoice_" + student.student_id + ".txt", "w")
    f.write(text)
    f.close()
    print(text)
    return total
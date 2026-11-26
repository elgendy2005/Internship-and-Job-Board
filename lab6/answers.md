# Lab 6 Answers

## Task A1
**Does 100% coverage prove the code is correct?**
No. Coverage only shows that every line ran during the tests, not that the code does the right thing: our code was at 100% coverage while `drop` still raised a `KeyError` for an unregistered course.
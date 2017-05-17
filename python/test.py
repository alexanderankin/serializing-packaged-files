import sys
sys.path.insert(0, "./build/lib.linux-x86_64-2.7/")

import hello

class test(object):
  def __init__(self):
    super(test, self).__init__()
    self.things = "ok"

  def __nonzero__(self):
    print("o")
    return True


# hello.hello("ok")

print("initializing in python")

t = test()
t.hello = hello.hello

t.hello("ok")
print(t.things)

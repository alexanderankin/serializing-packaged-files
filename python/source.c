#include <Python.h>

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static char * hello(char * argument);
static char * hello(char * argument)
{
  int length = strlen(argument);
  char *result = malloc(length + 1);
  strcpy(result, argument);
  return result;
}

static PyObject * hello_wrapper(PyObject * self, PyObject * args)
{
  char * input;
  char * result;
  PyObject * ret;

  printf("dice\n");

  PyObject * none = Py_None;
  Py_INCREF(none);

  if (self != none)
  {
    printf("not None\n");
    if (PyObject_GetAttrString(self, "things"))
    {
      printf("have landing\n");
    }
    else
    {
      printf("no dice\n");
    }
  }
  Py_DECREF(none);

  // parse arguments
  if (!PyArg_ParseTuple(args, "s", &input)) {
    return NULL;
  }

  // run the actual function
  result = hello(input);

  // build the resulting string into a Python object.
  ret = PyString_FromString(result);
  free(result);

  return ret;
}


static PyMethodDef HelloMethods[] = {
 { "hello", hello_wrapper, METH_VARARGS, "Say hello" },
 { NULL, NULL, 0, NULL }
};

DL_EXPORT(void) inithello(void)
{
  printf("hello module loaded successfully\n");
  Py_InitModule("hello", HelloMethods);
}

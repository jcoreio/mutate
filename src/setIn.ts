import updateIn from './updateIn'

function setIn<T>(obj: T, path: Iterable<any>, newValue: any): T {
  return updateIn(obj, path, () => newValue)
}

export default setIn

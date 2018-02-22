// @flow

import updateIn from './updateIn'

function setIn<T: Object>(obj: T, path: Iterable<any>, newValue: any): T {
  return updateIn(obj, path, () => newValue)
}

module.exports = setIn

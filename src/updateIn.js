// @flow

import {getIterator} from 'iterall'

function _updateIn<T>(obj: T, path: Iterable<any>): T {
  const notSetValue = arguments.length === 4 ? arguments[2] : undefined
  const updater = arguments.length === 4 ? arguments[3] : arguments[2]

  const iterator: Iterator<any> = getIterator(path)
  let iteratorNormalCompletion = false

  function helper(obj: any, isSet: boolean): any {
    const {value: _key, done} = iterator.next()
    iteratorNormalCompletion = done
    if (done) {
      return updater(isSet ? obj : notSetValue)
    }
    const key: any = _key
    if (!(obj instanceof Object)) {
      throw new Error('the given path does not exist in the object')
    }
    const oldValue = obj[key]
    const newValue = helper(oldValue, key in obj)
    if (newValue === oldValue) return obj
    if (Array.isArray(obj)) {
      return [...obj.slice(0, key), newValue, ...obj.slice(key + 1)]
    }
    return {...obj, [key]: newValue}
  }

  try {
    return helper(obj, true)
  } finally {
    if (!iteratorNormalCompletion && typeof (iterator: any).return === 'function') (iterator: any).return()
  }
}

type UpdateIn = (
  (<T>(obj: T, path: Iterable<any>, notSetValue: any, updater: (value: any) => any) => T) &
  (<T>(obj: T, path: Iterable<any>, updater: (value: any) => any) => T)
  )

const updateIn: UpdateIn = (_updateIn: any)

export default updateIn

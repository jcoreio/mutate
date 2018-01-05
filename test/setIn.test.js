// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'

import {setIn} from '../src'

describe('setIn', () => {
  it('returns updated copy if value is different', () => {
    expect(
      setIn(
        {
          a: {
            b: [
              1,
              2,
            ],
            e: 1,
          },
          f: 1,
        },
        ['a', 'b', 0],
        5
      )
    ).to.deep.equal(
      {
        a: {
          b: [
            5,
            2,
          ],
          e: 1,
        },
        f: 1,
      }
    )
  })
  it('returns same object if value is the same', () => {
    const obj = {
      a: {
        b: [
          1,
          2,
        ],
        e: 1,
      },
      f: 1,
    }
    expect(
      setIn(
        obj,
        ['a', 'b', 0],
        1
      )
    ).to.equal(obj)
  })
  it('throws an error if the path does not exist in the object', () => {
    expect(() => setIn({foo: {bar: 'baz'}}, ['foo', 'bar', 'baz'], 'qux')).to.throw(Error)
  })
})

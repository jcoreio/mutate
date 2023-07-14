import { describe, it } from 'mocha'
import { expect } from 'chai'
import { updateIn } from '../src'
describe('updateIn', () => {
  it('returns updated copy if value is different', () => {
    expect(
      updateIn(
        {
          a: {
            b: [1, 2],
            e: 1,
          },
          f: 1,
        },
        ['a', 'b', 0],
        (v: any) => v + 5
      )
    ).to.deep.equal({
      a: {
        b: [6, 2],
        e: 1,
      },
      f: 1,
    })
  })
  it('uses notSetValue if necessary', () => {
    expect(
      updateIn(
        {
          a: {
            b: {
              c: 1,
              d: 2,
            },
            e: 1,
          },
          f: 1,
        },
        ['a', 'b', 'g'],
        5,
        (v: any) => v + 5
      )
    ).to.deep.equal({
      a: {
        b: {
          c: 1,
          d: 2,
          g: 10,
        },
        e: 1,
      },
      f: 1,
    })
  })
  it('returns same object if value is the same', () => {
    const obj = {
      a: {
        b: [1, 2],
        e: 1,
      },
      f: 1,
    }
    expect(updateIn(obj, ['a', 'b', 0], (v: any) => v)).to.equal(obj)
  })
  it('throws an error if the path does not exist in the object', () => {
    expect(() =>
      updateIn(
        { foo: { bar: 'baz' } },
        ['foo', 'bar', 'baz', 'qux'],
        (v: any) => v
      )
    ).to.throw(Error)
  })
})

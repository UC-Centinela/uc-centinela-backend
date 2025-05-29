import { safeStringify } from './logger.utils'

describe('safeStringify', () => {
  it('serializa un objeto sin referencias circulares', () => {
    const obj = { a: 1, b: { c: 2 } }
    const result = safeStringify(obj, 2)
    expect(result).toContain('"a": 1')
    expect(result).toContain('"c": 2')
  })

  it('detecta referencias circulares', () => {
    const a: any = {}
    a.self = a
    const result = safeStringify(a, 2)
    expect(result).toContain('[Circular Reference]')
  })
})

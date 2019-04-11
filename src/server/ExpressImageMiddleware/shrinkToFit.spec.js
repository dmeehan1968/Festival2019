import shrinkToFit from './shrinkToFit'

describe('shrinkToFit', () => {

  describe('no change in dimensions returns undefined', () => {

    it('should handle missing constraints', () => {
      const result = shrinkToFit([ 1, 2 ])
      expect(result).toBeUndefined()
    })

    it('should return undefined for identical source and constraints', () => {
      const result = shrinkToFit([ 100, 100 ], [ 100, 100 ])
      expect(result).toBeUndefined()
    });

    it('should handle larger first constraint', () => {
      const result = shrinkToFit([ 100, 100 ], [ 200, undefined ])
      expect(result).toBeUndefined()
    });

    it('should handle larger second constraint', () => {
      const result = shrinkToFit([ 100, 100 ], [ undefined, 200 ])
      expect(result).toBeUndefined()
    });

    it('should handle both larger constraint', () => {
      const result = shrinkToFit([ 100, 100 ], [ 200, 200 ])
      expect(result).toBeUndefined()
    });

  });

  describe('only one constraint', () => {

    it('should handle missing first constraint', () => {
      const result = shrinkToFit([ 100, 50 ], [ undefined, 20 ])
      expect(result).toEqual([ 40, 20 ])
    })

    it('should handle missing second contraint', () => {
      const result = shrinkToFit([ 100, 50 ], [ 40, undefined ])
      expect(result).toEqual([ 40, 20 ])
    });

  })

  describe('smallest constraint wins', () => {

    it('should handle both constraints with smaller first', () => {
      const result = shrinkToFit([ 100, 100 ], [ 50, 100 ])
      expect(result).toEqual([ 50, 50 ])
    });

    it('should handle both constraints with smaller second', () => {
      const result = shrinkToFit([ 100, 100 ], [ 100, 50 ])
      expect(result).toEqual([ 50, 50 ])
    });

  });

  describe('constraints cannot be zero', () => {

    it('should throw if first constraint zero', () => {
      expect(() => {
        shrinkToFit([ 1, 1 ], [ 0, 1 ])
      }).toThrowError(/non-zero/)
    });

    it('should throw if second constraint zero', () => {
      expect(() => {
        shrinkToFit([ 1, 1 ], [ 1, 0 ])
      }).toThrowError(/non-zero/)
    });

  });

  describe('rounding', () => {

    it('should allow rounding override', () => {
      const result = shrinkToFit([ 3, 1 ], [ 2, 2 ], v=>Math.round(v*100)/100)
      expect(result).toEqual([ 2.00, 0.67 ])
    });

  });
})

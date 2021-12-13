const {
  sortTransform,
  filterByNested,
  paginationParams,
  // eslint-disable-next-line import/extensions
} = require('./index.js');

describe('Utils', () => {
  describe('sortTransform', () => {
    test('Order desc by likes ', () => {
      const sortBy = 'likes';
      const direction = 'desc';
      const direction2 = 'asc';
      expect(sortTransform(sortBy, direction)).toBe('-likes');
      expect(sortTransform(sortBy, direction2)).toBe('likes');
    });

    test('filterNestes ', () => {
      const params = { user: '61b3720cb41db6c165581d0e' };
      const referencesNames = ['user', 'comments', 'subcomments'];
      const result = { filters: params, populate: 'comments subcomments' };
      expect(filterByNested(params, referencesNames)).toEqual(result);
    });

    test('paginationParams', () => {
      const params = { limit: 10, page: 2 };
      expect(paginationParams(params)).toEqual({
        limit: 10,
        page: 2,
        skip: 10,
      });
    });
  });
});

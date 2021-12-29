const {convertDate} = require('./convertDate');

test('test timestamp conversion to provided utc offset', () => {
  expect(convertDate(10,1640741699307)).toBe("29/12/2021, 11:34:59");
});
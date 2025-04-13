const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

  test('Should correctly read a whole number input', function () {
    assert.equal(convertHandler.getNum('32L'), 32);
  });

  test('Should correctly read a decimal number input', function () {
    assert.equal(convertHandler.getNum('3.5kg'), 3.5);
  });

  test('Should correctly read a fractional input', function () {
    assert.equal(convertHandler.getNum('1/2km'), 0.5);
  });

  test('Should correctly read a fractional input with a decimal', function () {
    assert.approximately(convertHandler.getNum('5.4/3lbs'), 1.8, 0.01);
  });

  test('Should return error on double-fraction input (e.g. 3/2/3)', function () {
    assert.equal(convertHandler.getNum('3/2/3kg'), 'invalid number');
  });

  test('Should default to 1 when no numerical input is provided', function () {
    assert.equal(convertHandler.getNum('kg'), 1);
  });

  test('Should correctly read each valid input unit', function () {
    const units = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    units.forEach(unit => {
      assert.equal(convertHandler.getUnit('5' + unit), unit.toLowerCase() === 'l' ? 'L' : unit.toLowerCase());
    });
  });

  test('Should return an error for an invalid input unit', function () {
    assert.equal(convertHandler.getUnit('5xyz'), 'invalid unit');
  });

  test('Should return correct return unit for each valid input unit', function () {
    const unitMap = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    Object.keys(unitMap).forEach(unit => {
      assert.equal(convertHandler.getReturnUnit(unit), unitMap[unit]);
    });
  });

  test('Should correctly return spelled-out string for each valid unit', function () {
    const names = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    Object.entries(names).forEach(([unit, name]) => {
      assert.equal(convertHandler.spellOutUnit(unit), name);
    });
  });

  test('Should correctly convert gal to L', function () {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.1);
  });

  test('Should correctly convert L to gal', function () {
    assert.approximately(convertHandler.convert(1, 'L'), 1 / 3.78541, 0.1);
  });

  test('Should correctly convert mi to km', function () {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1);
  });

  test('Should correctly convert km to mi', function () {
    assert.approximately(convertHandler.convert(1, 'km'), 1 / 1.60934, 0.1);
  });

  test('Should correctly convert lbs to kg', function () {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, 0.1);
  });

  test('Should correctly convert kg to lbs', function () {
    assert.approximately(convertHandler.convert(1, 'kg'), 1 / 0.453592, 0.1);
  });

});

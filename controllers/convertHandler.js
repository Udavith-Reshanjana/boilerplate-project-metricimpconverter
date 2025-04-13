function ConvertHandler() {
  const unitsMap = {
    gal: { returnUnit: 'L', factor: 3.78541, spelled: 'gallons' },
    L: { returnUnit: 'gal', factor: 1 / 3.78541, spelled: 'liters' },
    lbs: { returnUnit: 'kg', factor: 0.453592, spelled: 'pounds' },
    kg: { returnUnit: 'lbs', factor: 1 / 0.453592, spelled: 'kilograms' },
    mi: { returnUnit: 'km', factor: 1.60934, spelled: 'miles' },
    km: { returnUnit: 'mi', factor: 1 / 1.60934, spelled: 'kilometers' }
  };

  this.getNum = function (input) {
    let result;
    const match = input.match(/^[\d/.]+/); // Match the numeric part
    if (!match) return 1;

    const numStr = match[0];
    const parts = numStr.split('/');

    if (parts.length > 2) return 'invalid number';

    result = parts.length === 2
      ? parseFloat(parts[0]) / parseFloat(parts[1])
      : parseFloat(numStr);

    return isNaN(result) ? 'invalid number' : result;
  };

  this.getUnit = function (input) {
    let result;
    const match = input.match(/[a-zA-Z]+$/);
    if (!match) return 'invalid unit';

    const unit = match[0].toLowerCase();
    result = unit === 'l' ? 'L' : unit;

    return unitsMap[result] ? result : 'invalid unit';
  };

  this.getReturnUnit = function (initUnit) {
    return unitsMap[initUnit]?.returnUnit || 'invalid unit';
  };

  this.spellOutUnit = function (unit) {
    return unitsMap[unit]?.spelled || 'invalid unit';
  };

  this.convert = function (initNum, initUnit) {
    const conversion = unitsMap[initUnit];
    return conversion
      ? parseFloat((initNum * conversion.factor).toFixed(5))
      : null;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;

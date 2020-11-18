import helper from './helper';

// card number validation
test('valid card numbers. should output true', () =>{
    const number = helper.validateNumber(5168150902096643);
    expect(number).toBe(true);
})

test('invalid card numbers. Should output false', () => {
    const number2 = helper.validateNumber(3368150902096643);
    expect(number2).toBe(false);
})

test('invalid card numbers (number and string). Should output false', () => {
    const number3 = helper.validateNumber(5 + 'x' + 68150902096643);
    expect(number3).toBe(false);
})

test('invalid card numbers (to short). Should output false', () => {
    const number4 = helper.validateNumber(51681509020);
    expect(number4).toBe(false);
})


// join digits
test('should return string of digits without whitespace', () =>{
    const number = helper.joinDigits("232 22 011 9 9 ");
    expect(number).toBe("2322201199");
})

// get short year
test('should remove first two digits of string and return an int', () =>{
    const year = helper.getShortYear("2015");
    expect(year).toBe(15);
})










function getShortYear(year) {
    let yearString = year.toString();
    let res = yearString.slice(2, 4);
    return parseInt(res);
};

function joinDigits(n) {
    let number = n.toString().replace(/ /g,'');
    return number;
};

// Luhn ALgorithm - card number validation
function validateNumber(n) {
    // Convert number to an array of digits
    let digits = n.toString().split('').map(Number);
    const sum = digits
        // Double every other digit (from right to left)
        .map((digit, i) => i % 2 === digits.length % 2 ? fixDouble(digit * 2) : digit)
        // Add the digits
        .reduce((acc, digit) => acc += digit, 0);
    // returns true if valid number and false if invalid number
    return sum % 10 === 0;
};

function fixDouble(number){
    return number > 9 ? number - 9 : number;
};

function removeElementClass(ref, border1, border2) {
    if (ref.current.classList.contains(border1)) ref.current.classList.remove(border1);
    else if (ref.current.classList.contains(border2)) ref.current.classList.remove(border2);
};

const helper = {
    getShortYear,
    joinDigits,
    validateNumber,
    removeElementClass
}

export default helper;
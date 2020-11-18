import React, {useState, useEffect, useRef} from "react";
import helper from './helper'
import Card from 'react-credit-cards';
import 'react-credit-cards/lib/styles.scss';
import 'react-credit-cards/es/styles-compiled.css';
import '../styles/form.scss';

let validDetails = {
    isNumberValid: false,
    isNameValid: false,
    isCvvValid: false,
};

let cardDetails = {
    name: null,
    number: null,
    month: null,
    year: null,
    cvv: null
}

let years = [];
(() => {
    let currentYear = new Date().getFullYear();
    for (let i = 0; i < 8; i++){
        years.push(currentYear + i);
    }
})();


// COMPONENT
const Form = () => {
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [cvv, setCvv] = useState('');
    const [focus, setFocus] = useState('');

    const numberRef = useRef(null);
    const nameRef = useRef(null);
    const cvvRef = useRef(null);
    const submitButtonRef = useRef(null);

    function mergeMonthAndYear(value, isYear){
        if (isYear){
            setYear(value);
            setExpiry(`${month}/${value}`);
        } else {
            setMonth(value);
            setExpiry(`${value}/${year}`);
        }
    }

    // call function to send card data to database for further validation 
    const handleSubmit = (e) => {
        e.preventDefault();
        cardDetails.name = name
        cardDetails.number = helper.joinDigits(number).split('').map(Number);
        cardDetails.month = month
        cardDetails.year = year
        cardDetails.cvv = cvv
    }

    // watches card number input value and sets border color
    useEffect(() => {
        let n = helper.joinDigits(number);
        if(helper.validateNumber(n) && number !== '' && n.toString().length === 16){
            numberRef.current.classList.add('valid-border');
            helper.removeElementClass(numberRef, 'invalid-border', 'default-border');
            validDetails.isNumberValid = true;
        } else if (number === '') {
            numberRef.current.classList.add('default-border');
            helper.removeElementClass(numberRef, 'valid-border', 'invalid-border');
            validDetails.isNumberValid = false;
        } else {
            numberRef.current.classList.add('invalid-border');
            helper.removeElementClass(numberRef, 'valid-border', 'default-border');
            validDetails.isNumberValid = false;
        }
    }, [number])

    // watches card name input value and sets border color
    useEffect(() => {
        const letters = /^[a-zA-Z\s]*$/;
        if (name){
            if (!name.match(letters) || /^\s/.test(name) || /\s$/.test(name)){
                nameRef.current.classList.add('invalid-border');
                helper.removeElementClass(nameRef, 'valid-border', 'default-border');
                validDetails.isNameValid = false
            } else {
                nameRef.current.classList.add('default-border');
                helper.removeElementClass(nameRef, 'valid-border', 'invalid-border');
                validDetails.isNameValid = true
            }
        } else {
            nameRef.current.classList.add('default-border');
            helper.removeElementClass(nameRef, 'valid-border', 'invalid-border');
            validDetails.isNameValid = false;
        }
    }, [name])


    // watches card cvv input value and sets border color
    useEffect(() => {
        const digits = /^\d+$/;
        if (cvv){
            if (!cvv.match(digits) || cvv.toString().length > 3){
                cvvRef.current.classList.add('invalid-border');
                helper.removeElementClass(cvvRef, 'valid-border', 'default-border');
                validDetails.isCvvValid = false;
            } else {
                cvvRef.current.classList.add('default-border');
                helper.removeElementClass(cvvRef, 'valid-border', 'invalid-border');
                validDetails.isCvvValid = true;
            }
        } else {
            cvvRef.current.classList.add('default-border');
            helper.removeElementClass(cvvRef, 'valid-border', 'invalid-border');
            validDetails.isCvvValid = false;
        }
    }, [cvv])

    
    // watches all card validation and enables submit button
    useEffect(() => {
        if(validDetails.isCvvValid &&
            cvv.toString().length === 3 &&
            validDetails.isNameValid && 
            validDetails.isNumberValid && 
            month !== '' &&
            year !== ''){
                submitButtonRef.current.classList.add('submit-button-active');
           } else if (submitButtonRef.current.classList.contains('submit-button-active')) {
                submitButtonRef.current.classList.remove('submit-button-active');
           }
    }, [number, name, month, year, cvv])


  return (
    <div className="wrapper">
        <div className="card">
            <Card 
                number={number}
                name={name}
                expiry={expiry}
                cvc={cvv}
                focused={focus}
                preview={false}
            />
        </div>
        <form onSubmit={handleSubmit}>
            <div className="input-full-row">
                <label>card number</label>
                <input ref={numberRef} id="number-input" name="number" type="text" required value={number} onChange={(e) => setNumber(e.target.value)} onFocus={e => setFocus(e.target.name)} />
            </div>
            <div className="input-full-row">
                <label>card name</label>
                <input ref={nameRef} id="name-input" name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} onFocus={e => setFocus(e.target.name)} />
            </div>
            <div className="input-multi-row">
                <div className="expiration-date-wrapper">
                    <div className="label-container">
                        <label>Expiration Date</label>
                        <select name="expiry" defaultValue={'DEFAULT'} onChange={(e) => mergeMonthAndYear(e.target.value, false)} onFocus={e => setFocus(e.target.name)} required>
                            <option value="DEFAULT" disabled>Month</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                    </div>
                    <select name="expiry" defaultValue={'DEFAULT'} id="select-year" onChange={(e) => mergeMonthAndYear(e.target.value, true)} onFocus={e => setFocus(e.target.name)} required>
                        <option value="DEFAULT" disabled>Year</option>
                        {years.map((year,index) => {
                            return <option key={index} value={helper.getShortYear(year)}>{year}</option>
                        })}
                    </select>
                </div>
                <div className="label-container cvv">
                    <label>CVV</label>
                    <input ref={cvvRef} id="cvv-input" name="cvc" value={cvv} onChange={(e) => setCvv(e.target.value)} onFocus={e => setFocus(e.target.name)} type="text" required/>
                </div>
            </div>
            <input ref={submitButtonRef} id="submit-button" type="submit" value="Submit" />
        </form>
    </div>
  );
};

export default Form;
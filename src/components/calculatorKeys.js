import React from "react";
import MainButton from './mainButton';
import '../stylesheet/calculatorKeys.css';
import Screen from './screen';
import { useState } from 'react';
import { evaluate } from 'mathjs';

function CalculatorKeys() {

  const [display, setdisplay] = useState('0');
  const [didCalculation, setDidCalculation] = useState(false);

  const addToDisplay = value => {

    let newDisplay = display + value;
    let displayParts = newDisplay.split(/\/|\*|\+|-/);
    let signsPart = newDisplay.split(/\d+/);

    let stringToCheck = displayParts[displayParts.length - 1]
    let singsToCheck = signsPart[signsPart.length - 1]

    // First we check is a calculatino was recently done
    if (didCalculation) {

      // If a result was calculated recently we won´t let the user add more numbers to the result obtained
      if (/\d/.test(value) || value === '.') {
        setdisplay(value);
      } else {
        setdisplay(newDisplay);
      }
      setDidCalculation(false);
    }

    // This is to not let the user add more than one .
    else if ((!stringToCheck.includes('.') || stringToCheck.match(/\./g).length < 2)) {

      // User can`t add more than one 0 at the start.
      if (!stringToCheck.startsWith('00') || value !== '0') {

        // if user adds a 0 and then adds a number, the 0 will be erased. 
        if (value !== '0' && /^0\d/.test(stringToCheck) && value !== '.') {
          newDisplay = display.slice(0, display.length - 1) + value;
        }

        // Check that two consecutive signs (/, * or +) are not added 
        if (singsToCheck.match(/\/|\*|\+/g) && singsToCheck.match(/\/|\*|\+/g).length > 1) {
          newDisplay = display.slice(0, display.length - 1) + value;
        }
        // This is to not let the user add a third sign afer a - (for example: *-/, this is not allowed)
        if (singsToCheck.match(/.-$|.-.$/) && singsToCheck.length > 2) {
          newDisplay = display.slice(0, display.length - 2) + value;
        }
        // If a - sign was the last added character, we won`t be allowed to add another one
        if (singsToCheck.endsWith('--')) {
          newDisplay = newDisplay.slice(0, newDisplay.length - 1)
        }
        if (singsToCheck.match(/^-.+/)) {
          newDisplay = display.slice(0, display.length - 1) + value;
        }

        setdisplay(newDisplay);
      }
    }
  }

  const deleteDisplay = () => {
    setdisplay('0');
  };

  const calculateDisplay = () => {
    let newDisplay = evaluate(display);
    setdisplay(newDisplay.toString());
    setDidCalculation(true);
  };

  return (
    <div className="button-div">
      <Screen display={display} id='display' />
      <div className="row ">
        <MainButton text='AC' btnClass='col-6' color='dark' clickFunction={deleteDisplay} id='clear' />
        <MainButton text='/' btnClass='col-3' color='light' clickFunction={addToDisplay} id='divide' />
        <MainButton text='*' btnClass='col-3' color='light' clickFunction={addToDisplay} id='multiply' />
      </div>
      <div className="row ">
        <MainButton text='7' btnClass='col-3' clickFunction={addToDisplay} id='seven' />
        <MainButton text='8' btnClass='col-3' clickFunction={addToDisplay} id='eight' />
        <MainButton text='9' btnClass='col-3' clickFunction={addToDisplay} id='nine' />
        <MainButton text='-' btnClass='col-3' color='light' clickFunction={addToDisplay} id='subtract' />
      </div>
      <div className="row ">
        <MainButton text='4' btnClass='col-3' clickFunction={addToDisplay} id='four' />
        <MainButton text='5' btnClass='col-3' clickFunction={addToDisplay} id='five' />
        <MainButton text='6' btnClass='col-3' clickFunction={addToDisplay} id='six' />
        <MainButton text='+' btnClass='col-3' color='light' clickFunction={addToDisplay} id='add' />
      </div>
      <div className="row">
        <div className="col-9">
          <div className="row">
            <MainButton text='1' btnClass='col-4' clickFunction={addToDisplay} id='one' />
            <MainButton text='2' btnClass='col-4' clickFunction={addToDisplay} id='two' />
            <MainButton text='3' btnClass='col-4' clickFunction={addToDisplay} id='three' />
          </div>
          <div className="row">
            <MainButton text='0' btnClass='col-8' clickFunction={addToDisplay} id='zero' />
            <MainButton text='.' btnClass='col-4' clickFunction={addToDisplay} id='decimal' />
          </div>
        </div>
        <div className="col-3 pe-0 ps-0">
          <MainButton text='=' color='dark' clickFunction={calculateDisplay} id='equals' />
        </div>
      </div>
    </div>
  )
}

export default CalculatorKeys;

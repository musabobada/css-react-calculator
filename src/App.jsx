import { useState } from "react";
import "./App.css";

function App() {
  const [result, setResult] = useState(0);
  const [equalPrevResult, setEqualPrevResult] = useState(0);
  const [prevResult, setPrevResult] = useState(0);
  const [prevOperation, setPrevOperation] = useState(0);

  function reset() {
    setResult(0);
    setPrevResult(0);
    setPrevOperation(0);
    setEqualPrevResult(0);
  }
  function typeNumber(e) {
    let val
    if (prevOperation && !prevResult) {
      val = e.target.textContent;
      setPrevResult(result)
    }
    else {
      val = (result === 0 ? "" : result) + e.target.textContent;
    }
    setResult(val);
  }
  function mathOperation(currentOperation) {
    if (currentOperation === "=") {
      if (prevResult && prevOperation) {
        try {
          setResult(eval(prevResult + prevOperation + result))
          setPrevResult(0)
          setEqualPrevResult(result)
        } catch (err) {
          console.log(err);
        }
      } else if (equalPrevResult && prevOperation) {
        try {
          setResult(eval(equalPrevResult + prevOperation + result))
        } catch (err) {
          console.log(err);
        }
      }
      return
    }
    if (!prevResult && currentOperation !== prevOperation) {
      setPrevOperation(currentOperation)
      setPrevResult(result);
      setResult(0);
    } else if (prevResult) {
      try {
        setPrevResult(0);
        setPrevOperation(currentOperation);
        setResult(eval(prevResult + prevOperation + result))
        setEqualPrevResult(prevResult)
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <div className="container">
      <div className="grid">
        <div className="button operation clear" onClick={reset}>
          c
        </div>
        <div className="button result">{result}</div>
        <div onClick={typeNumber} className="button">7</div>
        <div onClick={typeNumber} className="button">8</div>
        <div onClick={typeNumber} className="button">9</div>
        <div onClick={() => mathOperation("*")} className="button operation">x</div>
        <div onClick={typeNumber} className="button">4</div>
        <div onClick={typeNumber} className="button">5</div>
        <div onClick={typeNumber} className="button">6</div>
        <div onClick={() => mathOperation("/")} className="button operation">/</div>
        <div onClick={typeNumber} className="button">1</div>
        <div onClick={typeNumber} className="button">2</div>
        <div onClick={typeNumber} className="button">3</div>
        <div onClick={() => mathOperation("+")} className="button operation">+</div>
        <div onClick={typeNumber} className="button">.</div>
        <div onClick={typeNumber} className="button">0</div>
        <div onClick={() => mathOperation("=")} className="button equal">=</div>
        <div onClick={() => mathOperation("-")} className="button operation">-</div>
      </div>
    </div>
  );
}

export default App;

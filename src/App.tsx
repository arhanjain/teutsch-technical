import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { checkValidity, compute } from "./computeLogic";

function App() {
  const [equation, setEquation] = useState("");
  const [history, setHistory] = useState([]);
  const [valid, setValid] = useState(true);
  const [answer, setAnswer] = useState(0);
  
  const updateEquation = (entry: string) => {
    const pattern = /^[-+*/^()0-9.]*$/

    if (pattern.test(entry)){
      setEquation(entry)
      if(checkValidity(entry)) {
        setValid(true)
        setAnswer(compute(entry))
      } else {setValid(false)}
    }

  }
  
  
  return (
    <div className="main">
    
      {/* <h1>{String(valid)}</h1> */}
      <h2>{String(answer)}</h2>
      <section className="calculator-body">
        <input 
        type="text" 
        id="calculator-input" 
        value={equation}
        onChange={(e) => updateEquation(e.target.value)}/>
        <img src={logo} className="react-logo" alt="logo" />
        <div className="button-container">
          {['1','2','3','4','5','6','7','8','9','0','+','-','*','/', '(', ')'].map((val: string) => 
            (
              <>
                <button 
                className="calculator-button" 
                onClick={()=>updateEquation(equation+val)}
                >
                  {val}
                </button>
              </>
            )
          )}
          <button 
          className="calculator-button"
          onClick={()=>updateEquation("")}
          >CL</button>
        </div>
      </section>
    </div>
  );
}

export default App;

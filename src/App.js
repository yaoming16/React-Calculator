import './stylesheet/App.css';
import CalculatorKeys from './components/calculatorKeys';

function App() {

  return (
    <div className="App">
      <div className='container d-flex justify-content-center align-items-center p-3'>
        <div className='div-border'>
          <CalculatorKeys />
        
        </div>
      </div>
    </div>
  );
}

export default App;

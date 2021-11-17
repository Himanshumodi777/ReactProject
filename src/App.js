import{Route, Routes,BrowserRouter} from 'react-router-dom';
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        
        <Route exact path='/' component={Home}/>
      </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;

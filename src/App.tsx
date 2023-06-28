import {Routes, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div className="Router">
         <Routes>
          <Route path='/dashboard' Component={Dashboard}/>
         </Routes>
    </div>
  );
}

export default App;

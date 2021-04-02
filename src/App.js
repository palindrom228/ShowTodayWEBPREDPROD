import useRoutes from './routes';
import {BrowserRouter} from 'react-router-dom';
import './App.css'
function App() {
  const Router = useRoutes
  return (
    <BrowserRouter>
      <Router></Router>
    </BrowserRouter>
  );
}

export default App;

import  {BrowserRouter, Routes, Route} from 'react-router-dom';
import { StockOverviewPage } from './pages/StockOverviewPage';
import { StockDetailPage } from './pages/StockDetailPage';
import './App.css';

function App() {
  return (
    <main>
      <BrowserRouter>
      <Routes>
       <Route path='/' element={<StockOverviewPage />} />
       <Route path='/detail' element={<StockDetailPage   />} />
      </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;

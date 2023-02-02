
import './App.css';
import { Routes, Route } from 'react-router';
import Layout from './components/Layout/Layout';
import Main from './pages/Main/Main';
import { useEffect } from 'react';
import AppStore from './Stores/AppStore';

function App() {
    useEffect(() => {
        if(localStorage.getItem('isLoggedIn') === 'true'){
            AppStore.setIsLoggedIn(true)
        }else{
            AppStore.setIsLoggedIn(false)
        }
        
    }, [])
  return (
    <div className="App">
      <Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Main />} />
					
				</Route>
			</Routes>
    </div>
  );
}

export default App;

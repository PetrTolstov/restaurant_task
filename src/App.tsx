
import './App.css';
import { Routes, Route } from 'react-router';
import Layout from './components/Layout/Layout';
import Main from './pages/Main/Main';

function App() {
  return (
    <div className="App">
      <Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Main />} />
					<Route path={"movies/:pageId"} element={<Main />} />
					<Route path={"movies/:pageId/:movieId"} element={<Main />} />
					<Route path={"profile"} element={<Main />} />
				</Route>
			</Routes>
    </div>
  );
}

export default App;

import classes from './App.module.scss';
import classNames from 'classnames'
import Header from './components/Header/Header';
import Dashboard from './pages/Dashboard/Dashboard';
import { Routes, Route } from 'react-router-dom'
import Search from './pages/Search/Search';

function App() {

  return (
    <div className={classNames(classes.todoApp)}>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Dashboard />}></Route>
        <Route path='/search' element={<Search />}></Route>


      </Routes>
    </div>
  );
}

export default App;

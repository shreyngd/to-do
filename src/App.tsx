import classes from './App.module.scss';
import classNames from 'classnames'
import Header from './components/Header/Header';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {

  return (
    <div className={classNames(classes.todoApp)}>
      <Header></Header>
      <Dashboard />
    </div>
  );
}

export default App;

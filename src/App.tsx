import classes from './App.module.scss';
import classNames from 'classnames'
import Header from './components/Header/Header';

function App() {

  return (
    <div className={classNames(classes.todoApp)}>
      <Header></Header>
    </div>
  );
}

export default App;

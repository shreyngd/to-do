import AddTodo from '../../components/AddTodo/AddTodo';
import Display from '../../components/Display/Display';
import { useAppSelector } from '../../store/hooks';
import { useGreeting } from '../../utils';
import classes from './Dashboard.module.scss';

const Dashboard: React.FC = () => {
    const todoList = useAppSelector((state) => state.todos.list);

    const greetMsg = useGreeting();
    return <div className={classes.appDashboard}>
        <div className={classes.container}>

            <div className={classes.header}>
                Dashboard
            </div>
            <div className={classes.greetMsg}>
                Good {greetMsg}
            </div>
            <div className={classes.addContainer}>
                <AddTodo></AddTodo>
            </div>
            <div>
                <Display list={todoList} />
            </div>
        </div>


    </div>
}

export default Dashboard
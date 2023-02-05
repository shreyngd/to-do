import AddTodo from '../../components/AddTodo/AddTodo';
import { useGreeting } from '../../utils';
import classes from './Dashboard.module.scss';

const Dashboard: React.FC = () => {
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
                Display
            </div>
        </div>


    </div>
}

export default Dashboard
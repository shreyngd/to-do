import Display from '../../components/Display/Display';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { change, clear } from '../../store/searchSlice';
import classes from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


const Search: React.FC = () => {
    const search = useAppSelector(state => state.search.value);
    const todoList = useAppSelector(state => state.todos.list);
    const dispatch = useAppDispatch();
    return <div className={classes.appSearch}>
        <div className={classes.container}>

            <div className={classes.header}>
                Search
            </div>
            <div className={classes.addContianer}>
                <div className={classes.inputContainer}>
                    <div className={classes.search} >
                        <FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: '16px' }}></FontAwesomeIcon>
                    </div>
                    <input className={classes.input} placeholder="Search by name or description" value={search} onChange={(e) => dispatch(change(e.target.value))}></input>
                    <div className={classes.search} onClick={(e) => {
                        dispatch(clear())
                    }}>
                        <FontAwesomeIcon icon={faCircleXmark} style={{ fontSize: '16px', cursor: 'pointer' }}></FontAwesomeIcon>
                    </div>

                </div>
            </div>
            <div>
                <Display list={search.length === 0 ? [] : todoList.filter(el => el.title?.toLowerCase().includes(search.toLowerCase()) || el.description?.toLowerCase().includes(search.toLowerCase()))} />
            </div>
        </div>


    </div>
}
export default Search
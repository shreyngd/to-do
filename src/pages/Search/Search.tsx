import Display from '../../components/Display/Display';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { change, clear } from '../../store/searchSlice';
import classes from './Search.module.scss';

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
                    <div className={classes.search} ><div className='fas fa-magnifying-glass' style={{ fontSize: '16px' }}></div></div>
                    <input className={classes.input} placeholder="Search by name or description" value={search} onChange={(e) => dispatch(change(e.target.value))}></input>
                    <div className={classes.search} onClick={(e) => {
                        dispatch(clear())
                    }}><div className="fa-solid fa-circle-xmark" style={{ fontSize: '16px', cursor: 'pointer' }} ></div></div>

                </div>
            </div>
            <div>
                <Display list={search.length === 0 ? [] : todoList.filter(el => el.title?.toLowerCase().includes(search.toLowerCase()) || el.description?.toLowerCase().includes(search.toLowerCase()))} />
            </div>
        </div>


    </div>
}
export default Search
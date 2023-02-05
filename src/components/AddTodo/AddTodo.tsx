import { useEffect, useRef, useState } from 'react';
import classes from './AddTodo.module.scss';
import AddItem from '../../assets/images/plus-square.svg'
import classNames from 'classnames';
import ColorPicker from '../ColorPicker/ColorPicker';
import { COLORS_MAP } from '../../utils';

const AddTodo = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    const [show, setshow] = useState(false);

    const [colorLabel, setColorLabel] = useState('');

    useEffect(() => {
        if (show === true) {
            inputRef.current?.focus();
        }
    }, [show])

    useEffect(() => {
        console.log(boxRef);
        const handleClickOutside = (event: MouseEvent) => {
            if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
                setshow(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => document.removeEventListener('mousedown', handleClickOutside);

    }, [boxRef])

    const handleClick = () => {
        setshow(true);
    }


    return <div className={classes.addTodoBox} onClick={handleClick} ref={boxRef} style={{
        background: COLORS_MAP[colorLabel]
    }}>
        <div className={classes.addTodoBoxMain}>
            <div className={classes.inputContainer}>
                <img src={AddItem} alt="add" width={20} height={20}></img>
                <input className={classes.input} placeholder="Add a task" ref={inputRef}></input>
            </div>
            <div className={classNames(classes.addTodoBoxSecondary, {
                [classes.fullHeight]: show,
            })}>
                <div className={classes.textAreaContainer}>
                    <textarea className={classes.textarea} placeholder="Add a description" onFocus={handleClick} rows={5}></textarea>
                </div>
                <div className={classes.options}>
                    <div>due date</div>
                    <div><ColorPicker changeColor={(color) => setColorLabel(color)} /></div>

                </div>
            </div>



        </div>
    </div>

}

export default AddTodo
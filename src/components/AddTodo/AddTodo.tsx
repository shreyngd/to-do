import { useCallback, useEffect, useRef, useState } from 'react';
import classes from './AddTodo.module.scss';
import AddItem from '../../assets/images/plus-square.svg'
import classNames from 'classnames';
import ColorPicker from '../ColorPicker/ColorPicker';
import { DueTimeObj, DUE_TIME_LIST, PriorityObj } from '../../utils';
import ChipButton from '../ChipButton/ChipButton';
import { add, ToDo } from '../../store/todoSlice';
import { v4 } from 'uuid'
import { useAppDispatch } from '../../store/hooks';

const AddTodo = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    const [show, setshow] = useState(false);
    const [selectTime, setSelectTime] = useState<DueTimeObj | null>(null);

    const [colorLabel, setColorLabel] = useState<PriorityObj | null>(null);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (show === true) {
            inputRef.current?.focus();
        }
    }, [show])


    const addTodo = useCallback(() => {
        if (inputRef.current?.value || textareaRef.current?.value) {
            const newTodo: ToDo = {
                id: v4(),
                title: inputRef.current?.value || '',
                description: textareaRef.current?.value || '',
                endTime: Date.now() + (selectTime ? selectTime.time : 0),
                priority: colorLabel?.name || null,
                isFavourite: false,
                isComplete: false
            }
            dispatch(add(newTodo));
            if (inputRef.current) inputRef.current.value = '';
            if (textareaRef.current) textareaRef.current.value = '';

        }

    }, [colorLabel, dispatch, selectTime, inputRef, textareaRef])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
                setshow(false)
                addTodo()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => document.removeEventListener('mousedown', handleClickOutside);

    }, [boxRef, addTodo])

    const handleClick = () => {
        setshow(true);
    }

    const handleTimeSelect = (dueTimeObj: DueTimeObj) => {
        console.log(dueTimeObj)
        if (selectTime && selectTime.text === dueTimeObj.text) {
            setSelectTime(null);
        } else {
            setSelectTime(dueTimeObj)
        }
    }

    return (
        <div className={classes.addTodoBox} onClick={handleClick} ref={boxRef} style={{
            background: `var(--color-priority-${colorLabel?.colorName})`
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
                        <textarea className={classes.textarea} placeholder="Add a description" onFocus={handleClick} rows={5} ref={textareaRef}></textarea>
                    </div>
                    <div className={classes.options}>
                        <div className={classes.dueTime}>
                            <div className={classes.dueText}>Due in:</div>
                            <div className={classes.timeChips}>{DUE_TIME_LIST.map(el => <ChipButton value={el.text} onClick={() => handleTimeSelect(el)} key={el.text} selected={selectTime?.text === el.text} />)}</div>
                        </div>
                        <div><ColorPicker changeColor={(color: PriorityObj | null) => setColorLabel(color)} /></div>

                    </div>
                </div>



            </div>
        </div>
    )

}

export default AddTodo
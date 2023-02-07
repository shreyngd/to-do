import { useCallback, useEffect, useRef, useState } from 'react';
import classes from './AddTodo.module.scss';
import AddItem from '../../assets/images/plus-square.svg'
import classNames from 'classnames';
import ColorPicker from '../ColorPicker/ColorPicker';
import { COLORS_ARR, DueTimeObj, DUE_TIME_LIST, PriorityObj } from '../../utils';
import ChipButton from '../ChipButton/ChipButton';
import { add, ToDo, updateTodo } from '../../store/todoSlice';
import { v4 } from 'uuid'
import { useAppDispatch } from '../../store/hooks';

interface ToDoProps {
    editMode?: boolean;
    todoObject?: ToDo | null;
    updateDone?: () => void
}

const AddTodo = ({ editMode = false, todoObject, updateDone = () => { } }: ToDoProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    const [show, setshow] = useState(editMode);
    const [selectTime, setSelectTime] = useState<DueTimeObj | null>(null);
    const [colorLabel, setColorLabel] = useState<PriorityObj | null>(null);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (editMode && todoObject && inputRef.current && textareaRef.current) {
            inputRef.current.value = todoObject.title || '';
            textareaRef.current.value = todoObject.description || ''
            setColorLabel(COLORS_ARR.find(el => el.name === todoObject.priority) || null)
        }


    }, [editMode, todoObject])

    useEffect(() => {
        if (show === true) {
            inputRef.current?.focus();
        }
    }, [show])


    const addTodo = useCallback(() => {
        if (inputRef.current?.value || textareaRef.current?.value) {
            let endTime = Date.now() + (selectTime ? selectTime.time : 0)
            if (editMode && selectTime === null) {
                endTime = todoObject?.endTime || Date.now()
            }
            if (editMode && selectTime && todoObject && todoObject.endTime) {
                endTime = todoObject.endTime + selectTime.time

            }
            const newTodo: ToDo = {
                id: editMode && todoObject ? todoObject.id : v4(),
                title: inputRef.current?.value || '',
                description: textareaRef.current?.value || '',
                endTime,
                priority: colorLabel?.name || null,
                isFavourite: todoObject ? todoObject?.isFavourite : false,
                isComplete: todoObject ? todoObject?.isComplete : false
            }
            if (editMode && todoObject) {
                dispatch(updateTodo({ id: todoObject?.id, data: newTodo }));
                updateDone()
            }
            else dispatch(add(newTodo));
            if (inputRef.current) inputRef.current.value = '';
            if (textareaRef.current) textareaRef.current.value = '';



        }
        setColorLabel(null)
        setSelectTime(null)

    }, [editMode, todoObject, selectTime, colorLabel?.name, dispatch, updateDone])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
                setshow(false)
                addTodo()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)

        return () => document.removeEventListener('mousedown', handleClickOutside);

    }, [boxRef, addTodo, setColorLabel, setSelectTime])

    const handleClick = () => {
        setshow(true);
    }

    const handleTimeSelect = (dueTimeObj: DueTimeObj) => {
        if (selectTime && selectTime.text === dueTimeObj.text) {
            setSelectTime(null);
        } else {
            setSelectTime(dueTimeObj)
        }
    }

    return (
        <div className={classes.addTodoBox} onClick={handleClick} ref={boxRef} style={{
            background: colorLabel ? `var(--color-priority-${colorLabel?.colorName})` : ''
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
                            <div className={classes.dueText}>{editMode ? 'Add Time:' : 'Due in:'}</div>
                            <div className={classes.timeChips}>{DUE_TIME_LIST.map(el => (
                                <ChipButton value={el.text} onClick={() => handleTimeSelect(el)} key={el.text} selected={selectTime?.text === el.text} />
                            ))}</div>
                        </div>
                        <div><ColorPicker changeColor={(color: PriorityObj | null) => setColorLabel(color)} selected={colorLabel} /></div>

                    </div>
                </div>



            </div>
        </div>
    )

}

export default AddTodo
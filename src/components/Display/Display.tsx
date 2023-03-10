import { useAppDispatch } from "../../store/hooks";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import classes from "./Display.module.scss";
import classNames from "classnames";
import Priority from "../Priority/Priority";
import ChipButton from "../ChipButton/ChipButton";
import { markComplete, markFavourite, remove, ToDo } from "../../store/todoSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import Checkbox from "../Checkbox/Checkbox";
import React, { useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import TimeAgo from 'react-timeago'

const Display = ({ list = [] }: { list: Array<ToDo> }) => {
    const dispatch = useAppDispatch();
    const [editMode, setEditMode] = useState('');
    const [showDescription, setShowDescription] = useState('');

    const onCompleteClick = (id: string) => {
        dispatch(markComplete(id))
    }
    return (
        <TransitionGroup component="div" className={classes.todoList}>
            {list.map((el) => {
                return (
                    <CSSTransition
                        mountOnEnter
                        classNames={{
                            enter: classes.listTransitionEnter,
                            enterActive: classes.listTransitionEnterActive,
                            exit: classes.listTransitionExit,
                            exitActive: classes.listTransitionExitActive,
                        }}
                        timeout={200}
                        key={el.id}
                    >

                        {editMode === el.id ? <AddTodo editMode todoObject={el} updateDone={() => setEditMode('')} /> : <div>
                            <div className={classes.todoItem}>
                                <div className={classes.info}>
                                    <div className={classes.titleMain}>
                                        <Priority priority={el.priority} star={el.isFavourite}></Priority>
                                        <div className={classNames(classes.titleText, { [classes.strike]: el.isComplete })}>
                                            <div>{el.title || "(Untitled)"}</div>
                                        </div>
                                    </div>
                                    <div className={classes.optionsMain}>

                                        <div className={classes.markBtnMain}>
                                            <ChipButton
                                                value="Mark as favourite"
                                                onClick={() => {
                                                    dispatch(markFavourite(el.id))
                                                }} selected={el.isFavourite}
                                            ></ChipButton>
                                        </div>

                                        <Checkbox checked={el.isComplete} onChange={() => onCompleteClick(el.id)}></Checkbox>
                                        <button className={classNames(classes.btn, classes.removeBtn)} onClick={() => dispatch(remove(el.id))}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
                                        <button className={classNames(classes.btn, classes.removeBtn)} onClick={() => setEditMode(el.id)}><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></button>
                                        <button className={classNames(classes.btn, classes.removeBtn, { [classes.rotate]: showDescription === el.id })} onClick={() => {
                                            if (showDescription === el.id) setShowDescription('')
                                            else setShowDescription(el.id)
                                        }}>
                                            <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                                        </button>

                                    </div>
                                </div>
                                <div className={classNames(classes.todoDesc, { [classes.show]: showDescription === el.id, }, classes[el.priority || ''])}>
                                    <div className={classes.main}>
                                        <div className={classes.desc}>
                                            {el.description ? <div>{el.description}</div> : <div className={classes.empty}>Description not added</div>}
                                        </div>
                                        <div className={classes.endTime}>
                                            {el.endTime && !el.isComplete && <>
                                                <div>{Date.now() < el.endTime ? 'Ends in:' : 'Ended'}</div>
                                                <TimeAgo date={el.endTime} />
                                            </>}
                                        </div>
                                        <div className={classes.markBtnMainMobile}>
                                            <ChipButton
                                                value="Mark as favourite"
                                                onClick={() => {
                                                    dispatch(markFavourite(el.id))
                                                }} selected={el.isFavourite}
                                            ></ChipButton>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>}
                    </CSSTransition>

                );
            })}
        </TransitionGroup >
    );
};

export default Display;

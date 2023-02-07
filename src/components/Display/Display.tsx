import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import classes from "./Display.module.scss";
import classNames from "classnames";
import Priority from "../Priority/Priority";
import ChipButton from "../ChipButton/ChipButton";
import { markComplete, markFavourite, remove } from "../../store/todoSlice";
import Checkbox from "../Checkbox/Checkbox";
import React, { useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import TimeAgo from 'react-timeago'

const Display = () => {
    const todoList = useAppSelector((state) => state.todos.list);
    const dispatch = useAppDispatch();
    const [editMode, setEditMode] = useState('');
    const [showDescription, setShowDescription] = useState('');

    const onCompleteClick = (id: string) => {
        dispatch(markComplete(id))
    }
    return (
        <TransitionGroup component="div" className={classes.todoList}>
            {todoList.map((el) => {
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
                                        <div className={classes.titleText}>
                                            <div>{el.title || "(Untitled)"}</div>
                                            <CSSTransition
                                                in={el.isComplete}
                                                timeout={400}
                                                classNames={{
                                                    enter: classes.strikeThroughEnter,
                                                    enterActive: classes.strikeThroughEnterActive,
                                                    enterDone: classes.strikeThroughEnterDone,
                                                    exit: classes.strikeThroughExit,
                                                    exitActive: classes.strikeThroughExitActive,
                                                }}>
                                                <div className={classes.strike}></div>
                                            </CSSTransition>
                                        </div>
                                    </div>
                                    <div className={classes.optionsMain}>


                                        <ChipButton
                                            value="Mark as favourite"
                                            onClick={() => {
                                                dispatch(markFavourite(el.id))
                                            }} selected={el.isFavourite}></ChipButton>
                                        <Checkbox checked={el.isComplete} onChange={() => onCompleteClick(el.id)}></Checkbox>
                                        <button className={classNames(classes.btn, classes.removeBtn)} onClick={() => dispatch(remove(el.id))}><i className="fas fa-trash"></i></button>
                                        <button className={classNames(classes.btn, classes.removeBtn)} onClick={() => setEditMode(el.id)}><i className="fas fa-pen"></i></button>
                                        <button className={classNames(classes.btn, classes.removeBtn, { [classes.rotate]: showDescription === el.id })} onClick={() => {
                                            if (showDescription === el.id) setShowDescription('')
                                            else setShowDescription(el.id)
                                        }}>
                                            <i className="fas fa-chevron-down"></i>
                                        </button>

                                    </div>
                                </div>
                                <div className={classNames(classes.todoDesc, { [classes.show]: showDescription === el.id, }, classes[el.priority || ''])}>
                                    <div className={classes.main}>
                                        <div className={classes.desc}>
                                            {el.description ? <div>{el.description}</div> : <div className={classes.empty}>Description not added</div>}
                                        </div>
                                        <div className={classes.endTime}>
                                            {el.endTime && <>
                                                <div>{Date.now() < el.endTime ? 'Ends in:' : 'Ended'}</div>
                                                <TimeAgo date={el.endTime} />
                                            </>}
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

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import classes from "./Display.module.scss";
import classNames from "classnames";
import Priority from "../Priority/Priority";
import ChipButton from "../ChipButton/ChipButton";
import { markFavourite } from "../../store/todoSlice";
import Checkbox from "../Checkbox/Checkbox";

const Display = () => {
    const todoList = useAppSelector((state) => state.todos.list);
    const dispatch = useAppDispatch();
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
                        timeout={500}
                        key={el.id}
                    >
                        <div className={classes.todoItem}>
                            <div className={classes.info}>
                                <div className={classes.titleMain}>
                                    <Priority priority={el.priority} star={el.isFavourite}></Priority>
                                    <div className={classes.titleText}>{el.title || "(Untitled)"}</div>
                                </div>
                                <div className={classes.optionsMain}>
                                    <ChipButton value="Mark as favourite" onClick={() => {
                                        dispatch(markFavourite(el.id))
                                    }} selected={el.isFavourite}></ChipButton>
                                    <Checkbox></Checkbox>
                                </div>
                            </div>
                        </div>
                    </CSSTransition>
                );
            })}
        </TransitionGroup>
    );
};

export default Display;

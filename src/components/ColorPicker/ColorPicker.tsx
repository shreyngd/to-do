import classes from './ColorPicker.module.scss'
import { COLORS_ARR, PriorityObj } from '../../utils';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

const ColorPicker = ({ changeColor = (color: PriorityObj | null) => { } }) => {
    const [selected, setSelected] = useState<PriorityObj | null>(null);

    useEffect(() => {
        changeColor(selected)
    }, [selected, changeColor])

    const handleClick = (obj: PriorityObj) => {
        if (selected?.name === obj.name) {
            setSelected(null)
        } else {
            setSelected(obj)
        }
    }
    return <div className={classes.main}>
        <div className={classes.text}>Priority:</div>
        {COLORS_ARR.map((priority: PriorityObj) => {
            return <div className={classNames(classes.colorDiv, { [classes.selected]: selected?.name === priority.name }, classes[priority.colorName])} key={priority.name} onClick={() => handleClick(priority)}></div>
        })}

    </div>

}

export default ColorPicker;
import classes from './ColorPicker.module.scss'
import { COLORS_ARR, PriorityObj } from '../../utils';
import classNames from 'classnames';

const ColorPicker = ({
    changeColor,
    selected
}: { changeColor: (color: PriorityObj | null) => void, selected: PriorityObj | null }) => {



    const handleClick = (obj: PriorityObj) => {
        if (selected?.name === obj.name) {
            changeColor(null)
        } else {
            changeColor(obj)
        }
    }
    return <div className={classes.main}>
        <div className={classes.text}>Priority:</div>
        {COLORS_ARR.map((priority: PriorityObj) => {
            return <div className={classNames(classes.colorDiv,
                { [classes.selected]: selected?.name === priority.name },
                classes[priority.colorName])}
                key={priority.name}
                onClick={() => handleClick(priority)}>
            </div>
        })}

    </div>

}

export default ColorPicker;
import classes from './ColorPicker.module.scss'
import { COLORS_MAP } from '../../utils';
import { useState } from 'react';
import classNames from 'classnames';

const ColorPicker = ({ changeColor = (color: string) => { } }) => {
    const [selected, setSelected] = useState<string>('DEFAULT');

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (typeof e.currentTarget.dataset.color !== 'undefined') {
            setSelected(e.currentTarget.dataset.color)
            changeColor(e.currentTarget.dataset.color)
        }


    }
    return <div className={classes.main}>
        {Object.keys(COLORS_MAP).map(el => {
            return <div className={classNames(classes.colorDiv, { [classes.selected]: selected === el })} key={el} style={{
                background: COLORS_MAP[el]
            }} data-color={el} onClick={handleClick}></div>
        })}

    </div>

}

export default ColorPicker;
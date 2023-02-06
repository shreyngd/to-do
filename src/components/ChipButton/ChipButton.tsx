import classNames from 'classnames';
import classes from './ChipButton.module.scss';

const ChipButton = ({ onClick = () => { }, value = '', selected = false }) => {
    return <button type='button' className={classNames(classes.chipBtn, {
        [classes.selected]: selected
    })} onClick={onClick}>{value}</button>
}

export default ChipButton
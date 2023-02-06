import React from 'react';
import classes from './Checkbox.module.scss'

const Checkbox = ({ checked, onChange }: { checked: boolean, onChange: React.ChangeEventHandler<HTMLInputElement> }) => {

    return <input type="checkbox" className={classes.checkbox} checked={checked} onChange={onChange}></input>


}
export default Checkbox;
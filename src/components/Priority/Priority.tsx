import classNames from 'classnames'
import { Priority } from '../../utils'
import classes from './Priority.module.scss'

const PriorityStar = ({ priority, star }: { priority: Priority | null | undefined, star: boolean }) => {
    let obj: any = {}
    if (priority) {
        obj[classes[priority]] = true
    } else {
        obj[classes.default] = true;
    }
    return <div className={classNames(classes.prioAnim, obj, { [classes.star]: star })}></div>

}

export default PriorityStar
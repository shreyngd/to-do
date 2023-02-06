import classNames from 'classnames'
import { memo } from 'react'
import { Priority } from '../../utils'
import classes from './Priority.module.scss'

const PriorityStar = ({ priority, star }: { priority: Priority | null | undefined, star: boolean }) => {
    console.log(star)
    let obj: any = {}

    if (priority) {
        obj[classes[priority]] = true
    } else {
        obj[classes.default] = true;
    }

    return <div className={classNames(classes.prioAnim)}>
        <div className={classNames(classes.circle, obj)}>
            <div className={classNames(classes.star, obj)}>
                <div className={classNames("fas fa-star", { [classes.animActive]: star, [classes.animInactive]: !star })}></div>
            </div>
        </div>
    </div>

}

export default memo(PriorityStar)
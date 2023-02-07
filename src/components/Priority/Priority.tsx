import classNames from 'classnames'
import { memo, useEffect, useState } from 'react'
import { Priority } from '../../utils'
import classes from './Priority.module.scss'

const PriorityStar = ({ priority, star }: { priority: Priority | null | undefined, star: boolean }) => {

    const [update, setUpdate] = useState(String(star));

    useEffect(() => {
        setUpdate(String(star))
    }, [star])



    return <div className={classNames(classes.prioAnim)}>
        <div className={classNames(classes.circle, classes[priority || 'default'])}>
            <div className={classNames(classes.star, classes[priority || 'default'])}>
                <div className={classNames("fas fa-star", { [classes.active]: star, [classes.inactive]: !star, [classes.animActive]: update === 'true' })}></div>
            </div>
        </div>
    </div>

}

export default memo(PriorityStar)

//, [classes.animInactive]: update === 'false'
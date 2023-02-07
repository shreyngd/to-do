import classNames from 'classnames'
import { memo } from 'react'
import { Priority } from '../../utils'
import classes from './Priority.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const PriorityStar = ({ priority, star }: { priority: Priority | null | undefined, star: boolean }) => {




    return <div className={classNames(classes.prioAnim)}>
        <div className={classNames(classes.circle, classes[priority || 'default'], { [classes.active]: star, [classes.inactive]: !star, [classes.animActive]: star })}>
            <div className={classNames(classes.star, classes[priority || 'default'])}>
                <FontAwesomeIcon icon={faStar} className={classNames({ [classes.active]: star, [classes.inactive]: !star, [classes.animActive]: star }, classes.startDef)}></FontAwesomeIcon>

            </div>
        </div>
    </div>

}

export default memo(PriorityStar)

//, [classes.animInactive]: update === 'false'
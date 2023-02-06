import { useEffect, useState } from "react";


const getGreeting = (): string => {
    const date = new Date();
    const currentHour = date.getHours();
    if (currentHour < 12) {
        return 'morning';
    } else if (currentHour < 16) {
        return 'afternoon';
    }
    return 'evening';
}

const getNextUpdateTime = (): number => {
    const date = new Date();
    const currentHour = date.getHours();
    if (currentHour < 12) {
        date.setHours(11, 59, 59, 999);
    } else if (currentHour < 16) {
        date.setHours(15, 59, 59, 999);
    } else {
        date.setHours(23, 59, 59, 999);
    }
    return date.getTime()
}

let greetTimeoutId: NodeJS.Timeout;
export const useGreeting = () => {
    const [greeting, setGreeting] = useState<string>(getGreeting());
    const [nextUpdateTime, setNextUpdateTime] = useState<number>(getNextUpdateTime());

    useEffect(() => {
        const timeNow = Date.now();
        const diff = nextUpdateTime - timeNow;
        greetTimeoutId = setTimeout(() => {
            setGreeting(getGreeting())
            setNextUpdateTime(getNextUpdateTime())
        }, diff);
        return () => {
            clearTimeout(greetTimeoutId)
        }
    }, [nextUpdateTime])


    return greeting;
}
export enum Priority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'
}


export type PriorityObj = {
    colorName: string
    name: Priority
}

export type DueTimeObj = {
    text: string,
    time: number
}

export const COLORS_ARR: Array<PriorityObj> = [
    { colorName: 'low', name: Priority.LOW, }, { colorName: 'medium', name: Priority.MEDIUM },
    { colorName: 'high', name: Priority.HIGH, }
]

export const DUE_TIME_LIST: Array<DueTimeObj> = [
    {
        text: '30 min',
        time: 30 * 60 * 1000
    },
    {
        text: '1 hr',
        time: 60 * 60 * 1000
    },
    {
        text: '2 hrs',
        time: 2 * 60 * 60 * 1000
    },
    {
        text: '6 hrs',
        time: 6 * 60 * 60 * 1000
    },
    {
        text: '12 hrs',
        time: 12 * 60 * 60 * 1000
    },
    {
        text: '1 day',
        time: 24 * 60 * 60 * 1000
    }
]


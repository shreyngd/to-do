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

export const COLORS_MAP: Record<string, string> = {
    'DEFAULT': document.documentElement.style.getPropertyValue('--color-surface'),
    'ORANGE': '#F58549',
    'RED': '#A31621',
    'GREEN': '#7A9B76',
}
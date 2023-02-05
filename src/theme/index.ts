export enum THEME {
    LIGHT = 'light',
    DARK = 'dark'
}

const darkTheme: Record<string, string> = {
    "--color-surface": "#20212c",
    "--color-solid": "white",
    "--color-primary": "teal",
    "--color-surface-secondary": "#000"
};
const lightTheme: Record<string, string> = {
    "--color-surface": "white",
    "--color-solid": "black",
    "--color-primary": "purple",
    "--color-surface-secondary": "#fff"
};

export const changeTheme = (theme: THEME) => {
    const themeVar = theme === THEME.DARK ? darkTheme : lightTheme;
    Object.keys(themeVar).forEach((key): void => {
        const val = themeVar[key];
        document.documentElement.style.setProperty(key, val)
    })
}
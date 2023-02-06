export enum THEME {
    LIGHT = 'light',
    DARK = 'dark'
}



export const changeTheme = (theme: THEME) => {
    const themeVar = theme === THEME.DARK ? THEME.DARK : THEME.LIGHT
    document.documentElement.setAttribute('data-theme', themeVar)


}
import React from 'react';

type ContextData = {
    theme?: String,
    switchTheme: (newTheme: string) => void
};

const defaults = {
    initialTheme: 'day'
};

export const ThemeContext = React.createContext<any>({});
type Props = { children: React.ReactNode };
const ThemeProvider = (props: Props) => {
    const [theme, setTheme] = React.useState('');

    const switchTheme = (newTheme: string) => {
        const htmlRoot = document.documentElement;
        const currentTheme = theme;
        htmlRoot.classList.add('theme-transition');
        htmlRoot.classList.remove(currentTheme);
        htmlRoot.classList.add(newTheme);
        setTheme(newTheme);
    };

    // init
    React.useEffect(() => {
        const initialTheme = defaults.initialTheme;
        const htmlRoot = document.documentElement;
        setTheme(initialTheme);
        htmlRoot.className = `${initialTheme}`;
    }, []);

    const contextValue: ContextData = React.useMemo((): ContextData => ({
        theme,
        switchTheme
    }), [theme, switchTheme])

    return (
        <ThemeContext.Provider value={contextValue}>
            {props.children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;

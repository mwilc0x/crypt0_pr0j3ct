import React from 'react';
import { ThemeContext } from '../../contexts';
import './style.scss';

const ToggleSwitch: React.FC = () => {
    const { switchTheme, theme } = React.useContext(ThemeContext);

    const toggleTheme = () => {
        if (theme == 'day') {
            switchTheme('night');
        } else {
            switchTheme('day');
        }
    }

    return (
		<div className={`toggle-wrapper ${theme}`} onClick={toggleTheme}>
			<span className="toggle"></span>
		</div>
    );
}

export default ToggleSwitch;

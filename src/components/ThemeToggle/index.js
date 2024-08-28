import React, { useEffect } from 'react';
import './assets/style.css';
import { ReactComponent as MoonIcon } from './assets/moon.svg';
import { ReactComponent as SunIcon } from './assets/sun.svg';
const updateTheme = (isDarkEnabled) => {
  const styles = getComputedStyle(document.body);
  const black = styles.getPropertyValue('--black');
  const white = styles.getPropertyValue('--white');
  const docEl = document.documentElement;

  if (isDarkEnabled) {
    docEl.style.setProperty('--background', black);
    docEl.style.setProperty('--foreground', white);
    document.querySelector('html').classList.add('dark');
    localStorage.setItem('dark', 1);
  } else {
    docEl.style.setProperty('--background', white);
    docEl.style.setProperty('--foreground', black);
    document.querySelector('html').classList.remove('dark');
    localStorage.removeItem('dark');
  }
};
export default function ThemeToggle({ className, isEnabled, setIsEnabled }) {
  useEffect(() => {
    updateTheme(isEnabled);
  }, [isEnabled]);

  const toggleState = () => {
    setIsEnabled((prevState) => !prevState);
  };

  return (
    <div className="flex justify-center">
      <label className={'toggle-wrapper ' + className} htmlFor="toggle">
        <div className={`toggle ${isEnabled ? 'enabled' : 'disabled'}`}>
          <span className="hidden">
            {isEnabled ? 'Enable Light Mode' : 'Enable Dark Mode'}
          </span>
          <div className="icons">
            <SunIcon />
            <MoonIcon />
          </div>
          <input
            id="toggle"
            name="toggle"
            type="checkbox"
            checked={isEnabled}
            onClick={toggleState}
          />
        </div>
      </label>
    </div>
  );
}

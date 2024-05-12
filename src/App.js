import { useEffect, useState } from 'react';

import './styles/App.scss';

import TimerSettings from './components/TimerSettings';
import HIITTimer from './components/HIITTimer';

function App() {
    const [timerSettings, setTimerSettings] = useState({
        workTime: 45,
        restTime: 15
    });

    useEffect(() => {
        const loadedTimerSettings = JSON.parse(
            localStorage.getItem('savedTimerSettings')
        );

        if (loadedTimerSettings === null) {
            return;
        }

        setTimerSettings(loadedTimerSettings);
    }, []);

    const [isTimerSettingsWindowOpen, setIsTimerSettingsWindowOpen] =
        useState(false);

    function openOrCloseTimerSettingsWindow() {
        if (!isTimerSettingsWindowOpen) {
            window.document.body.style.overflow = 'hidden';
            setIsTimerSettingsWindowOpen(true);
        } else {
            window.document.body.style.overflow = 'visible';
            setIsTimerSettingsWindowOpen(false);
        }
    }

    window.document.body.addEventListener('keydown', (e) => {
        if (e.keyCode === 27 && isTimerSettingsWindowOpen) {
            setIsTimerSettingsWindowOpen(false);
        }
    });

    return (
        <div className="App">
            <TimerSettings
                TimerSettings={timerSettings}
                SetTimerSettings={setTimerSettings}
                OpenOrCloseTimerSettingsWindow={openOrCloseTimerSettingsWindow}
                TimerSettingsWindowStyle={{
                    visibility: isTimerSettingsWindowOpen ? 'visible' : 'hidden'
                }}
            />
            <HIITTimer
                TimerSettings={timerSettings}
                OpenOrCloseTimerSettingsWindow={openOrCloseTimerSettingsWindow}
            />
        </div>
    );
}

export default App;

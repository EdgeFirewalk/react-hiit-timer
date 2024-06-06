import { useState, useEffect } from 'react';

import './styles/App.scss';

import TimerTips from './components/TimerTips';
import TimerSettings from './components/TimerSettings';
import HIITTimer from './components/HIITTimer';

function App() {
    const [timerSettings, setTimerSettings] = useState({
        workTime: 45,
        restTime: 15
    });

    const [isTimerTipsWindowOpen, setIsTimerTipsWindowOpen] = useState(false);
    const [isTimerSettingsWindowOpen, setIsTimerSettingsWindowOpen] =
        useState(false);

    useEffect(() => {
        const loadedTimerSettings = JSON.parse(
            localStorage.getItem('savedTimerSettings')
        );

        if (loadedTimerSettings === null) {
            return;
        }

        setTimerSettings(loadedTimerSettings);
    }, []);

    function openOrCloseTimerTipsWindow() {
        if (!isTimerTipsWindowOpen) {
            window.document.body.style.overflow = 'hidden';
            setIsTimerTipsWindowOpen(true);
        } else {
            window.document.body.style.overflow = 'visible';
            setIsTimerTipsWindowOpen(false);
        }
    }

    function openOrCloseTimerSettingsWindow() {
        if (!isTimerSettingsWindowOpen) {
            window.document.body.style.overflow = 'hidden';
            setIsTimerSettingsWindowOpen(true);
        } else {
            window.document.body.style.overflow = 'visible';
            setIsTimerSettingsWindowOpen(false);
        }
    }

    return (
        <div className="App">
            <div className="App-blocker">
                <p className="App-blocker__message">
                    The app is not available on this device{' '}
                    <span className="App-blocker__span">screen size</span>. The
                    minimal size is{' '}
                    <span className="App-blocker__span">295x560</span> px.
                </p>
            </div>
            <TimerTips
                OpenOrCloseTimerTipsWindow={openOrCloseTimerTipsWindow}
                TimerTipsWindowStyle={{
                    visibility: isTimerTipsWindowOpen ? 'visible' : 'hidden'
                }}
            />
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
                OpenOrCloseTimerTipsWindow={openOrCloseTimerTipsWindow}
                OpenOrCloseTimerSettingsWindow={openOrCloseTimerSettingsWindow}
            />
        </div>
    );
}

export default App;

import { useState } from 'react';

import './styles/App.scss';

import TimerSettings from './components/TimerSettings';
import HIITTimer from './components/HIITTimer';

function App() {
    const [isTimerSettingsWindowOpen, setIsTimerSettingsWindowOpen] =
        useState(false);

    function openOrCloseTimerSettingsWindow() {
        !isTimerSettingsWindowOpen
            ? setIsTimerSettingsWindowOpen(true)
            : setIsTimerSettingsWindowOpen(false);
    }

    return (
        <div className="App">
            <TimerSettings
                OpenOrCloseTimerSettingsWindow={openOrCloseTimerSettingsWindow}
                TimerSettingsStyle={{
                    visibility: isTimerSettingsWindowOpen ? 'visible' : 'hidden'
                }}
            />
            <HIITTimer
                OpenOrCloseTimerSettingsWindow={openOrCloseTimerSettingsWindow}
            />
        </div>
    );
}

export default App;

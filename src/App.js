import { useState } from 'react';

import './styles/App.scss';

import TimerSettings from './components/TimerSettings';
import HIITTimer from './components/HIITTimer';

function App() {
    const [timerSettings, setTimerSettings] = useState({
        workTime: 45,
        restTime: 15
    });

    // Здесь в useEffect получать данные о настройках таймера из localStorage

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

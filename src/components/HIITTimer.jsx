import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';

import '../styles/HIITTimer.scss';

import SettingsIcon from '../img/settings-icon.svg';
import PreviousExerciseIcon from '../img/previous-icon.svg';
import PlayIcon from '../img/play-icon.svg';
import PauseIcon from '../img/pause-icon.svg';
import ResetIcon from '../img/reset-icon.svg';
import NextExerciseIcon from '../img/next-icon.svg';

import OpenSettingsSound from '../sounds/settings-open.mp3';
import CountdownSound from '../sounds/countdown.mp3';
import BeepSound from '../sounds/beep.mp3';

import AppButton from './AppButton';

const HIITTimer = ({ TimerSettings, OpenOrCloseTimerSettingsWindow }) => {
    /* Timer things */
    const [currentTime, setCurrentTime] = useState(TimerSettings.workTime);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [timerID, setTimerID] = useState(null);

    /* Workout/Exercises things */
    const [workoutState, setWorkoutState] = useState('work'); // 'work' or 'rest'

    /* UI sounds */
    const [playOpenSettingsSound] = useSound(OpenSettingsSound);
    const [playCountdownSound] = useSound(CountdownSound);
    const [playBeepSound] = useSound(BeepSound);

    function openTimerSettingsWindow() {
        playOpenSettingsSound();
        OpenOrCloseTimerSettingsWindow();
    }

    useEffect(() => {
        if (currentTime <= 3 && currentTime !== 0) {
            playCountdownSound();
        }

        if (currentTime <= 0) {
            if (workoutState === 'work') {
                setCurrentTime(TimerSettings.restTime);
                setWorkoutState('rest');
            } else {
                setCurrentTime(TimerSettings.workTime);
                setWorkoutState('work');
            }
            playBeepSound();
        }
    }, [
        currentTime,
        workoutState,
        TimerSettings.restTime,
        TimerSettings.workTime,
        playBeepSound,
        playCountdownSound
    ]);

    function startOrPauseTimer() {
        if (!isTimerRunning) {
            setTimerID(
                setInterval(() => {
                    setCurrentTime((prevTime) => prevTime - 1);
                }, 1000)
            );
            setIsTimerRunning(true);
        } else {
            clearInterval(timerID);
            setIsTimerRunning(false);
        }
    }

    function resetTimer() {
        workoutState === 'work'
            ? setCurrentTime(TimerSettings.workTime)
            : setCurrentTime(TimerSettings.restTime);
    }

    return (
        <div className="hiit-timer">
            <div className="container">
                <div className="hiit-timer__inner">
                    <AppButton
                        AdditionalClass="hiit-timer__settings"
                        ButtonIcon={SettingsIcon}
                        OnClick={openTimerSettingsWindow}
                    />
                    <div className="hiit-timer__stage App-title">
                        {workoutState}
                    </div>
                    <div className="hiit-timer__time">{currentTime}</div>
                    <div className="timer-buttons">
                        <AppButton ButtonIcon={PreviousExerciseIcon} />
                        <AppButton
                            ButtonIcon={isTimerRunning ? PauseIcon : PlayIcon}
                            OnClick={startOrPauseTimer}
                        />
                        <AppButton
                            ButtonIcon={ResetIcon}
                            OnClick={resetTimer}
                        />
                        <AppButton ButtonIcon={NextExerciseIcon} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HIITTimer;

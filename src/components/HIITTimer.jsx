import React, { useState, useEffect, useCallback } from 'react';
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
    const [isSpaceKeyDown, setIsSpaceKeyDown] = useState(false);

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

    const startOrPauseTimer = useCallback(
        debounce(() => {
            setIsTimerRunning((prevIsTimerRunning) => {
                const newIsTimerRunning = !prevIsTimerRunning;
                if (newIsTimerRunning) {
                    playCountdownSound();
                }
                return newIsTimerRunning;
            });
        }, 20),
        []
    );

    function handleTimerKeyboardButtonPressed(e) {
        switch (e.keyCode) {
            case 32:
                if (!isSpaceKeyDown) {
                    setIsSpaceKeyDown(true);
                    startOrPauseTimer();
                }
                break;
            case 82:
                resetTimer();
                break;
            default:
                break;
        }
    }

    function handleTimerKeyboardButtonReleased(e) {
        switch (e.keyCode) {
            case 32:
                setIsSpaceKeyDown(false);
                break;
            default:
                break;
        }
    }

    function resetTimer() {
        workoutState === 'work'
            ? setCurrentTime(TimerSettings.workTime)
            : setCurrentTime(TimerSettings.restTime);
    }

    useEffect(() => {
        window.document.body.addEventListener(
            'keydown',
            handleTimerKeyboardButtonPressed
        );
        window.document.body.addEventListener(
            'keyup',
            handleTimerKeyboardButtonReleased
        );

        if (currentTime <= 3 && currentTime !== 0 && isTimerRunning) {
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

        if (isTimerRunning && !isSpaceKeyDown) {
            const timerIntervalID = setInterval(() => {
                setCurrentTime((prevTime) => prevTime - 1);
            }, 1000);
            return () => {
                clearInterval(timerIntervalID);
            };
        }
    }, [
        currentTime,
        isTimerRunning,
        workoutState,
        TimerSettings.workTime,
        TimerSettings.restTime,
        isSpaceKeyDown,
        startOrPauseTimer
    ]);

    useEffect(() => resetTimer(), [TimerSettings]);

    useEffect(() => playCountdownSound(), [isTimerRunning]);

    return (
        <div className="hiit-timer">
            <div className="container">
                <div className="hiit-timer__inner">
                    <AppButton
                        AdditionalClass="hiit-timer__settings"
                        ButtonIcon={SettingsIcon}
                        OnClick={openTimerSettingsWindow}
                    />
                    <div className="hiit-timer__stage App-title">{workoutState}</div>
                    <div className="hiit-timer__time">{currentTime}</div>
                    <div className="timer-buttons">
                        <AppButton ButtonIcon={PreviousExerciseIcon} />
                        <AppButton
                            ButtonIcon={isTimerRunning ? PauseIcon : PlayIcon}
                            OnClick={startOrPauseTimer}
                        />
                        <AppButton ButtonIcon={ResetIcon} OnClick={resetTimer} />
                        <AppButton ButtonIcon={NextExerciseIcon} />
                    </div>
                </div>
            </div>
        </div>
    );
};

function debounce(fn, delay) {
    let debounceTimer;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => fn.apply(context, args), delay);
    };
}

export default HIITTimer;

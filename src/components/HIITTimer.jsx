import React, { useState, useEffect } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import useSound from 'use-sound';

import '../styles/HIITTimer.scss';

//import QuestionIcon from '../img/question-icon.svg';
import SettingsIcon from '../img/settings-icon.svg';
//import PreviousExerciseIcon from '../img/previous-icon.svg';
import PlayIcon from '../img/play-icon.svg';
import PauseIcon from '../img/pause-icon.svg';
import ResetIcon from '../img/reset-icon.svg';
//import NextExerciseIcon from '../img/next-icon.svg';

import CountdownSound from '../sounds/countdown.mp3';
import BeepSound from '../sounds/beep.mp3';

import AppButton from './AppButton';

const HIITTimer = ({
    TimerSettings,
    OpenOrCloseTimerTipsWindow,
    OpenOrCloseTimerSettingsWindow
}) => {
    /* Timer things */
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [timerKey, setTimerKey] = useState(0);
    const [prevStageTotalTime, setPrevStageTotalTime] = useState(0);

    /* Workout/Exercises things */
    const [workoutState, setWorkoutState] = useState('work'); // 'work' or 'rest'
    const [totalWorkTime, setTotalWorkTime] = useState(0);

    // Используется для подсчёта общего времени тренировки
    let prevRemainingTime =
        workoutState === 'work'
            ? TimerSettings.workTime
            : TimerSettings.restTime;

    /* UI sounds */
    const [playCountdownSound] = useSound(CountdownSound);
    const [playBeepSound] = useSound(BeepSound);

    function resetTimer() {
        setTimerKey((prevKey) => prevKey + 1);
    }

    function startOrPauseTimer() {
        setIsTimerRunning((running) => !running);
    }

    function resetTotalWorkTime() {
        setTotalWorkTime(0);
        setPrevStageTotalTime(0);
    }

    function formatTotalWorkTime(seconds) {
        let hrs = Math.floor(seconds / 3600);
        let min = Math.floor((seconds % 3600) / 60);
        let sec = Math.floor(seconds % 60);
        hrs = hrs < 10 ? '0' + hrs : hrs;
        min = min < 10 ? '0' + min : min;
        sec = sec < 10 ? '0' + sec : sec;
        return hrs + ':' + min + ':' + sec;
    }

    // Обновляем таймер, когда изменются настройки, чтобы они сразу применились
    // Плюс сбрасываем общее время тренировки
    useEffect(() => {
        resetTimer();
        resetTotalWorkTime();
    }, [TimerSettings]);

    // Проигрываем звук, когда таймер останавливают или запускают
    useEffect(() => playCountdownSound(), [isTimerRunning]);

    return (
        <div className="hiit-timer">
            <div className="container">
                <div className="hiit-timer__inner">
                    <div className="hiit-timer__header">
                        {/* This tips button will be needed when I add more functionality to this project */}
                        {/*<AppButton
                            AdditionalClass="hiit-timer__tips"
                            ButtonIcon={QuestionIcon}
                            OnClick={() => {
                                if (isTimerRunning) { startOrPauseTimer(); }
                                OpenOrCloseTimerTipsWindow();
                            }}
                        />*/}
                        <AppButton
                            AdditionalClass="hiit-timer__settings"
                            ButtonIcon={SettingsIcon}
                            OnClick={() => {
                                if (isTimerRunning) {
                                    startOrPauseTimer();
                                }
                                OpenOrCloseTimerSettingsWindow();
                            }}
                        />
                    </div>
                    <div className="hiit-timer__stage App-title">
                        {workoutState}
                    </div>
                    <div className="hiit-timer__time-wrapper">
                        {/*
                            Documentation on the timer used:
                                https://github.com/vydimitrov/react-countdown-circle-timer/tree/master/packages/web#react-countdown-circle-timer
                        */}
                        <CountdownCircleTimer
                            className="hiit-timer__time"
                            key={timerKey}
                            size="280"
                            colors="#1299f6"
                            trailColor="#d8d8d8"
                            strokeWidth="3"
                            isPlaying={isTimerRunning}
                            duration={
                                workoutState === 'work'
                                    ? // The settings input validation implemented is not gonna allow user to set time settings
                                      // less than 5 (including negative values), but the used timer component does work with those numbers
                                      // (including zero, but not the negative ones obviously)

                                      // This kinda weird thing is done so that the used timer component doesn't throw a critical error for setting
                                      // the wrong time to count down from (like 0 and 0 or negative values)
                                      // These settings won't be saved actually and the user won't be able to close settings modal window until he
                                      // sets the right time
                                      TimerSettings.workTime > 0
                                        ? TimerSettings.workTime
                                        : 1
                                    : TimerSettings.restTime > 0
                                      ? TimerSettings.restTime
                                      : 1
                            }
                            onUpdate={(remainingTime) => {
                                setTotalWorkTime(
                                    prevStageTotalTime +
                                        (prevRemainingTime - remainingTime)
                                );

                                if (
                                    remainingTime <= 3 &&
                                    remainingTime !== 0 &&
                                    isTimerRunning
                                ) {
                                    playCountdownSound();
                                }

                                prevRemainingTime = remainingTime;
                            }}
                            onComplete={() => {
                                if (workoutState === 'work') {
                                    setPrevStageTotalTime(
                                        (prev) =>
                                            (prev += TimerSettings.workTime)
                                    );
                                    setWorkoutState('rest');
                                } else {
                                    setPrevStageTotalTime(
                                        (prev) =>
                                            (prev += TimerSettings.restTime)
                                    );
                                    setWorkoutState('work');
                                }
                                playBeepSound();

                                // Перезапускаем таймер в новой стадии
                                setTimerKey((prevKey) => prevKey + 1);
                            }}
                        >
                            {({ remainingTime }) => (
                                <div className="hiit-timer__time">
                                    {remainingTime}
                                </div>
                            )}
                        </CountdownCircleTimer>
                    </div>
                    <div className="timer-buttons">
                        {/* These buttons well be added if I get back to this project and actually add a feature with exercises */}
                        {/*<AppButton ButtonIcon={PreviousExerciseIcon} />*/}
                        <AppButton
                            ButtonIcon={isTimerRunning ? PauseIcon : PlayIcon}
                            OnClick={startOrPauseTimer}
                        />
                        <AppButton
                            ButtonIcon={ResetIcon}
                            OnClick={resetTimer}
                        />
                        {/*<AppButton ButtonIcon={NextExerciseIcon} />*/}
                    </div>
                    <div className="hiit-timer__info">
                        <div className="info-block">
                            <div className="info-block__title">Total time:</div>
                            <div className="info-block__info">
                                {formatTotalWorkTime(totalWorkTime)}
                            </div>
                        </div>
                        {/*<div className="info-block">
                            <div className="info-block__title">Round №</div>
                            <div className="info-block__info">0</div>
                        </div>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HIITTimer;

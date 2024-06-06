import React, { useRef, useState } from 'react';

import '../styles/TimerSettings.scss';

import CloseIcon from '../img/close-icon.svg';

import AppButton from './AppButton';

const TimerSettings = ({
    TimerSettings,
    SetTimerSettings,
    OpenOrCloseTimerSettingsWindow,
    TimerSettingsWindowStyle
}) => {
    const [hasErrorInWorkTimeSetting, setHasErrorInWorkTimeSetting] =
        useState(false);
    const [hasErrorInRestTimeSetting, setHasErrorInRestTimeSetting] =
        useState(false);

    const workTimeRef = useRef();
    const restTimeRef = useRef();

    function setNewTimerSettings(settingName, newTimeValue, inputRef) {
        // Даже если неправильные настройки, то всё-равно присваиваем их состоянию
        // и заодно показываем пользователю, что он ошибся
        SetTimerSettings({ ...TimerSettings, [settingName]: newTimeValue });

        const intNewTimeValue = parseInt(newTimeValue);
        if (
            isNaN(intNewTimeValue) ||
            intNewTimeValue < 5 ||
            intNewTimeValue > 999
        ) {
            inputRef.current.style.color = '#f61212';
            inputRef.current.style.backgroundColor = 'rgba(246, 18, 18, 0.15)';
            inputRef.current.style.borderBottomColor = '#f61212';

            settingName === 'workTime'
                ? setHasErrorInWorkTimeSetting(true)
                : setHasErrorInRestTimeSetting(true);
        } else {
            inputRef.current.style.color = null;
            inputRef.current.style.backgroundColor = null;
            inputRef.current.style.borderBottomColor = null;

            settingName === 'workTime'
                ? setHasErrorInWorkTimeSetting(false)
                : setHasErrorInRestTimeSetting(false);

            const newTimerSettings = {
                ...TimerSettings,
                [settingName]: intNewTimeValue
            };
            SetTimerSettings(newTimerSettings);

            localStorage.setItem(
                'savedTimerSettings',
                JSON.stringify(newTimerSettings)
            );
        }
    }

    return (
        <div
            className="timer-settings modal-window"
            style={TimerSettingsWindowStyle}
        >
            <div className="container">
                <div className="modal-window__inner">
                    <AppButton
                        ButtonIcon={CloseIcon}
                        AdditionalClass={`modal-window__close-button ${hasErrorInWorkTimeSetting || hasErrorInRestTimeSetting ? 'modal-window__hidden-button' : ''}`}
                        OnClick={OpenOrCloseTimerSettingsWindow}
                    />
                    <p className="timer-settings__title App-title">Settings</p>
                    <div className="settings-inputs">
                        <div className="settings-inputs__block">
                            <label
                                className="settings-inputs__label"
                                htmlFor="work-input"
                            >
                                Work time:
                            </label>
                            <input
                                id="work-input"
                                ref={workTimeRef}
                                className="settings-inputs__input"
                                type="text"
                                value={TimerSettings.workTime}
                                onChange={(e) =>
                                    setNewTimerSettings(
                                        'workTime',
                                        e.target.value,
                                        workTimeRef
                                    )
                                }
                                onClick={(e) => e.target.select()}
                            />
                        </div>
                        <div className="settings-inputs__block">
                            <label
                                className="settings-inputs__label"
                                htmlFor="rest-input"
                            >
                                Rest time:
                            </label>
                            <input
                                id="rest-input"
                                ref={restTimeRef}
                                className="settings-inputs__input"
                                type="text"
                                value={TimerSettings.restTime}
                                onChange={(e) =>
                                    setNewTimerSettings(
                                        'restTime',
                                        e.target.value,
                                        restTimeRef
                                    )
                                }
                                onClick={(e) => e.target.select()}
                            />
                        </div>
                    </div>
                    <p
                        className="timer-settings__tip"
                        style={{
                            display:
                                hasErrorInWorkTimeSetting ||
                                hasErrorInRestTimeSetting
                                    ? 'none'
                                    : 'block'
                        }}
                    >
                        New settings are saved and applied automatically, you
                        can just close this window!
                    </p>
                    <p
                        className="timer-settings__error"
                        style={{
                            display:
                                hasErrorInWorkTimeSetting ||
                                hasErrorInRestTimeSetting
                                    ? 'block'
                                    : 'none'
                        }}
                    >
                        Values must be numbers between 5 and 999.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TimerSettings;

import React from 'react';

import '../styles/TimerSettings.scss';

import CloseIcon from '../img/close-icon.svg';

import AppButton from './AppButton';

const TimerSettings = ({
    TimerSettings,
    SetTimerSettings,
    OpenOrCloseTimerSettingsWindow,
    TimerSettingsWindowStyle
}) => {
    function setNewTimerSettings(settingName, newTimeValue, defaultTimeValue) {
        const newTimerSettings = {
            ...TimerSettings,
            [settingName]:
                !isNaN(parseInt(newTimeValue)) &&
                parseInt(newTimeValue) <= 999 &&
                parseInt(newTimeValue) !== 0
                    ? parseInt(newTimeValue)
                    : defaultTimeValue
        };

        SetTimerSettings(newTimerSettings);
        localStorage.setItem(
            'savedTimerSettings',
            JSON.stringify(newTimerSettings)
        );
    }

    return (
        <div className="timer-settings" style={TimerSettingsWindowStyle}>
            <div className="container">
                <div className="timer-settings__inner">
                    <AppButton
                        ButtonIcon={CloseIcon}
                        AdditionalClass="timer-settings__close-button"
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
                                className="settings-inputs__input"
                                type="text"
                                value={TimerSettings.workTime}
                                onChange={(e) =>
                                    setNewTimerSettings(
                                        'workTime',
                                        e.target.value,
                                        45
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
                                className="settings-inputs__input"
                                type="text"
                                value={TimerSettings.restTime}
                                onChange={(e) =>
                                    setNewTimerSettings(
                                        'restTime',
                                        e.target.value,
                                        15
                                    )
                                }
                                onClick={(e) => e.target.select()}
                            />
                        </div>
                    </div>
                    <p className="timer-settings__tip">
                        New settings are saved and applied automatically, you
                        can just close this window!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TimerSettings;

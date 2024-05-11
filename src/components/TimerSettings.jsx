import React from 'react';
import useSound from 'use-sound';

import '../styles/TimerSettings.scss';

import CloseIcon from '../img/close-icon.svg';

import CloseSettingsSound from '../sounds/settings-close.mp3';

import AppButton from './AppButton';

const TimerSettings = ({
    TimerSettings,
    SetTimerSettings,
    OpenOrCloseTimerSettingsWindow,
    TimerSettingsWindowStyle
}) => {
    const [playCloseSettingsSound] = useSound(CloseSettingsSound);

    function closeTimerSettings() {
        playCloseSettingsSound();
        OpenOrCloseTimerSettingsWindow();
    }

    return (
        <div className="timer-settings" style={TimerSettingsWindowStyle}>
            <div className="container">
                <div className="timer-settings__inner">
                    <AppButton
                        ButtonIcon={CloseIcon}
                        AdditionalClass="timer-settings__close-button"
                        OnClick={closeTimerSettings}
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
                                    SetTimerSettings({
                                        ...TimerSettings,
                                        workTime: !isNaN(parseInt(e.target.value)) && parseInt(e.target.value) <= 999 && parseInt(e.target.value) !== 0
                                            ? parseInt(e.target.value)
                                            : 45
                                    })
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
                                    SetTimerSettings({
                                        ...TimerSettings,
                                        restTime: !isNaN(parseInt(e.target.value)) && parseInt(e.target.value) <= 999 && parseInt(e.target.value) !== 0
                                            ? parseInt(e.target.value)
                                            : 15
                                    })
                                }
                                onClick={(e) => e.target.select()}
                            />
                        </div>
                    </div>
                    <p className="timer-settings__tip">
                        Don't forget to reset timer when you change any of these
                        settings!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TimerSettings;

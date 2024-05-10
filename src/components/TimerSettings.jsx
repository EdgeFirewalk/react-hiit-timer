import React from 'react';
import useSound from 'use-sound';

import '../styles/TimerSettings.scss';

import CloseIcon from '../img/close-icon.svg';

import CloseSettingsSound from '../sounds/settings-close.mp3';

import AppButton from './AppButton';

const TimerSettings = ({
    OpenOrCloseTimerSettingsWindow,
    TimerSettingsStyle
}) => {
    const [playCloseSettingsSound] = useSound(CloseSettingsSound);

    function closeTimerSettings() {
        playCloseSettingsSound();
        OpenOrCloseTimerSettingsWindow();
    }

    return (
        <div className="timer-settings" style={TimerSettingsStyle}>
            <div className="container">
                <div className="timer-settings__inner">
                    <AppButton
                        ButtonIcon={CloseIcon}
                        AdditionalClass="timer-settings__close-button"
                        OnClick={closeTimerSettings}
                    />
                    <p className="timer-settings__title">Settings</p>
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
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimerSettings;

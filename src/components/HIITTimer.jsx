import React from 'react';

import '../styles/HIITTimer.scss';

import SettingsIcon from '../img/settings-icon.svg';
import PreviousExerciseIcon from '../img/previous-icon.svg';
import PlayIcon from '../img/play-icon.svg';
import ResetIcon from '../img/reset-icon.svg';
import NextExerciseIcon from '../img/next-icon.svg';

import AppButton from './AppButton';

const HIITTimer = () => {
    return (
        <div className="hiit-timer">
            <div className="container">
                <div className="hiit-timer__inner">
                    <AppButton
                        AdditionalClass="hiit-timer__settings"
                        ButtonIcon={SettingsIcon}
                    />
                    <div className="hiit-timer__stage">Work</div>
                    <div className="hiit-timer__time">45</div>
                    <div className="timer-buttons">
                        <AppButton ButtonIcon={PreviousExerciseIcon} />
                        <AppButton ButtonIcon={PlayIcon} />
                        <AppButton ButtonIcon={ResetIcon} />
                        <AppButton ButtonIcon={NextExerciseIcon} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HIITTimer;

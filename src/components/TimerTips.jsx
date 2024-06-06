import React from 'react';

import '../styles/TimerTips.scss';

import CloseIcon from '../img/close-icon.svg';

import AppButton from './AppButton';

const TimerTips = ({ OpenOrCloseTimerTipsWindow, TimerTipsWindowStyle }) => {
    return (
        <div className="timer-tips modal-window" style={TimerTipsWindowStyle}>
            <div className="container">
                <div className="modal-window__inner">
                    <AppButton
                        ButtonIcon={CloseIcon}
                        AdditionalClass="modal-window__close-button"
                        OnClick={OpenOrCloseTimerTipsWindow}
                    />
                    <p className="timer-tips__title App-title">Tips</p>
                    <p className="timer-tips__tip">
                        <span className="timer-tips__span">Something</span> —
                        there may be something important here someday...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TimerTips;

import React from 'react';

import '../styles/AppButton.scss';

const AppButton = ({ AdditionalClass, ButtonIcon, OnClick }) => {
    return (
        <div className={'App-button ' + AdditionalClass} onClick={OnClick}>
            <img className="App-icon" src={ButtonIcon} alt="App-button" />
        </div>
    );
};

export default AppButton;

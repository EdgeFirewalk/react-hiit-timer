import React from 'react';

import '../styles/AppButton.scss';

const AppButton = ({ AdditionalClass, ButtonIcon }) => {
    return (
        <div className={'App-button ' + AdditionalClass}>
            <img className="App-icon" src={ButtonIcon} alt="App-button" />
        </div>
    );
};

export default AppButton;

import React from 'react';

import Glyphicon from 'react-bootstrap/es/Glyphicon';

import './network-error.scss';

const RenderNetworkError = () => (
    <div className="error">
        <Glyphicon className="error__icon" glyph="remove"/>
        <span className="error__text">Network error</span>
    </div>
);

RenderNetworkError.displayName = 'RenderNetworkError';

export default RenderNetworkError;
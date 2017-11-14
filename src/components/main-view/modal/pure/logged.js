import React from 'react';

import Glyphicon from 'react-bootstrap/es/Glyphicon';

import './logged.scss';

const RenderLogged = () => (
    <div className="logged">
        <Glyphicon className="logged__icon" glyph="ok"/>
        <span className="logged__text">Successful logged</span>
    </div>
);

RenderLogged.displayName = 'RenderLogged';

export default RenderLogged;
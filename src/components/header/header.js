import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './header.scss';

const Header = ({className, text}) => {
    return (
        <header className={cn(className, "header")}>
            <h1>{text}</h1>
        </header>
    );
};

Header.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired
};

export default Header;
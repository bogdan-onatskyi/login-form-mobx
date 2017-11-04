import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './footer.scss';

const Footer = ({className}) => {
    return (
        <footer className={cn(className, "footer")}>
            <span className="icon-phone"/>
            <span className="footer--phone">+38 (097) 499-73-82 </span>
            <span className="footer--e-mail">
                e&#8209;mail:&nbsp;
                <a href="mailto: gentoo.user@ukr.net">gentoo.user@ukr.net</a>
            </span>
        </footer>
    );
};

Footer.propTypes = {
    className: PropTypes.string
};

export default Footer;
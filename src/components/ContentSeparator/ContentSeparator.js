import React from 'react';
import './ContentSeparator';

const contentSeparator = props => (
    <div className='divider'>
        { props.children }
    </div>
);

export default contentSeparator;

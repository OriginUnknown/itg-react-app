import React from 'react';
import './VehicleContent';

const vehicleContent = props => (
    <div className='content'>
        <h1 className='to-uppercase'>Vehicle { props.content.name }</h1>
        <h2 className='price dark-grey-color'>From { props.content.price }</h2>
        <p className='description dark-grey-color'>{ props.content.description }</p>
    </div>
);

export default vehicleContent;

import React from 'react';
import './VehiclePicture';

const vehiclePicture = props => (
    <div className='image-container'>
        <img className='profile-picture'
             src={ props.imageSrc }
             alt={ props.altText }
        />
    </div>
)

export default vehiclePicture;
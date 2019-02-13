import React from 'react';
import VehiclePicture from '../VehiclePicture/VehiclePicture';
import VehicleContent from '../VehicleContent/VehicleContent';
import './VehicleCard';

const vehicleCard = props => (
  <div className='vehicle-card'>
      <VehiclePicture imageSrc={ `.${props.media[0].url}` } altText={ props.media[0].name } />
      <VehicleContent content={ props.vehicleDetails } />
  </div>
);

export default vehicleCard;
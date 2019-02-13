import React, { Component } from 'react';
import { v4 } from 'uuid';
import VehicleCard from '../../components/VehicleCard/VehicleCard';
import ContentSeparator from '../../components/ContentSeparator/ContentSeparator';
import { getData } from '../../api';
import './VehicleList';

export default
class VehicleList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			data: null
		}
	} 

	componentDidMount() {
		getData('vehicle', async (data) => {
			this.setState({
				data
			})
		});
	}

	render() {
		let children = [], tmp = [];
		const groupKey = {
			APPEND_ITEM_TO_GROUP: 'APPEND_ITEM_TO_GROUP',
			GROUP_LAST_ITEM: 'GROUP_LAST_ITEM'
		};
		const applySeparatorDivWrapper = (key, vehicle) => {
			switch (key) {
				case groupKey.APPEND_ITEM_TO_GROUP:
					children = [];
					tmp.push(<VehicleCard key={ v4() } { ...vehicle } />);
					break;
				case groupKey.GROUP_LAST_ITEM:
					children = [];
					tmp.push(<VehicleCard key={ v4() } { ...vehicle } />);
					children = children.concat(tmp);
					tmp = [];
					return (
						<ContentSeparator key={ v4() }>
							{ children }
						</ContentSeparator>
					);
				default:
					// separate content by default
					tmp.push(<VehicleCard key={ v4() } { ...vehicle } />);
					children = children.concat(tmp);
					tmp = [];
					return (
						<ContentSeparator key={ v4() }>
							{ children }
						</ContentSeparator>
					);
			}
		}
		if(this.state.data) {
			return (
				<div className='vehicle-container'>
					{
						this.state.data.map((vehicle, index, arr) => {
							if (index  === arr.length - 1) {
								return applySeparatorDivWrapper(groupKey.GROUP_LAST_ITEM, vehicle);
							}
							if ((index + 1) % 2 !== 0) {
								applySeparatorDivWrapper(groupKey.APPEND_ITEM_TO_GROUP, vehicle);
								return;
							}
							if ((index + 1) % 2 === 0) {
								return applySeparatorDivWrapper(null, vehicle);
							}
						})
					}
				</div>
			)
	    }

		return (<h1>Loading...</h1>);
	}
}
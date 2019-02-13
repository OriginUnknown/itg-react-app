/**
* This is an example request. Create your own using best practises for
* handling asynchronous data fetching
**/

const BASE_API_URL = `http://localhost:9988/api`;
const getProductSummary = async (endpoint) => await fetch(`${BASE_API_URL}/${endpoint}`);
const getProductDetails = async (id) => await fetch(`${BASE_API_URL}/vehicle/${id}`);

export const getData = async (endpoint, cb) => {
	try {
		const response = await getProductSummary(endpoint);
		// .json() method unpacks the data from the promise(s) returned from the fetch() method - 2 step process
		const vehiclesSummary = await response.json();
		const getVehicleDetails = await Promise.all(vehiclesSummary.vehicles.map(async (vehicle) => {
			const vehicleDetailsResponse = await getProductDetails(vehicle.id);
			const vehicleDetails = await vehicleDetailsResponse.json();
			// Ideally, would use spread operator to spread out props from vehicle but not liked by this current code setup :/
			const vehicleInfo = Object.assign({}, vehicle, {
				vehicleDetails: {
					name: vehicleDetails.id,
					meta: vehicleDetails.meta,
					description: vehicleDetails.description,
					price: vehicleDetails.price
				}
			});
			return vehicleInfo;
		}));
		cb(getVehicleDetails);
		
	} catch (e) {
		throw new Error(e);
	}
};
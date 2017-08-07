import canUseDOM from "can-use-dom";

import raf from "raf";

import {
	default as React,
	Component,
} from "react";

import {
	withGoogleMap,
	GoogleMap,
	Marker,
} from "react-google-maps";

import 'whatwg-fetch';

const GettingStartedGoogleMap = withGoogleMap(props => (
	
	<GoogleMap
		defaultZoom={8}
		center={props.center}
	>
	<Marker
			position={props.center}
			title={props.name}
		/>
		
	</GoogleMap>
));

export default class MultipleMaps extends Component {
  constructor(props) {
    super(props);
	
    this.state = {
      cities: []
    };

  }


  componentDidMount() {
    fetch('/api/cities')
      .then(res => res.json())
      .then(json => {
	      console.log('in here')
	      console.log(json)
        this.setState({
          	cities: json
        });
      });
  }
/*
  newCounter() {
    fetch('/api/counters', { method: 'POST' })
      .then(res => res.json())
      .then(json => {
        let data = this.state.counters;
        data.push(json);

        this.setState({
          counters: data
        });
      });
  }*/

	
	renderMaps() {


				return this.state.cities.map(aMap => {

					let center  =	{
							lat: Number(aMap.lat),
							lng: Number(aMap.lon)
						}

					const style = {height: `250px`, width: `250px`}

					return (
						<div style={style}>
							<GettingStartedGoogleMap
								containerElement={
									<div style={{ height: `100%` }} />
								}
								mapElement={
									<div style={{ height: `100%` }} />
								}
								center={center}
								name={aMap.city}
							/>
						</div>
					)
				})

		}
	
	// renderMaps() {
	// 	const maps = [{ lat: 25.0112183, lng: 121.52067570000001 }, { lat: 25.0112183, lng: 21.52067570000001 },{ lat: 10.0112183, lng: 121.52067570000001 }];
	// 	console.log(this)
	//  return maps.map((gMap) => {

	//  	console.log(this);
	// 	return (
	// 		<div style={{height: `250px`}}>
	// 			<GettingStartedGoogleMap
	// 				containerElement={
	// 					<div style={{ height: `100%` }} />
	// 				}
	// 				mapElement={
	// 					<div style={{ height: `100%` }} />
	// 				}
	// 				center={{
	//  					lat: gMap.lat,
	//  					lng: gMap.lng
	//  				}}
	// 			/>
	// 		</div>
	// 	);
	// });
		// return maps => {
	//     for (let i = 0; i < 2; i++) {
		// 	console.log(i);
		// 	return (
	//     <div style={{height: `250px`}}>
	//       <GettingStartedGoogleMap
	//         containerElement={
	//           <div style={{ height: `100%` }} />
	//         }
	//         mapElement={
	//           <div style={{ height: `100%` }} />
	//         }
	//       />
	//     </div>
	//     )
		// }}
	// }

	render() {
		return (
			<div>{this.renderMaps()}</div>
		)
	};

}


/*		fetch('api/cities')
			.then(response => {
				// console.log(response);
				return response.json();
			})
			.then(cities => {
				
			})
			.catch(err => {
				console.log(err);
			});*/

import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

 
class SimpleMap extends Component { 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCzjy1FwZLGMwvuBVbaGwbCX-Wig_84dlE' }}
          defaultCenter={{lat: this.props.lat, lng: this.props.lng}}
          defaultZoom= {13}
        >
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;
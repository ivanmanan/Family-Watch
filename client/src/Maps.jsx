import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

// class Maps extends Component {
//   render() {
//     return (
//       <div className="Maps">
//         <h1>Render Maps here.</h1>
//         <h3>Google API key: AIzaSyBwu92u8xtE-MLIYMA0gP30EOms2FSnWkg</h3>
//       </div>
//     );
//   }
// }

export class Maps extends Component {
  render() {
    return (
      <div className="Maps">
        <Map google={this.props.google} zoom={14}>
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'} />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBwu92u8xtE-MLIYMA0gP30EOms2FSnWkg')
}) (Maps)

// export default Maps;

// <script>
//   function initMap(){
//     var options = {
//       zoom: 8,
//       center: {lat: 34.0689, lng: 118.4452}
//     }
//
//     var map = new google.maps.Map(document.getElementById('map'), options)
//   }
// </script>
// <script async defer
//   src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBwu92u8xtE-MLIYMA0gP30EOms2FSnWkg&callback=initMap">
//   </script>

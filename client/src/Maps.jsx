import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

var counter = 0;
var TIME = 6000;

export class Maps extends Component {
  constructor(props) {
    super(props);

    const {lat, lng} = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng,
        history: []
      }
    }

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  recenterMap() {
    const map = this.map;
    const curr = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(curr.lat, curr.lng)
      map.panTo(center)
    }
  }

  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          })
        })
      }
    }

    // ivan's code
    this.timerID = setInterval(
      () => this.updateHistory(),
      TIME
    );
    this.loadMap();
  }

  // ivan's code
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // ivan's code
  updateHistory() {
    this.setState({
      history: this.props.history
    });
  }

  loadMap() {
    if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let {initialCenter, zoom} = this.props;
      const {lat, lng} = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);

      const evtNames = ['ready', 'click', 'dragend'];

      evtNames.forEach(e => {
        this.map.addListener(e, this.handleEvent(e));
      });

      maps.event.trigger(this.map, 'ready');

      // let centerChangedTimeout;
      // this.map.addListener('dragend', (evt) => {
      //   if (centerChangedTimeout) {
      //     clearTimeout(centerChangedTimeout);
      //     centerChangedTimeout = null;
      //   }
      //   centerChangedTimeout = setTimeout(() => {
      //     this.props.onMove(this.map);
      //   }, 0);
      // })
    }
    // ...
  }

  handleEvent(evtName) {
    const camelize = function(str) {
      return str.split(' ').map(function(word){
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join('');
    }

    let timeout;
    const handlerName = `on${camelize(evtName)}`;

    return (e) => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => {
        if (this.props[handlerName]) {
          this.props[handlerName](this.props, this.map, e);
        }
      }, 0);
    }
  }

  renderMarkers() {
    // First need to clear up all current markers

    var allMarkers = [];

    console.log("Displaying Maps stuff...");
    /* if (typeof this.state.history != 'undefined')
     *   if (typeof this.state.history[0] != 'undefined')
     *     console.log(this.state.history[0].longitude);*/


    /* var temp = (
     *   <Marker
     *     onClick={this.onMarkerClick}
     *     name={'Current location'}
     *     position={{lat: 34.07, lng: -118.449745}}
     *   />
     * );
     * allMarkers.push(temp);*/


    // figure out history length
    if (typeof this.state.history != 'undefined')
      if (typeof this.state.history[0] != 'undefined') {
        console.log(this.state.history.length);
        console.log(this.state.history);
        for (var i = 0; i < this.state.history.length; i++) {
          counter++;
          var temp = (
              <Marker
                key={counter}
                onClick={this.onMarkerClick}
                name={counter}
                position={{lat: this.state.history[i].latitude,
                           lng: this.state.history[i].longitude}}
              />
          );
          allMarkers.push(temp);
        }
      }
    // can insert info window below Marker tag

    return allMarkers;
  }

  render() {
    return (
      <div className="Maps">
        <Map onClick={this.onMapClick} google={this.props.google} zoom={6}>
          <Marker onClick={this.onMarkerClick} name={'Current location'} />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
              <h1>test</h1>
            </div>
          </InfoWindow>
          {/* Render markers history here */}
          {this.renderMarkers()}
          {/* May want to move infowindow to function as well */}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
              <h1>test2</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

Maps.propTypes = {
  google: React.PropTypes.object,
  zoom: React.PropTypes.number,
  initialCenter: React.PropTypes.object,
  centerAroundCurrentLocation: React.PropTypes.bool,
  onMove: React.PropTypes.func,
}

Maps.defaultProps = {
  zoom: 13,
  // San Francisco, by default
  initialCenter: {
    lat: 34.068691,
    lng: -118.449745
  },
  centerAroundCurrentLocation: false,
  onMove: function() {} // default prop
}

// export class Markers extends React.Component {
//   componentDidUpdate(prevProps) {
//     if ((this.props.map !== prevProps.map) ||
//       (this.props.position !== prevProps.position)) {
//         this.renderMarker();
//     }
//   }
//   renderMarkers() {
//       let {
//         map, google, position, mapCenter
//       } = this.props;
//
//       let pos = position || mapCenter;
//       position = new google.maps.LatLng(pos.lat, pos.lng);
//
//       const pref = {
//         map: map,
//         position: position
//       };
//       this.marker = new google.maps.Marker(pref);
//   }
//   // ...
// }
//
// Markers.propTypes = {
//   position: React.PropTypes.object,
//   map: React.PropTypes.object
// }

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBwu92u8xtE-MLIYMA0gP30EOms2FSnWkg')
}) (Maps)
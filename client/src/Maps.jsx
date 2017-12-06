import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

var counter = 0;
var TIME = 3000;

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

    // Hot change -- may need to be deleted
    if (typeof google != 'undefined')
      if (typeof google.maps != 'undefined') {
        const maps = google.maps;

        if (map) {
          let center = new maps.LatLng(curr.lat, curr.lng)
          map.panTo(center)
        }
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
    }
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

    if (typeof this.state.history != 'undefined')
      if (typeof this.state.history[0] != 'undefined') {
        for (var i = 0; i < this.state.history.length; i++) {
          counter++;
          var mark = (
            <Marker
              key={counter}
              onClick={this.onMarkerClick}
              name={counter}
              position={{lat: this.state.history[i].latitude,
                         lng: this.state.history[i].longitude}}
            />
          );

          // lewis todo:
          // This needs to be inside the marker tag
          // https://stackoverflow.com/questions/46936776/react-google-map-multiple-info-window-open
          // I may need to parse the time to reveal date and hour only
          var time = (
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}>
              <div>
                <h5>{this.state.history[i].time}</h5>
              </div>
            </InfoWindow>
          );
          allMarkers.push(mark);
          allMarkers.push(time);
        }
      }
    // can insert info window below Marker tag

    return allMarkers;
  }

  render() {
    return (
      <div className="Maps">
        <Map onClick={this.onMapClick} google={this.props.google} zoom={5}>
          {this.renderMarkers()}
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
  initialCenter: {
    lat: 34.068691,
    lng: -118.449745
  },
  centerAroundCurrentLocation: true,
  onMove: function() {} // default prop
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBwu92u8xtE-MLIYMA0gP30EOms2FSnWkg')
}) (Maps)
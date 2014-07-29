L.FixMyStreetMap = L.UrbisMap.extend({
  VERSION: '0.1.0',

  DEFAULTS: {
    language: 'fr',

    // Layers loaded during initialize
    urbisLayersToLoad: [
      'base-map-fr',
      'municipal-boundaries',
      'regional-roads',
    ],
  },

  options: {
    newIncidentMarker: {
      icon: L.icon({
        iconUrl: 'http://fixmystreet.irisnetlab.be/static/images/pin-fixmystreet-L.png',
        iconAnchor: [20, 52],
        popupAnchor: [0, -35],
      }),
    },
  },

  // Config per incident type
  incidentTypes: {
    reported: {
      title: 'Reported',
      color: '#c3272f',
      icon: L.icon({
        iconUrl: 'http://fixmystreet.irisnetlab.be/static/images/pin-red-L.png',
        iconAnchor: [20, 52],
        popupAnchor: [0, -35],
      }),
    },
    ongoing: {
      title: 'Ongoing',
      color: '#f79422',
      icon: L.icon({
        iconUrl: 'http://fixmystreet.irisnetlab.be/static/images/pin-orange-L.png',
        iconAnchor: [20, 52],
        popupAnchor: [0, -35],
      }),
    },
    closed: {
      title: 'Closed',
      color: '#3cb64b',
      icon: L.icon({
        iconUrl: 'http://fixmystreet.irisnetlab.be/static/images/pin-green-L.png',
        iconAnchor: [20, 52],
        popupAnchor: [0, -35],
      }),
    },
  },

  _incidentLayers: {},
  incidents: [],

  initialize: function (id, options) {  // (HTMLElement or String, Object)
    options = $.extend(this.DEFAULTS, options);
    L.UrbisMap.prototype.initialize.call(this, id, options);

    this._initUrbisLayers();
    this._initIncidentLayers();
  },

  addIncident: function (type, latlng, popup) {
    if (!(type in this.incidentTypes)) {
      console.log('ERROR: Invalid incident type "' + type + '".');
      return;
    }

    var that = this;
    var markerOptions = {
      icon: this.incidentTypes[type].icon,
      popup: popup || this.incidentTypes[type].popup,
    };

    var m = this.addMarker(latlng, markerOptions, this._incidentLayers[type]);

    m.on('click', function (evt) {
      that._incident_onClick(that, evt);
    });

    this.incidents.push(m);
  },

  addNewIncidentMarker: function (latlng, popup) {
    if (this.newIncidentMarker) {
      console.log('WARNING: A new incident marker is already loaded.');
      return;
    }

    var that = this;
    var markerOptions = {
      draggable: true,
      icon: this.options.newIncidentMarker.icon,
      popup: popup || this.options.newIncidentMarker.popup,
    };

    this.newIncidentMarker = this.addMarker(latlng, markerOptions, this);

    this.newIncidentMarker.on('dragend', function (evt) {
      that._newIncidentMarker_onDragEnd(that, evt);
    });
  },

  removeNewIncidentMarker: function () {
    this.removeLayer(this.newIncidentMarker);
    this.newIncidentMarker = null;
  },

  // INITIALIZATION ------------------------------------------------------------

  _initUrbisLayers: function () {
    var that = this;

    // Customize L.UrbisMap.layersSettings
    L.UrbisMap.layersSettings['regional-roads']['options']['opacity'] = 0.5;
    L.UrbisMap.layersSettings['regional-roads']['options']['filter'] =
      '<ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">' +
        '<ogc:PropertyIsEqualTo matchCase="true">' +
          '<ogc:PropertyName>ADMINISTRATOR</ogc:PropertyName>' +
          '<ogc:Literal>REG</ogc:Literal>' +
        '</ogc:PropertyIsEqualTo>' +
      '</ogc:Filter>';

    // Load initial UrbIS layers
    $.each(this.options.urbisLayersToLoad, function (k, v) {
      that.loadLayer(v, L.UrbisMap.layersSettings[v]);
    });
  },

  _initIncidentLayers: function () {
    var that = this;

    $.each(this.incidentTypes, function (k, v) {
      that._incidentLayers[k] = new L.FixMyStreetMap.MarkerClusterGroup();
      that._incidentLayers[k].on('clusterclick', function (evt) {
        that._cluster_onClick(that, evt);
      });
      that._incidentLayers[k].addTo(that);
    });
  },

  // EVENT HANDLERS ------------------------------------------------------------

  _cluster_onClick: function (that, evt) {  // layer.clusterclick
  },

  _incident_onClick: function (that, evt) {  // marker.click
    that.centerMapOnMarker(evt.target);
  },

  _newIncidentMarker_onDragEnd: function (that, evt) {  // marker.dragend
    var marker = evt.target;
    var position = marker.getLatLng();
    marker.setLatLng(new L.LatLng(position.lat, position.lng), {draggable: 'true'});
    that.panTo(new L.LatLng(position.lat, position.lng));
  },
});


L.FixMyStreetMap.MarkerClusterGroup = L.MarkerClusterGroup.extend({
  iconCreateFunction: function(cluster) {
    return new L.DivIcon({ html: '<b style="">' + cluster.getChildCount() + '</b>' });
  }
});

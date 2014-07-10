// Customize URBIS_LAYERS
URBIS_LAYERS['regional-roads']['options']['opacity'] = 0.5;
URBIS_LAYERS['regional-roads']['options']['filter'] =
  '<ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">' +
    '<ogc:PropertyIsEqualTo matchCase="true">' +
      '<ogc:PropertyName>ADMINISTRATOR</ogc:PropertyName>' +
      '<ogc:Literal>REG</ogc:Literal>' +
    '</ogc:PropertyIsEqualTo>' +
  '</ogc:Filter>';


L.FixMyStreetMap = L.UrbisMap.extend({
  VERSION: '0.1.0',

  DEFAULTS: {
    language: 'fr',

    // Layers loaded during initialize
    urbisLayers: ['base-map-fr', 'municipal-boundaries', 'regional-roads'],
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
    var that = this;

    options = $.extend(this.DEFAULTS, options);
    L.UrbisMap.prototype.initialize.call(this, id, options);

    $.each(options.urbisLayers, function (k, v) {
      that.loadUrbisLayer(v);
    });

    this._initIncidentLayers();
  },

  addIncident: function (type, latlng, popup) {
    if (!(type in this.incidentTypes)) {
      console.log('ERROR: Invalid incident type "' + type + '".');
      return;
    }

    var m = new L.Marker(latlng);
    if (this.incidentTypes[type].icon) {
      m.setIcon(this.incidentTypes[type].icon);
    }
    if (popup) {
      m.bindPopup(popup);
    }

    this._incidentLayers[type].addLayer(m);
    this.incidents.push(m);
  },

  _initIncidentLayers: function () {
    var that = this;

    $.each(this.incidentTypes, function (k, v) {
      that._incidentLayers[k] = new L.FixMyStreetMap.MarkerClusterGroup();
      that._incidentLayers[k].on('clusterclick', that._onClusterClick)
                             .addTo(that);
    });
  },

  _onClusterClick: function (a) {  // 'clusterclick'
    console.log('_onClusterClick');
  },
});


L.FixMyStreetMap.MarkerClusterGroup = L.MarkerClusterGroup.extend({
  iconCreateFunction: function(cluster) {
    return new L.DivIcon({ html: '<b style="">' + cluster.getChildCount() + '</b>' });
  }
});

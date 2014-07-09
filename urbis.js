L.UrbisMap = L.Map.extend({
  VERSION: '0.1.0',

  DEFAULTS: {
    center: [50.84535101789271, 4.351873397827148],
    zoom: 14,
  },

  _namedLayers: {},

  initialize: function (id, options) {  // (HTMLElement or String, Object)
    if (!URBIS_LAYERS) {
      console.log(
        'ERROR: `URBIS_LAYERS` not defined. Please load "urbis-layers.js".'
        //+ ' The latest version is available at: http://urbiscloud.irisnet.be/???'
      );
    }

    options = $.extend(this.DEFAULTS, options);
    L.Map.prototype.initialize.call(this, id, options);
  },

  setOptions: function (options) {
    options = options || this.DEFAULTS;

    if (options.center && options.zoom !== undefined) {
      this.setView(L.latLng(options.center), options.zoom, {reset: true});
    } else {
      if (options.zoom) {
        this.setZoom(options.zoom);
      }
      if (options.center) {
        this.panTo(L.latLng(options.center));
      }
    }
  },

  loadUrbisLayer: function (urbisKey, namedKey) {  // (String, String)
    if (!(urbisKey in URBIS_LAYERS)) {  // Is the given layer available at UrbIS?
      console.log('ERROR: Unknown UrbIS layer "' + urbisKey + '".');
      return;
    }

    var options = URBIS_LAYERS[urbisKey];
    options.urbisKey = urbisKey;
    namedKey = namedKey || this.getKeyFromUrbis(urbisKey);

    this.loadLayer(options, namedKey);
  },

  loadLayer: function (options, key) {  // (Object, String)
    var layer;

    switch (options.type) {
      case 'wms':
        layer = L.tileLayer.wms(options.url, options.options);
        break;

      default:
        console.log('ERROR: Unkown layer type "' + options.type + '".');
    }

    if (options.mapOptions !== undefined) {
      this.setOptions(options.mapOptions);
    }

    if (key) {
      this._setNamedLayer(key, layer);
    }
  },

  unloadLayer: function (key) {  // (String)
    this._unsetNamedLayer(key);
  },

  hasLayer: function (key) {  // (String)
    var exists = (key in this._namedLayers);
    return exists;
  },

  getLayer: function (key) {  // (String)
    if (!this.hasLayer(key)) { return; }
    return this._namedLayers[key];
  },

  toggleLayer: function (key, visibility) {  // (String, Boolean)
    if (!this.hasLayer(key)) { return; }
    $(this._namedLayers[key].getContainer()).toggle(visibility);
  },

  getKeyFromUrbis: function (urbisKey) {  // (String)
    return URBIS_LAYERS[urbisKey].key || urbisKey;
  },

  _setNamedLayer: function (key, layer) {  // (String, L.ILayer)
    if (this.hasLayer(key)) {
      if (this._namedLayers[key] === layer) { return; }
      this._unsetNamedLayer(key);
    }

    this.addLayer(layer);
    this._namedLayers[key] = this._layers[L.stamp(layer)];
  },

  _unsetNamedLayer: function (key) {  // (String)
    if (!this.hasLayer(key)) { return; }
    this.removeLayer(this._namedLayers[key]);
    delete this._namedLayers[key];
  },
});

// Latest version available at: http://urbiscloud.irisnet.be/???

L.UrbisMap.layersSettings['base-map-fr'] = {
  key: 'base-map',
  title: 'Street map (FR)',
  language: 'fr',
  type: 'wms',
  url: 'http://gis.irisnet.be/geoserver/gwc/service/wms',
  options: {
    layers: 'urbisFR',
    format: 'image/png',
    transparent: true,
    crs: L.CRS.EPSG31370,
    attribution: 'Realized by means of Brussels UrbIS &copy; &reg;',
  },
  mapOptions: {
    center: [50.84535101789271, 4.351873397827148],
    zoom: 14,
  }
};

L.UrbisMap.layersSettings['base-map-nl'] = {
  key: 'base-map',
  title: 'Street map (NL)',
  language: 'nl',
  type: 'wms',
  url: 'http://gis.irisnet.be/geoserver/gwc/service/wms',
  options: {
    layers: 'urbisNL',
    format: 'image/png',
    transparent: true,
    crs: L.CRS.EPSG31370,
    attribution: 'Realized by means of Brussels UrbIS &copy; &reg;',
  },
  mapOptions: {
    center: [50.84535101789271, 4.351873397827148],
    zoom: 14,
  }
};

L.UrbisMap.layersSettings['base-map-ortho'] = {
  key: 'base-map',
  title: 'Orthographic',
  type: 'wms',
  url: 'http://gis.irisnet.be/geoserver/gwc/service/wms',
  options: {
    layers: 'urbisORTHO',
    format: 'image/png',
    transparent: true,
    crs: L.CRS.EPSG31370,
    attribution: 'Realized by means of Brussels UrbIS &copy; &reg;',
  },
  mapOptions: {
    center: [50.84535101789271, 4.351873397827148],
    zoom: 14,
  }
};

L.UrbisMap.layersSettings['regional-roads'] = {
  title: 'Regional roads',
  type: 'wms',
  url: 'http://gis.irisnet.be/geoserver/wms',
  options: {
    layers: 'urbis:URB_A_SS',
    styles: 'URB_A_SS_FIXMYSTREET',
    format: 'image/png',
    transparent: true,
  }
};

L.UrbisMap.layersSettings['municipal-boundaries'] = {
  title: 'Municipal boundaries',
  type: 'wms',
  url: 'http://gis.irisnet.be/geoserver/wms',
  options: {
    layers: 'urbis:URB_A_MU',
    styles: 'fixmystreet_municipalities',
    format: 'image/png',
    transparent: true,
  }
};

$(document).ready(function () {

var mousePositionControl = new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(4),
        projection: 'EPSG:4326',
        // comment the following two lines to have the mouse position
        // be placed within the map.
        className: 'custom-mouse-position',
        target: document.getElementById('mouse-position'),
        undefinedHTML: '&nbsp;'
      });    
    
    
      var raster = new ol.layer.Tile({
        source: new ol.source.OSM()
      });
// 'https://openlayers.org/en/v4.6.5/examples/data/gpx/fells_loop.gpx'
//var collection = ol.Collection()
      var routeVector = new ol.layer.Vector({
        source: new ol.source.Vector({
          url: './data/gpx/time.gpx',
          format: new ol.format.GPX()
        }),
        style: dotStyle
      });
    /*   var obsVector = new ol.layer.Vector({
        source: new ol.source.Vector({
          url: './data/gpx/all.gpx',
          format: new ol.format.GPX()
        }),
        style: obsStyle
      });*/
    /*  var vlinderVector = new ol.layer.Vector({
        source: new ol.source.Vector({
          url: './data/gpx/vlinder.gpx',
          format: new ol.format.GPX()
        }),
        style: styleFunction
      });*/
      
   /*    var testVector = new ol.layer.Vector({
        source: new ol.source.Vector({
          url: 'https://openlayers.org/en/v4.6.5/examples/data/kml/2012_Earthquakes_Mag5.kml',
          format: new ol.format.KML({
            extractStyles: false
          })
        }),
        style: styleFunction
      });*/
   
//var center = [-7916041.528716288, 5228379.045749711];
var center = ol.proj.transform([5.1682, 52.0454], 'EPSG:4326', 'EPSG:3857');
//52.033333,5.166667
      var map = new ol.Map({
      controls: ol.control.defaults({
          attributionOptions: {
            collapsible: false
          }
        }).extend([mousePositionControl]),
        layers: [raster, routeVector],
        target: document.getElementById('map'),
        view: new ol.View({
          center: center,
          zoom: 16
        })
      });
var projectionSelect = document.getElementById('projection');
      projectionSelect.addEventListener('change', function(event) {
        mousePositionControl.setProjection(event.target.value);
      });

      var precisionInput = document.getElementById('precision');
      precisionInput.addEventListener('change', function(event) {
        var format = ol.coordinate.createStringXY(event.target.valueAsNumber);
        mousePositionControl.setCoordinateFormat(format);
      });
      var displayFeatureInfo = function(pixel) {
        var features = [];
        map.forEachFeatureAtPixel(pixel, function(feature) {
          features.push(feature);
        });
        if (features.length > 0) {
          var info = [];
          var i, ii;
          for (i = 0, ii = features.length; i < ii; ++i) {
            info.push(features[i].get('desc'));
          }
          document.getElementById('info').innerHTML = info.join(', ') || '(unknown)';
           map.getTarget().style.cursor = 'pointer';
        } else {
          document.getElementById('info').innerHTML = '&nbsp;';

          map.getTarget().style.cursor = '';
        }
      };

      map.on('pointermove', function(evt) {
        if (evt.dragging) {
          return;
        }
        var pixel = map.getEventPixel(evt.originalEvent);
        displayFeatureInfo(pixel);
      });

      map.on('click', function(evt) {
      console.log("event: ",evt);
        displayFeatureInfo(evt.pixel);
      });
      })
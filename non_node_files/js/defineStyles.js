console.log("in define styles")
var labelStyle = new ol.style.Style({
		text: new ol.style.Text({
          font: '12px Calibri,sans-serif',
          overflow: true,
          fill: new ol.style.Fill({
            color: '#000'
          }),
          stroke: new ol.style.Stroke({
            color: '#fff',
            width: 3
          })
        })

})
      var style1 = {
      
        'Point': new ol.style.Style({
          image: new ol.style.Circle({
            fill: new ol.style.Fill({
              color: 'rgba(255,0,0,0.4)'
            }),
            radius: 5,
            stroke: new ol.style.Stroke({
              color: 'red',
              width: 1
            })
          })
        }),
        'LineString': new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'green',
            width: 3
          })
        }),
        'MultiLineString': new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: '#0f0',
            width: 3
          })
        })
      };
      var style2 = {
      
        'Point': new ol.style.Style({
          image: new ol.style.Circle({
            fill: new ol.style.Fill({
              color: '#123456'
            }),
            radius: 5,
            stroke: new ol.style.Stroke({
              color: 'red',
              width: 1
            })
          })
        }),
        'LineString': new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'green',
            width: 3
          })
        }),
        'MultiLineString': new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: '#0f0',
            width: 3
          })
        })
      };
       var style3 = {
      
        'Point': new ol.style.Style({
          image: new ol.style.Circle({
            fill: new ol.style.Fill({
              color: '#123456'
            }),
            radius: 5,
            stroke: new ol.style.Stroke({
              color: 'red',
              width: 1
            })
          })
        })
      };
   var dotStyle=   function(feature) {
          return style1[feature.getGeometry().getType()];
        }
        var obsStyle=   function(feature) {
          return style2[feature.getGeometry().getType()];
        }
 var vlinderStyle=   function(feature) {
          return style3[feature.getGeometry().getType()];
        }

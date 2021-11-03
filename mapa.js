



	var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

	var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox/light-v10', tileSize: 512, zoomOffset: -1, attribution: mbAttr}),
		streets  = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});
		dark  = L.tileLayer(mbUrl, {id: 'mapbox/dark-v10', tileSize: 512, zoomOffset: -1, attribution: mbAttr});
        satellite  = L.tileLayer(mbUrl, {id: 'mapbox/satellite-streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});

	


    //Parte de masterclustering



    //recuperacion de datos con javascript.
    var workspace ='CursoGis';
    var nombre_capa ='denue_inegi_09_';
    var max_features = 100;
    var output_format = 'application%2Fjson';
    var longitud = 0.0;
    var longitud = 0.0;
    var markers = L.markerClusterGroup();

    fetch('http://localhost:8080/geoserver/Curso_GIS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Curso_GIS%3Adenue_inegi_09_&maxFeatures=450&outputFormat=application%2Fjson')
    .then(response => response.json())
    .then(data => {
    //console.log(data)
    //console.log('Número de objetos en la capa: '+data['numberMatched']);
    //console.log('Features recuperados: '+data['features']);
    var features = data['features'];
    var points_heat = [];
    features.forEach(elemento => {
        // console.log('ID de elemento: '+ elemento['id']);
        latitud = elemento['properties']['latitud'];
        longitud = elemento['properties']['longitud'];
        //console.log('longitud: ' + longitud+' latitud: '+latitud);
        var title = elemento['id'];
		var marker = L.marker(new L.LatLng(latitud, longitud), { title: title });
		marker.bindPopup(title);
		markers.addLayer(marker);
        points_heat.push([latitud,longitud]);

     });
         //heatmap
    var heat = L.heatLayer(points_heat, {radius: 15});
    
    heat.addTo(map);
    });

    
    var popup = L.popup();
    



	var cities = L.layerGroup();

	L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.').addTo(cities),
	L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.').addTo(cities),
	L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.').addTo(cities),
	L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.').addTo(cities);

    var map = L.map('map', {
		center: [19.4357619, -99.1441192],
		zoom: 3,
		layers: [grayscale, cities, markers]
	});

	var baseLayers = {
		"Grayscale": grayscale,
		"Streets": streets,
        "Dark": dark,
        "Satellite": satellite
	};

	var overlays = {
		"Cities": cities,
        "Markers": markers
	};

	var layer = L.control.layers(baseLayers, overlays).addTo(map);

    var htmlObject = layer.getContainer();
    var a = document.getElementById('example')
    function setParent(el, newParent){
      newParent.appendChild(el);
    }
    setParent(htmlObject, a);

    
	var layer2 = L.control.layers(overlays).addTo(map);

    var htmlObject = layer2.getContainer();
    var a = document.getElementById('example2')
    function setParent(el, newParent){
      newParent.appendChild(el);
    }
    setParent(htmlObject, a);

    //Funcion de mensaje sobre mapa
    function onMapClick(e) {
        popup.setLatLng(e.latlng).setContent("Has hecho clic en la posición:  " + e.latlng.toString()).openOn(map);
    }
    map.on('click', onMapClick);

    map.addLayer(markers);

//fech para recuperar puntos






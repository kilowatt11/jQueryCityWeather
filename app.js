(function () {

		$('#newZipCode').on('keypress',function(event){
			
			if(event.keyCode === 13){
				event.preventDefault();
			}
		});

	$('#addCityBtn').on('click', function () {
		var cityName = $('#newCity').val();
		var state = $('#newState').val();
		var cityData = null;

		
		$.when(getCity(state, cityName))
		.then(function(cityinfo){
			cityData = cityinfo
			return $.when(getWeather(cityinfo))
		})
		.then(function (weather){
				var template = $('#cityTemplate').text()
					.replace('{{ city }}', cityData.city)
					.replace('{{ state }}', cityData.state)
					.replace('{{ temp }}', weather.temp)
					.replace('{{ conditions }}', weather.conditions);
				$('#cityList').append($(template));
				$('#newCity').val('');
				$('#newState').val('');
		})
			

			
		
		$('#cityList').on('click','.close',function(event){
			event.target.closest('.city').remove();
		})
		

	});


	function getCity(state, cityName) {
		var dfd = jQuery.Deferred();
		var urlBase = 'http://api.zippopotam.us/us/';
		var url = urlBase + state + '/'+ cityName;
		console.log(url);
		
		$.get(url, function (response) {
			dfd.resolve({
				city: response.places[0]['place name'],
				state: response['state abbreviation'],
				zip: response.places[0]['post code']
			});
		});
		return dfd.promise();
	}

	function getWeather(cityinfo) {
		var dfd = jQuery.Deferred();

		var urlBase = 'http://api.openweathermap.org/data/2.5/';
		var appId = 'bd82255fd0a21fa1238699b9eda2ee35';
		var url = urlBase + 'weather?appid=' + appId + '&units=imperial&zip=' + cityinfo.zip;

		$.when($.get(url))
		.then(function(response){
console.log(response)
			dfd.resolve({

				temp: response.main.temp,
				conditions: response.weather[0].description
			});

		});

		return dfd.promise();

		// use jQuery get to get the zip code weather data
	}

	function getCityByName(place, callback){}
})();
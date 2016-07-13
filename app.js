(function () {

		$('#newZipCode').on('keypress',function(event){
			console.log(event);
			if(event.keyCode === 13){
				event.preventDefault();
			}
		})
	$('#addCityBtn').on('click', function () {

		var zip = $('#newZipCode').val();
		

		// get the city & weather data
		// add a city panel to the list	

		getCity(zip, function (cityData) {
			console.log(cityData);
			getWeather(zip, function (weatherData) {
				console.log(weatherData)
				var template = $('#cityTemplate').text()
					.replace('{{ city }}', cityData.city)
					.replace('{{ state }}', cityData.state)
					.replace('{{ temp }}', weatherData.temp)
					.replace('{{ conditions }}', weatherData.conditions);
				$('#cityList').append($(template));
				$('#newZipCode').val('');

			})
		});
		$('#cityList').on('click','.close',function(event){
			event.target.closest('.city').remove();
		})
		

	});


	function getCity(zip, callback) {


		var urlBase = 'http://api.zippopotam.us/us/';
		var url = urlBase + zip;
		$.get(url, function (response) {
			callback({
				city: response.places[0]['place name'],
				state: response.places[0]['state abbreviation']
			})



		});


		// use jQuery get to get the zip code data	
		// transform the data to camelCase proprty names	

	}

	function getWeather(zip, callback) {

		var urlBase = 'http://api.openweathermap.org/data/2.5/';
		var appId = 'bd82255fd0a21fa1238699b9eda2ee35';
		var url = urlBase + 'weather?appid=' + appId + '&units=imperial&zip=' + zip;
		$.get(url, function (response) {
			callback({
				temp: response.main.temp,
				conditions: response.weather[0].description
			})



		});

		// use jQuery get to get the zip code weather data
	}

	function getCityByName(place, callback){}
})();
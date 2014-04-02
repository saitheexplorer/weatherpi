var request = require('request');
var moment = require('moment');

request('http://api.openweathermap.org/data/2.5/forecast/daily?q=plano&units=imperial&cnt=3', function (err, response, body) {
    if (err) throw err;
    var data = JSON.parse(body).list;
    data.forEach(function (val) {
        if (moment(val.dt, 'X').isSame(moment(), 'day')) {
            var forecast = 'Today\'s high is ' + val.temp.max.toFixed(0);
            forecast += ' and the low is ' + val.temp.min.toFixed(0);

            if (val.weather.length > 0) {
                forecast += ' with '
                val.weather.forEach(function (weather, idx) {
                    if (idx > 0) forecast += 'and ';
                    forecast += weather.description;
                });
            }

            forecast += '.'
            console.log(forecast);
        }
    });
});

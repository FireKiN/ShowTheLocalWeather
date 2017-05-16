$(function() {
    //Time
    function updateDate() {
        var date = new Date();
        var hours = date.getHours();
        var mins = date.getMinutes();
        if (hours > 11) {
            document.getElementById('pmam').innerHTML = 'PM';
            hours = hours - 12;
            if (hours == 0) {
                hours += 1;
            }
        } if (mins < 10) {
            mins = mins.toString();
            mins = '0' + mins;
        }
        document.getElementById('hours').innerHTML = hours;
        document.getElementById('mins').innerHTML = mins
        setTimeout(updateDate, 1000);
    }
    updateDate()

    //Location
    var link;
    $.getJSON('https://crossorigin.me/http://ip-api.com/json', function(ipAPI) {
        var APIKEY = '052699dee6301e34c9e316cd39076234';
        var city = ipAPI.city;
        link = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + APIKEY;
        $.getJSON(link, function(Data) {
            //City Name
            document.getElementById('city').innerHTML = Data.name;
            //Condition
            document.getElementById('condition').innerHTML = Data.weather[0].main;
            //Temperature
            var kelvin = Data.main.temp;
            var Celcius = Math.floor(kelvin - 273.15);
            var Fahrenheit = Math.floor(kelvin * 9/5 - 459.67)
            document.getElementById('temp').innerHTML = Celcius;
            //Change temperature to Fahrenheit/Celcius
            var currentTempType = 'Celcius';
            var f = document.getElementById('toF');
            f.onclick = function() {
                if (currentTempType == 'Fahrenheit') {
                    return;
                } else {
                    currentTempType = 'Fahrenheit';
                    document.getElementById('temp').innerHTML = Fahrenheit;
                    document.getElementById('CF').innerHTML = '&#8457;';
                }
            }
            var c = document.getElementById('toC');
            c.onclick = function() {
                if (currentTempType == 'Celcius') {
                    return;
                } else {
                    currentTempType = 'Celcius';
                    document.getElementById('temp').innerHTML = Celcius;
                    document.getElementById('CF').innerHTML = '&#8451';
                }
            }
            //Weather Images
            var possibleConditions = ['Thunderstorm', 'Drizzle', 'Rain', "Snow", 'Atmosphere', 'Clear', 'Clouds', 'Extreme', 'Additional'];
            var Thunderstorm = [
                'https://images.unsplash.com/photo-1465799522714-8eb0e6fccf73?dpr=1&auto=format&fit=crop&w=1500&h=860&q=80&cs=tinysrgb&crop=&bg=',
                'https://images.unsplash.com/photo-1461511669078-d46bf351cd6e?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg='
            ];
            var Drizzle = [
                'https://images.unsplash.com/photo-1423775162340-fc7066ace5be?dpr=1&auto=format&fit=crop&w=1500&h=997&q=80&cs=tinysrgb&crop=&bg=',
                'https://images.unsplash.com/photo-1468476396571-4d6f2a427ee7?dpr=1&auto=format&fit=crop&w=1500&h=889&q=80&cs=tinysrgb&crop=&bg='
            ];
            var Rain = [
                'https://images.unsplash.com/photo-1490713230272-bf236b61ad43?dpr=1&auto=format&fit=crop&w=1500&h=844&q=80&cs=tinysrgb&crop=&bg=',
                'https://images.unsplash.com/photo-1438260483147-81148f799f25?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg='
            ];
            var Snow = [
                'https://images.unsplash.com/photo-1489582341402-cbb1d941dc9d?dpr=1&auto=format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=&bg=',
                'https://images.unsplash.com/photo-1487239954692-e6a970698056?dpr=1&auto=format&fit=crop&w=1199&h=888&q=80&cs=tinysrgb&crop=&bg='
            ];
            var Atmosphere = [
                'https://images.unsplash.com/photo-1432839318976-b5c5785ce43f?dpr=1&auto=format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=&bg=',
                'https://images.unsplash.com/photo-1489696319924-3d86dd762832?dpr=1&auto=format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=&bg='
            ];
            var Clear = [
                'https://images.unsplash.com/photo-1491550509181-fa5704644766?dpr=1&auto=format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=&bg=',
                'https://images.unsplash.com/photo-1430263326118-b75aa0da770b?dpr=1&auto=format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=&bg='
            ]
            var Clouds = [
                'https://images.unsplash.com/uploads/1412750321034baa5d127/d35c5980?dpr=1&auto=format&fit=crop&w=1500&h=845&q=80&cs=tinysrgb&crop=&bg=',
                'https://images.unsplash.com/photo-1432059964050-d4eba2ef368a?dpr=1&auto=format&fit=crop&w=1500&h=844&q=80&cs=tinysrgb&crop=&bg='
            ];
            var Extreme = [
                'https://images.unsplash.com/photo-1431440869543-efaf3388c585?dpr=1&auto=format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=&bg=',
                'https://images.unsplash.com/photo-1466155308716-49f34fcd7c74?dpr=1&auto=format&fit=crop&w=1199&h=813&q=80&cs=tinysrgb&crop=&bg='
            ];
            var Additional = [
                'https://images.unsplash.com/photo-1492892132812-a00a8b245c45?dpr=1&auto=format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=&bg=',
                'https://images.unsplash.com/photo-1455077932342-98c5e60610aa?dpr=1&auto=format&fit=crop&w=1199&h=794&q=80&cs=tinysrgb&crop=&bg='
            ];
            //Changing image based on condition
            var varConditions = [Thunderstorm, Drizzle, Rain, Snow, Atmosphere, Clear, Clouds, Extreme, Additional];
            for (var i = 0; i < possibleConditions.length; i++) {
                if (Data.weather[0].main == possibleConditions[i]) {
                    var randomNum = Math.floor(Math.random() * 2);
                    document.getElementById('backgroundImg').setAttribute('src', varConditions[i][randomNum]);
                    break;
                };
            };
        });
    })
    $('#main').animate({opacity: 1, left: '+=50%'}, 3000, function() {
        //Animation Complete;
    });
});

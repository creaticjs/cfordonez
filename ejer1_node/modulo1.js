module.exports = {
    kelvin: function(vari){
        console.log(vari + " Celsius son  " + (273+vari) + " Kelvin");
    },
    celsius: function(vari){
        console.log(vari + " Kelvin son  " + (vari-273) + " Celsius");
    },
    farenheit:function(vari){
        console.log(vari + " Celsius son  " + ((vari*1,8) + 32)  + " Farenheit");
    }

}
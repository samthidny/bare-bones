import SlotApp from './SlotApp.js';

var app = new SlotApp();
app.on("test", function(a, b, c, d){ console.log("TEST HEARD")});
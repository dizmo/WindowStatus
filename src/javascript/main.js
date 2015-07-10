//= require dizmo

Class("WindowStatus.Main", {
    has: {
        // This will be your wrapper around the dizmo API. It is instantiated
        // before the initialize function (defined below) is called and can
        // therefor already be used there.
        dizmo: {
            is: 'ro',
            init: function() {
                return new WindowStatus.Dizmo();
            }
        }
    },

    after: {
        initialize: function() {
            var self = this;

            self.initEvents();
        }
    },

    methods: {
        initEvents: function() {
            var self = this;

            jQuery('.done-btn').on('click', function() {
                WindowStatus.Dizmo.showFront();
            });

            var handler=function() {
	           jQuery.getJSON('http://api.thingspeak.com/channels/45771/feed/last.json?callback=?', function(data) { 
		            //console.log(data);
                    if (data.field3<data.field1) {
                        //console.log("open");
                        document.getElementById('img').src="assets/window_open.png";
                    } else {
                        //console.log("close");
                        document.getElementById('img').src="assets/window_closed.png";
                    }        
	           });
            };

            setInterval(handler, 30000);            

        }
    }
});

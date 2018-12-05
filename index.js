(function ($) {
	var methods = {
		init: function (options) {
			var $this = $(this);

			if ($this.length === 0) return;

			var p = {
				direction: 'left', // (top || left),
				time: 10, // T
			};

			var options = $.extend(p, options);
			var direction = options.direction;

			if (direction === 'top') {
      	var distance = $this.height();
      	var html = `<div>${$this.html()}</div>`;
			} else if (direction === 'left') {
      	var distance = $this.width();
      	var html = `<div style="float: left;">${$this.html()}</div>`
      	$this.css('width', distance * 2 + 'px')
			}
			
      $this.append($(html));
			generateStyle(direction, distance);

      var animationName = $this.css('animation-name');
      
      if (animationName !== 'seamlessmove') {
      	var animation = 'seamlessmove ' + options.time + 's linear infinite';
        $this.css('animation', animation);
      }

		},
	};

	function generateStyle(direction, distance) {
		if ($('#seamless-style').length) {
			$('#seamless-style').remove();
		}

		var style = document.createElement('style');
    var pres = ["-webkit-", ""];

    style.id = 'seamless-style';
    $('head').append(style);
    pres.forEach(pre => {
    	if (direction === 'top') {
    		var rule = `@${pre}keyframes seamlessmove { from{ transform: translateY(0); } to{ transform: translateY(-${distance}px); } }`;
    	} else if (direction === 'left') {
    		var rule = `@${pre}keyframes seamlessmove { from{ transform: translateY(0); } to{ transform: translateX(-${distance}px); } }`;
    	}
    	style.sheet.insertRule(rule);
    });
	}
	
	$.fn.seamless = function (method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error(method + ' Not Found');
		}
	};
})(jQuery);
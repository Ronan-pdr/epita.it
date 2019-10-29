$(document).ready(function() {
	// Get current URL path and assign 'active' class
	var pathname = window.location.pathname;
	var $link = $('#navbar .navbar-nav a[href="' + pathname + '"]');
	$link.addClass('active');
	if($link.hasClass('dropdown-item'))
		$link.parents('.nav-item').find('.nav-link').addClass('active');
	
	// Handle display behavior on small screens
	var checkScreenSize = function() {
		var $main = $('#main');
		var $tiles = $('#main .tiles-grid');
		
		// $main.width() = $tiles.width() + 30px
		if($main.width() < 500) {
			$main.addClass('smallscreen');
			
			if($main.width() < 340)
				$tiles.css('max-width', '150px');
			else
				$tiles.css('max-width', '310px');
		}
		else {
			$main.removeClass('smallscreen');
			$tiles.css('max-width', ''); // Remove CSS property
		}
	};
	checkScreenSize(); // Execute once after script load
	$(window).resize(checkScreenSize);
	
	// Handle Outbound link events for Analytics
	$('.tiles-grid').on('click', 'a', function() {
		// Check if link is not relative
		if($(this).attr('href')[0] != '/') {
			gtag('event', 'click', {
				event_category: 'Outbound Link',
				event_label: $(this).find('.branding-bar').text(),
				transport_type: 'beacon'
			});
		}
	});
	
	// Open all external links in a new tab (from the web app)
	$.expr[':'].external = function(a) {
		var regex = /^(\w+:)?\/\//;
		var href = $(a).attr('href');
		return href !== undefined && href.search(regex) !== -1;
	};
	if (window.matchMedia('(display-mode: standalone)').matches) {
		$('a:external').attr('target', '_blank');
	}
	else {
		$('#addToHomeScreen').show();
	}
});

;(function () {
	
	'use strict';



	// iPad and iPod detection	
	const isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	const isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	// Parallax
	const parallax = function() {
		$(window).stellar();
	};



	// Burger Menu
	const burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){

			event.preventDefault();

			if ( $('#navbar').is(':visible') ) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');	
			}

			
			
		});

	};


	const goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500);
			
			return false;
		});
	
	};


	// Page Nav
	const clickMenu = function() {

		$('#navbar a:not([class="external"])').click(function(event){
			const section = $(this).data('nav-section'),
				navbar = $('#navbar');

				if ( $('[data-section="' + section + '"]').length ) {
			    	$('html, body').animate({
			        	scrollTop: $('[data-section="' + section + '"]').offset().top
			    	}, 500);
			   }

		    if ( navbar.is(':visible')) {
		    	navbar.removeClass('in');
		    	navbar.attr('aria-expanded', 'false');
		    	$('.js-fh5co-nav-toggle').removeClass('active');
		    }

		    event.preventDefault();
		    return false;
		});


	};

	// Reflect scrolling in navigation
	const navActive = function(section) {

		const $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};

	const navigationSection = function() {

		const $section = $('section[data-section]');
		
		$section.waypoint(function(direction) {
		  	
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};

	// Window Scroll
	const windowScroll = function() {
		var lastScrollTop = 0;

		$(window).scroll(function(event){

		   	var header = $('#fh5co-header'),
				scrlTop = $(this).scrollTop();

			if ( scrlTop > 500 && scrlTop <= 2000 ) {
				header.addClass('navbar-fixed-top fh5co-animated slideInDown');
			} else if ( scrlTop <= 500) {
				if ( header.hasClass('navbar-fixed-top') ) {
					header.addClass('navbar-fixed-top fh5co-animated slideOutUp');
					setTimeout(function(){
						header.removeClass('navbar-fixed-top fh5co-animated slideInDown slideOutUp');
					}, 100 );
				}
			} 
			
		});
	};

	const magnifPopup = function(id) {
		$(`${id} .image-popup`).magnificPopup({
			type: 'image',
			removalDelay: 300,
			mainClass: 'mfp-with-zoom',
			allowHTMLInTemplate: true,
			image: {
				verticalFit: true,
				titleSrc: function(item) {
					let html = item.el.attr('data-source') ? `${item.el.attr('title')} &middot; <a class="image-source-link" href="${item.el.attr('data-source')}" target="_blank">알아보기</a>` : '';
					if(item.el.attr('data-state') !== "undefined") {
						html += item.el.attr('data-state') === "true" ? 
							` &middot; <a class="image-source-link" href="${item.el.attr('data-document')}" target="_blank">시연 영상보기</a>` : 
							` &middot; <a class="image-source-link" href="${item.el.attr('data-document')}" target="_blank">발표 자료보기</a>` ;
					}
					return html;
				}
			},
			gallery:{
				enabled:true
			},
			zoom: {
				enabled: true, // By default it's false, so don't forget to enable it

				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function

				// The "opener" function should return the element from which popup will be zoomed in
				// and to which popup will be scaled down
				// By defailt it looks for an image tag:
				opener: function(openerElement) {
				// openerElement is the element on which popup was initialized, in this case its <a> tag
				// you don't need to add "opener" option if this code matches your needs, it's defailt one.
				return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}
		});
	};

	const magnifVideo = function() {
		$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });
	};

	const animate = function(id) {
		if ( $(id).length > 0 ) {	

			$(id).waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {

					setTimeout(function() {
						$(`${id} .to-animate`).each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 200);

					$(this.element).addClass('animated');
						
				}
			} , { offset: '80%' } );

		}
	};

	const createHtml = (res) => {
		res?.prj?.forEach(data => {
			let html = `
			<section id="fh5co-work" class="${data?.prj1}" data-section="${data?.section}">
				<div class="container">
					<div class="row">
						<div class="col-md-12 section-heading text-center">
							<h2 class="to-animate">${data?.title}</h2>
							<div class="row">
								<div class="col-md-8 col-md-offset-2 subtext to-animate">
									<h3>${data?.description}</h3>
								</div>
							</div>
						</div>
					</div>
					<div class="row row-bottom-padded-sm">`;

			for(const row of data.projects) {
				let projects = `
						<div class="col-md-4 col-sm-6 col-xxs-12">
							<a href="${row?.image}" class="fh5co-project-item image-popup to-animate" title="${row?.title}" data-source="${row?.url}" data-document="${row?.docs}" data-state="${row?.state}">
								<img src="${row?.image}" alt="Image" class="img-responsive">
								<div class="fh5co-text">
								<h2>${row?.name}</h2>
								<span>${row?.type}</span>
								</div>
							</a>
						</div>`;
				html += projects;
			}

			html += `
					</div>
				</div>
			</section>`;

			$("#projects").append(html);
			const id = `.${data?.prj1}`;
			animate(id);
			magnifPopup(id);
			setTimeout(function() {
				navigationSection();
			}, 1000);
		});
	}

	const getData = (url) => {
		$.getJSON(url)
    .done(data => createHtml(data))
		.fail(err => console.error(err));
	};

	// Document on load.
	$(function(){

		parallax();
		burgerMenu();
		clickMenu();
		windowScroll();
		//navigationSection();
		goToTop();

		getData("./data/ai2025.json")
		
	});

}());
//= require jquery
//= require jquery_ujs
//= require gko/public/jquery.grid.responsive.js
//= require gko/public/jquery.bootstrap.navbarhover.js
//= require twitter/bootstrap/transition.js
//= require twitter/bootstrap/alert.js
//= require twitter/bootstrap/button.js
//= require twitter/bootstrap/collapse.js
//= require twitter/bootstrap/dropdown.js
//= require twitter/bootstrap/modal.js
//= require gko/gko.galleria
$(document).ready(function() {
    f_init_galleria = function() {
        if ($('.galleria').length > 0) {
            Galleria.addTheme({
                name: 'classic',
                author: 'Galleria',
                css: 'galleria.classic.css',
                defaults: {
                    transition: 'slide',
                    thumbCrop: 'height',

                    // set this to false if you want to show the caption all the time:
                    _toggleInfo: false
                },
                init: function(options) {

                    // add some elements
                    this.addElement('info-link', 'info-close');
                    this.append({
                        'info': ['info-link', 'info-close']
                    });

                    // cache some stuff
                    var info = this.$('info-link,info-close,info-text'),
                    touch = Galleria.TOUCH,
                    click = touch ? 'touchstart': 'click';

                    // show loader & counter with opacity
                    this.$('loader,counter').show().css('opacity', 0.4);

                    // some stuff for non-touch browsers
                    if (!touch) {
                        this.addIdleState(this.get('image-nav-left'), {
                            left: -50
                        });
                        this.addIdleState(this.get('image-nav-right'), {
                            right: -50
                        });
                        this.addIdleState(this.get('counter'), {
                            opacity: 0
                        });
                    }

                    // toggle info
                    if (options._toggleInfo === true) {
                        info.bind(click,
                        function() {
                            info.toggle();
                        });
                    } else {
                        info.show();
                        this.$('info-link, info-close').hide();
                    }

                    // bind some stuff
                    this.bind('thumbnail',
                    function(e) {

                        if (!touch) {
                            // fade thumbnails
                            $(e.thumbTarget).css('opacity', 0.6).parent().hover(function() {
                                $(this).not('.active').children().stop().fadeTo(100, 1);
                            },
                            function() {
                                $(this).not('.active').children().stop().fadeTo(400, 0.6);
                            });

                            if (e.index === this.getIndex()) {
                                $(e.thumbTarget).css('opacity', 1);
                            }
                        } else {
                            $(e.thumbTarget).css('opacity', this.getIndex() ? 1: 0.6);
                        }
                    });

                    this.bind('loadstart',
                    function(e) {
                        if (!e.cached) {
                            this.$('loader').show().fadeTo(200, 0.4);
                        }

                        this.$('info').toggle(this.hasInfo());

                        $(e.thumbTarget).css('opacity', 1).parent().siblings().children().css('opacity', 0.6);
                    });

                    this.bind('loadfinish',
                    function(e) {
                        this.$('loader').fadeOut(200);
                    });
                }
            });

            Galleria.run('.galleria', {
                autoplay: true,
                responsive: true,
                height: 0.55,
				carousel: false,
				thumbnails: "empty",
                imageCrop: 'landscape',
                transition: 'flash',
                showCounter: false,
                showInfo: false,
                debug: false
            });
        }

    }

	$("a.remote-diaporama").on('ajax:beforeSend',
	function(event, xhr, settings) {
		
	}).on('ajax:complete',
    function(evt, xhr, status) {
		var modal = $("#modal-gallery");
		
		modal.find('.galleria:first').galleria({
            autoplay: true,
            responsive: true,
            height: 0.55,
			carousel: false,
			thumbnails: "numbers",
            imageCrop: 'landscape',
            transition: 'flash',
            showCounter: false,
            showInfo: false
        })
    });

	$("a.virtual-tour").on('click',
	function(e) {
		e.preventDefault();
		var modal = "<div id='virtual-tour-modal' class='modal fade'><div class='modal-header'><a class='close' data-dismiss='modal'>&times;</a><h3 class='modal-title'>Virtual Tour</h3></div><div class='modal-body'>" +
		"<object classid='clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B' codebase='http://www.apple.com/qtactivex/qtplugin.cab' height='446' width='802' ><param name='src' value='sample.mov'/><param name='scale' value='aspect' /><param name='controller' value='true' /><param name='autoplay' value='false' /><embed type='video/quicktime' pluginspage='http://www.apple.com/quicktime/download/' height='446' width='802' src='" + 
		$(this).attr("href") + 
		"' scale='aspect' controller='true' autoplay='false' /></object></div></div>"
		$(modal).appendTo('body').modal({backdrop:'static', show:true}).bind('hidden', function (e) {
		    $(this).remove();
		});;
		
		
	})


	f_init_galleria();
});
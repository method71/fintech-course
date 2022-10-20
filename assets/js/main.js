// Include for header, footer, etc
function includeHTML() {
	var z, i, elmnt, file, xhttp;
	/* Loop through a collection of all HTML elements: */
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
		elmnt = z[i];
		/*search for elements with a certain atrribute:*/
		file = elmnt.getAttribute("include");
		if (file) {
			/* Make an HTTP request using the attribute value as the file name: */
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4) {
					if (this.status == 200) {
						elmnt.innerHTML = this.responseText;
						// get the element's parent node
						var parent = elmnt.parentNode;
						// move all children out of the elmntement
						while (elmnt.firstChild) parent.insertBefore(elmnt.firstChild, elmnt);
						// remove the empty element
						parent.removeChild(elmnt);
					}
					if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
					/* Remove the attribute, and call this function once more: */
					elmnt.removeAttribute("include");
					includeHTML();
				}
			} 
			xhttp.open("GET", file, true);
			xhttp.send();
			/* Exit the function: */
			return;
		}
	}
}
includeHTML();


// Раскрытие списка уроков раздела на странице урока
var leslist = () => {
	var headers = document.querySelectorAll('.leslist_header');
	var sections = document.querySelectorAll('.leslist_section');

	if (headers) {
		for (var i = headers.length - 1; i >= 0; i--) {
			headers[i].addEventListener('click', function() {
				var selected_section = this.closest('.leslist_section');

				for (var j = sections.length - 1; j >= 0; j--) {
					sections[j].classList.remove('leslist_section-active');
				}

				selected_section.classList.add('leslist_section-active');
			});
		}
	}
}
leslist();


// Воспроизведение видео на весь экран на главной
var heroVideo = () => {
	var play = document.querySelector('.hero_play');
	var close = document.querySelector('.fullvideo_close');
	var fullvideo = document.querySelector('.fullvideo');
	var video = document.querySelector('.fullvideo video');

	if (play) {
		play.addEventListener('click', function() {
			fullvideo.classList.add('fullvideo-visible');
			video.currentTime = 0;
			video.play();
		});

		close.addEventListener('click', function() {
			fullvideo.classList.remove('fullvideo-visible');
			video.pause();
		});
	}
}
heroVideo();


// Анимация главной страницы
var animate = () => {
	var controller = new ScrollMagic.Controller();


	var default_params = {
		y: '1rem',
		opacity: 0,
		stagger: .1,
		duration: 1,
		ease: Expo.easeOut,
	};


	const breakText = element => {
		var elementText = element.innerHTML;
		element.innerHTML = '';

		elementText.trim().split(" ").forEach(function(item, i, arr) {
			var span = document.createElement('span');
			var span2 = document.createElement('span');
			span2.innerHTML = item + ' ';
			span.appendChild(span2);
			element.appendChild(span);
		});
	}


	var bgCaptions = () => {
		r = 100;
		adjustJank = 4;

		var captions_wrap = document.getElementsByClassName('hero_captions');

		for (var i = captions_wrap.length - 1; i >= 0; i--) {
			var caption_wrap = captions_wrap[i];
			var caption = caption_wrap.getElementsByClassName('hero_caption')[0];

			var d = caption.offsetWidth;
			caption_wrap.appendChild(caption.cloneNode(true));
			var t = d/r;

			TweenMax.to( 
				caption_wrap, t, {
					x: '-'+(d+adjustJank), 
					ease: Linear.easeNone,
					repeat: -1,
				}
			);
		}
	}
	bgCaptions();


	var playVideo = () => {
		var tl = new gsap.timeline();

		tl.from('.hero_play_caption', {
			rotation: -360,
			repeat: -1,
			duration: 7,
			ease: Linear.easeNone,
		});
	}
	playVideo();


	var chatIcon = () => {
		var tl = new gsap.timeline();

		tl.from('.chat_icon_message', {
			scale: 0,
			width: 0,
			repeat: -1,
			stagger: .3,
			ease: Expo.easeOut,
			yoyo: true,
			repeatDelay: .5
		});
	}
	chatIcon();


	let loader = () => {
		var tl = new gsap.timeline();

		tl.to('#loader', {
			opacity: 0,
			duration: 1
		}).then(function() {
			document.getElementById('loader').remove();
		});
	}
	loader();


	let hero = () => {
		// Разбиение текста для анимации каждого слова
		breakText(document.querySelector('.hero_title'));
		breakText(document.querySelector('.hero_text'));

		// Полоска
		let line = () => {
			var tl = new gsap.timeline();

			tl.set('.hero_line', {
				height: '100%',
			});

			tl.from('.hero_line', {
				width: 0,
				duration: 1,
				ease: Expo.easeOut,
			}, 'line');

			tl.to('.hero_line', {
				height: '.75rem',
				zIndex: 1,
				ease: Expo.easeIn,
			});

			return tl;
		}

		// Шапка
		let header = () => {
			var tl = new gsap.timeline();

			tl.from('.header', {
				x: '-100%',
			});

			tl.from('.header_logos, .header_menu_item, .header_lang', {
				y: '.5rem',
				opacity: 0,
				duration: 0.3,
				stagger: 0.1,
			})

			return tl;
		}

		let content = () => {
			var tl = new gsap.timeline();

			// Текст
			tl.from('.hero_title span span', {
				y: '100%',
				opacity: 0,
				stagger: .03,
			}, '<');

			tl.from('.hero_text span span', {
				y: '100%',
				opacity: 0,
				stagger: .03,
			}, '<');


			// Кнопка воспроизведения видео
			tl.from('.hero_play', {
				scale: .5,
				opacity: 0,
			}, '<');

			// Видео
			tl.from('.hero_video', {
				opacity: 0,
				scale: 1.3,
			}, '<');

			// Надпись
			tl.from('.hero_captions', {
				opacity: 0,
			}, '<');

			return tl;
		}

		var master = gsap.timeline();
		master.add(line())
			  .add(content(), 'line-=.3');
	}
	hero();


	let about = () => {
		var tl = new gsap.timeline();

		tl.from('#about .pictorial_image', {
			scale: .9,
			opacity: 0,
		});

		tl.from('.about > *', default_params, '<');

		var scene = new ScrollMagic.Scene({
			triggerElement: '#about',
			triggerHook: .7
		})
		.setTween(tl)
		.addTo(controller);
	}
	about();


	let inside = () => {
		var tl = new gsap.timeline();

		tl.from('.inside_title, .inside_item', default_params);

		var scene = new ScrollMagic.Scene({
			triggerElement: '#inside',
			triggerHook: .7
		})
		.setTween(tl)
		.addTo(controller);
	}
	inside();


	let perks = () => {
		var tl = new gsap.timeline();

		tl.from('#perks .pictorial_image', {
			scale: .9,
			opacity: 0,
		});

		tl.from('.perks > *', default_params, '<');

		var scene = new ScrollMagic.Scene({
			triggerElement: '#perks',
			triggerHook: .7
		})
		.setTween(tl)
		.addTo(controller);
	}
	perks();


	let partners = () => {
		var tl = new gsap.timeline();

		tl.from('.partners_title, .partners_list a', default_params);

		var scene = new ScrollMagic.Scene({
			triggerElement: '#partners',
			triggerHook: .7
		})
		.setTween(tl)
		.addTo(controller);
	}
	partners();


	let course = () => {
		var course_alert = document.querySelector('.course_alert');
		if (course_alert) {
			var tl = new gsap.timeline();

			tl.from(course_alert, default_params);

			var scene = new ScrollMagic.Scene({
				triggerElement: course_alert,
				triggerHook: 1
			})
			.setTween(tl)
			.addTo(controller);
		}

		var blocks = document.querySelectorAll('.course_block');
		if (blocks) {
			for (var i = blocks.length - 1; i >= 0; i--) {
				var tl = new gsap.timeline();

				tl.from(blocks[i].querySelectorAll('.course_header'), default_params);

				var scene = new ScrollMagic.Scene({
					triggerElement: blocks[i],
					triggerHook: 1
				})
				.setTween(tl)
				.addTo(controller);

				var sections = blocks[i].querySelectorAll('.course_section');

				if (sections) {
					for (var j = sections.length - 1; j >= 0; j--) {
						var tl = new gsap.timeline();

						tl.from(sections[j], default_params);

						var scene = new ScrollMagic.Scene({
							triggerElement: sections[j],
							triggerHook: 1
						})
						.setTween(tl)
						.addTo(controller);
					}
				}
			}
		}
	}
	course();


	let chat = () => {
		var tl = new gsap.timeline();

		breakText(document.querySelector('.chat_title'));
		breakText(document.querySelector('.chat_description'));

		tl.from('.chat_icon', default_params);

		tl.from('.chat_info span span', {
			y: '100%',
			opacity: 0,
			stagger: .03,
		}, '<');

		tl.from('.chat_arrow', default_params, '<');

		var scene = new ScrollMagic.Scene({
			triggerElement: '.chat',
			triggerHook: .7
		})
		.setTween(tl)
		.addTo(controller);
	}
	chat();


	let services = () => {
		var tl = new gsap.timeline();

		breakText(document.querySelector('.services_text p'));

		tl.from('.services_image', default_params);

		tl.from('.services_text span span', {
			y: '100%',
			opacity: 0,
			stagger: .03,
		}, '<');

		tl.from('.services_button', default_params);

		var scene = new ScrollMagic.Scene({
			triggerElement: '#services',
			triggerHook: .7
		})
		.setTween(tl)
		.addTo(controller);
	}
	services();
}

window.onload = function() {
	if (document.getElementById('app').classList.contains('home')) {
		animate();
	}
}
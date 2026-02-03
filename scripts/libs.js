
jQuery(document).ready(function($) {

	/*------------------Sliders-------------------*/
	if(document.querySelector('.product-slider__wrapper')) {
		$('.product-slider__wrapper').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 5000,
			speed: 600,
			fade: false,
			centerMode: false,
			//focusOnSelect: true,
			variableWidth: false, // важно отключить
    		adaptiveHeight: false, // важно отключить
			cssEase: 'linear',
			useTransform: true,
			arrows: true,
			dots: true,
			accessibility: true,
			focusOnSelect: true,
			useCSS: true,
			appendArrows: $('.product-slider__container'), // Помещаем стрелки в контейнер
			appendDots: $('.product-slider__container'), // Помещаем точки в контейнер
			nextArrow: `<button type="button" class="product-slider__next">
						 <svg xmlns="http://www.w3.org/2000/svg" width="15" height="9" viewBox="0 0 10 6" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" 
                                        d="M0.162718 0.175736C0.379676 -0.0585787 0.731435 -0.0585787 0.948393 0.175736L5 4.55147L9.05161 0.175736C9.26857 -0.0585787 9.62032 -0.0585787 9.83728 0.175736C10.0542 0.410051 10.0542 0.78995 9.83728 1.02426L5.39284 5.82426C5.17588 6.05858 4.82412 6.05858 4.60716 5.82426L0.162718 1.02426C-0.0542395 0.78995 -0.0542395 0.410051 0.162718 0.175736Z" 
                                        fill="#ffffff"/>
                                </svg>
						</button>`,
			prevArrow: `<button type="button" class="product-slider__prev">
								 <svg xmlns="http://www.w3.org/2000/svg" width="15" height="9" viewBox="0 0 10 6" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" 
                                        d="M0.162718 0.175736C0.379676 -0.0585787 0.731435 -0.0585787 0.948393 0.175736L5 4.55147L9.05161 0.175736C9.26857 -0.0585787 9.62032 -0.0585787 9.83728 0.175736C10.0542 0.410051 10.0542 0.78995 9.83728 1.02426L5.39284 5.82426C5.17588 6.05858 4.82412 6.05858 4.60716 5.82426L0.162718 1.02426C-0.0542395 0.78995 -0.0542395 0.410051 0.162718 0.175736Z" 
                                        fill="#ffffff"/>
                                </svg>
						</button>`,
			responsive: [ // Адаптивные настройки
				// Можно добавить другие брейкпоинты, например, для мобилок:
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 3,
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 2,
					}
				}
			]
		});
	}

	if(document.querySelector('.main__slider')) {

		$('.main__slider').slick({
			arrows: true,
			dots: false,
			slidesToShow: 1,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 6000,
			speed: 400,
			fade: true,
			adaptiveHeight: false,
			cssEase: 'linear',
			nextArrow: `<button type="button" class="main__next">
						 <svg xmlns="http://www.w3.org/2000/svg" width="15" height="9" viewBox="0 0 10 6" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" 
                                        d="M0.162718 0.175736C0.379676 -0.0585787 0.731435 -0.0585787 0.948393 0.175736L5 4.55147L9.05161 0.175736C9.26857 -0.0585787 9.62032 -0.0585787 9.83728 0.175736C10.0542 0.410051 10.0542 0.78995 9.83728 1.02426L5.39284 5.82426C5.17588 6.05858 4.82412 6.05858 4.60716 5.82426L0.162718 1.02426C-0.0542395 0.78995 -0.0542395 0.410051 0.162718 0.175736Z" 
                                        fill="#ffffff"/>
                                </svg>
						</button>`,
			prevArrow: `<button type="button" class="main__prev">
								 <svg xmlns="http://www.w3.org/2000/svg" width="15" height="9" viewBox="0 0 10 6" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" 
                                        d="M0.162718 0.175736C0.379676 -0.0585787 0.731435 -0.0585787 0.948393 0.175736L5 4.55147L9.05161 0.175736C9.26857 -0.0585787 9.62032 -0.0585787 9.83728 0.175736C10.0542 0.410051 10.0542 0.78995 9.83728 1.02426L5.39284 5.82426C5.17588 6.05858 4.82412 6.05858 4.60716 5.82426L0.162718 1.02426C-0.0542395 0.78995 -0.0542395 0.410051 0.162718 0.175736Z" 
                                        fill="#ffffff"/>
                                </svg>
						</button>`,
		});
	}

	if(document.querySelector('.comments__list')) {
		$('.comments__list').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 5000,
			speed: 600,
			fade: false,
			centerMode: false,
			//focusOnSelect: true,
			variableWidth: false, // важно отключить
    		adaptiveHeight: false, // важно отключить
			cssEase: 'linear',
			useTransform: true,
			arrows: false,
			dots: true,
			responsive: [ // Адаптивные настройки
				// Можно добавить другие брейкпоинты, например, для мобилок:
				{
					breakpoint: 1400,
					settings: {
						slidesToShow: 2,
					}
				},
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 1,
					}
				}
			]
		});
	}

	if(document.querySelector('.commands__list')) {
		$('.commands__list').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 5000,
			speed: 600,
			fade: false,
			centerMode: false,
			//focusOnSelect: true,
			variableWidth: false, // важно отключить
    		adaptiveHeight: false, // важно отключить
			cssEase: 'linear',
			useTransform: true,
			arrows: false,
			dots: true,
			responsive: [ // Адаптивные настройки
				// Можно добавить другие брейкпоинты, например, для мобилок:
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 3,
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 2,
					}
				},
			]
		});
	}

	/*------------------Galleries-------------------*/
	if(document.querySelector('[data-fancybox]')){
		// Находим все контейнеры галерей
		const galleries = document.querySelectorAll('.product-gallery__images');
		
		galleries.forEach((gallery, index) => {
		  const galleryId = `gallery-${index + 1}`;
		  
		  // Назначаем уникальный ID всем ссылкам внутри галереи
		  const links = gallery.querySelectorAll('a[data-fancybox]');
		  links.forEach(link => {
			link.setAttribute('data-fancybox', galleryId);
		  });
	  
		  // Инициализация Fancybox (один раз для всей группы)
		  if (links.length > 0) {
			Fancybox.bind(`[data-fancybox="${galleryId}"]`, {
			  // Общие настройки для всех галерей
			  Thumbs: {
					autoStart: false, // Отключить миниатюры (если не нужны)
				},
				Toolbar: {
					display: {
					left: ["infobar"],
					right: ["close"],
					},
				},
			});
		  }
		});
	}

	
});

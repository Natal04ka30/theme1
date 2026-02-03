"use strict"
window.onload = function () {
	 AOS.init();
	/*PRELOADER */
	if (document.querySelector('.preloader')){
		document.querySelector('.preloader').classList.add('hidden');
	};
	/*Cookie */
	if (document.getElementById('cookie')){ 
		const cookie = document.getElementById('cookie');
		const acceptBtn = cookie.querySelector('.cookie__btn--ok');
		const closeBtn = cookie.querySelector('.cookie__close');

		function hideCookieOnly() {
			cookie.classList.remove('show');
		}

		function acceptCookie() {
			cookie.classList.remove('show');
			localStorage.setItem('cookieAccepted', 'true');
			if (typeof loadAnalytics === 'function') loadAnalytics();
		}

		if (acceptBtn) acceptBtn.addEventListener('click', acceptCookie);
		if (closeBtn) closeBtn.addEventListener('click', hideCookieOnly);

		if (localStorage.getItem('cookieAccepted') === 'true') {
			cookie.classList.remove('show');
		}
	};
	/*ACCORDEON menu */
	if (document.querySelector('.menu-item-has-children')){
		// Добавляем стрелки к пунктам меню
		const menuItems = document.querySelectorAll('.menu-item-has-children');
		menuItems.forEach(item => {
			item.insertAdjacentHTML('beforeend', '<span class="menu-arrow"></span>');
		});

		// Обработка кликов
		document.querySelectorAll('.menu-arrow').forEach(arrow => {
			arrow.addEventListener('click', (e) => {
				e.stopPropagation();
				const menu = e.target.closest('.menu-item-has-children');
				
				// Закрываем соседние меню
				menu.parentElement.querySelectorAll('.menu-item-has-children').forEach(item => {
					if (item !== menu) item.classList.remove('active');
				});
				
				// Переключаем текущее меню
				menu.classList.toggle('active');
			});
		});

		// Закрытие при клике вне меню
		document.addEventListener('click', (e) => {
			if (!e.target.closest('.nav__list')) {
				document.querySelectorAll('.menu-item-has-children.active').forEach(item => {
					item.classList.remove('active');
				});
			}
		});
	};
	 //BURGER меню
	if (document.querySelector('.header__burger')) {
		const burger = document.querySelector('.header__burger');
		const nav = document.querySelector('.nav');
		//const header = document.querySelector('.header');
		const body = document.body;
		const logo = document.querySelector('.header-logo');
		const navLinks = document.querySelectorAll('.nav__link');
	
		// Обработчик клика по бургеру
		burger.addEventListener('click', function(event) {
			burger.classList.toggle('active');
			nav.classList.toggle('active');
			//header.classList.toggle('active');
			body.classList.toggle('lock');
		});
	
		// Обработчик клика по логотипу, навигации и ссылкам
		const closeMenu = function(e) {
			burger.classList.remove('active');
			nav.classList.remove('active');
			//header.classList.remove('active');
			body.classList.remove('lock');
		};
	
		if (logo) logo.addEventListener('click', closeMenu);
		if (nav) nav.addEventListener('click', closeMenu);
		navLinks.forEach(link => link.addEventListener('click', closeMenu));
	};

	/*MENU SCROLL TOP VISIBLE */
	if(document.querySelector('.header')){
		
		const header = document.querySelector('.header');

		window.addEventListener("scroll", bringmenu);

		let previousScrollPosition = 0;

		function bringmenu() {
			let currentScrollPosition = window.scrollY;
			
			if (previousScrollPosition < currentScrollPosition && previousScrollPosition > 100 ) {
				header.classList.add('hide-menu');
			} else {
				header.classList.remove('hide-menu');
			}
			previousScrollPosition = currentScrollPosition;
		};
	};

	//scroll to top
	//показать to top
	if (document.querySelector('.container-scroll')) {
		console.log("SCROLL");
		window.addEventListener('scroll', function () {
			let scroll = document.querySelector('.scroll');
			scroll.classList.toggle('active', window.scrollY > 500);
		});
		//клиk по to top
		document.querySelector('.scroll').addEventListener('click', (e) => {
			console.log("CLICK");
			e.preventDefault();
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		});
	};
	//плавный скрол по кнопкам
	if (document.querySelector('a.link[href*="#"]')) {
		const items = document.querySelectorAll('a.link[href*="#"]');
		//элемент по которому кликнули
		for (let item of items) {
			item.addEventListener('click', (e) => {
				e.preventDefault();
				let href = e.target.getAttribute('href');
				//обьект к которому едем
				document.querySelector('' + href).scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				})
			});
		};
	};

	//Чекбокс для согласия с обработкой
	if (document.querySelector('.log__group-approval')) {
		// Находим все контейнеры с чекбоксами согласия
		const approvalGroups = document.querySelectorAll('.log__group-approval');
		
		if (approvalGroups.length) {
			approvalGroups.forEach(group => {
			const approvalLabel = group.querySelector('label');
			const approvalInput = approvalLabel && approvalLabel.querySelector('[name="acceptance-pp"]');
			
			if (approvalInput) {
				// Функция для обработки изменения состояния
				const handleApprovalChange = () => {
				const isChecked = approvalInput.checked;
				approvalLabel.classList[isChecked ? 'add' : 'remove']('checked');
			};
				
				// Назначаем обработчики событий
				approvalInput.addEventListener('change', handleApprovalChange);
				
				// Инициализируем начальное состояние
				handleApprovalChange();
				
				// Для CF7 форм добавляем обработчик отправки
				if (typeof wpcf7 !== 'undefined') {
					group.closest('form')?.addEventListener('wpcf7submit', handleApprovalChange);
				}
			}
			});
		}
	};

		//валидация и отправка формы комментариев
	if(document.getElementById('commentform')) {
		const commentForm = document.getElementById('commentform');
		const successContainer = document.querySelector('.comments__success-message');
		const commentsButton = document.querySelector('.comments__button');
		const commentsBox = document.getElementById('respond');
	
		// Обработчик для кнопки "Оставить отзыв"
		if(commentsButton && commentsBox) {
			commentsButton.addEventListener('click', function() {
				commentsBox.classList.add('active');
				commentsButton.style.display = "none";
			});
		}
	
		// Получаем элементы формы
		const author = document.getElementById('author');
		const email = document.getElementById('email');
		const commentText = document.getElementById('comment');
		const privacyCheckbox = commentForm.querySelector('input[name="acceptance-pp"]');
		const privacyLabel = privacyCheckbox ? privacyCheckbox.closest('label') : null;
		const submitButton = document.getElementById('submit');
	
		// Проверяем только обязательные элементы
		if (!commentText || !submitButton) {
			console.error('Не найдены обязательные элементы формы');
			return;
		}
	
		commentForm.addEventListener('submit', function(e) {
			e.preventDefault();
			
			// Убираем предыдущие сообщения об ошибках
			document.querySelectorAll('.comment-form__error-message').forEach(el => el.remove());
			
			// Валидация
			let hasErrors = false;
			
			function addError(field, message) {
				hasErrors = true;
				const errorElement = document.createElement('div');
				errorElement.className = 'comment-form__error-message';
				errorElement.textContent = message;
				
				if (field === privacyCheckbox && privacyLabel) {
					privacyLabel.parentNode.insertBefore(errorElement, privacyLabel.nextSibling);
				} else {
					field.parentNode.appendChild(errorElement);
				}
			}
			
			// Проверка полей
			if (author && !author.value.trim()) {
				addError(author, 'Укажите ваше имя');
			}
			
			if (email) {
				if (!email.value.trim()) {
					addError(email, 'Укажите email');
				} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
					addError(email, 'Введите корректный email');
				}
			}
			
			if (!commentText.value.trim()) {
				addError(commentText, 'Напишите отзыв');
			}
			
			if (privacyCheckbox && !privacyCheckbox.checked) {
				addError(privacyCheckbox, 'Необходимо согласие на обработку данных');
			}
			
			if (hasErrors) return;
	
			// Подготовка данных для отправки
			const formData = new FormData(commentForm);
			
			// AJAX-отправка
			fetch(commentForm.action, {
				method: 'POST',
				body: formData,
				headers: {
					'Accept': 'application/json'
				}
			})
			.then(response => {
				if (!response.ok) throw new Error('Ошибка сети');
				return response.text();
			})
			.then(data => {
				// Успешная отправка
				if (data.includes('comment-post-redirect')) {
					window.location.reload();
				} else if (successContainer) {
					// Показываем сообщение об успехе
					successContainer.style.display = 'block';
					commentForm.reset();
					
					// Удаляем класс active у блока комментариев
					if(commentsBox) {
						commentsBox.classList.remove('active');
					}
					
					// Скрываем сообщение через 5 секунд
					setTimeout(() => {
						successContainer.style.display = 'none';
						commentsButton.style.display = 'block';
					}, 5000);
				}
			})
			.catch(error => {
				addError(submitButton, `Ошибка при отправке: ${error.message}`);
			});
		});
	}

	//ТАБЫ
	if(document.querySelector('.tabs__wrapper')) {

		document.querySelectorAll('.tabs__wrapper').forEach(tabsWrapper => {
			const tabBtns = tabsWrapper.querySelectorAll('.tabs__nav-btn');
			const tabContents = tabsWrapper.querySelectorAll('.tabs__item');
			const tabsNav = tabsWrapper.querySelector('.tabs__nav');
			const tabsContent = tabsWrapper.querySelector('.tabs__content');
		  
			// Функция для проверки ширины табов
			function checkTabsWidth() {
			  const navWidth = tabsNav.scrollWidth;
			  const contentWidth = tabsContent.clientWidth;
			  
			  if (navWidth >= contentWidth * 0.95) {
				tabsNav.classList.add('tabs__nav--full-width');
			  } else {
				tabsNav.classList.remove('tabs__nav--full-width');
			  }
			}
		  
			// Проверяем при загрузке
			checkTabsWidth();
			
			// Проверяем при ресайзе окна
			window.addEventListener('resize', checkTabsWidth);
		  
			// Обработчики для переключения табов
			tabBtns.forEach(currentBtn => {
			  currentBtn.addEventListener('click', () => {
				// Убираем активный класс только у кнопок и контента внутри текущего tabs__wrapper
				tabBtns.forEach(btn => btn.classList.remove('active'));
				tabContents.forEach(content => content.classList.remove('active'));
				
				// Добавляем активный класс текущей кнопке
				currentBtn.classList.add('active');
				
				// Показываем соответствующий контент
				const tabId = currentBtn.getAttribute('data-tab');
				tabsWrapper.querySelector(`#${tabId}`).classList.add('active');
				
				// Проверяем ширину после переключения таба (на случай, если контент изменил размеры)
				checkTabsWidth();
			  });
			});
		});	

	 };
	

	//ACCORDEON
	if (document.querySelector('.accordion')){
		let accordionsToggle = document.querySelectorAll('.accordion__toggle');
		let accordions = document.querySelectorAll('.accordion');

		accordionsToggle.forEach( item => {

			// Находим кнопку внутри текущего элемента
			const accordionBtn = item.querySelector('.accordion__btn');

			accordionBtn.innerHTML += `
				<svg xmlns="http://www.w3.org/2000/svg" width="15" height="9" viewBox="0 0 10 6" fill="none">
					<path fill-rule="evenodd" clip-rule="evenodd" 
						d="M0.162718 0.175736C0.379676 -0.0585787 0.731435 -0.0585787 0.948393 0.175736L5 4.55147L9.05161 0.175736C9.26857 -0.0585787 9.62032 -0.0585787 9.83728 0.175736C10.0542 0.410051 10.0542 0.78995 9.83728 1.02426L5.39284 5.82426C5.17588 6.05858 4.82412 6.05858 4.60716 5.82426L0.162718 1.02426C-0.0542395 0.78995 -0.0542395 0.410051 0.162718 0.175736Z" 
						fill="currentColor">
					</path>
				</svg>
			`;

			item.addEventListener('click', (e) => {

				let currentAccordion = e.target.closest('.accordion');
				
				if (currentAccordion.classList.contains('active')){
					currentAccordion.classList.remove('active');
				} else {
					accordions.forEach( elem =>
						elem.classList.remove('active'));
						currentAccordion.classList.add('active');
				}
			})

		});	
	};


	//ДО - ПОСЛЕ
	if(document.querySelector('.comparison__photo')){
		
		const comparisonBlocks = document.querySelectorAll('.before-after__comparison');

		// Для каждого блока настраиваем переключение
		comparisonBlocks.forEach(block => {
		  // Находим элементы внутри текущего блока
		  const buttonBefore = block.querySelector('.comparison__button-before');
		  const buttonAfter = block.querySelector('.comparison__button-after');
		  const photoBefore = block.querySelector('.comparison__photo-before');
		  const photoAfter = block.querySelector('.comparison__photo-after');
	  
		  // Обработчик для кнопки "После"
		  buttonAfter.addEventListener('click', function() {
			buttonAfter.classList.add('active');
			buttonBefore.classList.remove('active');
			
			photoAfter.classList.add('show');
			photoBefore.classList.remove('show');
			photoBefore.classList.add('hide');
		  });
	  
		  // Обработчик для кнопки "До"
		  buttonBefore.addEventListener('click', function() {
			buttonBefore.classList.add('active');
			buttonAfter.classList.remove('active');
			
			photoBefore.classList.remove('hide');
			photoBefore.classList.add('show');
			photoAfter.classList.remove('show');
		  });
		});
	}
}

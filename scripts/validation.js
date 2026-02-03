document.addEventListener('DOMContentLoaded', function () {
    ////////////-----валидация и отправка формы комментариев-----///////////////////////
    if(document.getElementById('commentform')) {
        const commentForm = document.getElementById('commentform');
        const successContainer = document.querySelector('.comments__success-message');
        const commentsButton = document.querySelector('.comments__button');
        const commentsBox = document.getElementById('comments-box');
        const formClose = document.getElementById('form-close');
        const submitButton = commentForm.querySelector('[type="submit"]'); // Добавим получение кнопки
    
        // Обработчик для кнопки "Оставить отзыв"
        if(commentsButton && commentsBox) {
            commentsButton.addEventListener('click', function() {
                commentsBox.classList.add('active');
                commentsButton.style.display = "none";
            });
        }

        // Обработчик крестика для закрытия формы
        if(formClose) {
            formClose.addEventListener('click', function() {
                commentsBox.classList.remove('active');
                commentsButton.style.display = "block";
            });
        }

        // Валидация
        const validator = new JustValidate('#commentform', {
            validateBeforeSubmitting: true,
            errorFieldCssClass: 'comment-form__error',
            errorLabelCssClass: 'comment-form__error-message',
            successFieldCssClass: 'comment-form__success',
            focusInvalidField: true,
            lockForm: true,
        });

        // Валидация имени
        if(document.getElementById('author')){
            validator.addField('#author', [
                {
                    rule: 'required',
                    errorMessage: 'Пожалуйста, введите ваше имя',
                },
                {
                    rule: 'minLength',
                    value: 2,
                    errorMessage: 'Имя слишком короткое (минимум 2 символа)',
                },
                {
                    rule: 'maxLength',
                    value: 50,
                    errorMessage: 'Имя слишком длинное (максимум 50 символов)',
                }
            ]);
        }
        
        // Валидация email
        if(document.getElementById('email')){
            validator.addField('#email', [
                {
                    rule: 'required',
                    errorMessage: 'Пожалуйста, введите email',
                },
                {
                    rule: 'email',
                    errorMessage: 'Некорректный формат email',
                }
            ]);
        }
        
        // Валидация комментария
        validator.addField('#comment', [
            {
                rule: 'required',
                errorMessage: 'Пожалуйста, напишите комментарий',
            },
            {
                rule: 'minLength',
                value: 10,
                errorMessage: 'Комментарий слишком короткий (минимум 10 символов)',
            },
            {
                rule: 'maxLength',
                value: 1000,
                errorMessage: 'Комментарий слишком длинный (максимум 1000 символов)',
            }
        ]);
        
        // Валидация файла (если подключен плагин для файлов)
        if(document.getElementById('comment_attachment')){
            validator.addField('#comment_attachment', [
               // Проверка формата (расширения и MIME-типы)
                {
                rule: 'files',
                value: {
                    files: {
                    extensions: ['jpeg', 'jpg', 'png'],
                    types: ['image/jpeg', 'image/png'],
                    // Не проверяем размер здесь!
                    },
                },
                errorMessage: 'Допустимы только JPG, JPEG или PNG',
                },
                // Проверка размера (отдельное правило)
                {
                rule: 'files',
                value: {
                    files: {
                    maxSize: 1024 * 1024, // 1 МБ
                    // Не проверяем формат здесь!
                    },
                },
                errorMessage: 'Максимальный размер файла — 1 МБ',
                }
            ]);
        }
        
        // Валидация чекбокса
        validator.addField('[name="acceptance-pp"]', [
            {
                rule: 'required',
                errorMessage: 'Необходимо дать согласие',
            }
        ]);
        
        validator.onFail((fields) => {
            console.log("Ошибки валидации:", fields);
            // Добавим визуальную обратную связь
            if (submitButton) {
                submitButton.disabled = true;
                setTimeout(() => {
                    submitButton.disabled = false;
                }, 2000);
            }
        });

        // Жёсткая блокировка формы
        commentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            console.log('Проверка валидности...');

            // Блокируем кнопку на время проверки
            if (submitButton) submitButton.disabled = true;

            try {
                const isValid = await validator.validate();
                
                if (!isValid) {
                    console.log('Форма не валидна, отправка отменена');
                    if (submitButton) submitButton.disabled = false;
                    return false;
                }

                console.log('Форма валидна, отправляем...');
                const formData = new FormData(commentForm);
                
                // Добавляем индикатор загрузки
                if (submitButton) {
                    submitButton.disabled = true;
                    const originalText = submitButton.value || submitButton.textContent;
                    submitButton.value = 'Отправка...';
                    submitButton.textContent = 'Отправка...';
                }

                const response = await fetch(commentForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) throw new Error('Ошибка сети');
                
                const data = await response.text();
                
                // Успешная отправка
                if (data.includes('comment-post-redirect')) {
                    window.location.reload();
                } else if (successContainer) {
                    successContainer.style.display = 'block';
                    commentForm.reset();
                    
                    if(commentsBox) {
                        commentsBox.classList.remove('active');
                    }
                    
                    setTimeout(() => {
                        successContainer.style.display = 'none';
                        if (commentsButton) commentsButton.style.display = 'block';
                    }, 5000);
                }
            } catch (error) {
                console.error('Ошибка при отправке:', error);
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.value = 'Ошибка!';
                    submitButton.textContent = 'Ошибка!';
                    setTimeout(() => {
                        submitButton.value = 'Отправить';
                        submitButton.textContent = 'Отправить';
                    }, 2000);
                }
            } finally {
                if (submitButton) {
                    setTimeout(() => {
                        submitButton.disabled = false;
                        submitButton.value = 'Отправить';
                        submitButton.textContent = 'Отправить';
                    }, 1000);
                }
            }
            
            return false;
        });

        // Дополнительная защита - обработчик клика на кнопке
        if (submitButton) {
            submitButton.addEventListener('click', function(e) {
                if (!validator.isValid) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
            });
        }
    }
});

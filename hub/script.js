document.addEventListener('DOMContentLoaded', () => {
    // === Анкета ===
    // ЗАМЕНИТЕ ЭТУ ССЫЛКУ на URL вашего Google Apps Script после настройки
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwQSZdpmzxDF0mBcXXBjmuNhur6pIr8HR6TxPhAvFlcUWn7KDkF_u-ELbEkpvKHpf4Grg/exec';

    const surveyForm = document.getElementById('surveyForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    function showStatus(message, isError) {
        formStatus.textContent = message;
        formStatus.className = 'form-status ' + (isError ? 'error' : 'success');
    }

    function resetStatus() {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
    }

    if (surveyForm) {
        surveyForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            resetStatus();

            if (GOOGLE_SCRIPT_URL === 'ВАШ_URL_GOOGLE_APPS_SCRIPT') {
                showStatus('Ошибка: не настроен URL Google Apps Script. См. инструкцию.', true);
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';

            const formData = new FormData(surveyForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                showStatus('Спасибо! Ваш отзыв отправлен.', false);
                surveyForm.reset();
            } catch (error) {
                showStatus('Ошибка отправки. Попробуйте ещё раз.', true);
                console.error('Ошибка:', error);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Отправить отзыв';
            }
        });
    }
});

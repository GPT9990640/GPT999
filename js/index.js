"use strict"
//==========================================
const TELEGRAM_BOT_TOKEN = '6794705439:AAECqst4fzh3PUTj0gCexHqFoWKu10V57zU';
const TELEGRAM_CHAT_ID = '@GPT99964';
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`


async function sendEmailTelegram(event) {
    event.preventDefault();

    const form = event.target;
    const formBtn = document.querySelector('.form__submit-button button')
    const formSendResult = document.querySelector('.form__send-result')
    formSendResult.textContent = '';


    const { problem, name, address, email, phone, pass } = Object.fromEntries(new FormData(form).entries());
    
    const text = `Вопрос: ${problem}\nЗаявка от ${name}!\nАдрес: ${address}\nEmail: ${email}\nТелефон: ${phone}\nПасспортные данные: ${pass}`;


    try {
        formBtn.textContent = 'Loading...';

        const response = await fetch(API, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text,
            })
        })
        
        if (response.ok) {
            formSendResult.textContent = 'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.';
            form.reset()
        } else {
            throw new Error(response.statusText);
        }

    } catch (error) {
        console.error(error);
        formSendResult.textContent = 'Анкета не отправлена! Попробуйте позже.';
        formSendResult.style.color = 'red';

    } finally {
        formBtn.textContent = 'Отправить';
    }
}
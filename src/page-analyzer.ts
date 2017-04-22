/// <reference path="./firefox.d.ts"/>

import {CHECK_MESSAGE_TYPE, FILL_MESSAGE_TYPE, Messages} from './models/messages';

interface LoginForm {
    username: HTMLInputElement
    password: HTMLInputElement
}

function findLoginForm(): LoginForm {
    const inputs = document.getElementsByTagName("input");

    for (let i = 1; i < inputs.length; i++) {
        const prev = inputs[i - 1];
        const input = inputs[i];

        if (input.type === 'password' && prev.type === 'text') {
            return {
                username: <HTMLInputElement>prev,
                password: <HTMLInputElement>input
            }
        }
    }
    return undefined;
}

browser.runtime.onMessage.addListener((message: Messages, sender, sendResponse) => {
    switch (message.type) {
        case CHECK_MESSAGE_TYPE:
            sendResponse({
                found: typeof findLoginForm() !== 'undefined'
            });
            break;
        case FILL_MESSAGE_TYPE:
            const loginForm = findLoginForm();

            if(typeof loginForm !== 'undefined') {
                loginForm.username.value = message.username;
                loginForm.password.value = message.password;
                sendResponse({
                    filled: true
                });
            } else {
                sendResponse({
                    filled: false
                });
            }
            break;
    }
});

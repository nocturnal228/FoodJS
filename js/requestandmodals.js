const modalBtn = document.querySelectorAll('[data-modal]'),
    modalWindow = document.querySelector('.modal');

modalBtn.forEach(modalbtn => {
    modalbtn.addEventListener('click', showModalWindow);
});

function closeModalWindow() {
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
}

function showModalWindow() {
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
};

modalWindow.addEventListener('click', (e) => {
    if (e.target === modalWindow || e.target.getAttribute('data-modalclose') == '') {
        closeModalWindow();
    };
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
        closeModalWindow();
    }
});

const modalTimerId = setTimeout(showModalWindow, 300000);

const showModalByScroll = () => {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
        showModalWindow();
        window.removeEventListener('scroll', showModalByScroll);
    }
}

window.addEventListener('scroll', showModalByScroll);

showModalWindow();
closeModalWindow();

const forms = document.querySelectorAll('form');
const message = {
    loading: 'img/loading/spinner.svg',
    success: 'Успешно отправлено!',
    failure: 'Ошибка!'
};

forms.forEach(item => {
    bindPostData(item);
});

const postData = async (url, data) => {
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await result.json();
};

function bindPostData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage);

        const formData = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formData.entries()));
        postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
    });
};

function showThanksModal(message) {
    const prevModal = document.querySelector('.modal__dialog');

    prevModal.classList.add('hide');
    showModalWindow();

    const ThanksModal = document.createElement('div');
    ThanksModal.classList.add('modal__dialog');
    ThanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-modalclose>×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;
    document.querySelector('.modal').append(ThanksModal);

    setTimeout(() => {
        ThanksModal.remove();
        prevModal.classList.add('show');
        prevModal.classList.remove('hide');
        closeModalWindow();
    }, 1500);
};

fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(result => console.log(result));


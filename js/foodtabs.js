const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsWrapper = document.querySelector('.tabheader__items');

const hideTabContent = () => {
    tabsContent.forEach((item) => {
        item.classList.add('hide');
        item.classList.remove('show');
    })

    tabs.forEach((item) => {
        item.classList.remove('tabheader__item_active');
    })
};

const showTabContent = ((item = 0) => {
    tabsContent[item].classList.add('show');
    tabsContent[item].classList.remove('hide');
    tabs[item].classList.add('tabheader__item_active');
});

hideTabContent();
showTabContent();

tabsWrapper.addEventListener('click', (event) => {
    const target = event.target
    if (target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, index) => {
            if (target == item) {
                hideTabContent();
                showTabContent(index)
            }
        })
    }
});
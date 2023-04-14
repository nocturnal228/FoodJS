class pageCards {
    constructor(src, alt, title, descr, cost, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.parent = document.querySelector(parentSelector);
        this.classes = classes;
        this.cost = cost;
        this.transfer = 36, 88;
        this.convertToUAH();
    }

    convertToUAH() {
        this.cost = this.cost * this.transfer;
    }

    render() {
        const element = document.createElement('div');
        if (this.classes.length === 0) {
            this.element = 'menu__item';
            element.classList.add(this.element);
        } else {
            this.classes.forEach(className => element.classList.add(className))
        }
        element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.cost}</span> грн/день</div>
                </div>
        `;
        this.parent.append(element);
    }
};

const getResource = async (url) => {
    const result = await fetch(url);
    if (!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    };
    return await result.json();
};

getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({ img, altimg, title, descr, price }) => {
            new pageCards(img, altimg, title, descr, price, '.menu .container').render();
        });
    });
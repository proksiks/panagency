window.addEventListener('load', function () {
    setTimeout(() => {
        document.querySelector('body').classList.add("loaded")
    }, 2000);
});

const headerSubmenuBtn = document.querySelector('[data-header-submenu-btn]')
const headerSubmenuMenu = document.querySelector('[data-header-submenu]')
const form = document.querySelector('.hero__form')

document.addEventListener('click', function (e) {
    if (e.target == headerSubmenuBtn) {
        headerSubmenuBtn.classList.add('active')
        headerSubmenuMenu.classList.add('open')
    } else {
        headerSubmenuBtn.classList.remove('active')
        headerSubmenuMenu.classList.remove('open')
    }
})

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

document.querySelectorAll('.hero__select').forEach(function (dropDownWrapper) {
    const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
    const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
    const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
    const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');
    const dropDownLabel = dropDownWrapper.querySelector('.hero__select-label');

    dropDownLabel.addEventListener('click', function (e) {
        dropDownList.classList.toggle('dropdown__list--visible');
    });

    dropDownBtn.addEventListener('click', function (e) {
        dropDownList.classList.toggle('dropdown__list--visible');
        this.classList.add('dropdown__button--active');
    });

    dropDownListItems.forEach(function (listItem) {
        listItem.addEventListener('click', function (e) {
            e.stopPropagation();
            dropDownBtn.innerText = this.innerText;
            dropDownBtn.focus();
            dropDownInput.value = this.dataset.value;
            dropDownList.classList.remove('dropdown__list--visible');
            dropDownBtn.classList.remove('dropdown__button--active');
        });
    });

    document.addEventListener('click', function (e) {
        if (e.target !== dropDownBtn && e.target !== dropDownLabel) {
            dropDownBtn.classList.remove('dropdown__button--active');
            dropDownList.classList.remove('dropdown__list--visible');
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab' || e.key === 'Escape') {
            dropDownBtn.classList.remove('dropdown__button--active');
            dropDownList.classList.remove('dropdown__list--visible');
        }
    });
});

form.addEventListener('submit', function (e) {
    e.preventDefault()
})

const swiper = new Swiper('.swiper', {
    slidesPerView: "auto",
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        280: {
            spaceBetween: 17,
        },
        769: {
            spaceBetween: 23
        },
        1281: {
            spaceBetween: 30
        }
    }
});

const percentButton = document.querySelector('[data-percent-button]')
const progressBar = document.querySelector('.progressbar__bar')
const progressBarValue = document.querySelector('.progressbar__bar-value')
const progressBarLine = document.querySelector('.progressbar__bar-line')

function counter(element, start, end, duration) {
    let obj = element.querySelector('span'),
        current = start,
        range = end - start,
        increment = end > start ? 1 : '',
        step = Math.abs(Math.floor(duration / range)),
        timer = setInterval(() => {
            current += increment;
            obj.textContent = current;
            if (current == end) {
                clearInterval(timer);
            }
        }, step);
}

function animatedLine(percent) {
    const width = parseInt(progressBarLine.getBoundingClientRect().width)
    const paddingLeft = parseInt(getComputedStyle(progressBar).paddingLeft)
    calcPercent = width * (1 - (percent / 100))
    if (window.innerWidth <= 1280) {
        progressBarLine.style.transform = `translateX(-${calcPercent - paddingLeft}px)`
    } else {
        progressBarLine.style.transform = `translateX(-${calcPercent}px)`
    }
}

function interestCalculation(element, duration) {
    const start = Number(progressBarValue.querySelector('span').innerText)
    const end = Number(percentButton.querySelector('span').innerText)

    animatedLine(end)
    counter(element, start, end, duration)
}

function incrementCounter() {
    interestCalculation(progressBarValue, 200)
}

percentButton.addEventListener('click', incrementCounter)


let center = [59.93972376107049, 30.320124018935882];
function init() {
    let map = new ymaps.Map('map', {
        center: center,
        zoom: window.innerWidth <= 768 ? 13 : 14
    });

    let placemark = new ymaps.Placemark(center, {
        balloonContent: `
			<div class="balloon">
				<div class="balloon__title descr">Наш адрес</div>
				<div class="balloon__adress text">
                    Санкт-Петербург, Владимирский проспект, 23, лит. А, офис 701
				</div>
                <a class="balloon__link text" href="https://clck.ru/324MDo" target="_blank">Схема проезда</a>
			</div>
		`
    });

    map.controls.remove('geolocationControl');
    map.controls.remove('searchControl');
    map.controls.remove('trafficControl');
    map.controls.remove('typeSelector');
    map.controls.remove('fullscreenControl');
    map.controls.remove('zoomControl');
    map.controls.remove('rulerControl');
    map.behaviors.disable(['scrollZoom']);
    map.geoObjects.add(placemark);

    placemark.balloon.open();
}
ymaps.ready(init);


const upButton = document.querySelector('[data-up-button]')
upButton.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
})
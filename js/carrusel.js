let carruselIndex = 0;

function avanzarCarrusel() {
    carruselIndex++;
    actualizarCarrusel();
}

function retrocederCarrusel() {
    carruselIndex--;
    actualizarCarrusel();
}

function actualizarCarrusel() {
    const carrusel = document.querySelector('.carrusel');
    const carruselContainer = document.querySelector('.carrusel-container');
    const carruselItems = document.querySelectorAll('.carrusel img');

    if (carruselIndex < 0) {
        carruselIndex = carruselItems.length - 1;
    } else if (carruselIndex >= carruselItems.length) {
        carruselIndex = 0;
    }

    carrusel.style.transform = `translateX(${-carruselIndex * 100}%)`;
}

window.onload = actualizarCarrusel;
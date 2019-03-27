const parallax = document.querySelector('.parallax');
const layers = parallax.children;

function moveLayersDependsonScroll(wScroll) {

    Array.from(layers).forEach(layer => {
        const divider = layer.dataset.speed;
        const strafe = wScroll * divider /30;

        layer.style.transform = `translateY(-${strafe}%)`;
    });

}

window.addEventListener("scroll", e => {
    const wScroll = window.pageYOffset;
    moveLayersDependsonScroll(wScroll);
});
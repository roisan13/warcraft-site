function createBurst(x, y) {
    const colors = ['#3266a8', '#ed6815', '#dedede', '#1d2e6e', '#e31e00'];
    const numCircles = 20;
    for (let i = 0; i < numCircles; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circle.style.width = circle.style.height = `${Math.random() * 10 + 5}px`;
        circle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.appendChild(circle);
        
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.random() * 100 + 50;
        const finalX = x + radius * Math.cos(angle);
        const finalY = y + radius * Math.sin(angle);

        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;

        circle.animate([
            { transform: `translate(${finalX - x}px, ${finalY - y}px) scale(1)` },
            { transform: `translate(${finalX - x}px, ${finalY - y}px) scale(0)` }
        ], {
            duration: 1000,
            easing: 'ease-out',
            fill: 'forwards'
        });

        setTimeout(() => {
            circle.remove();
        }, 1000);
    }
}

function burst(evt) {
    let rect = evt.target.getBoundingClientRect();
    let x = rect.left + window.scrollX + evt.target.clientWidth / 2;
    let y = rect.top + window.scrollY + evt.target.clientHeight / 2;
    createBurst(x, y);
    console.log("burst!!");
    
}

window.onload = function(){
    expansions = document.getElementsByClassName("expansion-img");
    for (i = 0; i < expansions.length; i++){
        expansions[i].addEventListener("click", burst);
    }
 }

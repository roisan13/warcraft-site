


window.onload = function(){ 


    // Use arrows only to navigate
    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);



    const container = document.getElementById('mapContainer');
    canvas = document.getElementById('azeroth');
    checkbox = document.getElementById('dimension');
    ctx = canvas.getContext('2d');

    const azeroth3D = 'https://www.kruithne.net/home/files/renders/azeroth_16k.png';
    const azeroth2D = 'https://i.pinimg.com/originals/eb/50/d5/eb50d5dbb94c38cc2548089df6d66623.jpg';

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const mapImage = new Image();
    mapImage.src = azeroth2D;

    let scale = 1;
    let originX = 0;
    let originY = 0;
    let isDragging = false;
    const moveDist = 10;

    

    

    mapImage.onload = () => {
        scale = Math.max(canvas.width / mapImage.width, canvas.height / mapImage.height);
        draw();
    };
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(originX, originY);
        ctx.scale(scale, scale);
        ctx.drawImage(mapImage, 0, 0);
        ctx.restore();
    }
    function resetMapImg() {
        scale = 1;
        originX = 0;
        originY = 0;
        isDragging = false;
    }

    

    checkbox.addEventListener('change', function () {
        mapImage.src = checkbox.checked ? azeroth3D : azeroth2D;
        resetMapImg();
        draw();
    });

    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        const zoom = e.deltaY < 0 ? 1.1 : 0.9;
        const newScale = scale * zoom;

        if (newScale < canvas.width / mapImage.width || newScale < canvas.height / mapImage.height) {
            return;
        }

        scale = newScale;

        const mouseX = e.clientX - container.offsetLeft - originX;
        const mouseY = e.clientY - container.offsetTop - originY;
        originX -= mouseX * (zoom - 1);
        originY -= mouseY * (zoom - 1);

        constrain();
        draw();
    });

    canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX - originX;
        startY = e.clientY - originY;
    });

    canvas.addEventListener('mousemove', (e) => {
        if (isDragging) {
            originX = e.clientX - startX;
            originY = e.clientY - startY;
            constrain();
            draw();
        }
    });

    canvas.addEventListener('mouseup', () => {
        isDragging = false;
    });

    function constrain() {
        const minX = Math.min(0, canvas.width - mapImage.width * scale);
        const minY = Math.min(0, canvas.height - mapImage.height * scale);

        originX = Math.max(minX, Math.min(originX, 0));
        originY = Math.max(minY, Math.min(originY, 0));
    }

    window.addEventListener('resize', () => {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        constrain();
        draw();
    });

    window.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                originY += moveDist;
                break;
            case 'ArrowDown':
                originY -= moveDist;
                break;
            case 'ArrowLeft':
                originX += moveDist;
                break;
            case 'ArrowRight':
                originX -= moveDist;
                break;
            default:
                return;
        }
        constrain();
        draw();
    });
}
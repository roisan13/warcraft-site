
const avatars = ["url(../sprites/thrall.webp)", "url(../sprites/varian.webp)", "url(../sprites/dh.png)"];
const backgrounds = ["url(../sprites/orgrimmar.png)", "url(../sprites/elwynn.webp)", "url(../sprites/fel.jpg)"];
const sizes = ["90%", "65%", "100%"];

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
  }

function randomizeBG(event) {
    let rand = random(0, avatars.length -1);
    avatar = document.getElementById("avatar");
    body = document.body;

    avatarStyle = window.getComputedStyle(document.getElementById('avatar'));
    bodyStyle = window.getComputedStyle(document.body);

    while (sizes[rand] == avatarStyle.backgroundSize){
        rand = random(0, avatars.length -1);
    }
    avatar.style.backgroundImage = avatars[rand];
    avatar.style.backgroundSize = sizes[rand];
    body.style.backgroundImage = backgrounds[rand];

    
}

function randomizeFormSize(event) {
    let width = random(40, 60);
    let height = random(20, 40);
    form = document.getElementsByTagName("form")[0];
    formStyle = window.getComputedStyle(form);

    console.log("click pe form?");


    while(formStyle.width.slice(0,2) == width){
        width = random(40, 60);
    }
    

    while(formStyle.height.slice(0,2) == height){
        height = random(20, 40);
    }

    form.style.width = width + "em";
    form.style.height = height + "em";

    if(event){
        event.stopPropagation();
    }
}

window.onload = function() {

    document.body.addEventListener("click", randomizeBG);
    document.getElementsByTagName("form")[0].addEventListener("click", randomizeFormSize);

    randomizeBG(null);
    randomizeFormSize(null);
    
    inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++){
        inputs[i].addEventListener("click", (event) => {
            event.stopPropagation();
        });
    }
}
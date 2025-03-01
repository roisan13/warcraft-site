window.onload = function(){

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 30);
    futureDateString =  currentDate.toDateString(); 

    console.log(futureDateString);

    document.getElementById('responseDate').innerText = "Your ticket will be solved as soon as possible, in compliance with the selected urgency, but no later than " + futureDateString + " .";
}
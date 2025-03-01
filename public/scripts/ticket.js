

 window.onload = function(){

    importanceSlider = document.getElementById("myRange");
    importanceOutput = document.getElementById("rangeOutput");

    importanceSlider.addEventListener("input", function(){
        let val = importanceSlider.value;
        let importance = "";
        if (val <= 100)
            importance = "Negligible";
        else if (val <= 200)
            importance = "Trivial";
        else if (val <= 300)
            importance = "Minor";
        else if (val <= 400)
            importance = "Low";
        else if (val <= 500)
            importance = "Moderate";
        else if (val <= 600)
            importance = "Considerable";
        else if (val <= 700)
            importance = "Significant";
        else if (val <= 800)
            importance = "High";
        else if (val <= 900)
            importance = "Crucial";
        else if (val <= 1000)
            importance = "Critical";



        importanceOutput.textContent = importance;
    })
    
 }

 
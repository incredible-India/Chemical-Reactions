//process steps function
class chemical {
    
    emptybeaker = document.getElementById("emptybeaker");
    water = document.getElementById("DISTILLED_-WATER1");
    ML = localStorage.getItem("flask");
    FlaskMl="";
    lang = localStorage.getItem("lang");
    instruct = document.getElementById("instruction");

    constructor() {
        //chnage the info language based on user selection
        this.OtherInfoInBasedOnSelectedLanguage();
        //show first instruction default
        this.UpdateInstruction(2);
        //update flask
        this.FlaskOfMl();
    }

    intial_to_middle(elementId, translateX, translateTop = -150, rotateAngle = -20, comebackToIntialPosition) {
        //1st step move to the intial postion to middle position
        let element = document.getElementById(elementId);
        //first it will go on top
        element.style.transition = 'transform 0.5s ease';
        element.style.transform = `translateY(${translateTop}px)`
        //then translate to the middle beaker
        setTimeout(() => {
            element.style.transform = `translatex(${translateX}px) rotate(${rotateAngle}deg)`
        }, 1000);
        //now come back to its initial postion
        setTimeout(() => {
            element.style.transform = `translatex(${comebackToIntialPosition}px)`
            element.setAttribute("src", this.changeImageAsPerSelectedBeaker(elementId)[1]);
            this.changeBeakerImage("fill");

            setTimeout(() => {
                this.middle_to_final(elementId);
            }, 900);

        }, 1500);
    }

    middle_to_final(elementID) {

        if (this.ML == "a") {
            this.MiddleBeakerAnimation(-80, -50, -40, 10, elementID);
        } else if (this.ML == "b") {
            this.MiddleBeakerAnimation(-90, -120, -40, 10, elementID);
        } else if (this.ML == "c") {
            this.MiddleBeakerAnimation(-90, -197, -40, 10, elementID);
        } else {
            this.MiddleBeakerAnimation(-99, -280, -40, 10, elementID);
        }
    }

    MiddleBeakerAnimation(translateY, translateX, rotateAngle, comabackPosition, finalElementId) {
        //top
        this.emptybeaker.style.transition = 'transform 0.5s ease';
        this.emptybeaker.style.transform = `translateY(${translateY}px)`

        setTimeout(() => {
            this.emptybeaker.style.transform = `translatex(${translateX}px) rotate(${rotateAngle}deg)`
        }, 1000);
        //now come back to its initial postion
        setTimeout(() => {
            this.emptybeaker.style.transform = `translatex(${comabackPosition}px)`
            this.changeBeakerImage("empty");
        }, 1500);

        setTimeout(() => {
            //checking the finsl steps
            if (this.isFinalStep(finalElementId))
                this.DoFianlThingsAfterAllChemicalAdded();
        }, 3000);
    }

    changeBeakerImage(status, ML = 5) {
        if (status == "fill") {
            if (this.ML == "a")
                this.emptybeaker.setAttribute("src", "./5mlbeaker.png");
            else if (this.ML == "b")
                this.emptybeaker.setAttribute("src", "./10mlbeaker.png");
            else if (this.ML == "c")
                this.emptybeaker.setAttribute("src", "./15mlbeaker.png");
            else
                this.emptybeaker.setAttribute("src", "./15mlbeaker.png");
        }
        else
            this.emptybeaker.setAttribute("src", "./emptybeaker.png");
    }
    //this will reduce the ammount of chemical in beaker
    changeImageAsPerSelectedBeaker(elementId) {
        if (elementId == "Sulphuricacid1") {
            return [elementId, "./SulphuricAcid2.png"]
        }
        else if (elementId == "SodiumThiosulphate1") {
            return [elementId, "./SodiumThiosulphate2.png"]
        }
        else if (elementId == "starchsolution1") {
            return [elementId, "./STATCHSOLUTION1.png"]
        }
        else if (elementId == "Hydrogenperoxide1") {
            return [elementId, "./Hydrogen_peroxide_solution_3__2.png"]
        }
    }
    //convert flask into the ML
    FlaskOfMl(){
        if (this.ML == "a")
                this.FlaskMl =5
            else if (this.ML == "b")
                this.FlaskMl =10
            else if (this.ML == "c")
                this.FlaskMl =15
            else
                this.FlaskMl =20
    }
    //showing the instructions
    Instructions(instructionId) {
        if (instructionId == 1) {
            return ["Click on anyone of flask to start the reaction", "प्रतिक्रिया शुरू करने के लिए फ्लास्क में से किसी एक पर क्लिक करें"]
        }
        else if (instructionId == 2) {
            return ["Now click on the distilled water to make the solution 90ml", "अब घोल को 90 मि.ली. बनाने के लिए आसुत जल पर क्लिक करें"]
        }
        else if (instructionId == 3) {
            return [`Now measure ${this.FlaskMl}ml of sulphuric acid to add in the mixture`, `अब मिश्रण में मिलाने के लिए ${this.FlaskMl}मिलीलीटर सल्फ्यूरिक एसिड मापें।`]
        }
        else if (instructionId == 4) {
            return [`Measure ${this.FlaskMl}ml of sodium thiosulphate to add in the solution`, `घोल में मिलाने के लिए ${this.FlaskMl}मिलीलीटर सोडियम थायोसल्फेट मापें`]
        }
        else if (instructionId == 5) {
            return [`Now measure ${this.FlaskMl}ml of start h solution and add it in solution`, `अब स्टार्ट एच सॉल्यूशन का ${this.FlaskMl}ml मापें और इसे सॉल्यूशन में जोड़ें`]
        }
        else if (instructionId == 6) {
            return [`Now measure ${this.FlaskMl}ml of hydrogen peroxide to add into the mixture `, `अब मिश्रण में मिलाने के लिए ${this.FlaskMl}ml हाइड्रोजन पेरोक्साइड मापें`]
        }
        else if (instructionId == 7) {
            return [`Now stir the mixture and immediately start the stop watch`, "अब मिश्रण को हिलाएं और तुरंत स्टॉप वॉच चालू करें"]
        }
    }
    //update the information in instruction box based on slected info
    UpdateInstruction(id) {
        if (this.lang == "hi")
            this.instruct.innerText = this.Instructions(id)[1];
        else
            this.instruct.innerText = this.Instructions(id)[0];
    }
    //other information print based on selected languages
    OtherInfoInBasedOnSelectedLanguage() {
        if (this.lang == "hi") {
            //header text
            document.getElementById("header").innerText = "आयोडाइड हाइड्रोजन पेरोक्साइड क्लॉक रिएक्शन की गतिकी का अध्ययन करने के लिए"
            //instruction
            document.getElementsByClassName("instruct")[0].innerText = "निर्देश"
            document.getElementsByClassName("glov")[0].innerText = "कृपया रासायनिक प्रतिक्रिया शुरू करने से पहले उचित सुरक्षात्मक गियर जैसे दस्ताने, चश्मा और एक लैब कोट पहनना सुनिश्चित करें। किसी भी संभावित खतरे को रोकने और सुरक्षित प्रयोग सुनिश्चित करने के लिए सुरक्षा सावधानियां आवश्यक हैं"
            document.getElementById("ins").innerText = "निर्देश"
        }
        else {
            document.getElementById("header").innerText = "TO STUDY THE KINETICS OF IODIDE HYDROGEN PEROXIDE CLOCK REACTION"
            //instruction
            document.getElementsByClassName("instruct")[0].innerText = "INSTRUCTIONS"
            document.getElementsByClassName("glov")[0].innerText = "Please ensure to wear appropriate protective gear such as gloves, goggles, and a lab coat before initiating the chemical reaction. Safety precautions are essential to prevent any potential hazards and ensure a safe experiment";
            document.getElementById("ins").innerText = "INSTRUCTIONS";
        }
    }

    movementOfSelectedBeaker(elementId) {
       
        if (elementId == "Sulphuricacid1") {
            chemicals.intial_to_middle(elementId, -160, -150, -50, 20);
            this.UpdateInstruction(4);
        }
        else if (elementId == "SodiumThiosulphate1") {
            chemicals.intial_to_middle(elementId, -331, -150, -50, 12);
            this.UpdateInstruction(5);
        }
        else if (elementId == "starchsolution1") {
            chemicals.intial_to_middle(elementId, -482, -150, -50, 12);
            this.UpdateInstruction(6);
        }
        else if (elementId == "Hydrogenperoxide1") {
            chemicals.intial_to_middle(elementId, -640, -150, -50, 12);
            this.UpdateInstruction(7);
        }
    }

    DirectAnimationForDistillerWater() {
        this.UpdateInstruction(3);

        if (this.ML == "a") {
            this.DistillerWaterAnimataion(-110, -80, -40, 10)
        } else if (this.ML == "b") {
            this.DistillerWaterAnimataion(-190, -80, -40, 10);
        } else if (this.ML == "c") {
            this.DistillerWaterAnimataion(-270, -50, -40, 10);
        } else {
            this.DistillerWaterAnimataion(-340, -50, -40, 10);
        }
    }

    DistillerWaterAnimataion(translateX, translateY, rotateAngle, comebackPosition) {
        //top
        this.water.style.transition = 'transform 0.5s ease';
        this.water.style.transform = `translateY(${translateY}px)`

        setTimeout(() => {
            this.water.style.transform = `translatex(${translateX}px) rotate(${rotateAngle}deg)`
        }, 1000);
        //now come back to its initial postion
        setTimeout(() => {
            this.water.style.transform = `translatex(${comebackPosition}px)`
            this.water.setAttribute("src", "./DISTILLED_-WATER2.png")
        }, 1500);
    }

    isFinalStep(elementId) {
        if (elementId == "Hydrogenperoxide1")
            return true;
        else
            return false
    }

    DoFianlThingsAfterAllChemicalAdded() {
        alert("it was final");
    }
}

var chemicals = new chemical();


//on click event for the rest of four of the chemicles which is going to thorugh the middle bicker
Array.from(document.getElementsByClassName('clk')).forEach(e => {

    e.addEventListener("click", (event) => {

        chemicals.movementOfSelectedBeaker(event.target.id)
    })
    //click event for the distilled water

    document.getElementById("DISTILLED_-WATER1").addEventListener('click', (e) => {
        chemicals.DirectAnimationForDistillerWater();
    })

})

//pop up
function openPopup() {
    document.getElementById("popup").style.display = "flex";
  }
  
  function closePopup() {
    document.getElementById("popup").style.display = "none";
  }
  

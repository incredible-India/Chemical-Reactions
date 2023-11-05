//process steps function
class chemical {

    constructor() {
 
    }
    emptybeaker = document.getElementById("emptybeaker");
    water = document.getElementById("DISTILLED_-WATER1");
    ML = localStorage.getItem("flask");
    lang = localStorage.getItem("lang");
    
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
            this.MiddleBeakerAnimation(-80, -50, -40, 10,elementID);
        } else if (this.ML == "b") {
            this.MiddleBeakerAnimation(-90, -120, -40, 10,elementID);
        } else if (this.ML == "c") {
            this.MiddleBeakerAnimation(-90, -197, -40, 10,elementID);
        } else {
            this.MiddleBeakerAnimation(-99, -280, -40, 10,elementID);
        }
    }

    MiddleBeakerAnimation(translateY, translateX, rotateAngle, comabackPosition,finalElementId) {
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
        if(this.isFinalStep(finalElementId))
        this.DoFianlThingsAfterAllChemicalAdded();
        }, 3000);
    }

    changeBeakerImage(status, ML = 5) {
        if (status == "fill")
            {
                if(this.ML=="a")
                    this.emptybeaker.setAttribute("src", "./5mlbeaker.png");
                else if(this.ML=="b")
                    this.emptybeaker.setAttribute("src", "./10mlbeaker.png");
                else if(this.ML=="c")
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
    movementOfSelectedBeaker(elementId) {
        if (elementId == "Sulphuricacid1") {
            chemicals.intial_to_middle(elementId, -160, -150, -50, 20);
        }
        else if (elementId == "SodiumThiosulphate1") {
            chemicals.intial_to_middle(elementId, -331, -150, -50, 12);
        }
        else if (elementId == "starchsolution1") {
            chemicals.intial_to_middle(elementId, -482, -150, -50, 12);
        }
        else if (elementId == "Hydrogenperoxide1") {
            chemicals.intial_to_middle(elementId, -640, -150, -50, 12);
        }
    }

    DirectAnimationForDistillerWater() {

        if (this.ML == "a") {
            this.DistillerWaterAnimataion(-110, -80, -40, 10)
        } else if (this.ML == "b") {
            this.DistillerWaterAnimataion(-190, -80, -40, 10);
        } else if (this.ML == "c" ) {      
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

    isFinalStep(elementId){
        if(elementId=="Hydrogenperoxide1")
            return true;
        else
            return false
    }

    DoFianlThingsAfterAllChemicalAdded(){
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


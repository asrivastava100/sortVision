// DOM Elements

let navMenu = document.getElementById("navbarLinks");
let bSortBtn = document.getElementById("bSortBtn");
let sSortBtn = document.getElementById("sSortBtn");
let mSortBtn = document.getElementById("mSortBtn");
let iSortBtn = document.getElementById("iSortBtn");
let wikiBtn = document.getElementById("wikiBtn");
let contactBtn = document.getElementById("contactBtn");
let issueBtn = document.getElementById("issueBtn");
let slider = document.getElementById("arraySize");
let animSlider = document.getElementById("animSlider");
let speedSlider = document.getElementById("speedSlider");
let ouputSlVal = document.getElementById("outputSlVal");
let outputAnimVal = document.getElementById("outputAnimVal");
let outputSpeedVal = document.getElementById("outputSpeedVal");
let bSortInfo = document.getElementById("bSortInfo");
let mSortInfo = document.getElementById("mSortInfo");
let sSortInfo = document.getElementById("sSortInfo");
let iSortInfo = document.getElementById("iSortInfo");

let elemActive = "bSort";
let btnArray = [bSortBtn,sSortBtn,mSortBtn,iSortBtn];
let infoArray = [bSortInfo,sSortInfo,mSortInfo,iSortInfo];

// Functions 

// removes is-active tag to all in btnArray except given element (elem)

function removeIsActiveTag(elem,btnArray){
    for(let i = 0; i < btnArray.length; i++){
        if(btnArray[i] != elem){
            btnArray[i].classList.remove("is-active");
        }
    }
}

// adds is-hidden tag to all in infoArray except given element (elem)

function addIsHiddenTag(elem,infoArray){
    for(let i = 0; i < infoArray.length; i++){
        if(infoArray[i] != elem){
            infoArray[i].classList.add("is-hidden");
        } else{
            infoArray[i].classList.remove("is-hidden");
        }
    }
}

// sets default values for array slider, speed slider, animation slider.

function setDefaultSliderVals(sliderMax,sliderVal,animSlVal,speedSlVal){
    slider.max = sliderMax;
    slider.value = sliderVal;
    ouputSlVal.innerHTML = sliderVal;
    animSlider.value = animSlVal;
    outputAnimVal.innerHTML = animSlVal;
    speedSlider.value = speedSlVal;
    outputSpeedVal.innerHTML = speedSlVal;
}

function bubbleSortVisualise(array){
    let isSwapped = false;
    let resArray = [];
    
    for(let i = 0; i < array.length; i++){
        isSwapped = false;
        for(let j = 0; j < array.length - i - 1; j++){
            let tempArray;
            if(array[j] > array[j+1]){
                swap(j, j+1, array);
                isSwapped = true;
            }
            tempArray = array.slice();
            resArray.push(tempArray);
        }
        if(!isSwapped){
            break;
        }
    }
    
    return resArray;
}

// selectionSortVisualise keeps track of intermediate arrays

function selectionSortVisualise(array){
    let resArray = [array.slice()];
    for(let i = 0; i < array.length; i++){
        let min_pos = i;
        for(let j = min_pos + 1; j < array.length; j++){
            if(array[j] < array[min_pos]){
                min_pos = j;
            }
        }
        swap(min_pos, i, array);
        let tempArray = array.slice();
        resArray.push(tempArray);
    }
    return resArray;
}

//  mergeSortVisualise keeps track of intermediate arrays

function mergeSortVisualise(array){
    if(array.length <= 1) return array;
    let mergesArray = [array.slice()];
    mergeSortHelper(array, 0, array.length - 1,mergesArray);
    return mergesArray;
}
    
function mergeSortHelper(array, left, right, mergesArray){
    if(left >= right){
        return;
    }
    let middle = Math.floor((left + right) / 2);
    mergeSortHelper(array, left, middle, mergesArray);
    mergeSortHelper(array, middle + 1, right, mergesArray);
    merge(array, left, middle, right, mergesArray);
}

function merge(array, left, middle, right, mergesArray){
    let leftPart = array.slice(left, middle + 1);
    let rightPart = array.slice(middle + 1, right+1);
    let leftIdx = 0;
    let rightIdx = 0;
    let arrayIdx = left;
    for(arrayIdx; arrayIdx < right + 1; arrayIdx++){
        if(leftIdx < leftPart.length && rightIdx < rightPart.length){
            if(leftPart[leftIdx] <= rightPart[rightIdx]){
                array[arrayIdx] = leftPart[leftIdx];
                leftIdx++;
            }
            else{
                array[arrayIdx] = rightPart[rightIdx];
                rightIdx++;
            }
        }

        else if(leftIdx < leftPart.length){
            array[arrayIdx] = leftPart[leftIdx];
            leftIdx++;
        }
        else{
            array[arrayIdx] = rightPart[rightIdx];
            rightIdx++;
        }
        
        mergesArray.push(array.slice());
    }
}

// insertionSortVisualise keeps track of intermediate arrays

function insertionSortVisualise(array){
    let resArray = [array.slice()];
    for(let i = 1; i < array.length; i++){
        let currentElem = array[i];
        j = i - 1;
        while(j >= 0 && array[j] > currentElem){
            array[j+1] = array[j];
            resArray.push(array.slice());
            j--;
        }
        array[j+1] = currentElem;
        resArray.push(array.slice());
    }
    return resArray;
}

// Bubble sort on start up

window.onload = function(){
    navMenu.classList.add("deactivateElem");
    ouputSlVal.innerHTML = slider.value;
    outputAnimVal.innerHTML = animSlider.value;
    outputSpeedVal.innerHTML = speedSlider.value;
    runSim(slider.value,bubbleSortVisualise,slider,"outputChart",animSlider.value);
    setTimeout(()=>{
        navMenu.classList.remove("deactivateElem");
    },1000)
}

bSortBtn.addEventListener('click', () => {
    navMenu.classList.remove('is-active'); // to close burger menu after option is selected.
    addIsHiddenTag(bSortInfo,infoArray);
 
    if(!bSortBtn.classList.contains("is-active")){
        bSortBtn.classList.add("is-active");
    }

    removeIsActiveTag(bSortBtn,btnArray);
    navMenu.classList.add("deactivateElem");
    elemActive = "bSort";
    
    // default values

    setDefaultSliderVals(150,30,10,2)

    runSim(slider.value,bubbleSortVisualise,slider,"outputChart",animSlider.value,speedSlider.value);

    setTimeout(() => {
        navMenu.classList.remove("deactivateElem");
    },finalTimeOut)

})

sSortBtn.addEventListener('click',() => {
    navMenu.classList.remove('is-active');
    addIsHiddenTag(sSortInfo,infoArray);
    
    if(!sSortBtn.classList.contains("is-active")){
        sSortBtn.classList.add("is-active");
    }
    
    removeIsActiveTag(sSortBtn,btnArray);
    navMenu.classList.add("deactivateElem");
    elemActive = "sSort";
    
    // default values

    setDefaultSliderVals(500,100,10,2);
    
    runSim(slider.value,selectionSortVisualise,slider,"outputChart",animSlider.value,speedSlider.value);
    
    setTimeout(() => {
        navMenu.classList.remove("deactivateElem");
    },finalTimeOut)

})

mSortBtn.addEventListener('click',() => {
    addIsHiddenTag(mSortInfo,infoArray);
    navMenu.classList.remove('is-active');
    
    if(!mSortBtn.classList.contains("is-active")){
        mSortBtn.classList.add("is-active");
    }
   
    removeIsActiveTag(mSortBtn,btnArray);

    navMenu.classList.add("deactivateElem");
    elemActive = "mSort";
    
    // default values
    
    setDefaultSliderVals(500,100,10,2);

    runSim(slider.value,mergeSortVisualise,slider,"outputChart",animSlider.value,speedSlider.value);
    
    setTimeout(() => {
        navMenu.classList.remove("deactivateElem");
    },finalTimeOut)
    
})

iSortBtn.addEventListener('click',() => {
    addIsHiddenTag(iSortInfo,infoArray);
    navMenu.classList.remove('is-active');
    
    if(!iSortBtn.classList.contains("is-active")){
        iSortBtn.classList.add("is-active");
    }

    removeIsActiveTag(iSortBtn,btnArray);
    
    navMenu.classList.add("deactivateElem");
    elemActive = "iSort";
    
    // default values

    setDefaultSliderVals(150,30,10,2);

    runSim(slider.value,insertionSortVisualise,slider,"outputChart",animSlider.value,speedSlider.value);
    
    setTimeout(() => {
        navMenu.classList.remove("deactivateElem");
    },finalTimeOut)

})

slider.oninput = () => {
    ouputSlVal.innerHTML = slider.value;
}

animSlider.oninput = () => {
    outputAnimVal.innerHTML = animSlider.value;
}

speedSlider.oninput = () => {
    outputSpeedVal.innerHTML = speedSlider.value;

}

slider.onchange = (e) => {
    switch(elemActive){
        case "bSort":
            navMenu.classList.add("deactivateElem");
            runSim(e.target.value,bubbleSortVisualise,slider,"outputChart",animSlider.value,speedSlider.value);
            setTimeout(() => {
                navMenu.classList.remove("deactivateElem");
            },finalTimeOut)
            
            break;
        
        case "sSort":
            navMenu.classList.add("deactivateElem");
            runSim(e.target.value,selectionSortVisualise,slider,"outputChart",animSlider.value,speedSlider.value);
            setTimeout(() => {
                navMenu.classList.remove("deactivateElem");
            },finalTimeOut)
            
            break;
        
        case "mSort":
            navMenu.classList.add("deactivateElem");
            runSim(e.target.value,mergeSortVisualise,slider,"outputChart",animSlider.value,speedSlider.value);
            setTimeout(() => {
                navMenu.classList.remove("deactivateElem");
            },finalTimeOut)
            
            break;
        
        case "iSort":
            navMenu.classList.add("deactivateElem");
            runSim(e.target.value,insertionSortVisualise,slider,"outputChart",animSlider.value,speedSlider.value);
            setTimeout(() => {
                navMenu.classList.remove("deactivateElem");
            },finalTimeOut)
            
        
        default:
            console.error("An error occurred @ slider.onchange");
            
    }
    
}


wikiBtn.addEventListener('click', ()=>{
    navMenu.classList.remove('is-active');
})

issueBtn.addEventListener('click',()=>{
    navMenu.classList.remove('is-active');
})

contactBtn.addEventListener('click',()=>{
    navMenu.classList.remove('is-active');
})


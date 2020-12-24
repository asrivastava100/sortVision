let outputChart;
let finalTimeOut = 0; // to control setTimeout in SortFns.js

// burger menu

let burgerIcon = document.getElementById("burger1");
let navbarMenu = document.getElementById("navbarLinks");
burgerIcon.addEventListener('click', () => {
    navbarMenu.classList.toggle('is-active');
})

// swap function

function swap(i,j,array){
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}


function colGen(arrayLen){
    let resArray = []
    for(let i = 0; i < arrayLen; i++){
        resArray.push(`rgba(${0 + 3 * i}, 160, ${170 + 3 * i}, 0.4)`)
    }
    return resArray;
}


function updateChart(newData, labelData){
    outputChart.data.datasets[0].data = newData;
    outputChart.data.labels = labelData;
    outputChart.update();
}


function plotGen(data, label){
    updateChart(data,label);
}


function plotInit(data, label, cols, canvasID, anim){
    let ctx = document.getElementById(canvasID).getContext('2d');
    if(outputChart != undefined){
        outputChart.chart.destroy();
     }
    
     outputChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: label,
            datasets: [{
                data: data,
                backgroundColor: cols,
                borderColor: cols,
                borderWidth: 1
            }]
        },
        options: {
            responsive:true,
            maintainAspectRatio: false,
            legend: {
                display: false
             },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }],
                xAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }]
            },
            animation: {
                duration: parseInt(anim)
            }
        }
    });
}

// mode = 0 (slowest) ... mode = 2 (normal) ... mode = 4 (fastest)

function runSim(arraySize, sortFn, sliderElem, canvasID, anim = 10, mode = 2){
    let slider = sliderElem;
    slider.disabled = true;
    let randArray = [];

    for(let j = parseInt(arraySize); j > 0; j--){
        randArray.push(Math.round(Math.random() * 100));
    }

    let result = sortFn(randArray);
    let cols = colGen(result[0].length);
    
    plotInit(result[0],result[0],cols,canvasID,anim);
    
    finalTimeOut = determineTimeout(mode,result.length - 1);
    
    for(let i = 1; i < result.length; i++){
        setTimeout(() => {
            plotGen(result[i],result[i]);
        }, determineTimeout(mode,i));
        
    }

    setTimeout(() => {slider.disabled = false}, determineTimeout(mode, result.length - 1));
}

function determineTimeout(mode, loop_iterator){
    switch(parseInt(mode)){
        case 0:
            return loop_iterator * 250 + 250;
        case 1:
            return loop_iterator * 25 + 25;
        case 2:
            return 250;
        case 3:
            return 100;

        case 4:
            return 0;

    }
}

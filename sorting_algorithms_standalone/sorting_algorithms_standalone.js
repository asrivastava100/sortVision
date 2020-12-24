// swap function

function swap(i,j,array){
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

// function for bubble sort

function bubbleSort(array){
    let isSwapped = false;
    
    for(let i = 0; i < array.length; i++){
        isSwapped = false;
        for(let j = 0; j < array.length - i - 1; j++){
            if(array[j] > array[j+1]){
                swap(j,j+1,array);
                isSwapped = true;
            }
        }
        if(!isSwapped){
            break;
        }
    }
}

// user function for mergeSort 

function mergeSort(array){
    if(array.length <= 1) return;
    mergeSortHelper(array, 0, array.length - 1);
}
    
function mergeSortHelper(array, left, right){
    if(left >= right){
        return;
    }
    let middle = Math.floor((left + right) / 2);
    mergeSortHelper(array, left, middle);
    mergeSortHelper(array, middle + 1, right);
    merge(array, left, middle, right);
}

function merge(array, left, middle, right){
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
        
    }
}

function selectionSort(array){
    for(let i = 0; i < array.length; i++){
        let min_pos = i;
        for(let j = min_pos + 1; j < array.length; j++){
            if(array[j] < array[min_pos]){
                min_pos = j;
            }
        }
        swap(min_pos, i, array);
    }
}

function insertionSort(array){
    for(let i = 1; i < array.length; i++){
        let currentElem = array[i];
        j = i - 1;
        while(j >= 0 && array[j] > currentElem){
            array[j+1] = array[j];
            j--;
        }
        array[j+1] = currentElem; 
    }
}

// Testing

function test_sorting_algorithm(sortFn,arraySize){
    let testArray = [];
    
    for(let i = 0; i < arraySize; i++){
        testArray[i] = Math.round(Math.random() * 1000);
    }

    testArrayJSsort = testArray.slice();
    
    testArrayJSsort.sort((a,b) => a - b);
    
    sortFn(testArray);

    if(testArrayJSsort.length != testArray.length) return false;
    for(let i = 0; i < testArrayJSsort.length; i++){
        if(testArray[i] != testArrayJSsort[i]) return false;
    }
    return true;
    
    
}


let sortingFnList = [bubbleSort, mergeSort, selectionSort, insertionSort];

function testAll(sortingFunctionsList,arraySize){
    let result = sortingFunctionsList.map(element => 
        test_sorting_algorithm(element,arraySize)
    ).reduce((x,y) => x * y);
    
    if(result){
        return true;
    }
    return false;
}

console.log("All tests passed?: " + testAll(sortingFnList,10000));
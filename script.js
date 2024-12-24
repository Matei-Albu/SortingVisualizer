const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

let isSorting = false;

function drawBars() {
    const container = document.getElementById('bar-container');
    container.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.style.height = `${value * 15}px`;
        bar.className = 'bar';
        container.appendChild(bar);
    });
}

async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]]; // Swap
                drawBars(); // Re-render bars after each swap
                await new Promise(resolve => setTimeout(resolve, 200)); // Delay for animation
            }
        }
    }
    isSorting = false;
    toggleButtons(); // Re-enable buttons after sorting is done
}

async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        // Shift elements of the array to make room for the key
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j]; // Move element one step forward
            j--;

            // Visualize the updated array after each shift
            drawBars();
            await new Promise(resolve => setTimeout(resolve, 500)); // Delay for animation
        }

        // Insert the key at its correct position
        array[j + 1] = key;

        // Visualize the array after inserting the key
        drawBars();
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Mark sorting as finished and re-enable buttons
    isSorting = false;
    toggleButtons();
}

async function quickSortHelper(start, end) {
    if (start >= end) return;

    // Partition the array and get the pivot index
    const pivotIndex = await partition(start, end);

    // Recursively sort the subarrays
    await quickSortHelper(start, pivotIndex - 1);
    await quickSortHelper(pivotIndex + 1, end);
}

async function partition(start, end) {
    const pivotValue = array[end]; // Choose the last element as pivot
    let pivotIndex = start;

    for (let i = start; i < end; i++) {
        if (array[i] < pivotValue) {
            [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]]; // Swap
            pivotIndex++;

            // Visualize the swap
            drawBars();
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    // Place the pivot element at its correct position
    [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
    drawBars();
    await new Promise(resolve => setTimeout(resolve, 500));

    return pivotIndex;
}

async function quickSort() {
    await quickSortHelper(0, array.length - 1);

    // Mark sorting as finished and re-enable buttons
    isSorting = false;
    toggleButtons();
}

async function mergeSortHelper(start, end) {
    if (start >= end) return;

    // Find the middle point
    const mid = Math.floor((start + end) / 2);

    // Recursively sort both halves
    await mergeSortHelper(start, mid);
    await mergeSortHelper(mid + 1, end);

    // Merge the sorted halves
    await merge(start, mid, end);
}

async function merge(start, mid, end) {
    const left = array.slice(start, mid + 1);
    const right = array.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            array[k] = left[i];
            i++;
        } else {
            array[k] = right[j];
            j++;
        }
        k++;

        // Visualize the merge
        drawBars();
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Copy remaining elements from left
    while (i < left.length) {
        array[k] = left[i];
        i++;
        k++;

        drawBars();
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Copy remaining elements from right
    while (j < right.length) {
        array[k] = right[j];
        j++;
        k++;

        drawBars();
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

async function mergeSort() {
    await mergeSortHelper(0, array.length - 1);

    // Mark sorting as finished and re-enable buttons
    isSorting = false;
    toggleButtons();
}




function randomize(array) {
    // Shuffle the array using Fisher-Yates algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index
        [array[i], array[j]] = [array[j], array[i]]; // Swap
    }
    return array; // Return shuffled array
}

// Function to toggle button disabled state
function toggleButtons() {
    const buttons = document.querySelectorAll('button, select');
    buttons.forEach(button => {
        if (isSorting) {
            button.classList.add('disabled');
        } else {
            button.classList.remove('disabled');
        }
    });
}

// Initial rendering of the bars
drawBars();

// Add event listener for sort button
document.getElementById('sort-button').addEventListener('click', () => {
    const selectedAlgorithm = document.getElementById('sort').value;

    if (selectedAlgorithm.trim() !== "") {
        startSorting(selectedAlgorithm);
    } else {
        alert("Please select a sorting algorithm first!");
    }
});

function startSorting(algorithm) {
    if (algorithm === "Bubble Sort" && !isSorting) {
        isSorting = true;
        toggleButtons(); // Disable buttons when sorting starts
        bubbleSort();
    } else if (algorithm === "Insertion Sort" && !isSorting) {
        isSorting = true;
        toggleButtons();
        insertionSort();
    } else if (algorithm === "Selection Sort" && !isSorting) {
        isSorting = true;
        toggleButtons();
        mergeSort();
    } else if (algorithm === "Quicksort" && !isSorting) {
        isSorting = true;
        toggleButtons();
        quickSort();
    }
}

// Add event listener for shuffle button
document.getElementById("shuffle-button").addEventListener("click", () => {
    if (!isSorting) { // Only shuffle if not sorting
        randomize(array); // Shuffle the array in place
        drawBars(); // Re-render the bars after shuffling
    }
});

// Get all elements needed
const submitBtn = document.getElementById('submit');
const dayIn = document.getElementById('day');
const monthIn = document.getElementById('month');
const yearIn = document.getElementById('year');

const dayLabel = document.getElementById('day-label');
const monthLabel = document.getElementById('month-label');
const yearLabel = document.getElementById('year-label');

const dayError = document.getElementById('day-error');
const monthError = document.getElementById('month-error');
const yearError = document.getElementById('year-error');

const dayOut = document.getElementById('days-result');
const monthOut = document.getElementById('months-result');
const yearOut = document.getElementById('years-result');

const currentDate = new Date();

let maxDay = '', leapYear = '', yearResult = '', monthResult = '', dayResult = '';
let dayDone = false, monthDone = false, yearDone = false;




// Collect user input when button is clicked

submitBtn.addEventListener("click", (e) => {
    const dayVal = dayIn.value;
    const monthVal = monthIn.value;
    const yearVal = yearIn.value;

    checkYear(yearVal);
    leapYear = isLeapYear(yearVal);
    checkMonth(monthVal);
    maxDay = getMaxDay(monthVal);
    checkDay(dayVal);

    showResults(yearResult, monthResult, dayResult);
    // allDone(yearDone,monthDone,dayDone);
    
    
});


// Check if year is valid

function checkYear(yearVal) {
    const currentYear = currentDate.getFullYear();

    if(yearVal == ''){
        yearError.innerHTML = "Input Required";
        yearError.style.display = 'block';
        yearIn.style.borderColor = 'red';
        yearLabel.style.color = 'red';

        yearOut.innerHTML = '--';
        monthOut.innerHTML = '--';
        dayOut.innerHTML = '--';
    }
    
    else if(yearVal > currentYear) {
        // ERROR STATE
        yearError.innerHTML = "Must be in the past";
        yearError.style.display = 'block';
        yearIn.style.borderColor = 'red';
        yearLabel.style.color = 'red';

        yearOut.innerHTML = '--';
        monthOut.innerHTML = '--';
        dayOut.innerHTML = '--';
    }

    else{
        yearResult = currentYear - yearVal;
        yearError.style.display = 'none';
        yearIn.style.borderColor = 'var(--gray-border)';
        yearLabel.style.color = 'var(--gray-text)';
        yearDone = true;
        
    }
    
}


// Check if year is a leap year

function isLeapYear (yearVal){
    return (yearVal % 4 === 0 && yearVal % 100 != 0) || yearVal % 400 === 0;
}


// Check if month is valid
function checkMonth(monthVal){
    if(monthVal == '' || monthVal > 12 || monthVal < 1){
        monthError.style.display = 'block';
        monthError.style.borderColor = 'red';
        monthLabel.style.color = 'red';
        monthDone = false;

        yearOut.innerHTML = '--';
        monthOut.innerHTML = '--';
        dayOut.innerHTML = '--';
    }

    else{
        monthError.style.display = 'none';
        monthError.style.borderColor = 'var(--gray-border)';
        monthLabel.style.color = 'var(--gray-text)';
        monthResult = Math.abs((currentDate.getMonth() + 1) - monthVal);
        monthDone = true;
        
    }
}


// Check if day is valid
function checkDay(dayVal, monthVal){
    if(dayVal == '' || dayVal > 31 || dayVal < 1) {
        dayError.style.display = 'block';
        dayError.style.borderColor = 'red';
        dayLabel.style.color = 'red';
        dayDone = false;

        yearOut.innerHTML = '--';
        monthOut.innerHTML = '--';
        dayOut.innerHTML = '--';
    }

    else{
        if(dayVal > maxDay) {
            dayError.style.display = 'block';
            dayError.style.borderColor = 'red';
            dayLabel.style.color = 'red';
            dayDone = false;

            yearOut.innerHTML = '--';
            monthOut.innerHTML = '--';
            dayOut.innerHTML = '--';
        }
        else {
            dayError.style.display = 'none';
            dayError.style.borderColor = 'var(--gray-border)';
            dayLabel.style.color = 'var(--gray-text)';
            console.log(currentDate.getDay());
            dayResult = Math.abs(currentDate.getDate() - dayVal);
            dayDone = true;
        }
    }
}

function getMaxDay(monthVal){
    const arrayMonth = [1, 3, 5, 7, 8, 10, 12];
    intMonth = parseInt(monthVal, 10);

    if (intMonth === 2 || intMonth == 2){
        if(leapYear){
            return 29;
        }

        else {
            return 28;
        }
    }

    else if (arrayMonth.includes(intMonth)){
        return 31;

    }
    else{
        return 30;
    }
}

// function allDone(yearDone, monthDone, dayDone){
//     console.log(yearDone && monthDone && dayDone);
//     return yearDone && monthDone && dayDone;
// }

function showResults(yearResult, monthResult, dayResult){

    yearOut.innerHTML = yearResult;
    monthOut.innerHTML = monthResult;
    dayOut.innerHTML = dayResult;

}

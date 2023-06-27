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

const yearDiff ='', monthDiff ='', dayDiff ='';

let maxDay = '', leapYear = '', yearResult = '', monthResult = '', dayResult = '';
let inputDate = '';





// Collect user input when button is clicked

submitBtn.addEventListener("click", (e) => {
    const dayVal = dayIn.value;
    const monthVal = monthIn.value;
    const yearVal = yearIn.value;

    const inputDate = new Date(yearVal, monthVal-1, dayVal);
    console.log(inputDate)

    checkYear(yearVal,inputDate);
    leapYear = isLeapYear(yearVal);
    checkMonth(monthVal, inputDate);
    maxDay = getMaxDay(monthVal);
    checkDay(dayVal, monthResult, inputDate);

    showResults(yearResult, monthResult, dayResult);
    
    
});


// Check if year is valid

function checkYear(yearVal, inputDate) {
    const currentYear = currentDate.getFullYear();
    const inputYear = inputDate.getFullYear();

    if(yearVal == ''){
        yearError.innerHTML = "Input Required";
        yearError.style.display = 'block';
        yearIn.style.borderColor = 'red';
        yearLabel.style.color = 'red';

    }
    
    else if(yearVal > currentYear) {
        // ERROR STATE
        yearError.innerHTML = "Must be in the past";
        yearError.style.display = 'block';
        yearIn.style.borderColor = 'red';
        yearLabel.style.color = 'red';

    }

    else{
        yearError.style.display = 'none';
        yearIn.style.borderColor = 'var(--gray-border)';
        yearLabel.style.color = 'var(--gray-text)';
        yearResult = currentYear - inputYear;
        
    }
    
}


// Check if year is a leap year

function isLeapYear (yearVal){
    return (yearVal % 4 === 0 && yearVal % 100 != 0) || yearVal % 400 === 0;
}


// Check if month is valid
function checkMonth(monthVal,inputDate){
    if(monthVal == '' || monthVal > 12 || monthVal < 1){
        monthError.style.display = 'block';
        monthError.style.borderColor = 'red';
        monthLabel.style.color = 'red';

    }

    else{
        monthError.style.display = 'none';
        monthError.style.borderColor = 'var(--gray-border)';
        monthLabel.style.color = 'var(--gray-text)';
        monthResult = (currentDate.getMonth()+1) - (inputDate.getMonth()+1);

        if(monthResult < 0){
            --yearResult;
            monthResult += 12;
        }
        
    }
}


// Check if day is valid
function checkDay(dayVal, monthVal, inputDate){
    if(dayVal == '' || dayVal > 31 || dayVal < 1) {
        dayError.style.display = 'block';
        dayError.style.borderColor = 'red';
        dayLabel.style.color = 'red';

    }

    else{
        if(dayVal > maxDay) {
            dayError.style.display = 'block';
            dayError.style.borderColor = 'red';
            dayLabel.style.color = 'red';

        }
        else {
            dayError.style.display = 'none';
            dayError.style.borderColor = 'var(--gray-border)';
            dayLabel.style.color = 'var(--gray-text)';
            dayResult = currentDate.getDate() - inputDate.getDate();

            if(dayResult < 0){
                --monthResult;
                dayResult += getMaxDay(monthResult);
            }
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


function showResults(yearResult, monthResult, dayResult){

    yearOut.innerHTML = yearResult;
    monthOut.innerHTML = monthResult;
    dayOut.innerHTML = dayResult;

}

// Your code here

//populates a record from an Array

function createEmployeeRecord(recordArray) {
    const recordObject = {
        firstName: recordArray[0],
        familyName: recordArray[1],
        title: recordArray[2],
        payPerHour: recordArray[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return recordObject;
}

// const createEmployeeRecords = function (employeeDetails) {
//     return employeeDetails.map(function (row) {
//         return createEmployeeRecords(row)
//     })
// }


//process an Array of Arrays into an Array of employee records

function createEmployeeRecords(newArray) {
    const newEmployeeArray = newArray.map(createEmployeeRecord);
    return newEmployeeArray;
}


//adds a timeIn event Object to an employee's record of 
//timeInEvents when provided an employee record and 
//Date/Time String and returns the updated record
function createTimeInEvent(employeeDetails, date) {
    const employeeTimeIn = {
        type: "TimeIn",
        hour: parseInt(date.split(" ")[1]),
        date: date.split(" ")[0]
    }
    employeeDetails.timeInEvents.push(employeeTimeIn);
    return employeeDetails;
}


//adds a timeOut event Object to an employee's record of 
//timeOutEvents when provided an employee record and 
//Date/Time String and returns the updated record
function createTimeOutEvent(employeeRecord, dateStamp) {
    const employeeTimeOut = {
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    }
    employeeRecord.timeOutEvents.push(employeeTimeOut);
    return employeeRecord;
}


// function hoursWorkedOnDate(employeeRecord, employeeDate) {
//     let employeeHours = {
//         hour: parseInt(employeeDate.split(" ")[1])
//     }
//     return employeeHours;
// }

function hoursWorkedOnDate(employeeRecord, date) {
    const gotIn = employeeRecord.timeInEvents.find(gotIn => gotIn.date === date);
    const gotOut = employeeRecord.timeInEvents.find(gotOut => gotOut.date === date);
    return (Math.abs(gotOut.hour - gotIn.hour) / 100);
}

function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
    let wagesArray = [];
    const dates = employeeRecord.timeInEvents.map(timeIn => timeIn.date)
    for (let date of dates) {
        wagesArray.push(wagesEarnedOnDate(employeeRecord, date));
    }
    return wagesArray.reduce((prev, curr) => prev + curr);
}



function calculatePayroll(employeeArray) {
    let sumOfPayOwed = employeeArray.map(obj => allWagesFor(obj))
        .reduce((a, b) => (a = a + b), 0);

    return sumOfPayOwed;
}



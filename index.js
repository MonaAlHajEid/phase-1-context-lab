// Helper function to create an employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Helper function to create employee records from an array of arrays
function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

// Helper function to create a time-in event
function createTimeInEvent(employee, dateTime) {
    if (dateTime) {
        const [date, hour] = dateTime.split(" ");
        employee.timeInEvents.push({
            type: "TimeIn",
            hour: parseInt(hour, 10),
            date
        });
    }
    return employee;
}

// Helper function to create a time-out event
function createTimeOutEvent(employee, dateTime) {
    if (dateTime) {
        const [date, hour] = dateTime.split(" ");
        employee.timeOutEvents.push({
            type: "TimeOut",
            hour: parseInt(hour, 10),
            date
        });
    }
    return employee;
}

// Helper function to find an employee by first name
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

// Helper function to calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);

    if (timeIn && timeOut) {
        return (timeOut.hour - timeIn.hour) / 100;
    }

    return 0;
}

// Helper function to calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}

// Helper function to calculate all wages for an employee
function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
}

// Helper function to calculate the payroll for all employees
function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
}


import ConstructorModel from '../schema/constructorSchema.js'
import DriverModel from '../schema/driverSchema.js';

export const update = (req, res) => {
    let buttons = req.body.buttons;
    let playerType = req.body.playerType;
    let noError = true;

    if (playerType === 'driver') {
        DriverModel.find(function(err, drivers) {
            if (!err) {
                drivers.forEach(function(driver) {
                    let votesFor = driver.votesFor;
                    if (buttons.includes(driver.name)) {
                        ++votesFor;
                    }
                    let votesTotal = driver.votesTotal + 1;
                    let percentage = (votesFor / votesTotal) * 100;
                    
                    console.log(percentage);
                    
                    DriverModel.updateOne(driver, {votesFor: votesFor, votesTotal: votesTotal, percentage: percentage}, function(err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                });
            } else {
                noError = false;
            }
        });
    } else if (playerType === 'constructor') {
        ConstructorModel.find(function(err, constructors) {
            if (!err) {
                constructors.forEach(function(constructor) {
                    let votesFor = constructor.votesFor;
                    if (buttons.includes(constructor.name)) {
                        ++votesFor;
                    }
                    let votesTotal = constructor.votesTotal + 1;
                    let percentage = (votesFor / votesTotal) * 100;
                                        
                    ConstructorModel.updateOne(constructor, {votesFor: votesFor, votesTotal: votesTotal, percentage: percentage}, function(err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                });
            } else {
                noError = false;
            }
        });
    }

    const responseObj = {
        status: (noError ? 'Success' : 'Failure'),
        statusMessage: (noError ? 'Successfully updated the data.' : 'Failed to update the data.'),
        data: {}
    }

    res.json(responseObj);
}

export const retrieve = async (req, res) => {
    function quickSort(arr, left, right) {
        let pivot, partitionIndex;

        if(left < right) {
            pivot = right;
            partitionIndex = partition(arr, pivot, left, right);
            quickSort(arr, left, partitionIndex - 1);
            quickSort(arr, partitionIndex + 1, right);
        }
        return arr;
    }

    function partition(arr, pivot, left, right) {
        let pivotValue = arr[pivot].percentage;
        let partitionIndex = left;

        for(let i = left; i < right; i++) {
            if(arr[i].percentage > pivotValue) {
                swap(arr, i, partitionIndex);
                partitionIndex++;
            }
        }
        swap(arr, right, partitionIndex);
        return partitionIndex;
    }

    function swap(arr, i, j) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    let playerType = req.body.playerType;
    const mongooseData = {
        'names': [],
        'percentages': [],
        'colors': [],
        'bgColors': []
    };

    if (playerType === 'driver') {
        const drivers = await DriverModel.find({});
        quickSort(drivers, 0, drivers.length - 1);
        drivers.forEach(function(driver) {
            mongooseData.names.push(driver.name);
            mongooseData.percentages.push(driver.percentage.toFixed(1));
            mongooseData.colors.push(driver.color);
            mongooseData.bgColors.push(driver.bgColor);
        });
    } else if (playerType === 'constructor') {
        const constructors = await ConstructorModel.find({});
        quickSort(constructors, 0, constructors.length - 1);
        constructors.forEach(function(constructor) {
            mongooseData.names.push(constructor.name);
            mongooseData.percentages.push(constructor.percentage.toFixed(1));
            mongooseData.colors.push(constructor.color);
            mongooseData.bgColors.push(constructor.bgColor);
        });
    }

    const responseObj = {
        status: (mongooseData.percentages.length ? 'Success' : 'Failure'),
        statusMessage: (mongooseData.percentages.length ? 'Successfully retrieved the updated data.' : 'Failed to retrieve the updated data.'),
        data: {
            playerData: mongooseData
        }
    }

    res.json(responseObj);
}
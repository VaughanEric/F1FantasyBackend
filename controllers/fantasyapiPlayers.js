import axios from 'axios';
import { response } from 'express';

export async function retrieve(req, res) {
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
        let pivotValue = arr[pivot].season_score;
        let partitionIndex = left;

        for(let i = left; i < right; i++) {
            if(arr[i].season_score > pivotValue) {
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

    let alf = 0;
    let alp = 0;
    let alt = 0;
    let ast = 0;
    let haa = 0;
    let fer = 0;
    let mcl = 0;
    let mer = 0;
    let red = 0;
    let wil = 0;

    let players = [];
    let weeks = [];
    let drNames = [];
    let drPriceHistories = [];
    let crNames = [];
    let crPriceHistories = [];
    let drColors = [];
    let drBgColors = [];
    let drDashes = [];
    let drLNames = []
    let crColors = [];
    let crBgColors = [];
    let crTeamAbbr = [];

    const response = await axios.get('https://fantasy-api.formula1.com/partner_games/f1/players#');

    for(let i = 0; i < response.data.players.length; i++) {
        players.push(response.data.players[i]);
    }
    quickSort(players, 0, players.length - 1);
        
    for(let i = 0; i < players.length; i++) {
        let player = players[i];

        if(player.position === 'Driver') {
            drNames.push(player.display_name);
            drLNames.push(player.last_name);

            switch(player.team_abbreviation) {
                case 'ALF':
                    drColors.push('rgb(144, 0, 0)');
                    drBgColors.push('rgba(144, 0, 0, 0.5)');

                    if(alf === 0) {
                        drDashes.push([]);
                        alf++;
                    } else {
                        drDashes.push([4]);
                    }
                    break;
                case 'ALP':
                    drColors.push('rgb(0, 144, 255)');
                    drBgColors.push('rgba(0, 144, 255, 0.5)');

                    if(alp === 0) {
                        drDashes.push([]);
                        alp++;
                    } else {
                        drDashes.push([4]);
                    }
                    break;
                case 'ALT':
                    drColors.push('rgb(43, 69, 98)');
                    drBgColors.push('rgba(43, 69, 98, 0.5)');

                    if(alt === 0) {
                        drDashes.push([]);
                        alt++;
                    } else {
                        drDashes.push([4]);
                    }
                    break;
                case 'AST':
                    drColors.push('rgb(0, 111, 98)');
                    drBgColors.push('rgba(0, 111, 98, 0.5)');

                    if(ast === 0) {
                        drDashes.push([]);
                        ast++;
                    } else {
                        drDashes.push([4]);
                    }
                    break;
                case 'FER':
                    drColors.push('rgb(220, 0, 0)');
                    drBgColors.push('rgba(220, 0, 0, 0.5)');

                    if(fer === 0) {
                        drDashes.push([]);
                        fer++;
                    } else {
                        drDashes.push([4]);
                    }
                    break;
                case 'HAA':
                    drColors.push('rgb(0, 0, 0)');
                    drBgColors.push('rgba(0, 0, 0, 0.5)');

                    if(haa === 0) {
                        drDashes.push([]);
                        haa++;
                    } else {
                        drDashes.push([4]);
                    }
                    break;
                case 'MCL':
                    drColors.push('rgb(255, 152, 0)');
                    drBgColors.push('rgba(255, 152, 0, 0.5)');

                    if(mcl === 0) {
                        drDashes.push([]);
                        mcl++;
                    } else {
                        drDashes.push([4]);
                    }
                    break;
                case 'MER':
                    drColors.push('rgb(0, 210, 190)');
                    drBgColors.push('rgba(0, 210, 190, 0.5)');

                    if(mer === 0) {
                        drDashes.push([]);
                        mer++;
                    } else {
                        drDashes.push([4]);
                    }
                    break;
                case 'RED':
                    drColors.push('rgb(6, 0, 239)');
                    drBgColors.push('rgba(6, 0, 239, 0.5)');

                    if(red === 0) {
                        drDashes.push([]);
                        red++;
                    } else {
                        drDashes.push([4]);
                    }
                    break;
                case 'WIL':
                    drColors.push('rgb(0, 90, 255)');
                    drBgColors.push('rgba(0, 90, 255, 0.5)');

                    if(wil === 0) {
                        drDashes.push([]);
                        wil++;
                    } else {
                        drDashes.push([4]);
                    }
                    break; 
                default:  
            }
        } else {
            crNames.push(player.display_name);
            crTeamAbbr.push(player.team_abbreviation);

            switch(player.team_abbreviation) {
                case 'ALF':
                    crColors.push('rgb(144, 0, 0)');
                    crBgColors.push('rgba(144, 0, 0, 0.5)');
                    break;
                case 'ALP':
                    crColors.push('rgb(0, 144, 255)');
                    crBgColors.push('rgba(0, 144, 255, 0.5)');
                    break;
                case 'ALT':
                    crColors.push('rgb(43, 69, 98)');
                    crBgColors.push('rgba(43, 69, 98, 0.5)');
                    break;
                case 'AST':
                    crColors.push('rgb(0, 111, 98)');
                    crBgColors.push('rgba(0, 111, 98, 0.5)');
                    break;
                case 'FER':
                    crColors.push('rgb(220, 0, 0)');
                    crBgColors.push('rgba(220, 0, 0, 0.5)');
                    break;
                case 'HAA':
                    crColors.push('rgb(0, 0, 0)');
                    crBgColors.push('rgba(0, 0, 0, 0.5)');
                    break;
                case 'MCL':
                    crColors.push('rgb(255, 152, 0)');
                    crBgColors.push('rgba(255, 152, 0, 0.5)');
                    break;
                case 'MER':
                    crColors.push('rgb(0, 210, 190)');
                    crBgColors.push('rgba(0, 210, 190, 0.5)');
                    break;
                case 'RED':
                    crColors.push('rgb(6, 0, 239)');
                    crBgColors.push('rgba(6, 0, 239, 0.5)');
                    break;
                case 'WIL':
                    crColors.push('rgb(0, 90, 255)');
                    crBgColors.push('rgba(0, 90, 255, 0.5)');
                    break;
                default:
            }  
        }

        let seasonPrices = [];
        for(let j = 0; j < player.season_prices.length; j++) {
            seasonPrices.push(parseFloat(player.season_prices[j].price));
        }
        if(player.position === 'Driver') {
            drPriceHistories.push(seasonPrices);
        } else {
            crPriceHistories.push(seasonPrices);
        }
    }

    let numberOfWeeks = drPriceHistories[0].length;
    for(let i = 1; i <= numberOfWeeks; i++) {
        weeks.push(i);
    }

    function success() {
        let success = true;
        let arrays = [weeks, drNames, drPriceHistories, crNames, crPriceHistories, drColors, drBgColors, drDashes, drLNames, crColors, crBgColors, crTeamAbbr];

        arrays.forEach(array => {
            if(array.length === 0) {
                success = false;
                return success;
            }
        });
        return success;
    }

    const responseObj = {
        status: (success() ? 'Success' : 'Failure'),
        statusMessage: (success() ? 'Successfully retrieved all data.' : 'Failed to retreive all data.'),
        data: { 
            weeks: weeks,
            drNames: drNames,
            drPriceHistories: drPriceHistories,
            crNames: crNames,
            crPriceHistories: crPriceHistories,
            drColors: drColors,
            drBgColors: drBgColors,
            drDashes: drDashes,
            drLNames: drLNames,
            crColors: crColors,
            crBgColors: crBgColors,
            crTeamAbbr: crTeamAbbr
        }
    }
    res.json(responseObj);
}
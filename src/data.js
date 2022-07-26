"use strict";

// change
// add an id field to the object and nest an object inside an object
// crops.id = i 
// print crops.id.name instead of crops[0].name
const crops = [{
    id: 0, 
    name: "Blueberries",
    cost: 0,
    gold: 2,
    xp: 2,
    harvestTime: 10000,
}, {
    id: 1, 
    name: "Raspberries",
    cost: 1,
    gold: 6,
    xp: 6,
    harvestTime: 30000,
}, {
    id: 2, 
    name: "Strawberries",
    cost: 2,
    gold: 19,
    xp: 19,
    harvestTime: 90000,
}, {
    id: 3, 
    name: "Wheat",
    cost: 3,
    gold: 59,
    xp: 59,
    harvestTime: 270000,
}, {
    id: 4, 
    name: "Carrots",
    cost: 4,
    gold: 184,
    xp: 184,
    harvestTime: 810000,
}, {
    id: 5, 
    name: "Tomatoes",
    cost: 5,
    gold: 572,
    xp: 572,
    harvestTime: 2430000,
}, {
    id: 6, 
    name: "Watermelon",
    cost: 6,
    gold: 1775,
    xp: 1775,
    harvestTime: 7290000,
}, {
    id: 7, 
    name: "Potatoes",
    cost: 7,
    gold: 5502,
    xp: 5502,
    harvestTime: 21870000,
}];

const upgrade = [{
    name: "Marketing", 
    description: "+5% Crop Gold",
    boost: 0.05,
    cost: 100,
}, {
    name: "Herbology", 
    description: "+5% Crop XP",
    boost: 0.05,
    cost: 100,
}, {
    name: "Fertilizer", 
    description: "-5% Harvest Time",
    boost: 0.05,
    cost: 100,
}, {
    name: "Discounts", 
    description: "-5% Upgrade Cost",
    boost: 0.05,
    cost: 100,
}];

const numPlotsMax = 8;
const numCropsMax = 8;
const baseXPReq = 8;
const basePlotLevelRequirement = 2;
const baseCropLevelRequirement = 3;

let data = {
    time: Date.now(),
    firstTime: true,
    AFKGains: true,
    gold: 0,
    xp: 0,
    level: 1,
    selectedCrop: 0,
    numPlotsRevealed: 1,
    numCropsRevealed: 1,
    cropIDInPlot: [0, 0, 0, 0, 0, 0, 0, 0],
    plotHarvestTime: [-10, -10, -10, -10, -10, -10, -10, -10],
    upgradeLevel: [0, 0, 0, 0]
}

const crops = [{
    name: "--",
    cost: "--",
    gold: "--",
    xp: "--",
    harvestTime: "--",
}, {
    name: "Blueberries",
    cost: 0,
    gold: 2,
    xp: 2,
    harvestTime: 10000,
}, {
    name: "Raspberries",
    cost: 1,
    gold: 6,
    xp: 6,
    harvestTime: 30000,
}, {
    name: "Strawberries",
    cost: 2,
    gold: 19,
    xp: 19,
    harvestTime: 90000,
}, {
    name: "Wheat",
    cost: 3,
    gold: 59,
    xp: 59,
    harvestTime: 270000,
}, {
    name: "Carrots",
    cost: 4,
    gold: 184,
    xp: 184,
    harvestTime: 810000,

}, {
    name: "Tomatoes",
    cost: 5,
    gold: 572,
    xp: 572,
    harvestTime: 2430000,
}, {
    name: "Watermelon",
    cost: 6,
    gold: 1775,
    xp: 1775,
    harvestTime: 7290000,
}, {
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

const baseXPReq = 10;
const basePlotLevelRequirement = 2;
const baseCropLevelRequirement = 3;

let data = {
    time: Date.now(),
    firstTime: true,
    AFKGains: true,
    gold: 0,
    xp: 0,
    xpReq: baseXPReq,
    level: 1,
    selectedCrop: 1,
    nextPlotLevelRequirement: basePlotLevelRequirement,
    nextCropLevelRequirement: baseCropLevelRequirement,
    plotsRevealed: [true, false, false, false, false, false, false, false, false],
    cropsRevealed: [true, false, false, false, false, false, false, false, false],
    cropIDInPlot: [0, 0, 0, 0, 0, 0, 0, 0],
    plotHarvestTime: [-10, -10, -10, -10, -10, -10, -10, -10],
    harvestable: [false, false, false, false, false, false, false, false],
    upgradeLevel: [0, 0, 0, 0]
}

let ans = 2;

for (let i = 1; i < 9; i++) {
    console.log(Math.floor(ans));
    ans *= 3.1;
}
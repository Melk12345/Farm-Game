const crops = [{
    name: "--",
    cost: "--",
    gold: "--",
    xp: "--",
    harvestTime: "--",
}, {
    name: "Blueberries",
    cost: 0,
    gold: 1,
    xp: 2,
    harvestTime: 10000, // 10s
}, {
    name: "Raspberries",
    cost: 2,
    gold: 8,
    xp: 8,
    harvestTime: 300000, // 5m
}, {
    name: "Strawberries",
    cost: 6,
    gold: 24,
    xp: 45,
    harvestTime: 3600000, // 1h
}, {
    name: "Wheat",
    cost: 5,
    gold: 12,
    xp: 50,
    harvestTime: 7200000, // 2h
}, {
    name: "Carrots",
    cost: 9,
    gold: 36,
    xp: 90,
    harvestTime: 18000000, // 5h

}, {
    name: "Tomatoes",
    cost: 11,
    gold: 42,
    xp: 105,
    harvestTime: 28800000, // 8h
}, {
    name: "Watermelon",
    cost: 12,
    gold: 48,
    xp: 120,
    harvestTime: 43200000, // 12h
}, {
    name: "Potatoes",
    cost: 15,
    gold: 60,
    xp: 150,
    harvestTime: 86400000, // 1d
}];

const upgrade = [{
    name: "Marketing", 
    description: "+10% Crop Gold",
    boost: 0.1,
    cost: 100,
}, {
    name: "Herbology", 
    description: "+10% Crop XP",
    boost: 0.1,
    cost: 100,
}, {
    name: "Fertilizer", 
    description: "-10% Harvest Time",
    boost: 0.1,
    cost: 100,
}, {
    name: "Discounts", 
    description: "-10% Upgrade Cost",
    boost: 0.1,
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
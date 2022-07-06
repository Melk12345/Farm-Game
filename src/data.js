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
    name: "Potatoes",
    cost: 15,
    gold: 60,
    xp: 150,
    harvestTime: 86400000, // 1d
}, {
    name: "Watermelon",
    cost: 12,
    gold: 48,
    xp: 120,
    harvestTime: 43200000, // 12h
}, {
    name: "Daffodils",
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
}];

const baseXPReq = 10;
const basePlotLevelRequirement = 2;
const baseCropLevelRequirement = 3;

let data = {
    gold: 0,
    xp: 0,
    xpReq: baseXPReq,
    level: 1,
    selectedCrop: 1,
    nextPlotLevelRequirement: basePlotLevelRequirement,
    nextCropLevelRequirement: baseCropLevelRequirement,
    plotsRevealed: [true, false, false, false, false, false, false, false, false],
    cropsRevealed: [true, false, false, false, false, false, false, false, false],
    cropIDInPlot: [crops[0], crops[0], crops[0], crops[0], crops[0], crops[0], crops[0], crops[0]],
    plotHarvestTime: [-10, -10, -10, -10, -10, -10, -10, -10],
    harvestable: [false, false, false, false, false, false, false, false],
}
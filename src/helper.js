"use strict";

function format(amount) {
    let power = Math.floor(Math.log10(Math.floor(amount)));
    let mantissa = amount/Math.pow(10, power);
    if (power < 6) return amount;
    else return mantissa.toFixed(2) + "e" + power;
}

function formatWithCommas(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatHarvestTime(totalSeconds) {
    let harvestTime = "";
    const seconds = totalSeconds / 1000 % 60;
    const minutes = (totalSeconds / (1000 * 60)) % 60;
    const hours = (totalSeconds / (1000 * 60 * 60)) % 24;
    const days = totalSeconds / (1000 * 60 * 60 * 24);

    if (totalSeconds < 10000) harvestTime += `${formatWithCommas(seconds.toFixed(1))}s`;
    else if (totalSeconds < 60000) harvestTime += `${Math.floor(seconds)}s`;
    else if (totalSeconds < 3600000) harvestTime += `${Math.floor(minutes)}m ${Math.floor(seconds)}s`;
    else if (totalSeconds < 86400000) harvestTime += `${Math.floor(hours)}h ${Math.floor(minutes)}m ${Math.floor(seconds)}s`;
    else if (totalSeconds >= 86400000) harvestTime += `${Math.floor(days)}d ${Math.floor(hours)}h ${Math.floor(minutes)}m ${Math.floor(seconds)}s`;

    return harvestTime;
}

const plotGold = (plotIndex) => cropGold(data.plots[plotIndex]);
const plotXP = (plotIndex) => cropXP(data.plots[plotIndex]);
const cropGold = (cropID) =>  Math.ceil(crops[cropID].gold * goldBoost());
const cropXP = (cropID) => Math.ceil(crops[cropID].xp * xpBoost()); 

const xpReq = (growthRate = 1.3) => Math.round(baseXPReq * Math.pow(growthRate, data.level - 1));

const nextPlotLevelRequirement = () => data.numPlotsRevealed * 2;
const nextCropLevelRequirement = () => data.numCropsRevealed * 2 + 1;

const goldBoost = () => upgrade[0].boost * data.upgradeLevel[0] + 1;
const xpBoost = () => upgrade[1].boost * data.upgradeLevel[1] + 1;
const harvestTimeBoost = () => Math.pow(1 - upgrade[2].boost, data.upgradeLevel[2]);
const discountBoost = () => Math.pow(1 - upgrade[3].boost, data.upgradeLevel[3]);

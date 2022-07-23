"use strict";

const levelTextElement = document.getElementById("level-text");
const xpTextElement = document.getElementById("xp-text");
const xpReqTextElement = document.getElementById("xp-req-text");
const goldTextElement = document.getElementById("gold-text");

function updateLevelAndGoldInfo() {
    levelTextElement.innerHTML = data.level;
    xpTextElement.innerHTML = format(Math.floor(data.xp));
    xpReqTextElement.innerHTML = format(Math.round(xpReq));
    goldTextElement.innerHTML = format(Math.floor(data.gold));
    upgradeHeaderCostColor();
}

function upgradeHeaderCostColor() {
    if (data.gold < crops[data.selectedCrop].cost) {
        headerCostTextElement.style.color = 'Red';
    } else {
        headerCostTextElement.style.color = '#FAEDC6';
    }
}

function calculateAFKGains() {
    if (data.firstTime) {
        data.firstTime = false;
        return;
    }

    if (!data.AFKGains) return;

    const now = Date.now();
    let delta = now - data.time;

    for (let i = 0; i < data.numPlotsRevealed; i++) {
        if (data.plotHarvestTime[i] === -10) continue;

        if (data.plotHarvestTime[i] <= 0 || data.plotHarvestTime[i] - delta <= 0) {
            data.plotHarvestTime[i] = 0;
            updatePlotInfo();
        } else {
            data.plotHarvestTime[i] -= delta;
            updatePlotInfo();
        }
    }

    const seconds = Math.floor((delta / 1000) % 60);
    const minutes = Math.floor((delta / (1000 * 60)) % 60);
    const hours = Math.floor((delta / (1000 * 60 * 60)) % 24);
    const days = Math.floor(delta / (1000 * 60 * 60 * 24));

    console.log(`You were gone for ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`); 
}

let lastUpdate = Date.now();

function mainLoop() {
    const now = Date.now();
    const deltaTime = (now - lastUpdate);
    lastUpdate = now;
    updatePlantCropButtonColor();
    updateHarvestCropButtonColor();
    updateEmptyPlotButtonColor();
    updatePlantAllButtonColor();
    updateHarvestAllButtonColor();
    updateEmptyAllButtonColor();
    calculateHarvestTime(deltaTime);
}

function autoSaveData() {
    data.time = Date.now();
    window.localStorage.setItem(saveName, JSON.stringify(data));
}

function load() {
    loadSavedData();
    updateBoostsInfo();
    calculateXpReq();
    updateLevelAndGoldInfo();
    updateHeaderCropSelectedInfo();
    updateSelectedCropColor();
    updateUnlockNextPlotInfo();
    updateUnlockNextCropInfo();
    updateCropInfo();
    revealPlots();
    revealCrops();
    updateUnlockNextPlotColor();
    updateUnlockNextCropColor();
    calculateNextCropLevelRequirement();
    calculateNextPlotLevelRequirement();
    selectCrop(data.selectedCrop);
    updateAFKGainsButtonInfo();
    updateUpgradesButtonColor();
    updateUpgradeInfo();
}

window.onload = function() {
    load();
    calculateAFKGains();
}

window.onbeforeunload = function() { 
    autoSaveData();
}

setInterval(mainLoop, 50);
setInterval(autoSaveData, 15000); // saves every 15s
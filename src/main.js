const levelTextElement = document.getElementById("level-text");
const xpTextElement = document.getElementById("xp-text");
const xpReqTextElement = document.getElementById("xp-req-text");
const goldTextElement = document.getElementById("gold-text");

function updateLevelAndGoldInfo() {
    levelTextElement.innerHTML = formatWithCommas(data.level, 0);
    xpTextElement.innerHTML = format(data.xp, 0);
    xpReqTextElement.innerHTML = format(data.xpReq, 0);
    goldTextElement.innerHTML = format(data.gold, 0);
}

function calculateAFKGains() {
    if (data.firstTime) {
        data.firstTime = false;
        return;
    }

    if (!data.AFKGains) return;

    const now = Date.now();
    let delta = (now - data.time) / 1000;

    for (let i = 0; i < data.plotsRevealed.length; i++) {
        if (data.plotsRevealed[i] === false || data.plotHarvestTime[i] === -10) break;

        if (data.plotHarvestTime[i] <= 0 || data.plotHarvestTime[i] - deltaTime <= 0) {
            data.plotHarvestTime[i] = 0;
            data.harvestable[i] = true;
            updatePlotInfo();
        } else {
            data.plotHarvestTime[i] -= deltaTime;
            updatePlotInfo();
        }
    }

    let days =  Math.floor(delta / 86400);
    delta -= days * 86400;
    let hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    let minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    let seconds = delta % 60;

    alert("Welcome back! \nYou were gone for " 
    + formatWithCommas(days, 0) + " days, " + formatWithCommas(hours, 0) + " hours, " + formatWithCommas(minutes, 0) + " minutes, and " + formatWithCommas(seconds, 0) + " seconds."); 
}

let lastUpdate = Date.now();

function mainLoop() {
    const now = Date.now();
    const deltaTime = (now - lastUpdate);
    lastUpdate = now;
    updatePlantCropButtonColor();
    updateHarvestCropButtonColor();
    updateEmptyPlotButtonColor();
    calculateHarvestTime(deltaTime);
}

function autoSaveData() {
    data.time = Date.now();
    window.localStorage.setItem(saveName, JSON.stringify(data));
}

function load() {
    loadSavedData();
    updateLevelAndGoldInfo();
    updateHeaderCropSelectedInfo();
    updateSelectedCropColor();
    updateUnlockNextPlotInfo();
    updateUnlockNextCropInfo();
    loadCropInfo();
    revealPlots();
    revealCrops();
    updateUnlockNextPlotColor();
    updateUnlockNextCropColor();
    selectCrop(data.selectedCrop);
    updateAFKGainsButtonInfo();
}

window.onload = function() {
    load();
    calculateAFKGains();
}

setInterval(mainLoop, 50);
setInterval(autoSaveData, 15000); // saves every 15s
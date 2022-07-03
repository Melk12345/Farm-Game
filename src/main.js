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

function load() {
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
    selectCrop(data.selectedCrop)
}

window.onload = function() {
    load();
}
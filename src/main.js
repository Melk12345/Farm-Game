const levelTextElement = document.getElementById("level-text");
const xpTextElement = document.getElementById("xp-text");
const xpReqTextElement = document.getElementById("xp-req-text");
const goldTextElement = document.getElementById("gold-text");

const headerCropSelectedTextElement = document.getElementById("header-cropSelected-text");
const headerGoldTextElement = document.getElementById("header-gold-text");
const headerXpTextElement = document.getElementById("header-xp-text");
const headerCostTextElement = document.getElementById("header-cost-text");
const headerHarvestTimeTextElement = document.getElementById("header-harvestTime-text");

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
    updateHeaderCropInfo();
    revealPlots();
    revealCrops();
    updateUnlockNextPlotColor();
    updateUnlockNextCropColor();
    selectCrop(data.selectedCrop)
}

window.onload = function() {
    load();
}
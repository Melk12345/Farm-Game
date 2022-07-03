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

function updateCropSelectedInfo() {
    let harvestTime = " ";
    let totalSeconds = crops[data.selectedCrop].harvestTime;

    let days = totalSeconds / (24 * 60 * 60 * 1000);
    let hours = (days % 1) * 24;
    let minutes = (hours % 1) * 60;
    let seconds = (minutes % 1) * 60;

    if (crops[data.selectedCrop].harvestTime < 60000) harvestTime += `${format(seconds, 0)}s`;
    else if (crops[data.selectedCrop].harvestTime < 3600000) harvestTime += `${format(minutes, 0)}m ${format(seconds, 0)}s`;
    else if (crops[data.selectedCrop].harvestTime < 86400000) harvestTime += `${format(hours, 0)}h ${format(minutes, 0)}m ${format(seconds, 0)}s`;
    else if (crops[data.selectedCrop].harvestTime >= 86400000) harvestTime += `${format(days, 0)}d ${format(hours, 0)}h ${format(minutes, 0)}m ${format(seconds, 0)}s`;

    headerCropSelectedTextElement.innerHTML = crops[data.selectedCrop].name;
    headerGoldTextElement.innerHTML = `+${crops[data.selectedCrop].gold}`;
    headerXpTextElement.innerHTML = `+${crops[data.selectedCrop].xp}`;
    headerCostTextElement.innerHTML = `${crops[data.selectedCrop].cost} gold`;
    headerHarvestTimeTextElement.innerHTML = harvestTime;
}

const nextPlotLevelRequirementTextElement = document.getElementById("next-plot-level-requirement-text");

function updateFooterInfo() {
    nextPlotLevelRequirementTextElement.innerHTML = data.nextPlotLevelRequirement;
}

function load() {
    updateLevelAndGoldInfo();
    updateCropSelectedInfo();
    updateFooterInfo();
    updateCropInfo();
}

window.onload = function() {
    load();
}
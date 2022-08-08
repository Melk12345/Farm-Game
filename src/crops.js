"use strict";

const nextCropLevelRequirementTextElement = document.getElementById("next-crop-level-requirement-text");
const unlockNextCropButtonElement = document.getElementById("unlock-crops-button");

// if we unlocked all of the available crops, hide the unlock button
function updateUnlockNextCropInfo() {
    if (data.numCropsRevealed === numCropsMax) {
        unlockNextCropButtonElement.style.display = "none";
        return;
    }

    nextCropLevelRequirementTextElement.innerHTML = nextCropLevelRequirement();
}

function selectCrop(cropIndex) {
    data.selectedCrop = cropIndex;
    headerCostTextElement.style.color = data.gold < crops[data.selectedCrop].cost ? 'Red' : 'White';
    updateHeaderCropSelectedInfo();
    updateSelectedCropColor();
}

function updateSelectedCropColor() {
    for (let i = 0; i < crops.length; i++) {
        document.getElementById("crop" + i + "-button").style.borderColor = 'White';
    }
    document.getElementById("crop" + data.selectedCrop + "-button").style.borderColor = 'Orange';
}

const headerCropSelectedTextElement = document.getElementById("header-cropSelected-text");
const headerGoldTextElement = document.getElementById("header-gold-text");
const headerXpTextElement = document.getElementById("header-xp-text");
const headerCostTextElement = document.getElementById("header-cost-text");
const headerHarvestTimeTextElement = document.getElementById("header-harvestTime-text");

function updateHeaderCropSelectedInfo() {
    let totalSeconds = crops[data.selectedCrop].harvestTime  * harvestTimeBoost();
    let harvestTime = formatHarvestTime(totalSeconds);

    headerCropSelectedTextElement.innerHTML = `Crop Selected: ${crops[data.selectedCrop].name}`;
    headerGoldTextElement.innerHTML = `+${cropGold(data.selectedCrop)} gold`;
    headerXpTextElement.innerHTML = `+${cropXP(data.selectedCrop)} XP`;
    headerCostTextElement.innerHTML = `Cost: ${crops[data.selectedCrop].cost} gold`;
    headerHarvestTimeTextElement.innerHTML = ` Harvest Time: ${harvestTime}`;
}

function revealCrops() {
    for (let i = 0; i < numCropsMax; i++) {
        let element = document.getElementById("crop" + i + "-button");
        if (i < data.numCropsRevealed) {
            element.classList.remove("hidden");
        } else {
            element.classList.add("hidden");
        }
    }
    updateCropInfo();
}

function unlockNextCrop() {
    if (data.level >= nextCropLevelRequirement() && data.numCropsRevealed !== numCropsMax) {
        data.numCropsRevealed++;
        revealCrops();
        updateUnlockNextCropInfo();
        updateCropInfo();
        updateUnlockNextCropColor();
    }
}

const unlockCropsButtonElement = document.getElementById("unlock-crops-button");

function updateUnlockNextCropColor() {
    if (data.level >= nextCropLevelRequirement() && data.numCropsRevealed < numCropsMax) {
        unlockCropsButtonElement.classList.add("enabled");
        unlockCropsButtonElement.classList.remove("disabled");
        cropsMenuButtonElement.style.backgroundColor = unlockCropsButtonElement.style.display === 'none'  ? 'Black' : 'Green';
    } else {
        unlockCropsButtonElement.classList.add("disabled");
        unlockCropsButtonElement.classList.remove("enabled");
        cropsMenuButtonElement.style.backgroundColor = 'Black';
    }
}

function updateCropInfo() {
    for (let i = 0; i < data.numCropsRevealed; i++) {
        let totalSeconds = crops[i].harvestTime * harvestTimeBoost();
        let harvestTime = formatHarvestTime(totalSeconds);

        document.getElementById("crop" + i + "-name").innerHTML = crops[i].name;
        document.getElementById("crop" + i + "-gold").innerHTML = `+${formatWithCommas(cropGold(i))}`;
        document.getElementById("crop" + i + "-xp").innerHTML = `+${formatWithCommas(cropXP(i))}`;
        document.getElementById("crop" + i + "-cost").innerHTML = `${crops[i].cost} gold`
        document.getElementById("crop" + i + "-harvestTime").innerHTML = harvestTime;
    }
}
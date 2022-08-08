"use strict";

const nextPlotLevelRequirementTextElement = document.getElementById("next-plot-level-requirement-text");
const unlockNextPlotButtonElement = document.getElementById("unlock-plots-button");

// if we unlocked every single plot, we hide the button
function updateUnlockNextPlotInfo() {
    if (data.numPlotsRevealed === numPlotsMax) {
        unlockNextPlotButtonElement.style.display = "none";
        return;
    }
    
    nextPlotLevelRequirementTextElement.innerHTML = nextPlotLevelRequirement();
}

function revealPlots() {
    for (let i = 0; i < numPlotsMax; i++) {
        let element = document.getElementById("plot" + i + "-row");
        element.style.display = i < data.numPlotsRevealed ? "table-row" : "none";
    }
    updatePlotInfo();
}

// count the number of plots already revealed and if its less than the max number of plots, reveal the next plot
function unlockNextPlot() {
    if (data.level >= nextPlotLevelRequirement() && data.numPlotsRevealed < numPlotsMax) {
        data.numPlotsRevealed++;
        revealPlots();
        updateUnlockNextPlotInfo();
        updateUnlockNextPlotColor();
    }
}

const unlockPlotsButtonElement = document.getElementById("unlock-plots-button");

function updateUnlockNextPlotColor() {
    if (data.level >= nextPlotLevelRequirement() && data.numPlotsRevealed < numPlotsMax) {
        unlockPlotsButtonElement.classList.add("enabled");
        unlockPlotsButtonElement.classList.remove("disabled");
        farmMenuButtonElement.style.backgroundColor = unlockPlotsButtonElement.style.display === 'none'  ? 'Black' : 'Green';
    } else {
        unlockPlotsButtonElement.classList.add("disabled");
        unlockPlotsButtonElement.classList.remove("enabled");
        farmMenuButtonElement.style.backgroundColor = 'Black';
    }
}

function updatePlotInfo() {
    for (let i = 0; i < data.numPlotsRevealed; i++) {
        if (data.plotHarvestTime[i] < 0) {
            document.getElementById("plot" + i + "-name").innerHTML = "--";
            document.getElementById("plot" + i + "-gold").innerHTML = "+--";
            document.getElementById("plot" + i + "-xp").innerHTML = "+--";
            document.getElementById("plot" + i + "-cost").innerHTML = "-- gold"
            document.getElementById("plot" + i + "-harvestTime").innerHTML = "--";
        } else {
            let totalSeconds = data.plotHarvestTime[i];
            let harvestTime = formatHarvestTime(totalSeconds);

            document.getElementById("plot" + i + "-name").innerHTML = crops[data.cropIDInPlot[i]].name;
            document.getElementById("plot" + i + "-gold").innerHTML = `+${formatWithCommas(plotGold(i))}`;
            document.getElementById("plot" + i + "-xp").innerHTML = `+${formatWithCommas(plotXP(i))}`;
            document.getElementById("plot" + i + "-cost").innerHTML = `${crops[data.cropIDInPlot[i]].cost} gold`;
            if (harvestTime !== "0.0s") document.getElementById("plot" + i + "-harvestTime").innerHTML = harvestTime;
            else document.getElementById("plot" + i + "-harvestTime").innerHTML = "Ready!";
        }
    }
}

function updatePlantCropButtonColor() {
    for (let i = 0; i < data.numPlotsRevealed; i++) {
        let element = document.getElementById("plant" + i + "-button");

        if (data.plotHarvestTime[i] >= 0 || data.gold < crops[data.selectedCrop].cost) {
            element.classList.add("disabled");
            element.classList.remove("enabled");
        } else {
            element.classList.add("enabled");
            element.classList.remove("disabled");
        }
    }
}

function updateHarvestCropButtonColor() {
    for (let i = 0; i < data.numPlotsRevealed; i++) {
        let element = document.getElementById("harvest" + i + "-button");

        if (data.plotHarvestTime[i] === -10 || data.plotHarvestTime[i] > 0) {
            element.classList.add("disabled");
            element.classList.remove("enabled");
        } else {
            element.classList.add("enabled");
            element.classList.remove("disabled");
        }
    }
}

function updateEmptyPlotButtonColor() {
    for (let i = 0; i < data.numPlotsRevealed; i++) {

        let element = document.getElementById("empty" + i + "-button");

        if (data.plotHarvestTime[i] <= 0) {
            element.classList.add("disabled");
            element.classList.remove("enabled");
        } else {
            element.classList.add("enabled");
            element.classList.remove("disabled");
        }
    }
}

function plantCrop(plotIndex) {
    data.gold -= crops[data.selectedCrop].cost;
    updateLevelAndGoldInfo();
    updateUpgradesButtonColor();
    data.cropIDInPlot[plotIndex] = data.selectedCrop;
    data.plotHarvestTime[plotIndex] = crops[data.cropIDInPlot[plotIndex]].harvestTime * harvestTimeBoost();
}

function harvestCrop(plotIndex) {
    data.gold += plotGold(plotIndex);
    data.xp += plotXP(plotIndex);
    if (data.xp >= xpReq()) {
        data.xp -= xpReq();
        data.level++;
        updateUnlockNextPlotColor();
        updateUnlockNextCropColor();
    }
    data.cropIDInPlot[plotIndex] = 0;
    data.plotHarvestTime[plotIndex] = -10;
    updateLevelAndGoldInfo();
    updatePlotInfo();
    updateUpgradesButtonColor();
}

function emptyPlot(plotIndex) {
    document.getElementById("plot" + plotIndex + "-name").innerHTML = "--";
    document.getElementById("plot" + plotIndex + "-gold").innerHTML = "+--";
    document.getElementById("plot" + plotIndex + "-xp").innerHTML = "+--";
    document.getElementById("plot" + plotIndex + "-cost").innerHTML = "-- gold"
    document.getElementById("plot" + plotIndex + "-harvestTime").innerHTML = "--";
    data.plotHarvestTime[plotIndex] = -10;
}

function calculateHarvestTime(deltaTime) {
    for (let i = 0; i < data.numPlotsRevealed; i++) {
        if (data.plotHarvestTime[i] === -10) continue;

        if (data.plotHarvestTime[i] <= 0 || data.plotHarvestTime[i] - deltaTime <= 0) {
            data.plotHarvestTime[i] = 0;
        } else {
            data.plotHarvestTime[i] -= deltaTime;
        }
    }
    updatePlotInfo();
    updatePlantCropButtonColor();
    updatePlantAllButtonColor();
    updateHarvestCropButtonColor();
    updateHarvestAllButtonColor();
    updateEmptyPlotButtonColor();
    updateEmptyAllButtonColor();
}

const plantAllButtonElement = document.getElementById("plant-all-button");

// if at least 1 plot is empty and we have enough gold to plant at least 1 crop, enable the button
function updatePlantAllButtonColor() {
    let count = 0; 
    for (let i = 0; i < data.numPlotsRevealed; i++) {

        if (data.plotHarvestTime[i] < 0 && data.gold >= crops[data.selectedCrop].cost) {
            count++;
        }
    }
    if (count === 0) {
        plantAllButtonElement.classList.add("disabled");
        plantAllButtonElement.classList.remove("enabled");
    } else {
        plantAllButtonElement.classList.add("enabled");
        plantAllButtonElement.classList.remove("disabled");
    }
}

const harvestAllButtonElement = document.getElementById("harvest-all-button");

// if we have at least 1 plot ready, enable the button
function updateHarvestAllButtonColor() {
    let count = 0; 
    for (let i = 0; i < data.numPlotsRevealed; i++) {
        if (data.plotHarvestTime[i] === 0) count++;

        if (count < 1) {
            harvestAllButtonElement.classList.add("disabled");
            harvestAllButtonElement.classList.remove("enabled");
        } else {
            harvestAllButtonElement.classList.add("enabled");
            harvestAllButtonElement.classList.remove("disabled");
        }
    }
}

const emptyAllButtonElement = document.getElementById("empty-all-button");

// if at least 1 crop is still growing, enable the button
// if at least 1 crop is done growing, disable the button
function updateEmptyAllButtonColor() {
    let count = 0; 
    for (let i = 0; i < data.numPlotsRevealed; i++) {
        if (data.plotHarvestTime[i] >= 0) count++;

        if (count < 1 || data.plotHarvestTime[i] === 0) {
            emptyAllButtonElement.classList.add("disabled");
            emptyAllButtonElement.classList.remove("enabled");
        } else {
            emptyAllButtonElement.classList.add("enabled");
            emptyAllButtonElement.classList.remove("disabled");
        }
    }
}

// loop through all revealed plots and if the plot is empty and we have enough gold, we can plant in this plot
function plantAll() {
    for (let i = 0; i < data.numPlotsRevealed; i++) {
        if (data.plotHarvestTime[i] < 0 && data.gold >= crops[data.selectedCrop].cost) {
            plantCrop(i);
        }       
    }
}

// loop through all revealed plots and if the plot is done growing, we can harvest the crop
function harvestAll() {
    for (let i = 0; i < data.numPlotsRevealed; i++) {
        if (data.plotHarvestTime[i] === 0) {
            harvestCrop(i);
        }
    }
}

// loop through all revealed plots and if the crop is still growing, we can empty the plot
function emptyAll() {
    for (let i = 0; i < data.numPlotsRevealed; i++) {
        if (data.plotHarvestTime[i] > 0) {
            emptyPlot(i);
        }
    }
}
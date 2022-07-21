"use strict";

const nextPlotLevelRequirementTextElement = document.getElementById("next-plot-level-requirement-text");
const unlockNextPlotButtonElement = document.getElementById("unlock-plots-button");

// if we unlocked every single plot, we hide the button
function updateUnlockNextPlotInfo() {
    let count = 0;
    for (let i = 0; i < data.plotsRevealed.length; i++) {
        if (data.plotsRevealed[i]) {
            count++;
        } else {
            break;
        }
    }
    if (count === data.plotsRevealed.length - 1) {
        unlockNextPlotButtonElement.style.display = "none";
        return;
    }
    
    nextPlotLevelRequirementTextElement.innerHTML = data.nextPlotLevelRequirement;
}

function revealPlots() {
    for (let i = 0; i < data.plotsRevealed.length - 1; i++) {
        if (data.plotsRevealed[i]) {
            document.getElementById("plot" + i + "-row").style.display = "table-row";
        } else {
            document.getElementById("plot" + i + "-row").style.display = "none";
        }
    }
    updatePlotInfo();
}

// count the number of plots already revealed and if its less than the max number of plots, reveal the next plot
function unlockNextPlot() {
    let count = 0;
    for (let i = 0; i < data.plotsRevealed.length; i++) {
        if (data.plotsRevealed[i]) {
            count++;
        } else {
            break;
        }
    }
    if (data.level >= data.nextPlotLevelRequirement && count < data.plotsRevealed.length - 1) {
        for (let i = 0; i < data.plotsRevealed.length; i++) {
            if (data.plotsRevealed[i] === false) {
                data.plotsRevealed[i] = true;
                break;
            }
        }
        data.nextPlotLevelRequirement += 2;
        revealPlots();
        updateUnlockNextPlotInfo();
        updateUnlockNextPlotColor();
        console.log("h2i");
    }
    console.log("h2i");
}

const unlockPlotsButtonElement = document.getElementById("unlock-plots-button");

// change
function updateUnlockNextPlotColor() {
    if (data.level >= data.nextPlotLevelRequirement) {
        unlockPlotsButtonElement.classList.add("disabled");
        unlockPlotsButtonElement.classList.remove("enabled");
        farmMenuButtonElement.style.backgroundColor = unlockPlotsButtonElement.style.display === 'none'  ? 'Silver' : 'Green';
    } else {
        unlockPlotsButtonElement.classList.add("disabled");
        unlockPlotsButtonElement.classList.remove("enabled");
        farmMenuButtonElement.style.backgroundColor = 'Silver';
    }
}

function updatePlotInfo() {
    for (let i = 0; i < data.plotsRevealed.length - 1; i++) {
        if (data.plotsRevealed[i] === false) return;

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

// change
function updatePlantCropButtonColor() {
    for (let i = 0; i < data.plotsRevealed.length; i++) {
        if (data.plotsRevealed[i] === false) return;

        if (data.plotHarvestTime[i] >= 0 || data.gold < crops[data.selectedCrop].cost) {
            document.getElementById("plant" + i + "-button").style.borderColor = '#B33939';
            document.getElementById("plant" + i + "-button").style.cursor = "not-allowed";
            document.getElementById("plant" + i + "-button").disabled = true;
        } else {
            document.getElementById("plant" + i + "-button").style.borderColor = 'Green';
            document.getElementById("plant" + i + "-button").style.cursor = "pointer";
            document.getElementById("plant" + i + "-button").disabled = false;
        }
    }
}

// change
function updateHarvestCropButtonColor() {
    for (let i = 0; i < data.plotsRevealed.length; i++) {
        if (data.plotsRevealed[i] === false) return;

        if (data.plotHarvestTime[i] === -10 || data.plotHarvestTime[i] > 0) {
            document.getElementById("harvest" + i + "-button").style.borderColor = '#B33939';
            document.getElementById("harvest" + i + "-button").style.cursor = "not-allowed";
            document.getElementById("harvest" + i + "-button").disabled = true;
        } else {
            document.getElementById("harvest" + i + "-button").style.borderColor = 'Green';
            document.getElementById("harvest" + i + "-button").style.cursor = "pointer";
            document.getElementById("harvest" + i + "-button").disabled = false;
        }
    }
}

// change
function updateEmptyPlotButtonColor() {
    for (let i = 0; i < data.plotsRevealed.length; i++) {
        if (data.plotsRevealed[i] === false) return;

        if (data.plotHarvestTime[i] <= 0) {
            document.getElementById("empty" + i + "-button").style.borderColor = '#B33939';
            document.getElementById("empty" + i + "-button").style.cursor = "not-allowed";
            document.getElementById("empty" + i + "-button").disabled = true;
        } else {
            document.getElementById("empty" + i + "-button").style.borderColor = 'Green';
            document.getElementById("empty" + i + "-button").style.cursor = "pointer";
            document.getElementById("empty" + i + "-button").disabled = false;
        }
    }
}

function plantCrop(plotIndex) {
    data.gold -= crops[data.selectedCrop].cost;
    updateLevelAndGoldInfo();
    updateUpgradesButtonColor();
    data.cropIDInPlot[plotIndex] = data.selectedCrop;
    data.plotHarvestTime[plotIndex] = crops[data.cropIDInPlot[plotIndex]].harvestTime * harvestTimeBoost;
}

function harvestCrop(plotIndex) {
    data.gold += plotGold(plotIndex);
    data.xp += plotXP(plotIndex);
    if (data.xp >= data.xpReq) {
        data.xp -= data.xpReq;
        data.level++;
        data.xpReq = baseXPReq * Math.pow(1.3, data.level);
        updatePlotInfo();
        updateLevelAndGoldInfo();
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
    data.cropIDInPlot[plotIndex] = 0;
    document.getElementById("plot" + plotIndex + "-name").innerHTML = crops[data.cropIDInPlot[plotIndex]].name;
    document.getElementById("plot" + plotIndex + "-gold").innerHTML = `+${crops[data.cropIDInPlot[plotIndex]].gold}`;
    document.getElementById("plot" + plotIndex + "-xp").innerHTML = `+${crops[data.cropIDInPlot[plotIndex]].xp}`;
    document.getElementById("plot" + plotIndex + "-cost").innerHTML = `${crops[data.cropIDInPlot[plotIndex]].cost} gold`
    document.getElementById("plot" + plotIndex + "-harvestTime").innerHTML = `${crops[data.cropIDInPlot[plotIndex]].harvestTime}`;
    data.plotHarvestTime[plotIndex] = -10;
}

function calculateHarvestTime(deltaTime) {
    for (let i = 0; i < data.plotsRevealed.length; i++) {
        if (data.plotsRevealed[i] === false || data.plotHarvestTime[i] === -10) continue;

        if (data.plotHarvestTime[i] <= 0 || data.plotHarvestTime[i] - deltaTime <= 0) {
            data.plotHarvestTime[i] = 0;
            updatePlotInfo();
        } else {
            data.plotHarvestTime[i] -= deltaTime;
            updatePlotInfo();
        }
    }
}

const plantAllButtonElement = document.getElementById("plant-all-button");

// if at least 1 plot is empty and we have enough gold to plant at least 1 crop, enable the button
// change
function updatePlantAllButtonColor() {
    let count = 0
    for (let i = 0; i < data.plotsRevealed.length; i++) {
        if (data.plotsRevealed[i] === false) break;

        if (data.plotHarvestTime[i] < 0 && data.gold >= crops[data.selectedCrop].cost) {
            count++;
        }
    }
    if (count === 0) {
        plantAllButtonElement.style.borderColor = '#B33939';
        plantAllButtonElement.style.cursor = "not-allowed";
        plantAllButtonElement.disabled = true;
    } else {
        plantAllButtonElement.style.borderColor = 'Green';
        plantAllButtonElement.style.cursor = "pointer";
        plantAllButtonElement.disabled = false;
    }
}

const harvestAllButtonElement = document.getElementById("harvest-all-button");

// if we have at least 1 plot ready, enable the button
// change
function updateHarvestAllButtonColor() {
    let count = 0;
    for (let i = 0; i < data.plotsRevealed.length; i++) {
        if (data.plotsRevealed[i] === false) continue;
        if (data.plotHarvestTime[i] === 0) count++;

        if (count < 1) {
            harvestAllButtonElement.style.borderColor = '#B33939';
            harvestAllButtonElement.style.cursor = "not-allowed";
            harvestAllButtonElement.disabled = true;
        } else {
            harvestAllButtonElement.style.borderColor = 'Green';
            harvestAllButtonElement.style.cursor = "pointer";
            harvestAllButtonElement.disabled = false;
        }
    }
}

const emptyAllButtonElement = document.getElementById("empty-all-button");

// if at least 1 crop is still growing, enable the button
// if at least 1 crop is done growing, disable the button
// change
function updateEmptyAllButtonColor() {
    let count = 0
    for (let i = 0; i < data.plotsRevealed.length; i++) {
        if (data.plotsRevealed[i] === false) break;

        if (data.plotHarvestTime[i] >= 0) count++;

        if (count < 1 || data.plotHarvestTime[i] === 0) {
            emptyAllButtonElement.style.borderColor = '#B33939';
            emptyAllButtonElement.style.cursor = "not-allowed";
            emptyAllButtonElement.disabled = true;
        } else {
            emptyAllButtonElement.style.borderColor = 'Green';
            emptyAllButtonElement.style.cursor = "pointer";
            emptyAllButtonElement.disabled = false;
        }
    }
}

// loop through all revealed plots and if the plot is revealed, empty, and we have enough gold, we may plant in this plot
function plantAll() {
    for (let i = 0; i < data.plotsRevealed.length; i++) {
        if (data.plotsRevealed[i] && data.plotHarvestTime[i] < 0 && data.gold >= crops[data.selectedCrop].cost) {
            plantCrop(i);
        }       
    }
}

// loop through all revealed plots and if the plot is done growing, we may harvest the crop
function harvestAll() {
    for (let i = 0; i < data.plotsRevealed.length; i++) {
        if (data.plotHarvestTime[i] === 0) {
            harvestCrop(i);
        }
    }
}

// loop through all revealed plots and if the crop is still growing, we can empty the plot
function emptyAll() {
    for (let i = 0; i < data.plotsRevealed.length; i++) {
        if (data.plotHarvestTime[i] > 0) {
            emptyPlot(i);
        }
    }
}
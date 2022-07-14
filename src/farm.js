const nextPlotLevelRequirementTextElement = document.getElementById("next-plot-level-requirement-text");
const unlockNextPlotButtonElement = document.getElementById("unlock-plots-button");

// if we unlocked every single plot, we hide the button
function updateUnlockNextPlotInfo() {
    let count = 0;
    for (let i = 0; i < data.plotsRevealed.length; i++) {
        if (data.plotsRevealed[i] === true) {
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
    for (let i = 1; i < data.plotsRevealed.length; i++) {
        if (data.plotsRevealed[i - 1] === true) {
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
        if (data.plotsRevealed[i] === true) {
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
        updateUnlockNextPlotColor();
        updateUnlockNextPlotInfo();
    }
}

const unlockPlotsButtonElement = document.getElementById("unlock-plots-button");

function updateUnlockNextPlotColor() {
    if (data.level < data.nextPlotLevelRequirement) {
        unlockPlotsButtonElement.style.borderColor = '#b33939';
        unlockPlotsButtonElement.style.cursor = "not-allowed";
        unlockPlotsButtonElement.disabled = true;
    } else {
        unlockPlotsButtonElement.style.borderColor = 'Green';
        unlockPlotsButtonElement.style.cursor = "pointer";
        unlockPlotsButtonElement.disabled = false;
    }
}

function updatePlotInfo() {
    for (let i = 1; i < data.plotsRevealed.length; i++) {
        if (data.plotsRevealed[i- 1] === false) return;
        
        if (data.cropIDInPlot[i - 1].harvestTime === "--") {
            document.getElementById("plot" + i + "-name").innerHTML = data.cropIDInPlot[i - 1].name;
            document.getElementById("plot" + i + "-gold").innerHTML = `+${data.cropIDInPlot[i - 1].gold}`;
            document.getElementById("plot" + i + "-xp").innerHTML = `+${data.cropIDInPlot[i - 1].xp}`;
            document.getElementById("plot" + i + "-cost").innerHTML = `${data.cropIDInPlot[i - 1].cost} gold`
            document.getElementById("plot" + i + "-harvestTime").innerHTML = `${data.cropIDInPlot[i - 1].harvestTime}`;
        } else {
            let totalSeconds = data.plotHarvestTime[i - 1];
            let harvestTime = formatHarvestTime(totalSeconds);

            document.getElementById("plot" + i + "-name").innerHTML = data.cropIDInPlot[i - 1].name;
            document.getElementById("plot" + i + "-gold").innerHTML = `+${data.cropIDInPlot[i - 1].gold}`;
            document.getElementById("plot" + i + "-xp").innerHTML = `+${data.cropIDInPlot[i - 1].xp}`;
            document.getElementById("plot" + i + "-cost").innerHTML = `${data.cropIDInPlot[i - 1].cost} gold`;
            if (harvestTime !== "0.0s") document.getElementById("plot" + i + "-harvestTime").innerHTML = harvestTime;
            else document.getElementById("plot" + i + "-harvestTime").innerHTML = "Ready!";
        }
    }
}

function updatePlantCropButtonColor() {
    for (let i = 1; i < data.plotsRevealed.length; i++) {
        if (data.plotsRevealed[i- 1] === false) return;

        if (data.plotHarvestTime[i - 1] >= 0 || data.gold < crops[data.selectedCrop].cost) {
            document.getElementById("plant" + i + "-button").style.borderColor = '#b33939';
            document.getElementById("plant" + i + "-button").style.cursor = "not-allowed";
            document.getElementById("plant" + i + "-button").disabled = true;
        } else {
            document.getElementById("plant" + i + "-button").style.borderColor = 'Green';
            document.getElementById("plant" + i + "-button").style.cursor = "pointer";
            document.getElementById("plant" + i + "-button").disabled = false;
        }
    }
}

function updateHarvestCropButtonColor() {
    for (let i = 1; i < data.plotsRevealed.length; i++) {
        if (data.plotsRevealed[i- 1] === false) return;

        if (data.harvestable[i - 1] === false) {
            document.getElementById("harvest" + i + "-button").style.borderColor = '#b33939';
            document.getElementById("harvest" + i + "-button").style.cursor = "not-allowed";
            document.getElementById("harvest" + i + "-button").disabled = true;
        } else {
            document.getElementById("harvest" + i + "-button").style.borderColor = 'Green';
            document.getElementById("harvest" + i + "-button").style.cursor = "pointer";
            document.getElementById("harvest" + i + "-button").disabled = false;
        }
    }
}

function updateEmptyPlotButtonColor() {
    for (let i = 1; i < data.plotsRevealed.length; i++) {
        if (data.plotsRevealed[i- 1] === false) return;

        if (data.plotHarvestTime[i - 1] <= 0) {
            document.getElementById("empty" + i + "-button").style.borderColor = '#b33939';
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
    data.cropIDInPlot[plotIndex - 1] = crops[data.selectedCrop];
    data.plotHarvestTime[plotIndex - 1] = data.cropIDInPlot[plotIndex - 1].harvestTime;
    let totalSeconds = data.cropIDInPlot[plotIndex - 1].harvestTime;
    let harvestTime = formatHarvestTime(totalSeconds);
    document.getElementById("plot" + plotIndex + "-name").innerHTML = data.cropIDInPlot[plotIndex - 1].name;
    document.getElementById("plot" + plotIndex + "-gold").innerHTML = `+${data.cropIDInPlot[plotIndex - 1].gold}`;
    document.getElementById("plot" + plotIndex + "-xp").innerHTML = `+${data.cropIDInPlot[plotIndex - 1].xp}`;
    document.getElementById("plot" + plotIndex + "-cost").innerHTML = `${data.cropIDInPlot[plotIndex - 1].cost} gold`
    document.getElementById("plot" + plotIndex + "-harvestTime").innerHTML = harvestTime;
}

function harvestCrop(plotIndex) {
    data.gold += data.cropIDInPlot[plotIndex - 1].gold;
    data.xp += data.cropIDInPlot[plotIndex - 1].xp;
    if (data.xp >= data.xpReq) {
        data.xp -= data.xpReq;
        data.level++;
        data.xpReq = baseXPReq * Math.pow(1.15, data.level);
        updatePlotInfo();
        updateLevelAndGoldInfo();
        updateUnlockNextPlotColor();
        updateUnlockNextCropColor();
    }
    data.harvestable[plotIndex - 1] = false;
    data.cropIDInPlot[plotIndex - 1] = crops[0];
    data.plotHarvestTime[plotIndex - 1] = -10;
    updateLevelAndGoldInfo();
    updatePlotInfo();
    updateUpgradesButtonColor();
}

function emptyPlot(plotIndex) {
    data.cropIDInPlot[plotIndex - 1] = crops[0];
    document.getElementById("plot" + plotIndex + "-name").innerHTML = data.cropIDInPlot[plotIndex - 1].name;
    document.getElementById("plot" + plotIndex + "-gold").innerHTML = `+${data.cropIDInPlot[plotIndex - 1].gold}`;
    document.getElementById("plot" + plotIndex + "-xp").innerHTML = `+${data.cropIDInPlot[plotIndex - 1].xp}`;
    document.getElementById("plot" + plotIndex + "-cost").innerHTML = `${data.cropIDInPlot[plotIndex - 1].cost} gold`
    document.getElementById("plot" + plotIndex + "-harvestTime").innerHTML = `${data.cropIDInPlot[plotIndex - 1].harvestTime}`;
    data.harvestable[plotIndex - 1] = false;
    data.plotHarvestTime[plotIndex - 1] = -10;
}

function calculateHarvestTime(deltaTime) {
    for (let i = 0; i < data.plotsRevealed.length; i++) {
        if (data.plotsRevealed[i] === false || data.plotHarvestTime[i] === -10) continue;

        if (data.plotHarvestTime[i] <= 0 || data.plotHarvestTime[i] - deltaTime <= 0) {
            data.plotHarvestTime[i] = 0;
            data.harvestable[i] = true;
            updatePlotInfo();
        } else {
            data.plotHarvestTime[i] -= deltaTime;
            updatePlotInfo();
        }
    }
}

const plantAllButtonElement = document.getElementById("plant-all-button");;

// if at least 1 plot is empty and we have enough gold to plant at least 1 crop, enable the button
function updatePlantAllButtonColor() {
    let count = 0
    for (let i = 1; i < data.plotsRevealed.length; i++) {
        if (data.plotsRevealed[i - 1] === false) break;

        if (data.plotHarvestTime[i - 1] < 0 && data.gold >= crops[data.selectedCrop].cost) {
            count++;
        }
    }
    if (count === 0) {
        plantAllButtonElement.style.borderColor = '#b33939';
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
function updateHarvestAllButtonColor() {
    let count = 0;
    for (let i = 1; i < data.plotsRevealed.length; i++) {
        if (data.plotsRevealed[i- 1] === false) continue;
        if (data.harvestable[i - 1] === true) count++;

        if (count < 1) {
            harvestAllButtonElement.style.borderColor = '#b33939';
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
function updateEmptyAllButtonColor() {
    let count = 0
    for (let i = 1; i < data.plotsRevealed.length; i++) {
        if (data.plotsRevealed[i - 1] === false) break;

        if (data.plotHarvestTime[i - 1] >= 0) count++;

        if (count < 1 || data.plotHarvestTime[i - 1] === 0) {
            emptyAllButtonElement.style.borderColor = '#b33939';
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
    for (let i = 1; i < data.plotsRevealed.length; i++) {
        if (data.plotsRevealed[i - 1] === true && data.plotHarvestTime[i - 1] < 0 && data.gold >= crops[data.selectedCrop].cost) {
            data.gold -= crops[data.selectedCrop].cost;
            updateLevelAndGoldInfo();
            updateUpgradesButtonColor();
            data.cropIDInPlot[i - 1] = crops[data.selectedCrop];
            data.plotHarvestTime[i - 1] = data.cropIDInPlot[i - 1].harvestTime;
            let totalSeconds = data.cropIDInPlot[i - 1].harvestTime;
            let harvestTime = formatHarvestTime(totalSeconds);
            document.getElementById("plot" + i + "-name").innerHTML = data.cropIDInPlot[i - 1].name;
            document.getElementById("plot" + i + "-gold").innerHTML = `+${data.cropIDInPlot[i - 1].gold}`;
            document.getElementById("plot" + i + "-xp").innerHTML = `+${data.cropIDInPlot[i - 1].xp}`;
            document.getElementById("plot" + i + "-cost").innerHTML = `${data.cropIDInPlot[i - 1].cost} gold`
            document.getElementById("plot" + i + "-harvestTime").innerHTML = harvestTime; 
        }       
    }
}

// loop through all revealed plots and if the plot is done growing, we may harvest the crop
function harvestAll() {
    for (let i = 1; i < data.plotsRevealed.length; i++) {
        if (data.harvestable[i - 1] === true) {
            data.gold += data.cropIDInPlot[i - 1].gold;
            data.xp += data.cropIDInPlot[i - 1].xp;
            if (data.xp >= data.xpReq) {
                data.xp -= data.xpReq;
                data.level++;
                data.xpReq = baseXPReq * Math.pow(1.15, data.level);
                updatePlotInfo();
                updateLevelAndGoldInfo();
                updateUnlockNextPlotColor();
                updateUnlockNextCropColor();
            }
            data.harvestable[i - 1] = false;
            data.cropIDInPlot[i - 1] = crops[0];
            data.plotHarvestTime[i - 1] = -10;
            updateLevelAndGoldInfo();
            updatePlotInfo();
            updateUpgradesButtonColor();
        }
    }
}

// loop through all revealed plots and if the crop is still growing, we can empty the plot
function emptyAll() {
    for (let i = 1; i < data.plotsRevealed.length; i++) {
        if (data.plotHarvestTime[i - 1] > 0) {
            data.cropIDInPlot[i - 1] = crops[0];
            document.getElementById("plot" + i + "-name").innerHTML = data.cropIDInPlot[i - 1].name;
            document.getElementById("plot" + i + "-gold").innerHTML = `+${data.cropIDInPlot[i - 1].gold}`;
            document.getElementById("plot" + i + "-xp").innerHTML = `+${data.cropIDInPlot[i - 1].xp}`;
            document.getElementById("plot" + i + "-cost").innerHTML = `${data.cropIDInPlot[i - 1].cost} gold`
            document.getElementById("plot" + i + "-harvestTime").innerHTML = `${data.cropIDInPlot[i - 1].harvestTime}`;
            data.harvestable[i - 1] = false;
            data.plotHarvestTime[i - 1] = -10;
        }
    }
}
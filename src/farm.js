const nextPlotLevelRequirementTextElement = document.getElementById("next-plot-level-requirement-text");

function updateUnlockNextPlotInfo() {
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

const unlockNextPlotButtonElement = document.getElementById("unlock-plots-button");

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
        if (count + 1 === data.plotsRevealed.length - 1) {
            unlockNextPlotButtonElement.style.display = "none";
        }
    }
}

function updateUnlockNextPlotColor() {
    if (data.level < data.nextPlotLevelRequirement) {
        document.getElementById("unlock-plots-button").style.borderColor = '#b33939';
        document.getElementById("unlock-plots-button").style.cursor = "not-allowed";
        document.getElementById("unlock-plots-button").disabled = true;
    } else {
        document.getElementById("unlock-plots-button").style.borderColor = 'Green';
        document.getElementById("unlock-plots-button").style.cursor = "pointer";
        document.getElementById("unlock-plots-button").disabled = false;
    }
}

function updatePlotInfo() {
    for (let i = 1; i < data.plotsRevealed.length; i++) {
        if (data.cropIDInPlot[i - 1].harvestTime === "--") {
            document.getElementById("plot" + i + "-name").innerHTML = data.cropIDInPlot[i - 1].name;
            document.getElementById("plot" + i + "-gold").innerHTML = `+${data.cropIDInPlot[i - 1].gold}`;
            document.getElementById("plot" + i + "-xp").innerHTML = `+${data.cropIDInPlot[i - 1].xp}`;
            document.getElementById("plot" + i + "-cost").innerHTML = `${data.cropIDInPlot[i - 1].cost} gold`
            document.getElementById("plot" + i + "-harvestTime").innerHTML = `${data.cropIDInPlot[i - 1].harvestTime}`;
        } else {
            let totalSeconds = data.cropIDInPlot[i - 1];
            let harvestTime = formatHarvestTime(totalSeconds);

            document.getElementById("plot" + i + "-name").innerHTML = data.cropIDInPlot[i - 1].name;
            document.getElementById("plot" + i + "-gold").innerHTML = `+${data.cropIDInPlot[i - 1].gold}`;
            document.getElementById("plot" + i + "-xp").innerHTML = `+${data.cropIDInPlot[i - 1].xp}`;
            document.getElementById("plot" + i + "-cost").innerHTML = `${data.cropIDInPlot[i - 1].cost} gold`
            document.getElementById("plot" + i + "-harvestTime").innerHTML = harvestTime;
        }
    }
}

function increaseLevel() {
    data.level += 100;
    updateLevelAndGoldInfo();
    updateUnlockNextPlotColor();
    updateUnlockNextCropColor();
}

function increaseGold() {
    data.gold += 1000;
    updateLevelAndGoldInfo();
}

function updatePlantCropButtonColor() {
    for (let i = 1; i < data.plotsRevealed.length; i++) {
        if (data.plotHarvestTime[i - 1] > 0 || data.gold < crops[data.selectedCrop].cost) {
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
        if (data.plotHarvestTime[i - 1] < 0) {
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
    data.cropIDInPlot[plotIndex - 1] = crops[data.selectedCrop];
    data.plotHarvestTime[plotIndex - 1] = data.cropIDInPlot[plotIndex - 1].harvestTime;
    let totalSeconds = data.cropIDInPlot[plotIndex - 1].harvestTime;
    let harvestTime = formatHarvestTime(totalSeconds);
    document.getElementById("plot" + plotIndex + "-name").innerHTML = data.cropIDInPlot[plotIndex - 1].name;
    document.getElementById("plot" + plotIndex + "-gold").innerHTML = `+${data.cropIDInPlot[plotIndex - 1].gold}`;
    document.getElementById("plot" + plotIndex + "-xp").innerHTML = `+${data.cropIDInPlot[plotIndex - 1].xp}`;
    document.getElementById("plot" + plotIndex + "-cost").innerHTML = `${data.cropIDInPlot[plotIndex - 1].cost} gold`
    document.getElementById("plot" + plotIndex + "-harvestTime").innerHTML = harvestTime;
    updatePlotInfo();
    console.log(harvestTime);
}

function harvestCrop(plotIndex, cropIDInPlot) {
    data.gold += cropIDInPlot[plotIndex - 1].gold;
    data.xp += cropIDInPlot[plotIndex - 1].xp;
    if (data.xp >= data.xpReq) {
        data.xp -= data.xpReq;
        data.level++;
        data.xpReq = baseXPReq * Math.pow(1.15, data.level);
        updatePlotInfo();
    }
    data.harvestable[plotIndex - 1] = false;
    updatePlotInfo();
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
    updatePlotInfo();
}

function calculateHarvestTime(deltaTime) {
    for (let i = 0; i < data.plotsRevealed.length; i++) {
        if (data.plotsRevealed[i] === false || data.plotHarvestTime[i] === -10) break;

        if (data.plotHarvestTime[i] <= 0) {
            data.plotHarvestTime[i] = 0;
            updatePlotInfo();
        } else {
            data.plotHarvestTime[i] -= deltaTime;
            updatePlotInfo();
        }
    }
}
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
            let harvestTime = " ";
            let totalSeconds = data.cropIDInPlot[i - 1].harvestTime;

            let days = totalSeconds / (24 * 60 * 60 * 1000);
            let hours = (days % 1) * 24;
            let minutes = (hours % 1) * 60;
            let seconds = (minutes % 1) * 60;

            if (data.cropIDInPlot[i - 1].harvestTime < 60000) harvestTime += `${format(seconds, 0)}s`;
            else if (data.cropIDInPlot[i - 1].harvestTime < 3600000) harvestTime += `${format(minutes, 0)}m ${format(seconds, 0)}s`;
            else if (data.cropIDInPlot[i - 1].harvestTime < 86400000) harvestTime += `${format(hours, 0)}h ${format(minutes, 0)}m ${format(seconds, 0)}s`;
            else if (data.cropIDInPlot[i - 1].harvestTime >= 86400000) harvestTime += `${format(days, 0)}d ${format(hours, 0)}h ${format(minutes, 0)}m ${format(seconds, 0)}s`;

            document.getElementById("plot" + i + "-name").innerHTML = data.cropIDInPlot[i - 1].name;
            document.getElementById("plot" + i + "-gold").innerHTML = `+${data.cropIDInPlot[i - 1].gold}`;
            document.getElementById("plot" + i + "-xp").innerHTML = `+${data.cropIDInPlot[i - 1].xp}`;
            document.getElementById("plot" + i + "-cost").innerHTML = `${data.cropIDInPlot[i - 1].cost} gold`
            document.getElementById("plot" + i + "-harvestTime").innerHTML = harvestTime;
        }
    }
}

/*

*/

function increaseLevel() {
    data.level += 100;
    updateLevelAndGoldInfo();
    updateUnlockNextPlotColor();
    updateUnlockNextCropColor();
}

function plantCrop() {
    
}

function harvestCrop() {
    
}

function emptyPlot() {
    
}
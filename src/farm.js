const nextPlotLevelRequirementTextElement = document.getElementById("next-plot-level-requirement-text");

function updateUnlockNextPlotInfo() {
    nextPlotLevelRequirementTextElement.innerHTML = data.nextPlotLevelRequirement;
}

const nextCropLevelRequirementTextElement = document.getElementById("next-crop-level-requirement-text");

function updateUnlockNextCropInfo() {
    nextCropLevelRequirementTextElement.innerHTML = data.nextCropLevelRequirement;
}
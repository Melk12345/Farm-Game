function updateBoostsInfo() {
    goldBoost = upgrade[0].boost * data.upgradeLevel[0] + 1;
    xpBoost = upgrade[1].boost * data.upgradeLevel[1] + 1;
    harvestTimeBoost = Math.pow(1 - upgrade[2].boost, data.upgradeLevel[2]);
    discountBoost = Math.pow(1 - upgrade[3].boost, data.upgradeLevel[3]);

    console.log(`gold boost: ${goldBoost}`);
    console.log(`xp boost: ${xpBoost}`);
    console.log(`discount boost: ${discountBoost}`);
    console.log(`harvest time boost: ${harvestTimeBoost}`);
}

function upgradeCost(upgradeIndex) {
    let growthRate = 1.3;
    return Math.ceil(upgrade[upgradeIndex].cost * Math.pow(growthRate, data.upgradeLevel[upgradeIndex]) * discountBoost);
}

function updateUpgradeInfo() {
    for (let i = 0; i < data.upgradeLevel.length; i++) {
        document.getElementById("upgrade" + i + "-name").innerHTML = upgrade[i].name;
        document.getElementById("upgrade" + i + "-level").innerHTML = data.upgradeLevel[i];
        document.getElementById("upgrade" + i + "-description").innerHTML = upgrade[i].description;
        document.getElementById("upgrade" + i + "-cost").innerHTML = `${(formatWithCommas(upgradeCost(i)))} gold`;
    }
}

function updateUpgradesButtonColor() {
    for (let i = 0; i < data.upgradeLevel.length; i++) {
        if (data.gold < upgradeCost(i)) {
            document.getElementById("upgrade" + i + "-button").style.borderColor = '#b33939';
            document.getElementById("upgrade" + i + "-button").style.cursor = "not-allowed";
            document.getElementById("upgrade" + i + "-button").disabled = true;
        } else {
            document.getElementById("upgrade" + i + "-button").style.borderColor = 'Green';
            document.getElementById("upgrade" + i + "-button").style.cursor = "pointer";
            document.getElementById("upgrade" + i + "-button").disabled = false;
        }
    }
}

function buyUpgrade(upgradeIndex) {
    if (data.gold < upgradeCost(upgradeIndex)) return;

    data.gold -= upgradeCost(upgradeIndex);
    data.upgradeLevel[upgradeIndex]++;
    updateBoostsInfo();
    updateUpgradeInfo();
    updateUpgradesButtonColor();
    updateHeaderCropSelectedInfo();
    updateCropInfo();
}
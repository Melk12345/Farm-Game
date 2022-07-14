function updateBoostsInfo() {
    goldBoost = upgrade[0].boost * data.upgradeLevel[0] + 1;
    xpBoost = upgrade[1].boost * data.upgradeLevel[1] + 1;
    discountBoost = Math.pow(1 - upgrade[2].boost, data.upgradeLevel[2]);
    harvestTimeBoost = Math.pow(1 - upgrade[3].boost, data.upgradeLevel[3]);

    console.log(`gold boost: ${goldBoost}`);
    console.log(`xp boost: ${xpBoost}`);
    console.log(`discount boost: ${discountBoost}`);
    console.log(`harvest time boost: ${harvestTimeBoost}`);
}

function upgradeCost(upgradeIndex) {
    return Math.ceil(upgrade[upgradeIndex].cost * Math.pow(1.15, data.upgradeLevel[upgradeIndex]) * discountBoost);
}

function updateUpgradeInfo() {
    for (let i = 1; i < data.upgradeLevel.length + 1; i++) {
        document.getElementById("upgrade" + i + "-name").innerHTML = upgrade[i - 1].name;
        document.getElementById("upgrade" + i + "-level").innerHTML = data.upgradeLevel[i - 1];
        document.getElementById("upgrade" + i + "-description").innerHTML = upgrade[i - 1].description;
        document.getElementById("upgrade" + i + "-cost").innerHTML = `${(upgradeCost(i - 1))} gold`;
    }
}

function updateUpgradesButtonColor() {
    for (let i = 1; i < data.upgradeLevel.length + 1; i++) {
        if (data.gold < upgradeCost(i - 1)) {
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
    if (data.gold < upgradeCost(upgradeIndex - 1)) return;

    data.gold -= upgradeCost(upgradeIndex - 1);
    data.upgradeLevel[upgradeIndex - 1]++;
    updateBoostsInfo();
    updateUpgradeInfo();
    updateUpgradesButtonColor();
    updateHeaderCropSelectedInfo();

    console.log(upgradeCost(upgradeIndex - 1));
}
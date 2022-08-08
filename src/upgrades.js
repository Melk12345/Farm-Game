"use strict";

function upgradeCost(upgradeIndex) {
    let growthRate = 1.3;
    return Math.ceil(upgrade[upgradeIndex].cost * Math.pow(growthRate, data.upgradeLevel[upgradeIndex]) * discountBoost());
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
        let element = document.getElementById("upgrade" + i + "-button");

        if (data.gold < upgradeCost(i)) {
            console.log(i, document.getElementById("upgrade" + i + "-button"));
            element.classList.add("disabled");
            element.classList.remove("enabled");
        } else {
            element.classList.add("enabled");
            element.classList.remove("disabled");
        }
    }
}

function buyUpgrade(upgradeIndex) {
    if (data.gold < upgradeCost(upgradeIndex)) return;

    data.gold -= upgradeCost(upgradeIndex);
    data.upgradeLevel[upgradeIndex]++;
    updateUpgradeInfo();
    updateUpgradesButtonColor();
    updateHeaderCropSelectedInfo();;
    updateCropInfo();
    updateLevelAndGoldInfo()
}
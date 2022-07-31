"use strict";

const farmMenuContainerElement = document.getElementById("farm-container");
const cropsMenuContainerElement = document.getElementById("crops-container");
const upgradesMenuContainerElement = document.getElementById("upgrades-container");
const settingsMenuContainerElement = document.getElementById("settings-container");

let activeMenu = farmMenuContainerElement;
cropsMenuContainerElement.style.display = "none";
upgradesMenuContainerElement.style.display = "none";
settingsMenuContainerElement.style.display = "none";

const farmMenuButtonElement = document.getElementById("farm-menu-button");
const cropsMenuButtonElement = document.getElementById("crops-menu-button");
const upgradesMenuButtonElement = document.getElementById("upgrades-menu-button");
const settingsMenuButtonElement = document.getElementById("settings-menu-button");

let activeMenuButton = farmMenuButtonElement;
farmMenuButtonElement.style.borderColor = 'Orange';
cropsMenuButtonElement.style.borderColor = 'White';
upgradesMenuButtonElement.style.borderColor = 'White';
settingsMenuButtonElement.style.borderColor = 'White'; 

function openMenu(clickedMenu, clickedMenuButton) {
    activeMenu.style.display = "none";
    activeMenuButton.style.borderColor = 'White';
    activeMenu = clickedMenu;
    activeMenuButton = clickedMenuButton;
    activeMenuButton.style.borderColor = 'Orange';
    activeMenu.style.display = "block";
}
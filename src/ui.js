"use strict";

const farmMenuContainerElement = document.getElementById("farm-container");
const cropsMenuContainerElement = document.getElementById("crops-container");
const upgradesMenuContainerElement = document.getElementById("upgrades-container");
const settingsMenuContainerElement = document.getElementById("settings-container");

let activeMenu = farmMenuContainerElement;
cropsMenuContainerElement.classList.add("hidden");
upgradesMenuContainerElement.classList.add("hidden");
settingsMenuContainerElement.classList.add("hidden");

const farmMenuButtonElement = document.getElementById("farm-menu-button");
const cropsMenuButtonElement = document.getElementById("crops-menu-button");
const upgradesMenuButtonElement = document.getElementById("upgrades-menu-button");
const settingsMenuButtonElement = document.getElementById("settings-menu-button");

const selectedButtonBorderColor = 'Orange';
const defaultButtonBorderColor = 'White';

let activeMenuButton = farmMenuButtonElement;
farmMenuButtonElement.style.borderColor = selectedButtonBorderColor;
cropsMenuButtonElement.style.borderColor = defaultButtonBorderColor;
upgradesMenuButtonElement.style.borderColor = defaultButtonBorderColor;
settingsMenuButtonElement.style.borderColor = defaultButtonBorderColor; 

function openMenu(clickedMenu, clickedMenuButton) {
    activeMenu.classList.add("hidden");
    activeMenuButton.style.borderColor = defaultButtonBorderColor;
    activeMenu = clickedMenu;
    activeMenuButton = clickedMenuButton;
    activeMenuButton.style.borderColor = selectedButtonBorderColor;
    activeMenu.classList.remove("hidden");
}
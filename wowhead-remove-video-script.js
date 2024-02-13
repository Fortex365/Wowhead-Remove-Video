// ==UserScript==
// @name         JoCau
// @namespace    http://tampermonkey.net/
// @version      1.7
// @description  Nečum
// @author       Fortex
// @match        https://www.wowhead.com/*
// @grant        none
// @updateURL    https://github.com/Fortex365/Wowhead-Remove-Video/raw/main/wowhead-remove-video-script.js
// @downloadURL  https://github.com/Fortex365/Wowhead-Remove-Video/raw/main/wowhead-remove-video-script.js
// ==/UserScript==

(function() {
    'use strict';

    // Flag to determine if the button has been successfully clicked
    let buttonClicked = false;

    function clickNestedShadowDomCloseButton() {
        // If the button has been clicked, don't try again
        if (buttonClicked) return;

        // Select the outer shadow host
        const outerShadowHost = document.querySelector('cnx-lit-ui-template');
        if (outerShadowHost && outerShadowHost.shadowRoot) {
            // Traverse the first shadow root
            const innerShadowHost = outerShadowHost.shadowRoot.querySelector('cnx-close-button');
            if (innerShadowHost && innerShadowHost.shadowRoot) {
                // Traverse the second shadow root to find the button
                const closeButton = innerShadowHost.shadowRoot.querySelector('cnx-button.cnx-bp-lg-lit');
                if (closeButton) {
                    // Click the close button if it's found
                    closeButton.click();
                    console.log('Wowhead video close button clicked');
                    buttonClicked = true; // Set the flag to true after clicking the button
                } else {
                    console.log('Nested shadow DOM video close button not found.');
                }
            } else {
                console.log('Inner shadow host (cnx-close-button) not found or has no shadowRoot.');
            }
        } else {
            console.log('Outer shadow host (cnx-lit-ui-template) not found or has no shadowRoot.');
        }
    }

    // Initial quick check before setting the interval
    clickNestedShadowDomCloseButton();

    // Set an interval to check for the button periodically
    const intervalId = setInterval(() => {
        clickNestedShadowDomCloseButton();
        // If the button has been clicked, clear the interval to stop further attempts
        if (buttonClicked) clearInterval(intervalId);
    }, 500); // Check more frequently initially

    console.log('Wowhead Nested Video Close Button Clicker initialized.');
})();

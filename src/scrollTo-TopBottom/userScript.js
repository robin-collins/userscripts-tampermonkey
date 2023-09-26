// ==UserScript==
// @name         Scroll Arrows
// @namespace    http://tampermonkey.net/
// @version      0.9
// @description  Customizable arrows to scroll page
// @author       You
// @match        http://*/*
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
  
    // SVG definitions
    var svgContainer = document.createElement('div');
    svgContainer.innerHTML = `
      <svg style="display: none">
        <symbol id="arrow-up" viewBox="0 0 24 24">
          <path d="M11.7 7.7L10.3 6.3 5.9 10.7 5.1 10 4 8.9l6-6 6 6-1.1 1.1-0.8-0.8-4.4 4.4z"/>
        </symbol>  
        <symbol id="arrow-down" viewBox="0 0 24 24">
          <path d="M12.3 16.3L13.7 17.7 18.1 13.3 19 12l1.1 1.1-6 6-6-6 1.1-1.1 0.8 0.8 4.4-4.4z"/>
        </symbol>
      </svg>
    `;
    document.body.insertBefore(svgContainer, document.body.firstChild);
  
    // Customizable variables
    let arrowSize = 40; // Pixel size of arrows
    let arrowOffset = 50; // Pixels from right edge
    let arrowColor = 'black'; 
    let borderColor;
    if(arrowColor === 'black') {
      borderColor = 'white';
    } else {
      borderColor = 'black';
    }
  
    // Create arrow elements
    let svgns = "http://www.w3.org/2000/svg";
    let arrowUp = document.createElement('div');
    let arrowDown = document.createElement('div');  
  
    // Add SVG and styles
    let svgUp = document.createElementNS(svgns, 'svg');
    let svgDown = document.createElementNS(svgns, 'svg');
    svgUp.classList.add('icon', 'icon-arrow-up');
    svgDown.classList.add('icon', 'icon-arrow-down');
    svgUp.style.fill = arrowColor;
    svgDown.style.fill = arrowColor;
  
    let useUp = document.createElementNS(svgns, 'use');
    let useDown = document.createElementNS(svgns, 'use');
    useUp.setAttributeNS('http://www.w3.org/1999/xlink','href','#arrow-up');
    useDown.setAttributeNS('http://www.w3.org/1999/xlink','href','#arrow-down');
    svgUp.appendChild(useUp);
    svgDown.appendChild(useDown);
  
    arrowUp.style.border = '2px solid';
    arrowDown.style.border = '2px solid';
    arrowUp.style.borderColor = borderColor;
    arrowDown.style.borderColor = borderColor;
  
    // Size and position arrows
    arrowUp.style.width = `${arrowSize}px`;
    arrowUp.style.height = `${arrowSize}px`;
    arrowUp.style.position = 'fixed';
    arrowUp.style.right = `${arrowOffset}px`;
    arrowUp.style.top = '50%';
    arrowUp.style.transform = 'translateY(-50%)';
    arrowUp.style.zIndex = '999999';
  
    arrowDown.style.width = `${arrowSize}px`;
    arrowDown.style.height = `${arrowSize}px`; 
    arrowDown.style.position = 'fixed';
    arrowDown.style.right = `${arrowOffset}px`;
    arrowDown.style.top = '50%';
    arrowDown.style.transform = 'translateY(50%)';
    arrowDown.style.zIndex = '999999';
  
    // Scroll functions
    var scrollToTop = () => {
      window.scrollTo({top: 0, behavior: 'smooth'});
    };
    var scrollToBottom = () => {
      window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
    };
  
    // Add arrows and events
    document.body.appendChild(arrowUp);
    document.body.appendChild(arrowDown);
    arrowUp.appendChild(svgUp);
    arrowDown.appendChild(svgDown);
    arrowUp.addEventListener('click', scrollToTop);
    arrowDown.addEventListener('click', scrollToBottom);
  
    // Toggle button
    let toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Toggle Color';
    toggleBtn.style.position = 'fixed';
    toggleBtn.style.right = `${arrowOffset}px`;
    toggleBtn.style.top = '50%';
    toggleBtn.style.transform = 'translate(-50%, -50%)';
    toggleBtn.style.zIndex = '99999';
  
    const toggleColor = () => {
      if(arrowColor === 'black') {
        arrowColor = 'white';
        borderColor = 'black';
      } else {
        arrowColor = 'black';
        borderColor = 'white';  
      }
      
      svgUp.style.fill = arrowColor; 
      svgDown.style.fill = arrowColor;
      
      arrowUp.style.borderColor = borderColor;
      arrowDown.style.borderColor = borderColor;
    };
  
    toggleBtn.addEventListener('click', toggleColor);
    document.body.appendChild(toggleBtn);
  
  })();
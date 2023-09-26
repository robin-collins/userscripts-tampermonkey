// ==UserScript==
// @name         Scroll To Top & Bottom
// @namespace    http://tampermonkey.net/
// @version      0.8
// @description  Adds up and down arrows with toggle colors
// @author       TheBloke-vicuna-v1.5-16k-13b-q5_k_s.gguf and gpt4
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
  
    // Add SVG definitions
    var svgContainer = document.createElement('div');
    svgContainer.innerHTML = `
      <svg aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <defs>
              <symbol id="icon-arrow-circle-down" viewBox="0 0 24 28">
                  <path d="M20.062 14.016c0-0.266-0.094-0.516-0.281-0.703l-1.422-1.422c-0.187-0.187-0.438-0.281-0.703-0.281s-0.516 0.094-0.703 0.281l-2.953 2.953v-7.844c0-0.547-0.453-1-1-1h-2c-0.547 0-1 0.453-1 1v7.844l-2.953-2.953c-0.187-0.187-0.438-0.297-0.703-0.297s-0.516 0.109-0.703 0.297l-1.422 1.422c-0.187 0.187-0.281 0.438-0.281 0.703s0.094 0.516 0.281 0.703l7.078 7.078c0.187 0.187 0.438 0.281 0.703 0.281s0.516-0.094 0.703-0.281l7.078-7.078c0.187-0.187 0.281-0.438 0.281-0.703zM24 14c0 6.625-5.375 12-12 12s-12-5.375-12-12 5.375-12 12-12 12 5.375 12 12z"></path>
              </symbol>
              <symbol id="icon-arrow-circle-up" viewBox="0 0 24 28">
                  <path d="M20.062 13.984c0-0.266-0.094-0.516-0.281-0.703l-7.078-7.078c-0.187-0.187-0.438-0.281-0.703-0.281s-0.516 0.094-0.703 0.281l-7.078 7.078c-0.187 0.187-0.281 0.438-0.281 0.703s0.094 0.516 0.281 0.703l1.422 1.422c0.187 0.187 0.438 0.281 0.703 0.281s0.516-0.094 0.703-0.281l2.953-2.953v7.844c0 0.547 0.453 1 1 1h2c0.547 0 1-0.453 1-1v-7.844l2.953 2.953c0.187 0.187 0.438 0.297 0.703 0.297s0.516-0.109 0.703-0.297l1.422-1.422c0.187-0.187 0.281-0.438 0.281-0.703zM24 14c0 6.625-5.375 12-12 12s-12-5.375-12-12 5.375-12 12-12 12 5.375 12 12z"></path>
              </symbol>
          </defs>
      </svg>`;
    document.body.insertBefore(svgContainer, document.body.childNodes[0]);
  
    // Colors
    let arrowColor = 'black';
    let borderColor;
    if(arrowColor === 'black') {
      borderColor = 'white';
    } else {
      borderColor = 'black';
    }
  
    // Create elements
    let svgns = "http://www.w3.org/2000/svg";
    let svgElemUp = document.createElementNS(svgns, 'svg');
    let svgElemDown = document.createElementNS(svgns, 'svg');
    let arrowUp = document.createElement('div');
    let arrowDown = document.createElement('div');
  
    // Style arrows
    arrowUp.style.border = '2px solid';
    arrowDown.style.border = '2px solid';
    arrowUp.style.borderColor = borderColor;
    arrowDown.style.borderColor = borderColor;
  
    // Add SVG and styles
    svgElemUp.setAttribute('class', 'icon icon-arrow-circle-up');
    svgElemDown.setAttribute('class', 'icon icon-arrow-circle-down');
    svgElemUp.style.fill = arrowColor;
    svgElemDown.style.fill = arrowColor;
  
    // Append SVG to arrows
    let useElemUp = document.createElementNS(svgns, 'use');
    let useElemDown = document.createElementNS(svgns, 'use');
    useElemUp.setAttributeNS('http://www.w3.org/1999/xlink','href','#icon-arrow-circle-up');
    useElemDown.setAttributeNS('http://www.w3.org/1999/xlink','href','#icon-arrow-circle-down');
    svgElemUp.appendChild(useElemUp);
    svgElemDown.appendChild(useElemDown);
    arrowUp.appendChild(svgElemUp);
    arrowDown.appendChild(svgElemDown);
  
    // Position arrows
    arrowUp.style.position = 'fixed';
    arrowUp.style.right = '50px';
    arrowUp.style.top = '50%';
    arrowUp.style.transform = 'translateY(-100%)';
    arrowUp.style.zIndex = '999999';
  
    arrowDown.style.position = 'fixed';  
    arrowDown.style.right = '50px';
    arrowDown.style.top = '50%';
    arrowDown.style.transform = 'translateY(100%)';
    arrowDown.style.zIndex = '999999';
  
    // Scroll functions
    var scrollToTop = function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
  
    var scrollToBottom = function() {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    };
  
    // Add event listeners
    document.body.appendChild(arrowUp);
    document.body.appendChild(arrowDown);
    arrowUp.addEventListener('click', scrollToTop);
    arrowDown.addEventListener('click', scrollToBottom);
  
    // Toggle button
    let flipButton = document.createElement('button');
    flipButton.textContent = 'Flip Colors';
    flipButton.style.position = 'fixed';
    flipButton.style.right = '32px';
    flipButton.style.top = '50%'; 
    flipButton.style.transform = 'translateY(-50%)';
    flipButton.style.zIndex = '99999';
  
    const toggleArrowColor = () => {
      if(arrowColor === 'black') {
        arrowColor = 'white';
        borderColor = 'black';
      } else {
        arrowColor = 'black';
        borderColor = 'white';
      }
      
      svgElemUp.style.fill = arrowColor;
      svgElemDown.style.fill = arrowColor;
      
      arrowUp.style.borderColor = borderColor;
      arrowDown.style.borderColor = borderColor;
    }
  
    flipButton.addEventListener('click', toggleArrowColor);
    document.body.appendChild(flipButton);
  
  })();
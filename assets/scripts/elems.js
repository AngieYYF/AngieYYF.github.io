class NavigationBar extends HTMLElement {
    constructor() {
        super();
        const currentPage = this.getAttribute('current-page');
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = `
            <div class="navbar">
                <a href="index.html" id="home-link">Home</a>
                <a href="academic.html" id="academic-link">Academic Work</a>
                <a href="education.html" id="education-link">Education</a>
            </div>
        `;
        const activeLinkId = `${currentPage}-link`;
        const activeLink = tempContainer.querySelector(`#${activeLinkId}`);
        
        if (activeLink) {
            activeLink.classList.add('active'); 
        }

        this.innerHTML = tempContainer.innerHTML;
    }
}
customElements.define('navigation-bar', NavigationBar);



class TimelineItem extends HTMLElement {
    constructor() {
        super();
        
        // 1. Get data from attributes
        const date = this.getAttribute('data-date');
        const degree = this.getAttribute('data-degree');
        const university = this.getAttribute('data-university');
        const wam = this.getAttribute('data-wam');
        const wamHTML = wam 
            ? `<p>WAM: ${wam}</p>` 
            : '';

        // 2. Capture the inner HTML (the hidden details)
        const slotElement = this.innerHTML; 
        
        // 3. Define the full, structured HTML for the list item
        this.innerHTML = `
            <li class="timeline-item">
                <div class="timeline-dot"></div>
                
                <div class="timeline-header" role="button" aria-expanded="false" tabindex="0"> <div class="timeline-text-wrapper"> 
                        <div class="timeline-date">${date}</div>
                        <div>
                            <h3>${degree}</h3>
                            <p><em>${university}</em></p>
                            ${wamHTML}
                        </div>
                    </div>
                    <span class="collapse-indicator">+</span> </div>
                
                <div class="timeline-details">
                    ${slotElement}
                </div>
            </li>
        `;
        
        // 4. Attach the event listener to the HEADER (the clickable area)
        const header = this.querySelector('.timeline-header'); // TARGET THE HEADER
        const detailsContainer = this.querySelector('.timeline-details');
        const indicator = this.querySelector('.collapse-indicator'); // Get the indicator span

        if (header && detailsContainer) {
            // Function to handle the click/keypress
            const toggleCollapse = () => {
                const isExpanded = detailsContainer.classList.toggle('active');
                
                // Update indicator text and ARIA attribute
                indicator.textContent = isExpanded ? '-' : '+';
                header.setAttribute('aria-expanded', isExpanded); // Update ARIA on the header
            };

            // Attach event listener for mouse clicks
            header.addEventListener('click', toggleCollapse);

            // Attach event listener for keyboard (Enter/Space) for accessibility
            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleCollapse();
                }
            });
        }
    }
}
customElements.define('timeline-item', TimelineItem);



// Function to dynamically calculate and set the required bottom padding
function setDynamicTimelinePadding() {
    const scrollContainers = document.querySelectorAll('.h-timeline-scroll-container');
    
    // Iterate over each container found
    scrollContainers.forEach(scrollContainer => {
        const contentBoxes = scrollContainer.querySelectorAll('.h-timeline-item-content');
        
        let maxHeight = 0;

        // Find the tallest box within THIS specific container
        contentBoxes.forEach(box => {
            if (box.offsetHeight > maxHeight) {
                maxHeight = box.offsetHeight;
            }
        });

        // Calculate and apply padding to THIS specific container
        const boxMarginTop = 15; 
        const buffer = 10;
        const totalPadding = maxHeight + boxMarginTop + buffer;

        scrollContainer.style.paddingBottom = `${totalPadding}px`;
    });
}


// Function to dynamically calculate and set the required horizontal padding
function setDynamicHorizontalPadding() {
    const scrollContainers = document.querySelectorAll('.h-timeline-scroll-container');

    // Iterate over each container found
    scrollContainers.forEach(scrollContainer => {
        const contentBoxes = scrollContainer.querySelectorAll('.h-timeline-item-content');
        const itemBoxes = scrollContainer.querySelectorAll('.h-timeline-item-box');

        let maxWidth = 0;

        // 1. Find the width of the widest subject box within THIS specific container
        contentBoxes.forEach(box => {
            if (box.offsetWidth > maxWidth) {
                maxWidth = box.offsetWidth;
            }
        });

        // 2. Calculate the required horizontal padding
        const bufferMargin = 20; 
        const requiredPadding = Math.ceil(maxWidth / 2) + bufferMargin;

        // 3. Apply the calculated padding to every timeline item box within THIS specific container
        itemBoxes.forEach(itemBox => {
            itemBox.style.paddingLeft = `${requiredPadding}px`;
            itemBox.style.paddingRight = `${requiredPadding}px`;
        });
    });
}


window.addEventListener('load', () => {
    setDynamicTimelinePadding();
    setDynamicHorizontalPadding();
});

window.addEventListener('resize', () => {
    setDynamicTimelinePadding();
    setDynamicHorizontalPadding();
});
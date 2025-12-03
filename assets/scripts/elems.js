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


class FooterBar extends HTMLElement {
    constructor() {
        super();
        
        const githubUrl = "https://github.com/AngieYYF";
        const linkedinUrl = "https://www.linkedin.com/in/angela-yuan-3294b6237/";
        const emailAddress = "angelay789.aa@gmail.com";
        const copyrightYear = new Date().getFullYear();

        this.innerHTML = `
            <footer class="site-footer">
                <div class="footer-content-wrapper"> 
                    
                    <p class="copyright">&copy; ${copyrightYear} Angela Yuan</p>
                    
                    <div class="footer-links">
                        <a href="${githubUrl}" target="_blank" rel="noopener noreferrer">GitHub</a>
                        <span class="separator">|</span>
                        <a href="${linkedinUrl}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <span class="separator">|</span>
                        <a href="mailto:${emailAddress}">Email</a>
                    </div>
                </div>
            </footer>
        `;
    }
}
customElements.define('footer-bar', FooterBar);


class ResearchItem extends HTMLElement {
    constructor() {
        super();
        
        // Get data from attributes
        const title = this.getAttribute('data-title') || 'Project Title Missing';
        const authors = this.getAttribute('data-authors') || 'Author(s) Missing';
        const venue = this.getAttribute('data-venue') || 'Venue Missing';
        const pdfUrl = this.getAttribute('data-pdf-url');
        const codeUrl = this.getAttribute('data-code-url');
        const abstract = this.getAttribute('data-abstract');

        // Build the HTML structure
        let buttonsHtml = '';
        if (pdfUrl) {
            buttonsHtml += `
                <a href="${pdfUrl}" class="btn btn-pdf" target="_blank" rel="noopener noreferrer">
                    <span class="emoji">📄</span> PDF
                </a>
            `;
        }
        if (codeUrl) {
            buttonsHtml += `
                <a href="${codeUrl}" class="btn btn-code" target="_blank" rel="noopener noreferrer">
                    <span class="emoji">💻</span> Code
                </a>
            `;
        }

        this.className = 'research-item';
        this.innerHTML = `
            <div class="item-header">
                <h3 class="item-title">${title}</h3>
                <p class="item-venue">${venue}</p>
            </div>
            
            <p class="item-authors">
                <strong>Authors</strong>: ${authors}
            </p>

            <p class="item-abstract">
                <strong>Abstract</strong>: 
                ${abstract}
            </p>
            
            <div class="item-buttons">
                ${buttonsHtml}
            </div>
        `;
    }
}
customElements.define('research-item', ResearchItem);

class DatasetItem extends HTMLElement {
    constructor() {
        super();
        
        // Get data from attributes
        const name = this.getAttribute('data-name') || 'Dataset Name Missing';
        const source = this.getAttribute('data-source') || 'Source Missing';
        const repoUrl = this.getAttribute('data-repo-url');
        const description = this.getAttribute('data-description');

        // Build the HTML structure
        this.className = 'research-item dataset-item-style';
        
        let buttonsHtml = '';
        if (repoUrl) {
            buttonsHtml += `
                <a href="${repoUrl}" class="btn btn-code" target="_blank" rel="noopener noreferrer">
                    <span class="emoji">🗂️</span> Repository
                </a>
            `;
        }

        this.innerHTML = `
            <div class="item-header">
                <h3 class="item-title">${name}</h3>
                <p class="item-venue">${source}</p>
            </div>
            
            <p class="item-abstract">
                <strong>Description</strong>: 
                ${description || 'Brief description content is missing.'}
            </p>

            <div class="item-buttons">
                ${buttonsHtml}
            </div>
        `;
    }
}
customElements.define('dataset-item', DatasetItem);

class TeachingItem extends HTMLElement {
    constructor() {
        super();
        
        // Get data from attributes
        const subjectCode = this.getAttribute('data-code') || 'CODE';
        const subjectName = this.getAttribute('data-name') || 'Subject Name Missing';
        const subjectLink = this.getAttribute('data-link') || '#';
        const university = this.getAttribute('data-university') || 'University Missing';
        const role = this.getAttribute('data-role') || 'Role Missing';

        // Build the HTML structure
        this.className = 'teaching-item';
        this.innerHTML = `
            <div class="teaching-details">
                <span class="teaching-role">${role}</span>
                <span class="teaching-separator">|</span>
                <span class="teaching-name"><b><em>${subjectName}</em></b></span>
                <a href="${subjectLink}" class="teaching-code" target="_blank" rel="noopener noreferrer">
                    (${subjectCode})
                </a>
                <span class="teaching-university">@ ${university}</span>
            </div>
            
            <slot></slot>
        `;
    }
}
customElements.define('teaching-item', TeachingItem);

class AwardItem extends HTMLElement {
    constructor() {
        super();
        
        // Get data from attributes
        const awardName = this.getAttribute('data-name') || 'Award Name Missing';
        const year = this.getAttribute('data-year') || 'Year Missing';
        const source = this.getAttribute('data-source') || 'Source Missing';

        // Build the HTML structure
        this.className = 'award-item';
        this.innerHTML = `
            <div class="award-details">
                <span class="award-name">${awardName}</span>
                <span class="award-separator">|</span>
                <span class="award-year">${year}</span>
                <span class="award-separator">|</span>
                <span class="award-source">${source}</span>
            </div>
            
            <slot></slot>
        `;
    }
}
customElements.define('award-item', AwardItem);


class TimelineItem extends HTMLElement {
    constructor() {
        super();
        
        // Get data from attributes
        const date = this.getAttribute('data-date');
        const degree = this.getAttribute('data-degree');
        const university = this.getAttribute('data-university');
        const wam = this.getAttribute('data-wam');
        const wamHTML = wam 
            ? `<p>WAM: ${wam}</p>` 
            : '';

        // Capture the inner HTML (the hidden details)
        const slotElement = this.innerHTML; 
        
        // Define the full, structured HTML for the list item
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
        
        // Attach the event listener to the HEADER (the clickable area)
        const header = this.querySelector('.timeline-header');
        const detailsContainer = this.querySelector('.timeline-details');
        const indicator = this.querySelector('.collapse-indicator');

        if (header && detailsContainer) {
            // Function to handle the click/keypress
            const toggleCollapse = () => {
                const isExpanded = detailsContainer.classList.toggle('active');
                
                // Update indicator text and ARIA attribute
                indicator.textContent = isExpanded ? '-' : '+';
                header.setAttribute('aria-expanded', isExpanded);
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

        // Find the width of the widest subject box within THIS specific container
        contentBoxes.forEach(box => {
            if (box.offsetWidth > maxWidth) {
                maxWidth = box.offsetWidth;
            }
        });

        // Calculate the required horizontal padding
        const bufferMargin = 20; 
        const requiredPadding = Math.ceil(maxWidth / 2) + bufferMargin;

        // Apply the calculated padding to every timeline item box within THIS specific container
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
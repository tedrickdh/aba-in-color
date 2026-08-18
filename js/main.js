// ======================================================
// ABA IN COLOR
// MAIN WEBSITE JAVASCRIPT
// ======================================================



// ======================================================
// MOBILE NAVIGATION
// ======================================================

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");


if (menuToggle && mainNav) {

    menuToggle.addEventListener(
        "click",
        () => {

            mainNav.classList.toggle("active");


            const open =
                mainNav.classList.contains("active");


            menuToggle.setAttribute(
                "aria-expanded",
                open
            );

        }
    );


    mainNav
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mainNav.classList.remove("active");


                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

}



// ======================================================
// COPYRIGHT YEAR
// ======================================================

const currentYear =
    document.getElementById("currentYear");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}



// ======================================================
// EVENT DATABASE
// ======================================================

let allEvents = [];



async function loadEvents() {

    try {

        const response =
            await fetch("data/events.json");


        if (!response.ok) {

            throw new Error(
                "Unable to load event data."
            );

        }


        allEvents =
            await response.json();


        displayHomepageEvents();

        displayEventsPage(allEvents);

        setupEventFilters();

    }

    catch (error) {

        console.error(
            "Event loading error:",
            error
        );


        const homepageGrid =
            document.getElementById("eventsGrid");


        const eventsPageGrid =
            document.getElementById("eventsPageGrid");


        if (homepageGrid) {

            homepageGrid.innerHTML = `
                <p>
                    Event information will be available soon.
                </p>
            `;

        }


        if (eventsPageGrid) {

            eventsPageGrid.innerHTML = `
                <p>
                    Event information will be available soon.
                </p>
            `;

        }

    }

}



// ======================================================
// HOMEPAGE EVENTS
// ======================================================

function displayHomepageEvents() {

    const eventsGrid =
        document.getElementById("eventsGrid");


    if (!eventsGrid) {

        return;

    }


    const featuredEvents =
        allEvents
            .filter(event =>
                event.status === "upcoming"
                &&
                event.featured === true
            )
            .slice(0, 3);


    eventsGrid.innerHTML = "";


    featuredEvents.forEach(event => {

        const card =
            document.createElement("article");


        card.className =
            "event-card";


        card.innerHTML = `

            <div class="event-color">

                <span class="event-date">

                    ${event.displayDate}

                </span>

            </div>


            <div class="event-body">

                <p class="event-location">

                    ${event.location}

                </p>


                <h3>

                    ${event.title}

                </h3>


                <p>

                    ${event.description}

                </p>


                <a
                    href="${event.registrationLink}"
                    class="event-link">

                    DETAILS →

                </a>

            </div>

        `;


        eventsGrid.appendChild(card);

    });

}



// ======================================================
// EVENTS PAGE
// ======================================================

function displayEventsPage(eventsToDisplay) {

    const eventsPageGrid =
        document.getElementById("eventsPageGrid");


    if (!eventsPageGrid) {

        return;

    }


    const upcomingEvents =
        eventsToDisplay
            .filter(event =>
                event.status === "upcoming"
            )
            .sort(
                (a, b) =>
                    new Date(a.date)
                    -
                    new Date(b.date)
            );


    eventsPageGrid.innerHTML = "";


    if (upcomingEvents.length === 0) {

        eventsPageGrid.innerHTML = `

            <div class="no-events">

                <h3>
                    More events are coming.
                </h3>

                <p>
                    Stay connected with ABA in Color
                    for future announcements.
                </p>

            </div>

        `;

        return;

    }


    upcomingEvents.forEach(event => {

        const card =
            document.createElement("article");


        card.className =
            "event-page-card";


        card.innerHTML = `

            <div class="event-page-date">

                <span>
                    ${event.displayDate}
                </span>

            </div>


            <div class="event-page-content">

                <p class="event-category">

                    ${event.category}

                </p>


                <h3>

                    ${event.title}

                </h3>


                <div class="event-meta">

                    <span>
                        ${event.time}
                    </span>

                    <span>
                        ${event.location}
                    </span>

                </div>


                <p class="event-description">

                    ${event.description}

                </p>


                <a
                    href="${event.registrationLink}"
                    class="event-register">

                    EVENT DETAILS →

                </a>

            </div>

        `;


        eventsPageGrid.appendChild(card);

    });

}



// ======================================================
// EVENT FILTERS
// ======================================================

function setupEventFilters() {

    const filterButtons =
        document.querySelectorAll(
            ".event-filter"
        );


    if (
        filterButtons.length === 0
    ) {

        return;

    }


    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {


                filterButtons
                    .forEach(item =>
                        item.classList.remove(
                            "active"
                        )
                    );


                button.classList.add(
                    "active"
                );


                const filter =
                    button.dataset.filter;


                if (filter === "all") {

                    displayEventsPage(
                        allEvents
                    );

                }

                else {

                    const filteredEvents =
                        allEvents.filter(
                            event =>
                                event.category
                                ===
                                filter
                        );


                    displayEventsPage(
                        filteredEvents
                    );

                }

            }
        );

    });

}



// ======================================================
// EMAIL SIGNUP
// ======================================================

const signupForm =
    document.getElementById(
        "signupForm"
    );


const formMessage =
    document.getElementById(
        "formMessage"
    );


if (signupForm) {

    signupForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const firstName =
                document
                    .getElementById(
                        "firstName"
                    )
                    .value
                    .trim();


            if (formMessage) {

                formMessage.textContent =
                    `Thanks, ${firstName}! We're glad you're here.`;

            }


            signupForm.reset();

        }
    );

}



// ======================================================
// START WEBSITE DATA
// ======================================================

loadEvents();
// ======================================================
// OPPORTUNITIES DATABASE
// ======================================================

let allOpportunities = [];


async function loadOpportunities() {

    try {

        const response =
            await fetch("data/opportunities.json");


        if (!response.ok) {
            throw new Error(
                "Unable to load opportunity data."
            );
        }


        allOpportunities =
            await response.json();


        displayOpportunitiesPage(
            allOpportunities
        );


        setupOpportunityFilters();

    }

    catch (error) {

        console.error(
            "Opportunity loading error:",
            error
        );


        const grid =
            document.getElementById(
                "opportunitiesPageGrid"
            );


        if (grid) {

            grid.innerHTML = `
                <p>
                    Opportunity information will be available soon.
                </p>
            `;

        }

    }

}



// ======================================================
// DISPLAY OPPORTUNITIES
// ======================================================

function displayOpportunitiesPage(
    opportunitiesToDisplay
) {

    const grid =
        document.getElementById(
            "opportunitiesPageGrid"
        );


    if (!grid) {
        return;
    }


    const openOpportunities =
        opportunitiesToDisplay.filter(
            opportunity =>
                opportunity.status === "open"
        );


    grid.innerHTML = "";


    if (
        openOpportunities.length === 0
    ) {

        grid.innerHTML = `

            <div class="no-opportunities">

                <h3>
                    More opportunities are coming.
                </h3>

                <p>
                    Stay connected with ABA in Color
                    for future opportunities.
                </p>

            </div>

        `;

        return;

    }


    openOpportunities.forEach(
        opportunity => {


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "opportunity-page-card";


            card.innerHTML = `

                <div class="opportunity-page-type">

                    <span>
                        ${opportunity.type}
                    </span>

                </div>


                <div class="opportunity-page-content">

                    <p class="opportunity-org">

                        ${opportunity.organization}

                    </p>


                    <h3>

                        ${opportunity.title}

                    </h3>


                    <div class="opportunity-meta">

                        <span>
                            ${opportunity.location}
                        </span>

                        <span>
                            ${opportunity.workType}
                        </span>

                    </div>


                    <p class="opportunity-description">

                        ${opportunity.description}

                    </p>


                    <a
                        href="${opportunity.link}"
                        class="opportunity-action">

                        LEARN MORE →

                    </a>

                </div>

            `;


            grid.appendChild(
                card
            );

        }

    );

}



// ======================================================
// OPPORTUNITY FILTERS
// ======================================================

function setupOpportunityFilters() {

    const buttons =
        document.querySelectorAll(
            ".opportunity-filter"
        );


    if (
        buttons.length === 0
    ) {
        return;
    }


    buttons.forEach(
        button => {


            button.addEventListener(
                "click",
                () => {


                    buttons.forEach(
                        item =>
                            item.classList.remove(
                                "active"
                            )
                    );


                    button.classList.add(
                        "active"
                    );


                    const filter =
                        button.dataset.filter;


                    if (
                        filter === "all"
                    ) {

                        displayOpportunitiesPage(
                            allOpportunities
                        );

                    }

                    else {

                        const filtered =
                            allOpportunities.filter(
                                opportunity =>
                                    opportunity.type
                                    ===
                                    filter
                            );


                        displayOpportunitiesPage(
                            filtered
                        );

                    }

                }
            );

        }
    );

}



// ======================================================
// LOAD OPPORTUNITY DATA
// ======================================================

loadOpportunities();
// ======================================================
// RESOURCE DATABASE
// ======================================================

let allResources = [];


async function loadResources() {

    try {

        const response =
            await fetch("data/resources.json");


        if (!response.ok) {

            throw new Error(
                "Unable to load resource data."
            );

        }


        allResources =
            await response.json();


        displayResourcesPage(
            allResources
        );


        setupResourceFilters();

    }

    catch (error) {

        console.error(
            "Resource loading error:",
            error
        );


        const grid =
            document.getElementById(
                "resourcesPageGrid"
            );


        if (grid) {

            grid.innerHTML = `
                <p>
                    Resource information will be available soon.
                </p>
            `;

        }

    }

}



// ======================================================
// DISPLAY RESOURCES
// ======================================================

function displayResourcesPage(
    resourcesToDisplay
) {

    const grid =
        document.getElementById(
            "resourcesPageGrid"
        );


    if (!grid) {
        return;
    }


    const activeResources =
        resourcesToDisplay.filter(
            resource =>
                resource.status === "active"
        );


    grid.innerHTML = "";


    if (activeResources.length === 0) {

        grid.innerHTML = `

            <div class="no-resources">

                <h3>
                    More resources are coming.
                </h3>

                <p>
                    ABA in Color is continuing to build
                    the resource library.
                </p>

            </div>

        `;

        return;

    }


    activeResources.forEach(
        resource => {


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "resource-page-card";


            card.innerHTML = `

                <div class="resource-page-label">

                    <span>
                        ${resource.category}
                    </span>

                </div>


                <div class="resource-page-content">

                    <h3>
                        ${resource.title}
                    </h3>


                    <p>
                        ${resource.description}
                    </p>


                    <a
                        href="${resource.link}"
                        class="resource-action">

                        EXPLORE RESOURCE →

                    </a>

                </div>

            `;


            grid.appendChild(
                card
            );

        }

    );

}



// ======================================================
// RESOURCE FILTERS
// ======================================================

function setupResourceFilters() {

    const buttons =
        document.querySelectorAll(
            ".resource-filter"
        );


    if (buttons.length === 0) {
        return;
    }


    buttons.forEach(
        button => {


            button.addEventListener(
                "click",
                () => {


                    buttons.forEach(
                        item =>
                            item.classList.remove(
                                "active"
                            )
                    );


                    button.classList.add(
                        "active"
                    );


                    const filter =
                        button.dataset.filter;


                    if (filter === "all") {

                        displayResourcesPage(
                            allResources
                        );

                    }

                    else {

                        const filtered =
                            allResources.filter(
                                resource =>
                                    resource.category
                                    ===
                                    filter
                            );


                        displayResourcesPage(
                            filtered
                        );

                    }

                }
            );

        }
    );

}



// ======================================================
// LOAD RESOURCE DATA
// ======================================================

loadResources();
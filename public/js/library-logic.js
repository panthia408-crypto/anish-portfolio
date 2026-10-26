const PROJECT_ID = "e7hia29y";
let allNotes = [];

/**
 * 1. INITIAL FETCH
 */
async function fetchBooks() {
    const grid = document.getElementById('book-display');

    const QUERY = encodeURIComponent(`*[_type == "note"]{
        category,
        semesterName,
        subjects[]{
            title,
            externalLink
        }
    }`);

    const REQ_URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/production?query=${QUERY}`;

    try {
        const response = await fetch(REQ_URL);
        const { result } = await response.json();
        allNotes = result;
        console.log("Library Synced: " + allNotes.length + " bundles found.");
    } catch (e) {
        console.error("Library Load Error:", e);
        if (grid) grid.innerHTML = `<div class="empty-state">Connection failed. Please try again later.</div>`;
    }
}

/**
 * 2. NAVIGATION LOGIC
 */
function openCategory(cat) {
    document.getElementById('selection-view').style.display = 'none';
    const displayView = document.getElementById('display-view');
    displayView.style.display = 'block';

    window.scrollTo({ top: 0, behavior: 'smooth' });

    const titleElement = document.getElementById('current-category-title');
    if (cat === 'research-docs') {
        titleElement.innerText = "Research & Official Papers";
    } else {
        titleElement.innerText = `Semester ${cat} Resources`;
    }

    // Clear resource search
    const resSearch = document.getElementById('resource-search');
    if (resSearch) resSearch.value = '';

    filterByCategory(cat);

    // Store current category for search filtering
    displayView.dataset.cat = cat;
}

function closeCategory() {
    document.getElementById('selection-view').style.display = 'block';
    document.getElementById('display-view').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * 3. FILTER & RENDER ENGINE
 */
function filterByCategory(cat) {
    let subjectsToDisplay = [];

    allNotes.forEach(doc => {
        const semName = (doc.semesterName || "").toLowerCase();
        const category = (doc.category || "").toLowerCase();

        const isSemesterMatch = (category === 'semester' && semName.includes(cat.toLowerCase()));
        const isSpecializedMatch = (cat === 'research-docs' && (category === 'research' || category === 'work'));

        if (isSemesterMatch || isSpecializedMatch) {
            if (doc.subjects) {
                doc.subjects.forEach(sub => {
                    subjectsToDisplay.push({
                        title: sub.title,
                        url: sub.externalLink,
                        sem: doc.semesterName
                    });
                });
            }
        }
    });

    renderBooks(subjectsToDisplay);
}

/**
 * 4. ICON MAPPING
 */
function getSubjectIcon(title) {
    const t = title.toLowerCase();
    if (t.includes('english') || t.includes('language')) return 'fa-language';
    if (t.includes('machine') || t.includes('theory'))  return 'fa-gears';
    if (t.includes('engineering') || t.includes('maintainance')) return 'fa-hard-hat';
    if (t.includes('development') || t.includes('entre')) return 'fa-rocket';
    if (t.includes('syllabus')) return 'fa-book-bookmark';
    if (t.includes('math') || t.includes('calculus') || t.includes('algebra')) return 'fa-square-root-variable';
    if (t.includes('physics')) return 'fa-atom';
    if (t.includes('chemistry')) return 'fa-flask-vial';
    if (t.includes('computer') || t.includes('programming')) return 'fa-laptop-code';
    if (t.includes('electric') || t.includes('circuit')) return 'fa-bolt';
    if (t.includes('drawing') || t.includes('graphics')) return 'fa-ruler-combined';
    if (t.includes('thermo')) return 'fa-temperature-high';
    if (t.includes('workshop') || t.includes('lab')) return 'fa-screwdriver-wrench';
    return 'fa-file-lines';
}

function renderBooks(subjects) {
    const grid = document.getElementById('book-display');

    if (!subjects || subjects.length === 0) {
        grid.innerHTML = `<div class="empty-state">No resources found here yet.</div>`;
        return;
    }

    grid.innerHTML = subjects.map(sub => {
        const icon = getSubjectIcon(sub.title);
        return `
        <div class="book-card" data-title="${sub.title.toLowerCase()}">
            <div class="cover">
                <i class="fa-solid ${icon}"></i>
            </div>
            <div class="info">
                <span class="sem-tag">${sub.sem}</span>
                <h4>${sub.title}</h4>
                <a href="${sub.url}" target="_blank" class="download-tag">
                    View Resource <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
            </div>
        </div>`;
    }).join('');
}

/**
 * 5. SEARCH — Semester tiles + Global subject search
 */
const libSearch = document.getElementById('lib-search');
if (libSearch) {
    libSearch.addEventListener('input', () => {
        const q = libSearch.value.toLowerCase().trim();

        // Filter semester tiles
        document.querySelectorAll('.lib-tile').forEach(tile => {
            const label = (tile.dataset.label || '').toLowerCase();
            const text = tile.textContent.toLowerCase();
            tile.style.display = (!q || label.includes(q) || text.includes(q)) ? '' : 'none';
        });

        // Global subject search across all semesters
        const globalResults = document.getElementById('global-results');
        const globalGrid = document.getElementById('global-book-display');
        if (!globalResults || !globalGrid) return;

        if (!q || q.length < 2) {
            globalResults.style.display = 'none';
            return;
        }

        const matched = [];
        allNotes.forEach(doc => {
            if (doc.subjects) {
                doc.subjects.forEach(sub => {
                    if ((sub.title || '').toLowerCase().includes(q)) {
                        matched.push({
                            title: sub.title,
                            url: sub.externalLink,
                            sem: doc.semesterName || 'Unknown'
                        });
                    }
                });
            }
        });

        if (matched.length > 0) {
            globalResults.style.display = 'block';
            globalGrid.innerHTML = matched.map(sub => {
                const icon = getSubjectIcon(sub.title);
                return `
                <div class="book-card">
                    <div class="cover">
                        <i class="fa-solid ${icon}"></i>
                    </div>
                    <div class="info">
                        <span class="sem-tag">${sub.sem}</span>
                        <h4>${sub.title}</h4>
                        <a href="${sub.url}" target="_blank" class="download-tag">
                            View Resource <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                    </div>
                </div>`;
            }).join('');
        } else {
            globalResults.style.display = 'none';
        }
    });
}

function clearGlobalSearch() {
    const libSearch = document.getElementById('lib-search');
    if (libSearch) { libSearch.value = ''; libSearch.dispatchEvent(new Event('input')); }
}

/**
 * 6. SEARCH — Resource cards
 */
const resSearch = document.getElementById('resource-search');
if (resSearch) {
    resSearch.addEventListener('input', () => {
        const q = resSearch.value.toLowerCase().trim();
        document.querySelectorAll('.book-card').forEach(card => {
            const title = card.dataset.title || '';
            card.style.display = (!q || title.includes(q)) ? '' : 'none';
        });
    });
}

fetchBooks();
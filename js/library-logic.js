const PROJECT_ID = "e7hia29y";
let allNotes = []; // This stores the raw documents from Sanity

/**
 * 1. INITIAL FETCH
 * Pulls the 'note' documents which contain the subject arrays.
 */
async function fetchBooks() {
    const grid = document.getElementById('book-display');
    
    // We query 'note' (your actual schema name) and get the subjects array
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
        console.log("Vault Synced: " + allNotes.length + " bundles found.");
    } catch (e) { 
        console.error("Archive Load Error:", e);
        if(grid) grid.innerHTML = `<div class="error" style="color:red; text-align:center; padding:50px;">Vault Connection Failed.</div>`;
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

    filterByCategory(cat);
}

function closeCategory() {
    document.getElementById('selection-view').style.display = 'block';
    document.getElementById('display-view').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * 3. FILTER & RENDER ENGINE
 * This part "unpacks" the subjects array so each subject gets its own card.
 */
function filterByCategory(cat) {
    let subjectsToDisplay = [];
    
    allNotes.forEach(doc => {
        // Convert everything to lowercase to avoid "Semester" vs "semester" bugs
        const semName = (doc.semesterName || "").toLowerCase();
        const category = (doc.category || "").toLowerCase();

        // Check if the clicked category (e.g., '6') is found inside the Sanity name (e.g., '6th Semester')
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

  // Helper to assign a specific theme to each subject card
function getSubjectStyle(title) {
    const t = title.toLowerCase();
    
    // Industrial/Mechanical specific icons
    if (t.includes('english')) 
        return { icon: 'fa-language', bg: 'linear-gradient(135deg, #8E2DE2, #4A00E0)' };
    if (t.includes('machine') || t.includes('theory')) 
        return { icon: 'fa-gears', bg: 'linear-gradient(135deg, #FF416C, #FF4B2B)' };
    if (t.includes('engineering') || t.includes('maintainance')) 
        return { icon: 'fa-hard-hat', bg: 'linear-gradient(135deg, #00B09B, #96C93D)' };
    if (t.includes('development') || t.includes('entre')) 
        return { icon: 'fa-rocket', bg: 'linear-gradient(135deg, #f7971e, #ffd200)' };
    if (t.includes('syllabus')) 
        return { icon: 'fa-book-bookmark', bg: 'linear-gradient(135deg, #30E8BF, #FF8235)' };
    
    // Default refined look
    return { icon: 'fa-file-lines', bg: 'linear-gradient(135deg, #434343, #000000)' };
}

function renderBooks(subjects) {
    const grid = document.getElementById('book-display');
    
    if(!subjects || subjects.length === 0) {
        grid.innerHTML = `<div class="empty-state">No resources found here yet.</div>`;
        return;
    }
    
    grid.innerHTML = subjects.map(sub => {
        const theme = getSubjectStyle(sub.title);
        
        return `
        <div class="book-card">
            <div class="cover" style="background: ${theme.bg};">
                <i class="fa-solid ${theme.icon} fa-4x" style="color: rgba(255,255,255,0.4)"></i>
            </div>
            <div class="info">
                <span class="sem-tag">${sub.sem}</span>
                <h4>${sub.title}</h4>
                <a href="${sub.url}" target="_blank" class="download-tag">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> VIEW RESOURCE
                </a>
            </div>
        </div>
        `;
    }).join('');
}

fetchBooks();
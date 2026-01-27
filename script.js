// Data - 3 Example Blog Posts
const BLOG_POSTS = [
    {
        id: 1,
        title: "The Art of Minimalist Living",
        category: "People",
        shortDesc: "Discover how decluttering your space can lead to a clearer mind and a more focused life.",
        image: "https://picsum.photos/id/1015/600/800", // Nature/Water
        content: `
            <p>Minimalism isn't just about throwing away your stuff. It's about making room for what truly matters. In a world that constantly screams for our attention, finding silence is a radical act.</p>
            <p><strong>Why start now?</strong> Because we are drowning in choices. The average person makes thousands of decisions a day. By reducing the number of physical objects in your environment, you reduce the cognitive load required to manage them.</p>
            <p>Start small. Clear one drawer. Remove one app from your phone. Notice the lightness that follows. This isn't about deprivation; it's about curation. You are the curator of your own life, and it's time to stop hoarding minutes and start spending them on experiences that bring you joy.</p>
            <p>The journey to minimalism is personal. For some, it's a backpack of belongings; for others, it's a clean desk. Find your balance and let the unnecessary fade away.</p>
        `
    },
    {
        id: 2,
        title: "Modern Web Development 2024",
        category: "Tech",
        shortDesc: "A deep dive into static sites, performance optimization, and why simple is often better.",
        image: "https://picsum.photos/id/1035/600/900", // Tech/Abstract vibe
        content: `
# Static vs Dynamic
The debate between static and dynamic sites is older than the modern web itself. However, with tools like **Hugo**, **Jekyll**, and simple HTML/CSS generators, static sites are making a huge comeback.

## Why Go Static?
1. **Speed**: No database queries means instant load times.
2. **Security**: No server-side logic to hack.
3. **Hosting**: Free hosting on GitHub Pages, Netlify, or Vercel.

## Code Example
Here is a simple Javascript function to toggle a class:

\`\`\`javascript
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    console.log('Theme toggled!');
}
\`\`\`

> "Simplicity is the ultimate sophistication." - Leonardo da Vinci

### Conclusion
If you don't need user accounts or real-time data, **Go Static**. It saves money, time, and headaches.
        `
    },
    {
        id: 3,
        title: "Culinary Adventures: Sourdough",
        category: "Food",
        shortDesc: "Why everyone is obsessed with wild yeast and how you can start your own starter today.",
        image: "https://picsum.photos/id/1060/600/700", // Barista/Coffee/Food vibe
        content: `
            <p>Flour, water, and time. That's all it takes to create life. Well, at least a microbial culture that will make the best bread you've ever tasted. Sourdough baking is equal parts science and art.</p>
            <p>The process demands patience. You can't rush fermentation. You have to watch the dough, feel its tension, and understand its rhythm. It's a slow, tactile experience in an increasingly digital world.</p>
            <p><strong>The perfect loaf</strong> has a dark, caramelized crust and an open, airy crumb. It sings when you take it out of the oven—a crackling sound that every baker knows and loves. But the real reward is sharing it. Breaking bread with friends and family is a tradition as old as civilization itself.</p>
            <p>So grab a jar, mix some flour and water, and wait. You're not just making bread; you're cultivating a relationship with the microscopic world. And trust me, it's delicious.</p>
        `
    }
];

// DOM Elements
const gridView = document.getElementById('grid-view');
const postView = document.getElementById('post-view');
const adminView = document.getElementById('admin-view');
const blogGrid = document.getElementById('blog-grid');
const postTitle = document.getElementById('post-title');
const postImage = document.getElementById('post-image');
const postContent = document.getElementById('post-content');
const categoryBtns = document.querySelectorAll('.filter-btn');
const themeToggle = document.getElementById('theme-toggle');

// Theme Logic
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '🌙';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.textContent = '☀️';
    }
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});


// Initialize
function init() {
    initTheme();
    renderGrid('All');
}

// Render Grid Cards with Filter
function renderGrid(filterCategory) {
    blogGrid.innerHTML = '';

    // Filter posts
    const filteredPosts = filterCategory === 'All'
        ? BLOG_POSTS
        : BLOG_POSTS.filter(post => post.category === filterCategory);

    filteredPosts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'blog-card';
        card.onclick = () => showPost(post.id);

        card.innerHTML = `
            <div class="card-image-wrapper">
                <img src="${post.image}" alt="${post.title}" class="card-image">
                <div class="card-overlay">
                    <h2 class="card-title">${post.title}</h2>
                    <p class="card-desc">${post.category} • ${post.shortDesc}</p>
                </div>
            </div>
        `;
        blogGrid.appendChild(card);
    });
}

// Handle Filter Click
function filterPosts(category) {
    // Update active button
    categoryBtns.forEach(btn => {
        if (btn.textContent === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    renderGrid(category);
}

// Show Specific Post
function showPost(id) {
    const post = BLOG_POSTS.find(p => p.id === id);
    if (!post) return;

    // Populate Post View
    postTitle.textContent = post.title;
    postImage.src = post.image;

    // Render logic based on category
    if (post.category === 'Tech') {
        postContent.innerHTML = `<div class="markdown-content">${parseMarkdown(post.content)}</div>`;
    } else {
        postContent.innerHTML = post.content;
    }

    // Switch Views
    gridView.classList.add('hidden');
    adminView.classList.add('hidden');
    postView.classList.remove('hidden');

    // Scroll to top
    window.scrollTo(0, 0);
}

// Show Admin Page
function showAdmin() {
    gridView.classList.add('hidden');
    postView.classList.add('hidden');
    adminView.classList.remove('hidden');
    window.scrollTo(0, 0);
}

// Return to Home
function goHome() {
    postView.classList.add('hidden');
    adminView.classList.add('hidden');
    gridView.classList.remove('hidden');
    window.scrollTo(0, 0);
}

// Simple Markdown Parser (Regex Based)
function parseMarkdown(markdown) {
    let html = markdown
        // Headers
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')

        // Blockquotes
        .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')

        // Bold
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')

        // Code Block
        .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
            return `
                <div class="code-block-wrapper">
                    <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                    <pre><code class="language-${lang || 'text'}">${code.trim()}</code></pre>
                </div>
            `;
        })

        // Inline Code
        .replace(/`([^`]+)`/gim, '<code>$1</code>')

        // Lists (Unordered)
        .replace(/^\d+\. (.*$)/gim, '<ol><li>$1</li></ol>') // naive list regex, works for single lines
        .replace(/^\- (.*$)/gim, '<ul><li>$1</li></ul>')   // naive list regex

        // Paragraphs (naive: double newline = new paragraph, but clean up duplicate tags)
        .replace(/\n\n/g, '</p><p>');

    // Wrap in initial P tags if not starting with tag
    // This is a simplified parser; for production, use a library :)
    return html;
}

// Copy Code Functionality
function copyCode(btn) {
    const codeBlock = btn.nextElementSibling.querySelector('code');
    const text = codeBlock.innerText;

    navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Run
init();

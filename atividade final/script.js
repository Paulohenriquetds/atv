
async function fetchPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    posts.forEach(post => {
        fetchUser(post.userId, post);
    });
}


async function fetchUser(userId, post) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const user = await response.json();
    showPost(post, user);
}


function showPost(post, user) {
    const timeline = document.getElementById('timeline');
    const postDiv = document.createElement('div');
    postDiv.className = 'post';

    postDiv.innerHTML = `
        <h2>${post.title}</h2>
        <p><strong>Autor:</strong> ${user.name} (${user.email})</p>
        <p>${post.body}</p>
        <a onclick="openCommentsPopup(${post.id})">Ver Comentários</a>
    `;

    timeline.appendChild(postDiv);
}


async function openCommentsPopup(postId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    const comments = await response.json();

    
    const commentsContent = comments.map(comment => `
        <p><strong>${comment.name}</strong> (${comment.email}):</p>
        <p>${comment.body}</p>
        <hr>
    `).join('');

   
    const popup = window.open('', 'Comentários', 'width=600,height=400');
    popup.document.write(`
        <html>
            <head>
                <title>Comentários do Post ${postId}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    p { margin: 5px 0; }
                    hr { border: 0; border-top: 1px solid #ddd; margin: 10px 0; }
                </style>
            </head>
            <body>
                <h1>Comentários do Post ${postId}</h1>
                ${commentsContent}
            </body>
        </html>
    `);
    popup.document.close();
}


fetchPosts();
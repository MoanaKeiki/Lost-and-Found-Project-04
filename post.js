
 
const params = new URLSearchParams(window.location.search);
const itemId = params.get('id');
 
const loading = document.getElementById('post-loading');
const content = document.getElementById('post-content');

 
async function loadPost() {

    if (!itemId) {
        loading.textContent = 'Item ID not found';
        return;
    }

    try {

        const { data, error } = await db
            .from('items')
            .select('*')
            .eq('id', itemId)
            .single();

        if (error) throw error;

         
        document.getElementById('post-title').textContent = data.title;

        document.getElementById('post-category').textContent =
            'Category: ' + data.category;

        document.getElementById('post-description').textContent =
            data.description || 'No description available';

        document.getElementById('post-location').textContent =
            data.location;

        document.getElementById('post-date').textContent =
            new Date(data.created_at).toLocaleDateString();

        
        const img = document.getElementById('post-image');

        img.src = data.image_url || 'img/no-image.png';

        img.onerror = function() {
            this.src = 'img/no-image.png';
        };

   
        const status = document.getElementById('post-status');

        status.textContent = data.status.toUpperCase();

        status.classList.add(
            data.status.toLowerCase() === 'found' ? 'Found' : 'Lost'
        );

const contactButton = document.getElementById('contact-button');

const method = (data.contact_method || '').toLowerCase();
const contact = (data.contact_value || '').trim();

let contactUrl = '';
let buttonText = '';

if (method === 'telegram') {

    const username = contact.replace(/^@/, '');

    contactUrl = 'https://t.me/' + username;
    buttonText = 'Contact via Telegram';

}

else if (method === 'whatsapp') {

    const phone = contact.replace(/\D/g, '');

    contactUrl = 'https://wa.me/' + phone;
    buttonText = 'Contact via WhatsApp';

}

else if (method === 'email') {

    contactUrl = 'mailto:' + contact;
    buttonText = 'Send Email';

}

else if (method === 'phone') {

    contactUrl = 'tel:' + contact.replace(/[^\d+]/g, '');
    buttonText = 'Call Owner';

}

if (contactUrl) {

    contactButton.href = contactUrl;
    contactButton.textContent = buttonText;
    contactButton.style.display = 'inline-block';

    if (method === 'telegram' || method === 'whatsapp') {
        contactButton.target = '_blank';
    } else {
        contactButton.removeAttribute('target');
    }

} else {

    contactButton.style.display = 'none';

}




let contactUrl = '';
let buttonText = '';

if (method === 'telegram') {
    contactUrl = 'https://t.me/' + contact.replace('@', '');
    buttonText = 'Contact via Telegram';
}

else if (method === 'whatsapp') {
    contactUrl = 'https://wa.me/' + contact.replace(/\D/g, '');
    buttonText = 'Contact via WhatsApp';
}

else if (method === 'email') {
    contactUrl = 'mailto:' + contact;
    buttonText = 'Send Email';
}

else if (method === 'phone') {
    contactUrl = 'tel:' + contact;
    buttonText = 'Call Owner';
}

if (contactUrl && contact) {
    contactButton.href = contactUrl;
    contactButton.textContent = buttonText;
} else {
    contactButton.style.display = 'none';
}
 
        loading.style.display = 'none';
        content.style.display = 'block';

    } catch (error) {

        console.error('Error loading post:', error);

        loading.textContent = 'Could not load this item.';

    }
}
loading.style.display = 'none';
content.style.display = 'block';
loadPost();

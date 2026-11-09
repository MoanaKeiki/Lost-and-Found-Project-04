
const params = new URLSearchParams(window.location.search);
const itemId = params.get('id');

const loading = document.getElementById('post-loading');
const content = document.getElementById('post-content');


async function loadPost() {


    if (!itemId) {
        loading.textContent = 'Item ID not found';
        return;
    }

    loading.style.display = 'block';
    content.style.display = 'none';

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
            data.location || 'Not specified';

        document.getElementById('post-date').textContent =
            new Date(data.created_at).toLocaleDateString();


      
        const img = document.getElementById('post-image');

        img.src = data.image_url || 'img/no-image.png';

        img.onerror = function() {
            this.onerror = null;
            this.src = 'img/no-image.png';
        };


     
        const status = document.getElementById('post-status');

        status.textContent = (data.status || 'lost').toUpperCase();

        status.classList.add(
            data.status.toLowerCase() === 'found' ? 'Found' : 'Lost'
        );


        const contactButton = document.getElementById('contact-button');

        const method = String(data.contact_method || '').toLowerCase().trim();
        const contact = String(data.contact_value || '').trim();

        let contactUrl = '';
        let buttonText = '';


        if (method === 'telegram' && contact) {

            const username = contact.replace(/^@/, '');

            contactUrl = 'https://t.me/' + encodeURIComponent(username);
            buttonText = 'Contact via Telegram';

        }

        else if (method === 'whatsapp' && contact) {

            const phone = contact.replace(/\D/g, '');

            contactUrl = 'https://wa.me/' + phone;
            buttonText = 'Contact via WhatsApp';

        }

       
        else if (method === 'email' && contact) {

            contactUrl = 'mailto:' + contact;
            buttonText = 'Send Email';

        }

  
        else if (method === 'phone' && contact) {

            contactUrl = 'tel:' + contact.replace(/[^\d+]/g, '');
            buttonText = 'Call Owner';

        }


    
        if (contactButton) {

            if (contactUrl) {

                contactButton.href = contactUrl;
                contactButton.textContent = buttonText;
                contactButton.style.display = 'inline-block';

                if (method === 'telegram' || method === 'whatsapp') {
                    contactButton.target = '_blank';
                    contactButton.rel = 'noopener noreferrer';
                } else {
                    contactButton.removeAttribute('target');
                }

            } else {

                contactButton.style.display = 'none';

            }

        }


       
        loading.style.display = 'none';
        content.style.display = 'block';

    }

    catch (error) {

        console.error('Error loading post:', error);

        loading.textContent = 'Could not load this item.';

        loading.style.display = 'block';
        content.style.display = 'none';

    }

}



loadPost();


var form = document.getElementById('report-form');
var form = document.getElementById('report-form');

if (form) {
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
         console.log('Form submit handler started!');

        var title = document.getElementById('item-title').value.trim();
        var category = document.getElementById('item-category').value;
        var description = document.getElementById('item-description').value.trim();
        var location = document.getElementById('item-location').value;
        var message = document.getElementById('report-message');
        var contactMethod = document.getElementById('contact-method').value;
        var contactValue = document.getElementById('contact-value').value.trim();
        var btn = document.querySelector('#report-form .btn-submit');

        var statusInput = document.querySelector('input[name="item-status"]:checked');

        if (!title || !category || !location || !statusInput ||
    !contactMethod || !contactValue) {
    alert('Please fill in all required fields!');
    return;
}
        

        btn.disabled = true;
        btn.textContent = 'Saving...';
        message.textContent = '';

      // Get currently logged-in user
const { data: { user }, error: userError } = await db.auth.getUser();

if (userError || !user) {
    alert("Please log in before submitting a report.");
    return;
}

var report = {
    title: title,
    category: category,
    description: description,
    location: location,
    status: statusInput.value,
    contact_method: contactMethod,
    contact_value: contactValue,
    user_id: user.id
};

        
try {
    var fileInput = document.getElementById('file-input');
    var imageUrl = null;
    console.log('File input:', fileInput);
console.log('Selected files:', fileInput.files);
console.log('Number of files:', fileInput.files.length);

    // Проверяем, выбрал ли пользователь фотографию
    if (fileInput.files.length > 0) {
        var file = fileInput.files[0];

        var extension = file.name.split('.').pop().toLowerCase();
var fileName = Date.now() + '.' + extension;

        // Загружаем фотографию в Supabase Storage
        const { data: uploadData, error: uploadError } = await db
            .storage
            .from('item-images')
            .upload(fileName, file);

        if (uploadError) {
            throw uploadError;
        }

        // Получаем публичную ссылку на фотографию
        const { data: urlData } = db
            .storage
            .from('item-images')
            .getPublicUrl(uploadData.path);

        imageUrl = urlData.publicUrl;
    }

    // Добавляем ссылку на фотографию в объявление
    report.image_url = imageUrl;

    // Сохраняем объявление в таблицу items
    const { data, error } = await db
        .from('items')
        .insert([report])
        .select();

    if (error) {
        throw error;
    }
//hteeeeee
    var sound = document.getElementById('success-sound');
    if (sound) {
        sound.load(); // Подгружаем трек заранее
    }
     if (error) {
        throw error;
    }

    message.textContent = 'Report submitted successfully!';
    message.style.color = 'green';
    
    // 2. Воспроизведение звука
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(function(err) {
            console.log("Браузер заблокировал звук, пока шла отправка данных:", err);
        });
    }

    document.getElementById('report-form').reset();


    document.getElementById('report-form').reset();
    document.getElementById('preview-container').innerHTML = '';

    console.log('Saved report:', data);

} catch (error) {
    console.error('Supabase error:', error);
    message.textContent = 'Could not save report: ' + error.message;
    message.style.color = 'red';

} finally {
    btn.disabled = false;
    btn.textContent = 'Submit Report';
}

    });
}

var itemLocationValue = document.getElementById('item-location')?.value;
var reportMessageElem = document.getElementById('report-message');

var contactMethodValue = document.getElementById('contact-method')?.value;
var contactValueText = document.getElementById('contact-value')?.value.trim();

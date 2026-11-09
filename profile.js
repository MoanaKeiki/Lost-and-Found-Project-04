


//from here
document.addEventListener("DOMContentLoaded", function() {
    // Находим все ссылки внутри блока с табами
    const tabLinks = document.querySelectorAll(".tabs a");
    
    tabLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault(); // Отменяем стандартный переход по ссылке-якорю

            // 1. Убираем класс 'active' у всех вкладок (ссылок)
            tabLinks.forEach(tab => tab.classList.remove("active"));
            // Добавляем класс 'active' той, на которую кликнули
            this.classList.add("active");

            // 2. Скрываем все блоки с контентом форм
            const tabContents = document.querySelectorAll(".tabs-content > div");
            tabContents.forEach(content => {
                content.style.display = "none";
                content.classList.remove("active");
            });

            // 3. Находим нужный блок по id из атрибута href (например, #login-tab-content)
            const targetId = this.getAttribute("href");
            const targetContent = document.querySelector(targetId);
            
            if (targetContent) {
                targetContent.style.display = "block"; // Показываем нужную форму
                targetContent.classList.add("active");
            }
        });
    });
});

function setActive(element) {
    const items = document.querySelectorAll('.nav-item');

    items.forEach(item => item.classList.remove('active'));

    element.classList.add('active');
}


document.addEventListener('DOMContentLoaded', () => {
    console.log("JavaScript работает");
console.log(document.querySelectorAll('.filter-btn').length);
  const buttons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.item-card');
  console.log("Карточек:", items.length);
items.forEach(item => {
    console.log("Статус:", item.getAttribute('data-status'));
});

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');
console.log("Нажата кнопка:", filterValue);
      items.forEach(item => {
        const itemStatus = item.getAttribute('data-status');

        if (filterValue === 'all' || itemStatus === filterValue) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
});
function openItem(id) {
    window.location.href = 'item1.html' + phone13;
}



const fileInput = document.getElementById('file-input');
const previewContainer = document.getElementById('preview-container');
let selectedFiles = [];

if (fileInput && previewContainer) {
    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);

        if (selectedFiles.length + files.length > 5) {
            alert('You can only upload up to 5 photos.');
            fileInput.value = '';
            return;
        }

        files.forEach(file => {
            if (!file.type.startsWith('image/')) return;

            selectedFiles.push(file);

            const reader = new FileReader();

            reader.onload = (event) => {
                const previewItem = document.createElement('div');
                previewItem.classList.add('preview-item');

                const img = document.createElement('img');
                img.src = event.target.result;
                img.alt = 'Preview';

                const removeBtn = document.createElement('button');
                removeBtn.type = 'button';
                removeBtn.className = 'remove-btn';
                removeBtn.textContent = '×';

                removeBtn.addEventListener('click', () => {
                    selectedFiles = selectedFiles.filter(f => f !== file);
                    previewItem.remove();
                    updateInputFiles();
                });

                previewItem.append(img, removeBtn);
                previewContainer.appendChild(previewItem);
            };

            reader.readAsDataURL(file);
        });

        updateInputFiles();
    });
}

function updateInputFiles() {
    if (!fileInput) return;

    const dataTransfer = new DataTransfer();

    selectedFiles.forEach(file => {
        dataTransfer.items.add(file);
    });

    fileInput.files = dataTransfer.files;
}

// Функция для синхронизации массива файлов с инпутом формы
function updateInputFiles() {
    const dataTransfer = new DataTransfer();
    selectedFiles.forEach(file => dataTransfer.items.add(file));
    fileInput.files = dataTransfer.files;
}

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('notificationBtn');
    const panel = document.getElementById('notificationPanel');
    const closeBtn = document.getElementById('closeNotifications');
console.log("Кнопка:", btn);
console.log("Окно:", panel);
console.log("Кнопка закрытия:", closeBtn);
    if (!btn || !panel || !closeBtn) return;

    // Open and close by clicking the bell
    btn.addEventListener('click', (event) => {
        event.stopPropagation();

        panel.classList.toggle('show');

        btn.setAttribute(
            'aria-expanded',
            panel.classList.contains('show')
        );
    });

    // Close using the X button
    closeBtn.addEventListener('click', () => {
        panel.classList.remove('show');
        btn.setAttribute('aria-expanded', 'false');
    });

    // Close when clicking outside
    document.addEventListener('click', (event) => {
        if (
            !panel.contains(event.target) &&
            !btn.contains(event.target)
        ) {
            panel.classList.remove('show');
            btn.setAttribute('aria-expanded', 'false');
        }
    });

    // Close with Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            panel.classList.remove('show');
            btn.setAttribute('aria-expanded', 'false');
        }
    });
});
const reportForm = document.getElementById("report-form");
document.addEventListener('DOMContentLoaded', () => {
    const reportForm = document.getElementById('report-form');

    if (!reportForm) {
        console.log('Report form not found on this page.');
        return;
    }

    reportForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('item-title').value.trim();
        const category = document.getElementById('item-category').value;
        const description = document.getElementById('item-description').value.trim();
        const location = document.getElementById('item-location').value;

        if (!title || !category || !location) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            const images = await Promise.all(
                selectedFiles.map(file => new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                }))
            );

            const items = JSON.parse(
                localStorage.getItem('reportedItems') || '[]'
            );

            items.unshift({
                title,
                category,
                description,
                location,
                status: 'lost',
                images,
                createdAt: Date.now()
            });

            localStorage.setItem('reportedItems', JSON.stringify(items));

            window.location.href = 'search.html';
        } catch (error) {
            console.error('Could not save report:', error);
            alert('Could not save the report. Try using smaller photos.');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('new-items-container');

    if (!container) {
        console.log('Не найден new-items-container в search.html');
        return;
    }

    const items = JSON.parse(localStorage.getItem('reportedItems') || '[]');

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.dataset.status = item.status || 'lost';

        const img = document.createElement('img');
        img.className = 'item-img';
        img.src = item.images && item.images.length
            ? item.images[0]
            : 'img/no-image.png';
        img.alt = item.title || 'Lost item';

        const title = document.createElement('h4');
        title.className = 'item-title';
        title.textContent = item.title || 'Untitled item';

        const location = document.createElement('p');
        location.textContent = item.location || 'Location not specified';

        const description = document.createElement('p');
        description.textContent = item.description || '';

        card.append(img, title, location, description);
        container.appendChild(card);
    });
});
// LOAD USER PROFILE FROM SUPABASE

document.addEventListener("DOMContentLoaded", async function () {

    console.log("Loading profile...");

    // Check current user
    const { data: { user }, error: userError } = await db.auth.getUser();

    console.log("User:", user);
    console.log("User error:", userError);

    if (userError || !user) {
        alert("Please log in first!");
        window.location.href = "index.html";
        return;
    }

    // Get account information
    const { data: account, error: accountError } = await db
        .from("accounts")
        .select("*")
        .eq("id", user.id)
        .single();

    console.log("Account:", account);
    console.log("Account error:", accountError);

    if (accountError) {
        document.getElementById("profile-name").textContent = "Profile not found";
        return;
    }

    // Show information on page
    document.getElementById("profile-name").textContent =
        account.full_name;

    document.getElementById("profile-email").textContent =
        account.email;

    document.getElementById("profile-student-id").textContent =
        account.student_id || "Student";

    document.getElementById("profile-verification").textContent =
        user.email_confirmed_at
            ? "✓ Email confirmed"
            : "Not verified";

});


console.log("PROFILE SCRIPT LOADED");

document.addEventListener("DOMContentLoaded", async function () {

    console.log("PAGE READY");

    // Check Supabase connection
    console.log("Database:", db);

    // Check current user
    const result = await db.auth.getUser();

    console.log("USER RESULT:", result);

    if (result.error || !result.data.user) {
        console.log("No logged-in user");
        return;
    }

    const user = result.data.user;

    // Load account
    const accountResult = await db
        .from("accounts")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

    console.log("ACCOUNT RESULT:", accountResult);

    if (accountResult.error) {
        console.log("ACCOUNT ERROR:", accountResult.error.message);
        return;
    }

    if (!accountResult.data) {
        console.log("No account row for this user");
        return;
    }

    // Display data
    document.getElementById("profile-name").textContent =
        accountResult.data.full_name;

    document.getElementById("profile-email").textContent =
        accountResult.data.email;

    document.getElementById("profile-student-id").textContent =
        accountResult.data.student_id || "Student";

    document.getElementById("profile-verification").textContent =
        user.email_confirmed_at ? "✓ Email confirmed" : "Not verified";

    console.log("PROFILE LOADED SUCCESSFULLY");

});

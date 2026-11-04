

console.log('Current page:', window.location.href);
console.log('Container:', document.getElementById('items-container'));
var container = document.getElementById('items-container');
var loading = document.getElementById('loading-message');

function escapeHtml(text) {
    return String(text || '').replace(/[&<>"']/g, function(char) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[char];
    });
}


function getTime(timestamp) {
    if (!timestamp) return 'just now';

    var date = new Date(timestamp);
    if (isNaN(date.getTime())) return 'just now';

    var seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return Math.floor(seconds / 60) + ' minutes ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + ' hours ago';

    return Math.floor(seconds / 86400) + ' days ago';
}


// function showItems(reports) {
//     if (!container) {
//     console.error('Element #items-container not found!');
//     return;
// }
//     container.innerHTML = '';

//     reports.sort(function(a, b) {
//         return new Date(b.created_at || 0) - new Date(a.created_at || 0);
//     });

//     if (loading) loading.style.display = 'none';

//     if (reports.length === 0) {
//         container.innerHTML = '<p>No reports yet.</p>';
//         return;
//     }

//     reports.forEach(function(item) {
//         var status = String(item.status || 'lost').toLowerCase();
//         var isFound = status === 'found';

//         var badgeClass = isFound ? 'Found' : 'Lost';
//         var badgeText = isFound ? 'FOUND' : 'LOST';
//         var image = item.imageUrl || item.image_url || 'img/no-image.png';

//         var card = document.createElement('div');
//         card.className = 'items';
        
// // Приводим категорию к нижнему регистру для фильтра (если пусто — 'other')
// var categoryAttr = String(item.category || 'other').toLowerCase();

// card.innerHTML = `
//     <div class="item-card" data-status="${isFound ? 'found' : 'lost'}" data-category="${categoryAttr}">
//     <div class="item-info">
//                     <img class="item-img"
//                          src="${escapeHtml(image)}"
//                          onerror="this.onerror=null; this.src='img/no-image.png';"
//                          alt="${escapeHtml(item.title)}">

//                     <div class="item-header">
//                         <span class="badge ${badgeClass}">${badgeText}</span>
//                         <span class="badge badge-green">ACTIVE</span>
//                         <h4 class="item-title">${escapeHtml(item.title || 'Untitled item')}</h4>
//                     </div>

//                     <p>${escapeHtml(item.description || '')}</p>
//                     <p>Category: ${escapeHtml(item.category || 'Other')}</p>
//                 </div>

//                 <div class="item-meta">
//                     <span>${escapeHtml(item.location || 'Unknown location')}</span>
//                     <span class="meta-dot">•</span>
//                     <span>${getTime(item.created_at)}</span>
//                 </div>

//                 <div class="item-stats">
//                     <span class="stat-icon">👁️</span> 0 views
//                     <span class="stat-divider">|</span>
//                     <span class="stat-icon">💬</span> 0 responses
//                 </div>
//             </div>
//         `;

        
               
        

//                         card.addEventListener('click', function() {
//             window.location.href = `post.html?id=${item.id}`;
//         });

//         card.style.cursor = 'pointer';

//         container.appendChild(card);
//     });

//     filterItems();
// }


// Глобальные переменные фильтров
var currentFilter = 'all';         // Для статусов
var currentCategoryFilter = 'all'; // Для категорий

// 1. Создание карточек (добавлен data-category)
function showItems(reports) {
    var container = document.getElementById('items-container');
    container.innerHTML = ''; // Очищаем контейнер

    reports.forEach(function(item) { 
        var status = String(item.status || 'lost').toLowerCase(); 
        var isFound = status === 'found'; 
        var badgeClass = isFound ? 'Found' : 'Lost'; 
        var badgeText = isFound ? 'FOUND' : 'LOST'; 
        var image = item.imageUrl || item.image_url || 'img/no-image.png'; 
        
        // Приводим категорию к нижнему регистру для точного совпадения с data-category
        var categoryAttr = String(item.category || 'other').toLowerCase();

        var card = document.createElement('div'); 
        card.className = 'items'; 
        card.innerHTML = ` 
            <div class="item-card" data-status="${isFound ? 'found' : 'lost'}" data-category="${categoryAttr}"> 
                <div class="item-info"> 
                    <img class="item-img" src="${escapeHtml(image)}" onerror="this.onerror=null; this.src='img/no-image.png';" alt="${escapeHtml(item.title)}"> 
                    <div class="item-header"> 
                        <span class="badge ${badgeClass}">${badgeText}</span> 
                        <span class="badge badge-green">ACTIVE</span> 
                        <h4 class="item-title">${escapeHtml(item.title || 'Untitled item')}</h4> 
                    </div> 
                    <p>${escapeHtml(item.description || '')}</p> 
                    <p>Category: ${escapeHtml(item.category || 'Other')}</p> 
                </div> 
                <div class="item-meta"> 
                    <span>${escapeHtml(item.location || 'Unknown location')}</span> 
                    <span class="meta-dot">•</span> 
                    <span>${getTime(item.created_at)}</span> 
                </div> 
                <div class="item-stats"> 
                    <span class="stat-icon">👁️</span> 0 views 
                    <span class="stat-divider">|</span> 
                    <span class="stat-icon">💬</span> 0 responses 
                </div> 
            </div> 
        `; 
        
        card.addEventListener('click', function() { 
            window.location.href = `post.html?id=${item.id}`; 
        }); 
        card.style.cursor = 'pointer'; 
        container.appendChild(card); 
    }); 
    
    filterItems(); 
}

// 2. Логика кнопок СТАТУСА (Lost / Found)
document.querySelectorAll('.status-btn').forEach(function(button) {
    button.addEventListener('click', function() {
        currentFilter = button.dataset.filter;
        
        // Снимаем active только внутри кнопок статуса
        document.querySelectorAll('.status-btn').forEach(function(btn) {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        filterItems();
    });
});

// 3. Логика кнопок КАТЕГОРИЙ (Electronic, Clothing и т.д.)
document.querySelectorAll('.category-btn').forEach(function(button) {
    button.addEventListener('click', function() {
        currentCategoryFilter = button.dataset.category;
        
        // Снимаем active только внутри кнопок категорий
        document.querySelectorAll('.category-btn').forEach(function(btn) {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        filterItems();
    });
});

// 4. Функция одновременной фильтрации
function filterItems() {
    document.querySelectorAll('#items-container .items').forEach(function(box) {
        var card = box.querySelector('.item-card');
        if (!card) return;

        var status = card.dataset.status;
        var category = card.dataset.category;

        // Элемент подходит, если совпадает статус И совпадает категория
        var matchesStatus = (currentFilter === 'all' || status === currentFilter);
        var matchesCategory = (currentCategoryFilter === 'all' || category === currentCategoryFilter);

        if (matchesStatus && matchesCategory) {
            box.style.display = '';
        } else {
            box.style.display = 'none';
        }
    });
}


async function loadItems() {
    if (loading) {
        loading.style.display = 'block';
        loading.textContent = 'Loading reports...';
    }

    try {
        const { data, error } = await db
            .from('items')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        showItems(data || []);
        console.log('Supabase data:', data);
console.log('Supabase error:', error);

    } catch (error) {
        console.error('Supabase read error:', error);

        if (loading) {
            loading.style.display = 'block';
            loading.textContent = 'Could not load reports: ' + error.message;
        }
    }
}

loadItems() 

var currentFilter = 'all';

document.querySelectorAll('.filter-btn').forEach(function(button) {
    button.addEventListener('click', function() {
        currentFilter = button.dataset.filter;

        document.querySelectorAll('.filter-btn').forEach(function(btn) {
            btn.classList.remove('active');
        });

        button.classList.add('active');

        filterItems();
    });
});
function filterItems() {
    document.querySelectorAll('#items-container .items').forEach(function(box) {
        var card = box.querySelector('.item-card');
        if (!card) return;

        // Читаем оба дата-атрибута
        var status = card.dataset.status;
        var category = card.dataset.category;

        // Проверяем соответствие обоим фильтрам
        var matchesStatus = (currentFilter === 'all' || status === currentFilter);
        var matchesCategory = (currentCategoryFilter === 'all' || category === currentCategoryFilter);

        // Показываем, только если выполняются оба условия
        if (matchesStatus && matchesCategory) {
            box.style.display = '';
        } else {
            box.style.display = 'none';
        }
    });
}

// Переменная для хранения текущей категории
var currentCategoryFilter = 'all'; 

// Обработчик для кнопок категорий (предполагается класс .category-btn)
document.querySelectorAll('.category-btn').forEach(function(button) {
    button.addEventListener('click', function() {
        currentCategoryFilter = button.dataset.category;
        
        // Переключаем активный класс (визуальное выделение кнопки)
        document.querySelectorAll('.category-btn').forEach(function(btn) {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        // Запускаем общую фильтрацию
        filterItems();
    });
});


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
    window.location.href = `post.html?id=${id}`;
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
//
document.addEventListener('DOMContentLoaded', () => {
    console.log("JavaScript работает");
    
    const buttons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.item-card');
    
    console.log("Кнопок найдено:", buttons.length);
    console.log("Карточек найдено:", items.length);

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Переключаем активный класс у кнопок
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Получаем значение фильтра из нажатой кнопки (например: electronic, keys)
            const filterValue = button.getAttribute('data-filter');
            console.log("Нажата кнопка категории:", filterValue);

            // Фильтруем карточки
            items.forEach(item => {
                // Карточки теперь должны иметь атрибут data-category
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
});

function openItem(id) {
    window.location.href = `post.html?id=${id}`;
}

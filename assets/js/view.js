const view = {
    expandedCategories: new Set(),

    renderPresets(controller) {
        const grid = document.getElementById('presetGrid');
        if (!grid) return;
        grid.innerHTML = '';

        if (typeof nmapPresets === 'undefined') return;

        const activePresetName = model.state.activePreset;

        nmapPresets.forEach(preset => {
            const isSelected = (preset.name === activePresetName);
            const card = document.createElement('button');
            card.type = 'button';
            card.className = `preset-card ${isSelected ? 'active' : ''}`;
            card.innerHTML = `
                <span class="p-icon">${preset.icon}</span>
                <span class="p-name">${preset.name}</span>
                <span class="p-desc">${preset.description}</span>
            `;
            card.addEventListener('click', () => controller.applyPreset(preset));
            grid.appendChild(card);
        });
    },

    renderOptions(config, controller) {
        const container = document.getElementById('scanOptions');
        if (!container) return;
        container.innerHTML = '';

        for (const [categoryKey, category] of Object.entries(config)) {
            const group = document.createElement('div');
            group.className = 'category-group';
            group.dataset.category = categoryKey;

            // Direct controleren of er items geselecteerd zijn, zodat hij open blijft na herbouw
            const hasSelectedItems = controller.countInCategory(categoryKey) > 0;
            if (this.expandedCategories.has(categoryKey) || hasSelectedItems) {
                group.classList.add('expanded');
                this.expandedCategories.add(categoryKey);
            }

            const selectedCount = controller.countInCategory(categoryKey);

            const headerBtn = document.createElement('button');
            headerBtn.type = 'button';
            headerBtn.className = 'category-header-btn';
            headerBtn.innerHTML = `
                <span class="chevron">▶</span>
                <span class="cat-title">${category.title}</span>
                <span class="cat-badge ${selectedCount === 0 ? 'zero' : ''}" id="badge_${categoryKey}">${selectedCount}</span>
            `;

            headerBtn.addEventListener('click', () => {
                group.classList.toggle('expanded');
                if (group.classList.contains('expanded')) {
                    this.expandedCategories.add(categoryKey);
                } else {
                    this.expandedCategories.delete(categoryKey);
                }
            });

            group.appendChild(headerBtn);

            const panel = document.createElement('div');
            panel.className = 'options-panel';

            if (category.exclusive) {
                const hint = document.createElement('div');
                hint.className = 'exclusive-hint';
                hint.textContent = 'Kies er maximaal één uit deze categorie';
                panel.appendChild(hint);
            }

            const grid = document.createElement('div');
            grid.className = 'options-grid';

            category.options.forEach((option, idx) => {
                const optionKey = `${categoryKey}_${idx}`;
                const isSelected = controller.isOptionSelected(optionKey);

                const optCard = document.createElement('label');
                optCard.className = `checkbox-option ${isSelected ? 'active' : ''}`;
                optCard.dataset.name = option.name.toLowerCase();
                optCard.dataset.desc = option.desc.toLowerCase();
                optCard.dataset.flag = option.flag.toLowerCase();

                const inputType = 'checkbox';
                const inputName = optionKey;

                optCard.innerHTML = `
                    <div class="checkbox-header">
                        <input type="${inputType}" name="${inputName}" ${isSelected ? 'checked' : ''}>
                        <div class="checkbox-label">
                            <strong>${option.flag}</strong>
                            <span>${option.name}</span>
                        </div>
                    </div>
                `;

                const checkbox = optCard.querySelector('input');
                checkbox.addEventListener('change', (e) => {
                    controller.handleOptionToggle(optionKey, option, categoryKey, e.target.checked);
                });

                if (option.valueType) {
                    const valContainer = document.createElement('div');
                    valContainer.className = `value-input-container ${isSelected ? 'active' : ''}`;
                    valContainer.innerHTML = `
                        <label>${option.valueLabel || 'Waarde:'}</label>
                        <input type="${option.valueType === 'number' ? 'number' : 'text'}" 
                               placeholder="${option.placeholder || ''}" 
                               value="${controller.getOptionValue(optionKey)}">
                    `;
                    const valInput = valContainer.querySelector('input');
                    valInput.addEventListener('input', (e) => {
                        controller.handleValueChange(optionKey, e.target.value);
                    });
                    optCard.appendChild(valContainer);
                }

                grid.appendChild(optCard);
            });

            panel.appendChild(grid);
            group.appendChild(panel);
            container.appendChild(group);
        }
    },

    refreshCategoryUI(categoryKey, controller) {
        const group = document.querySelector(`.category-group[data-category="${categoryKey}"]`);
        if (!group) return;

        group.classList.add('expanded');
        this.expandedCategories.add(categoryKey);

        const count = controller.countInCategory(categoryKey);
        const badge = document.getElementById(`badge_${categoryKey}`);
        if (badge) {
            badge.textContent = count;
            badge.className = `cat-badge ${count === 0 ? 'zero' : ''}`;
        }

        const category = nmapConfig[categoryKey];
        category.options.forEach((option, idx) => {
            const optionKey = `${categoryKey}_${idx}`;
            const isSelected = controller.isOptionSelected(optionKey);
            const grid = group.querySelector('.options-grid');
            if (!grid) return;
            const optCard = grid.children[idx];
            if (!optCard) return;

            const checkbox = optCard.querySelector('input');
            if (checkbox) checkbox.checked = isSelected;

            if (isSelected) {
                optCard.classList.add('active');
            } else {
                optCard.classList.remove('active');
            }

            const valContainer = optCard.querySelector('.value-input-container');
            if (valContainer) {
                if (isSelected) {
                    valContainer.classList.add('active');
                } else {
                    valContainer.classList.remove('active');
                }
            }
        });
    },

    updateCommand(command, explanation, flagCount) {
        const output = document.getElementById('commandOutput');
        if (output) output.textContent = command;

        const explBox = document.getElementById('commandExplanation');
        if (explBox) explBox.innerHTML = explanation;
    },

    applySearchFilter() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;
        const query = searchInput.value.toLowerCase().trim();

        const groups = document.querySelectorAll('.category-group');
        groups.forEach(group => {
            const options = group.querySelectorAll('.checkbox-option');
            let hasVisible = false;

            options.forEach(opt => {
                const name = opt.dataset.name;
                const desc = opt.dataset.desc;
                const flag = opt.dataset.flag;

                if (!query || name.includes(query) || desc.includes(query) || flag.includes(query)) {
                    opt.classList.remove('no-match');
                    hasVisible = true;
                } else {
                    opt.classList.add('no-match');
                }
            });

            if (query && hasVisible) {
                group.classList.add('expanded');
            } else if (!query) {
                group.classList.remove('expanded');
            }

            if (query && !hasVisible) {
                group.classList.add('hidden-by-search');
            } else {
                group.classList.remove('hidden-by-search');
            }
        });
    }
};

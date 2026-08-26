const controller = {
    init() {
        this.renderAll();
        this.setupEventListeners();
        this.updateCommand();
    },

    renderAll() {
        const config = model.getConfig();
        view.renderOptions(config, this);
        view.renderPresets(this);
    },

    setupEventListeners() {
        const targetInput = document.getElementById('target');
        if (targetInput) {
            targetInput.addEventListener('input', (e) => {
                model.setTarget(e.target.value);
                this.updateCommand();
            });
        }

        const sudoToggle = document.getElementById('sudoToggle');
        if (sudoToggle) {
            sudoToggle.addEventListener('change', (e) => {
                model.setSudo(e.target.checked);
                this.updateCommand();
            });
        }

        const advPanel = document.getElementById('advancedPanel');
        const toggleAdvBtn = document.getElementById('toggleAdvancedPanel');
        
        const advTrigger = document.querySelector('.card-header-toggle');

        if (advTrigger && advPanel) {
            advTrigger.addEventListener('click', () => {
                advPanel.classList.toggle('show');
                const isOpen = advPanel.classList.contains('show');
                if (toggleAdvBtn) {
                    toggleAdvBtn.textContent = isOpen ? 'Sluiten ▲' : 'Openen ▼';
                }
            });
        }

        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', () => view.applySearchFilter());
        }

        const copyBtn = document.getElementById('copyBtn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => this.copyCommand());
        }

        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                model.resetState();
                view.expandedCategories.clear(); // Leeg ook de openstaande accordeons bij reset
                if (targetInput) targetInput.value = '';
                if (sudoToggle) sudoToggle.checked = false;
                if (searchInput) searchInput.value = '';
                if (advPanel) advPanel.classList.remove('show');
                if (toggleAdvBtn) toggleAdvBtn.textContent = 'Openen ▼';
                this.renderAll();
                this.updateCommand();
            });
        }
    },

    handleOptionToggle(optionKey, option, categoryKey, checked) {
        model.toggleOption(optionKey, option, categoryKey, checked);
        
        view.expandedCategories.add(categoryKey);

        if (nmapConfig[categoryKey].exclusive) {
            view.renderOptions(model.getConfig(), this);
            view.applySearchFilter();

            const groupEl = document.querySelector(`.category-group[data-category="${categoryKey}"]`);
            if (groupEl) {
                groupEl.classList.add('expanded');
            }
        } else {
            view.refreshCategoryUI(categoryKey, this);
        }

        this.updateCommand();
    },

    handleValueChange(optionKey, value) {
        model.setOptionValue(optionKey, value);
        this.updateCommand();
    },

    isOptionSelected(key) {
        return key in model.state.selectedOptions;
    },

    getOptionValue(key) {
        return model.state.selectedOptions[key]?.value || '';
    },

    countInCategory(categoryKey) {
        return Object.keys(model.state.selectedOptions).filter(k => k.startsWith(categoryKey + '_')).length;
    },

    applyPreset(preset) {
        model.state.selectedOptions = {};
        model.state.activePreset = preset.name;
        preset.flags.forEach(flag => {
            const found = model.flagLookup(flag);
            if (found) {
                model.state.selectedOptions[found.key] = {
                    flag: found.option.flag,
                    name: found.option.name,
                    desc: found.option.desc,
                    value: '',
                    valueType: found.option.valueType,
                    placeholder: found.option.placeholder || '',
                    categoryKey: found.categoryKey
                };
                view.expandedCategories.add(found.categoryKey);
            }
        });
        
        const advPanel = document.getElementById('advancedPanel');
        const toggleAdvBtn = document.getElementById('toggleAdvancedPanel');
        if (advPanel && toggleAdvBtn) {
            advPanel.classList.add('show');
            toggleAdvBtn.textContent = 'Sluiten ▲';
        }

        this.renderAll();
        view.applySearchFilter();
        this.updateCommand();
    },

    updateCommand() {
        const command = model.generateCommand();
        const explanation = model.generateExplanation();
        const flagCount = Object.keys(model.state.selectedOptions).length;
        view.updateCommand(command, explanation, flagCount);
    },

    copyCommand() {
        const command = model.generateCommand();
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(command)
                .then(() => {
                    const btn = document.getElementById('copyBtn');
                    if (btn) {
                        const originalText = btn.textContent;
                        btn.textContent = 'Gekopieerd! ✓';
                        setTimeout(() => { btn.textContent = originalText; }, 2000);
                    }
                })
                .catch(err => console.error('Kopiëren mislukt', err));
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    controller.init();
});

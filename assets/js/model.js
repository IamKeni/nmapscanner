const model = {
    state: {
        target: '',
        useSudo: false,
        selectedOptions: {},
        activePreset: null
    },

    getConfig() {
        return nmapConfig;
    },

    setTarget(target) {
        this.state.target = target;
    },

    setSudo(useSudo) {
        this.state.useSudo = useSudo;
    },

    toggleOption(key, option, categoryKey, checked) {
        const cat = nmapConfig[categoryKey];

        if (cat.exclusive && this.state.selectedOptions[key]) {
            delete this.state.selectedOptions[key];
            return;
        }

        if (checked && cat.exclusive) {
            Object.keys(this.state.selectedOptions).forEach(k => {
                if (k.startsWith(categoryKey + '_') && k !== key) {
                    delete this.state.selectedOptions[k];
                }
            });
        }

        if (checked) {
            this.state.selectedOptions[key] = {
                flag: option.flag,
                name: option.name,
                desc: option.desc,
                value: '',
                valueType: option.valueType,
                placeholder: option.placeholder || '',
                categoryKey
            };
        } else {
            delete this.state.selectedOptions[key];
        }
    },

    setOptionValue(key, value) {
        if (this.state.selectedOptions[key]) {
            this.state.selectedOptions[key].value = value;
        }
    },

    generateCommand() {
        let command = this.state.useSudo ? 'sudo nmap' : 'nmap';
        const flags = [];

        for (const option of Object.values(this.state.selectedOptions)) {
            let flagStr = option.flag;
            if (option.valueType && option.value) {
                if (flagStr.includes('=')) {
                    const parts = flagStr.split('=');
                    flagStr = `${parts[0]}=${option.value}`;
                } else {
                    flagStr = `${flagStr} ${option.value}`;
                }
            } else if (option.valueType && !option.value) {
                continue;
            }
            flags.push(flagStr);
        }

        if (flags.length > 0) {
            command += ' ' + flags.join(' ');
        }
        if (this.state.target) {
            command += ' ' + this.state.target;
        }

        return command;
    },

    generateExplanation() {
        const options = Object.values(this.state.selectedOptions);
        if (options.length === 0 && !this.state.target) {
            return "Voer een doelwit in of kies een optie om de uitleg te lezen.";
        }

        let parts = [];
        options.forEach(opt => {
            parts.push(`<strong>${opt.name}</strong>: ${opt.desc.toLowerCase()}`);
        });

        let text = "Dit commando voert nmap uit ";
        if (this.state.useSudo) text += "met root-rechten (sudo) ";
        
        if (options.length > 0) {
            text += "en past de volgende opties toe:<br>• " + parts.join("<br>• ");
        } else {
            text += "zonder extra vlaggen.";
        }

        if (this.state.target) {
            text += `<br><br>🎯 <strong>Doelwit:</strong> ${this.state.target}`;
        }

        return text;
    },

    resetState() {
        this.state.target = '';
        this.state.useSudo = false;
        this.state.selectedOptions = {};
        this.state.activePreset = null;
    },
        
    flagLookup(flag) {
        for (const [catKey, cat] of Object.entries(nmapConfig)) {
            const idx = cat.options.findIndex(o => o.flag === flag);
            if (idx !== -1) {
                return { key: `${catKey}_${idx}`, option: cat.options[idx], categoryKey: catKey };
            }
        }
        return null;
    }
};

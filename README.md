# 🔍 Nmap Command Generator

Een moderne, gebruiksvriendelijke web-based tool voor het genereren van Nmap scan commando's. Perfect voor penetration testers, security researchers en netwerk administrators.

![Nmap Generator](https://img.shields.io/badge/nmap-command%20generator-00ff88?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

## ✨ Features

- 🎯 **Intuïtieve Interface** - Genereer complexe Nmap commando's met een paar klikken
- 🔧 **Volledig Configureerbaar** - Alle Nmap parameters ondersteund
- 💻 **MVC Architectuur** - Clean code structuur met gescheiden concerns
- 🎨 **Modern Dark Theme** - Cybersecurity-inspired design
- 📋 **One-Click Copy** - Kopieer commando's direct naar je clipboard
- ⚙️ **Dynamische Input** - Vul waardes in waar nodig (poorten, IP's, etc.)
- 🖥️ **OS-Aware** - Ondersteuning voor Linux, macOS en Windows

## 🚀 Live Demo

Bezoek [IamKenii.github.io/nmapscanner](https://Iamkeni.github.io/nmapscanner)

## 📦 Features Overzicht

### Ondersteunde Scan Types
- TCP SYN/Connect/ACK/Window/Maimon Scans
- UDP Scans
- NULL/FIN/Xmas Scans
- Version & OS Detection
- NSE Script Scans

### Geavanceerde Opties
- ⏱️ Timing Templates (T0-T5)
- 🛡️ Firewall/IDS Evasion technieken
- 🔍 Host Discovery methodes
- 📊 Diverse Output formaten
- 🎯 Custom poort specificaties
- 🧪 NSE Script categorieën

## 🛠️ Installatie

### Gebruik Online
Gewoon de website bezoeken - geen installatie nodig!

### Lokaal Draaien
```bash
git clone https://github.com/IamKenii/nmapscanner.git
cd nmap-generator
# Open index.html in je browser
```

## 📂 Project Structuur

```
nmap-generator/
├── index.html              # Hoofdpagina
└── assets/
    ├── css/
    │   └── style.css       # Styling (dark theme)
    └── js/
        ├── config.js       # Nmap configuratie (bewerkbaar!)
        ├── model.js        # Data model
        ├── view.js         # UI rendering
        └── controller.js   # Business logic
```

## ⚙️ Configuratie Aanpassen

Wil je custom opties toevoegen? Bewerk `config.js`:

```javascript
"scanTypes": {
    "name": "Scan Types",
    "options": [
        {
            "flag": "-sS",
            "name": "TCP SYN Scan",
            "desc": "Stealth scan",
            "valueType": null  // of "text", "number", "ip", "ports"
        }
        // Voeg hier je eigen opties toe!
    ]
}
```

## 🎯 Gebruik

1. **Selecteer Target** - Kies tussen enkele host of netwerkadres
2. **Kies Scan Opties** - Vink aan wat je wilt scannen
3. **Vul Waardes In** - Voor opties die extra input nodig hebben
4. **Selecteer OS** - Kies je attack machine OS
5. **Kopieer Commando** - Klik op de copy button

## 🤝 Bijdragen

Contributions zijn welkom! Voel je vrij om:
- 🐛 Bugs te rapporteren
- 💡 Features te suggereren
- 🔧 Pull requests te maken

## 📝 License

MIT License - gebruik het zoals je wilt!

## ⚠️ Disclaimer

Deze tool is bedoeld voor educatieve doeleinden en legitiem security testing. Scan alleen netwerken en systemen waarvoor je expliciete toestemming hebt. Ongeautoriseerd scannen is illegaal.

## 🙏 Credits

Gebouwd met ❤️ voor de infosec community.

---
**Made with 💚 by [IamKenii]**

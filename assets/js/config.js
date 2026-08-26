const nmapConfig = {
    scanTypes: {
        title: "Scan Typen",
        exclusive: true,
        options: [
            { flag: "-sS", name: "TCP SYN Scan", desc: "De standaard en meest populaire stealth-scan. Stuurt SYN pakketjes en wacht op antwoord zonder de verbinding volledig te voltooien." },
            { flag: "-sT", name: "TCP Connect Scan", desc: "Gebruikt de volledige systeemverbinding (connect). Handig als je geen root-rechten hebt." },
            { flag: "-sU", name: "UDP Scan", desc: "Scant op open UDP poorten zoals DNS, DHCP en SNMP. Kost vaak meer tijd." },
            { flag: "-sA", name: "TCP ACK Scan", desc: "Handig om te testen of poorten gefilterd worden door een firewall." },
            { flag: "-sN", name: "TCP Null Scan", desc: "Stuurt pakketjes zonder enige vlag aan (stiekem)." },
            { flag: "-sF", name: "TCP FIN Scan", desc: "Stuurt pakketjes met alleen de FIN vlag aan." },
            { flag: "-sX", name: "TCP Xmas Scan", desc: "Zet de FIN, PSH en URG vlaggen aan om de status van poorten te achterhalen." },
            { flag: "-sP", name: "Ping Scan (Host Discovery)", desc: "Scant alleen of de host(s) online zijn, zonder poorten te scannen." },
            { flag: "-sI", name: "Idle Scan", desc: "Een geavanceerde stealth-scan waarbij de scan via een externe 'zombie' host loopt.", valueType: "text", placeholder: "bijv. zombie_host_ip", valueLabel: "Zombie IP:" },
            { flag: "-sO", name: "IP Protocol Scan", desc: "Hiermee kun je achterhalen welke IP-protocollen (TCP, UDP, ICMP, etc.) het doelwit ondersteunt." }
        ]
    },
    portOptions: {
        title: "Poorten & Selectie",
        exclusive: false,
        options: [
            { flag: "-p-", name: "Alle poorten", desc: "Scant alle 65535 poorten van het doelwit.", valueType: false },
            { flag: "-p", name: "Specifieke poorten of bereik", desc: "Geef zelf poorten op (bijv. 80,443 of 1-1000).", valueType: "text", placeholder: "bijv. 80,443 of 1-1000", valueLabel: "Poort(en):" },
            { flag: "--top-ports", name: "Meest voorkomende poorten", desc: "Scant alleen de N meest gebruikte poorten.", valueType: "number", placeholder: "bijv. 100", valueLabel: "Aantal top poorten:" },
            { flag: "-F", name: "Snelle scan", desc: "Scant alleen de top 100 belangrijkste poorten." },
            { flag: "-r", name: "Geen willekeurige poortvolgorde", desc: "Scant de poorten op volgorde in plaats van willekeurig." },
            { flag: "--port-ratio", name: "Poorten ratio", desc: "Scant poorten vaker dan een bepaalde frequentiewaarde.", valueType: "text", placeholder: "bijv. 0.1", valueLabel: "Ratio waarde:" }
        ]
    },
    serviceOs: {
        title: "Service & OS Detectie",
        exclusive: false,
        options: [
            { flag: "-sV", name: "Service / Versie detectie", desc: "Probeert te achterhalen welke software en versienummer er achter een open poort draait." },
            { flag: "--version-intensity", name: "Versie-intensiteit", desc: "Hoe grondig nmap zoekt (0 = licht, 9 = intensief/alles proberen).", valueType: "number", placeholder: "bijv. 5", valueLabel: "Intensiteit (0-9):" },
            { flag: "-O", name: "Besturingssysteem detectie", desc: "Probeert te achterhalen welk OS (Windows, Linux, etc.) het doelwit gebruikt (vereist root)." },
            { flag: "--osscan-limit", name: "OS scan limiet", desc: "Beperkt OS-detectie tot doelen waarvan minstens één open en één gesloten poort is gevonden." },
            { flag: "--osscan-guess", name: "Aggressief OS raden", desc: "Raadt het besturingssysteem agressiever als het niet 100% matchend is." },
            { flag: "-A", name: "Aggressieve scan", desc: "Inclusief OS detectie, versie detectie, script scanning en traceroute." }
        ]
    },
    timing: {
        title: "Timing & Snelheid",
        exclusive: true,
        options: [
            { flag: "-T0", name: "Paranoïde (T0)", desc: "Extreem traag, bedoeld om IDS/firewalls te ontwijken." },
            { flag: "-T1", name: "Sneaky (T1)", desc: "Ook erg traag om detectie te voorkomen." },
            { flag: "-T2", name: "Polite (T2)", desc: "Belast de netwerkbandbreedte minder en is trager." },
            { flag: "-T3", name: "Normal (T3)", desc: "De standaard snelheid." },
            { flag: "-T4", name: "Aggressive (T4)", desc: "Snelle scan, ideaal voor lokale netwerken en betrouwbare verbindingen." },
            { flag: "-T5", name: "Insane (T5)", desc: "Extreem snel, kans op gemiste pakketjes (misschien onbetrouwbaar)." }
        ]
    },
    firewall: {
        title: "Firewall / Spoofing & Evasion",
        exclusive: false,
        options: [
            { flag: "-f", name: "Pakketjes fragmenteren", desc: "Fragmenteert de IP-pakketjes om firewalls of IDS te omzeilen." },
            { flag: "-D", name: "Decoy / Afleiden", desc: "Laat de scan lijken te komen vanaf meerdere valse IP-adressen.", valueType: "text", placeholder: "bijv. RND:10 of IP1,IP2", valueLabel: "Decoy IP's:" },
            { flag: "-S", name: "IP Spoofing", desc: "Verandert je eigen bron-IPadres in een ander adres.", valueType: "text", placeholder: "bijv. 1.2.3.4", valueLabel: "Vervalst IP:" },
            { flag: "-e", name: "Specifieke netwerkinterface", desc: "Dwingt Nmap om een specifieke netwerkkaart te gebruiken.", valueType: "text", placeholder: "bijv. eth0 of wlan0", valueLabel: "Interface:" },
            { flag: "--source-port", name: "Vaste bronpoort", desc: "Gebruikt een specifieke bronpoort (handig om firewalls te misleiden).", valueType: "text", placeholder: "bijv. 53 of 80", valueLabel: "Bronpoort:" },
            { flag: "--badsum", name: "Foutachtige TCP/UDP checksum", desc: "Stuurt pakketjes met een foute checksum om systemen met defecte filters te testen." }
        ]
    },
    advanced: {
        title: "Scripts & Output",
        exclusive: false,
        options: [
            { flag: "-Pn", name: "Geen Ping", desc: "Slaat de ping-stap over. Handig als een host niet reageert op pings, maar wel open staat." },
            { flag: "-v", name: "Verbose output", desc: "Laat meer informatie zien tijdens het scannen (meerdere -v is mogelijk)." },
            { flag: "-vv", name: "Extra Verbose", desc: "Nóg meer details tijdens het uitvoeren van de scan." },
            { flag: "-sC", name: "Standaard scripts", desc: "Voert de standaard set Nmap Scripting Engine (NSE) scripts uit." },
            { flag: "--script", name: "Specifiek script of categorie", desc: "Voer een specifiek script of scriptcategorie uit (bijv. vuln, default).", valueType: "text", placeholder: "bijv. vuln of http-title", valueLabel: "Script naam:" },
            { flag: "--script-args", name: "Script argumenten", desc: "Geef extra argumenten mee aan de gekozen scripts.", valueType: "text", placeholder: "bijv. user=admin", valueLabel: "Argumenten:" },
            { flag: "-oN", name: "Opslaan als tekstbestand", desc: "Slaat de scanresultaten op in een gewoon tekstbestand.", valueType: "text", placeholder: "bijv. scan.txt", valueLabel: "Bestandsnaam:" },
            { flag: "-oX", name: "Opslaan als XML", desc: "Slaat de resultaten op in XML-formaat (handig voor rapportages).", valueType: "text", placeholder: "bijv. scan.xml", valueLabel: "Bestandsnaam (XML):" },
            { flag: "--traceroute", name: "Traceroute", desc: "Traceert de netwerkroute naar elke host." }
        ]
    }
};

const nmapPresets = [
    {
        icon: "⚡",
        name: "Snelle Poortscan",
        description: "Ideaal om snel te kijken welke poorten openstaan op een lokaal netwerk.",
        flags: ["-sS", "-T4", "-F"]
    },
    {
        icon: "🔍",
        name: "Grondige Service Scan",
        description: "Controleert alle poorten en achterhaalt exact welke software er achter draait.",
        flags: ["-sS", "-sV", "-p-", "-T4"]
    },
    {
        icon: "🕵️‍♂️",
        name: "Stille / Stevige Scan",
        description: "Probeert onopgemerkt te blijven en slaat ping-detectie over.",
        flags: ["-sS", "-Pn", "-T2"]
    },
    {
        icon: "🎯",
        name: "Volledige Systeemcheck",
        description: "Inclusief OS-detectie, script scanning en agressieve timing.",
        flags: ["-A", "-T4"]
    }
];

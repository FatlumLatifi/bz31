export class Bezirk extends HTMLElement 
{
    constructor() { super(); }

    connectedCallback()
    {
        
        console.log("connectedCallback created text");
        this.getBezirkAsync().then(text => 
        { 
        let lines = text.split("\n");
        console.log(lines.length);
        for (let line of lines) 
        {
            let parts = line.split(",");
            const zab = new ZAbOrdnung();
            zab.zAb = parts[0];
            zab.gMapsUrl = parts[1];
            this.appendChild(zab);
        }
        });
    };

    async getBezirkAsync() {
        console.log("fetching csv");
        const result = await fetch("./31.csv");
        const text = await result.text();
        console.log(text);
        return text;
    }
}


export class ZAbOrdnung extends HTMLElement
{
    _zAb;
    _gMapsUrl;

    constructor() 
    { 
        super();
        this.innerHTML = 
        "<h1></h1><a><button><svg viewBox='0 0 24 24' fill='transparent'><path d='M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z' stroke='#000000' stroke-width='2'/><path d='M15.048 8.65798C15.3918 8.48607 15.7565 8.85082 15.5846 9.19464L12.338 15.6879C12.1515 16.0608 11.6174 16.0551 11.4389 15.6783L11.1265 15.0187C10.731 14.1838 10.0587 13.5116 9.22387 13.1161L8.56428 12.8037C8.18747 12.6252 8.18179 12.0911 8.55471 11.9046L15.048 8.65798Z' stroke='#000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg></button></a><button type='submit' end>Beenden</button>";
        const ender = this.getElementsByTagName("button")[1];
        ender.onclick = () => 
        {
            this.setAttribute("status", "beendet");
        }
    }

    get zAb() {
        return this._zAb;
    }
    set zAb(value) {
        this._zAb = value;
        this.getElementsByTagName("h1")[0].textContent = value;
    }
    get gMapsUrl() {
        return this._gMapsUrl;
    }
    set gMapsUrl(value) {
        this._gMapsUrl = value;

        const theA = this.getElementsByTagName("a")[0];
        theA.setAttribute("href", value);
        
        theA.addEventListener('click', function(event) {
             this.setAttribute("status", "geklickt"); localStorage.setItem(this.getElementsByTagName("h1")[0].textContent, "geklickt"); 
        });
        const theStatus = localStorage.getItem(this.getElementsByTagName("h1")[0].textContent) ?? "";
        switch (theStatus) {
            case "geklickt":
                this.setAttribute("status", "geklickt");
                break;
            case "beendet":
                this.setAttribute("status", "beendet");
                break;
            default:
                break;
        }
    }
}







export function registerAll()  
{ 
    customElements.define('be-zirk', Bezirk);
    customElements.define('zab-ordnung', ZAbOrdnung);
 }
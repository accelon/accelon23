import {ACC23} from './appconst.js'
export const loadSettings=(o)=>{
    const AppPrefix=ACC23.AppName+"."
    const allptks=ACC23.allptks;
    o.textsize=parseInt(localStorage.getItem(AppPrefix+'textsize')||'150') ||150;
    let _tofindhistory=localStorage.getItem(AppPrefix+'tofindhistory')||'[""]';
    let _favorites=localStorage.getItem(AppPrefix+'favorites')||'[]';
    let _selectedptks=localStorage.getItem(AppPrefix+'selectedptks')||JSON.stringify(ACC23.selectedptks)||'[]';
    o.palitrans=localStorage.getItem(AppPrefix+'palitrans')||'iast';
    o.tosim=localStorage.getItem(AppPrefix+'tosim')||'1';
    o.activeptk=localStorage.getItem(AppPrefix+'activeptk')||ACC23.activeptk;
    
    o.activeparaonly=localStorage.getItem(AppPrefix+'activeparaonly')||'1';
    o.newbie=localStorage.getItem(AppPrefix+'newbie')||'on';
    try {
        o.favorites=JSON.parse(_favorites);
        o.tofindhistory=JSON.parse(_tofindhistory);
        o.selectedptks=JSON.parse(_selectedptks).filter(it=>~allptks.indexOf(it));
        if (!o.selectedptks||!o.selectedptks.length) o.selectedptks=[o.activeptk]
        if (o.selectedptks.indexOf(o.activeptk)==-1) o.activeptk=o.selectedptks[0];
    } catch (e){
        console.log(e);
        o.favorites={};
    }
}

export const saveSettings=()=>{ //immediate save
    for (let key in settingsToBeSave) {
        localStorage.setItem(key, settingsToBeSave[key]);
        delete settingsToBeSave[key]
    }
    clearTimeout(updateTimer);
    // console.log('settings autosaved on',new Date())
}
let updateTimer=0;
const settingsToBeSave={};
export const updateSettings=_settings=>{
    const AppPrefix=ACC23.AppName+"."
    let updated=false,oldval;
    for (let key in _settings) {
        if (_settings.hasOwnProperty(key) ) {
            if (settings[key]!==_settings[key]) {
                let val=_settings[key];
                if (typeof val=='object') {
                    val=JSON.stringify(_settings[key]);
                    oldval=JSON.stringify( localStorage.getItem(key) );
                }
                if (val!==oldval) {
                    settingsToBeSave[AppPrefix+key]=val;
                    if (typeof _settings[key]=='object') {
                        settings[key]=JSON.parse(JSON.stringify(_settings[key]));
                    } else {
                        settings[key]=_settings[key];
                    }
                    updated=true;
                }    
            }
        }
    }
    
    if (updated) {
        clearTimeout(updateTimer);
        updateTimer=setTimeout(saveSettings,5000); //autosave in 5 seconds
    }
}
export const settings={};

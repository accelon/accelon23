export const AppPrefix='SC.'
export const allptks=['cs','sc','cs-zh','cs-xsq','cs-yh','cs-ccc','cs-hz','cs-kmj','cs-pku'];//'cs-bb'
export const defaultselectedptk=['sc','cs-xsq','cs-yh'];
import {BUILTINFAVORITE} from './constant.js'
export const loadSettings=()=>{
    const textsize=parseInt(localStorage.getItem(AppPrefix+'textsize')||'150') ||150;
    let _favorites=localStorage.getItem(AppPrefix+'favorites')||JSON.stringify(BUILTINFAVORITE);
    let _tofindhistory=localStorage.getItem(AppPrefix+'tofindhistory')||'[""]';
    let _selectedptks=localStorage.getItem(AppPrefix+'selectedptks')||JSON.stringify(defaultselectedptk);
    const palitrans=localStorage.getItem(AppPrefix+'palitrans')||'iast';
    const tosim=localStorage.getItem(AppPrefix+'tosim')||'1';
    let activeptk=localStorage.getItem(AppPrefix+'activeptk')||'cs-yh';
    
    const activeparaonly=localStorage.getItem(AppPrefix+'activeparaonly')||'1';
    const newbie=localStorage.getItem(AppPrefix+'newbie')||'on';
    
    let favorites=[],selectedptks=[],tofindhistory=[];
    try {
        favorites=JSON.parse(_favorites);
        tofindhistory=JSON.parse(_tofindhistory);
        selectedptks=JSON.parse(_selectedptks).filter(it=>~allptks.indexOf(it));
        if (!selectedptks||!selectedptks.length) selectedptks=['sc']
        if (selectedptks.indexOf(activeptk)==-1) activeptk=selectedptks[0];
    } catch (e){
        console.log(e);
        favorites={};
    }
    return {textsize,favorites,activeptk,tofindhistory,selectedptks,palitrans,tosim,newbie,activeparaonly};
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
export const settings=loadSettings();

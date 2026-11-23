import fs from 'node:fs/promises';
const editor="C:/Users/jerem/AppData/Local/Microsoft/Windows/Fonts/EDITOR'SNOTE-";
const isidora='C:/Windows/Fonts/ISIDORASANS-';
for(const [prefix,name]of [[editor,'editors-note'],[isidora,'isidora-sans']])for(const [style,weight]of [['REGULAR',400],['MEDIUM',500],['SEMIBOLD',600],['BOLD',700]]){
 await fs.copyFile(prefix+style+'.OTF','public/fonts/'+name+'-'+weight+'.otf');
}
console.log('Installed the eight supplied brand font files.');

// Prepara la cartella dist/ pubblicata da Render: solo le pagine e i file del sito,
// senza i file tecnici (Wix, README, note LEGGIMI) che non devono essere visibili online.
import {cpSync,mkdirSync,readdirSync,rmSync,statSync} from 'node:fs';
import {join,resolve} from 'node:path';

const root=resolve(import.meta.dirname,'..');
const dist=join(root,'dist');
const folders=['css','js','images','video','downloads','prova-gratuita'];
const rootFiles=readdirSync(root).filter(name=>/\.html$/.test(name)||name==='robots.txt');

rmSync(dist,{recursive:true,force:true});
mkdirSync(dist,{recursive:true});
for(const name of rootFiles)cpSync(join(root,name),join(dist,name));
for(const folder of folders)cpSync(join(root,folder),join(dist,folder),{recursive:true,filter:source=>statSync(source).isDirectory()||!/\.md$/i.test(source)});

const count=dir=>readdirSync(dir).reduce((n,name)=>{const p=join(dir,name);return n+(statSync(p).isDirectory()?count(p):1);},0);
console.log('Sito pronto in dist/: '+count(dist)+' file');

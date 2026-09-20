// Prepara la cartella dist/ pubblicata da Render: solo le pagine e i file del sito,
// senza i file tecnici (Wix, README, note LEGGIMI) che non devono essere visibili online.
import {cpSync,mkdirSync,readdirSync,readFileSync,rmSync,statSync} from 'node:fs';
import {join,resolve,basename} from 'node:path';

const root=resolve(import.meta.dirname,'..');
const dist=join(root,'dist');
const folders=['css','js','images','video','downloads','prova-gratuita'];
const rootFiles=readdirSync(root).filter(name=>/\.html$/.test(name)||name==='robots.txt'||name==='sitemap.xml');

// Foto e video pesanti non richiamati da nessuna pagina restano nel progetto ma non vengono pubblicati:
// sono vecchie versioni che rallenterebbero soltanto la pubblicazione.
const PESANTE=1.5*1024*1024;
const sorgenti=[...rootFiles.map(name=>join(root,name)),...['css','js','prova-gratuita'].flatMap(folder=>{
  const walk=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(join(dir,entry.name)):[join(dir,entry.name)]);
  return walk(join(root,folder)).filter(file=>/\.(html|css|js|mjs|json)$/i.test(file));
})].map(file=>readFileSync(file,'utf8')).join('\n');
const inutile=file=>statSync(file).size>PESANTE&&/\.(jpe?g|png|webp|gif|mp4|webm)$/i.test(file)&&!sorgenti.includes(basename(file));

rmSync(dist,{recursive:true,force:true});
mkdirSync(dist,{recursive:true});
for(const name of rootFiles)cpSync(join(root,name),join(dist,name));
for(const folder of folders)cpSync(join(root,folder),join(dist,folder),{recursive:true,filter:source=>statSync(source).isDirectory()||!/\.md$/i.test(source)&&!inutile(source)});

const count=dir=>readdirSync(dir).reduce((n,name)=>{const p=join(dir,name);return n+(statSync(p).isDirectory()?count(p):1);},0);
console.log('Sito pronto in dist/: '+count(dist)+' file');

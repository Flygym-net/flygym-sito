// Anteprima locale identica a Render: prepara dist/ e la serve su http://localhost:4300.
// Uso: node scripts/serve.mjs [porta]
import {createServer} from 'node:http';
import {createReadStream} from 'node:fs';
import {stat} from 'node:fs/promises';
import {extname,join,normalize,resolve,sep} from 'node:path';
import {execFileSync} from 'node:child_process';

const project=resolve(import.meta.dirname,'..');
execFileSync(process.execPath,[join(project,'scripts','build-render.mjs')],{stdio:'inherit'});
const root=join(project,'dist');
const port=Number(process.argv[2]||process.env.PORT||4300);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.mp4':'video/mp4','.pdf':'application/pdf','.txt':'text/plain; charset=utf-8'};

createServer(async(req,res)=>{
  try{
    let file=join(root,normalize(decodeURIComponent(new URL(req.url,'http://localhost').pathname)));
    if(file!==root&&!file.startsWith(root+sep))throw new Error('fuori dal sito');
    if((await stat(file).catch(()=>null))?.isDirectory())file=join(file,'index.html');
    const {size}=await stat(file),type=types[extname(file).toLowerCase()]||'application/octet-stream';
    // I video vanno serviti a pezzi (Range), altrimenti il browser non riesce a riprodurli.
    const range=/bytes=(\d*)-(\d*)/.exec(req.headers.range||'');
    if(range){
      const start=range[1]?Number(range[1]):Math.max(0,size-Number(range[2])),end=range[1]&&range[2]?Number(range[2]):size-1;
      res.writeHead(206,{'Content-Type':type,'Content-Range':`bytes ${start}-${end}/${size}`,'Accept-Ranges':'bytes','Content-Length':end-start+1});
      createReadStream(file,{start,end}).pipe(res);return;
    }
    res.writeHead(200,{'Content-Type':type,'Content-Length':size,'Accept-Ranges':'bytes'});
    createReadStream(file).pipe(res);
  }catch{
    res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Pagina non trovata');
  }
}).listen(port,()=>console.log('Sito FlyGym su http://localhost:'+port));

import * as fs from 'fs';
import db from '../../models';

export default async (req, res) => {
  const arquivo = await db.ArquivoRemessa.findById(req.params.id);

  if (!arquivo) {
    return res.status(404).end();
  }

  const path = `/tmp/${arquivo.get('nomeArquivo')}`;
  if (fs.existsSync(path)) { fs.unlinkSync(path); }

  fs.writeFileSync(path, arquivo.get('conteudoArquivo'), 'utf8');

  return res.download(path, arquivo.get('nomeArquivo'), () => {
    fs.unlinkSync(path);
  });
}
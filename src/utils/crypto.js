const crypto = require('crypto');
const key = crypto.createHash('sha256').update('saep_chave_secreta').digest();

function criptografar(texto) {
  const iv = crypto.randomBytes(16);
  const c = crypto.createCipheriv('aes-256-cbc', key, iv);
  return iv.toString('hex') + ':' + Buffer.concat([c.update(texto, 'utf8'), c.final()]).toString('hex');
}

function descriptografar(valor) {
  const [ivHex, dadosHex] = valor.split(':');
  const d = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(ivHex, 'hex'));
  return Buffer.concat([d.update(Buffer.from(dadosHex, 'hex')), d.final()]).toString('utf8');
}

module.exports = { criptografar, descriptografar };
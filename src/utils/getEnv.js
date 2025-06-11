function getImportMetaEnv(key) {
  
  return import.meta.env?.[key];
}

export function getEnv(key) {
  
  try {
    return getImportMetaEnv(key);
  } catch (e) {
    // ignore if not in a Vite environment
  }

  
  if (typeof process !== 'undefined' && process.env && key in process.env) {
    return process.env[key];
  }

  console.warn(`Environment variable "${key}" not found.`);
  return undefined;
}

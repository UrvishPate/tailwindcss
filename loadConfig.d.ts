import type { Config } from './types/config'
/**
 * Declares a function to load a configuration from a given path.
 * 
 * @param path - The path to the configuration file.
 * @returns A Config object loaded from the file at the given path.
 */
declare function loadConfig(path: string): Config
export = loadConfig
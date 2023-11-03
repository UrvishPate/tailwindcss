import fs from 'fs/promises'
import path from 'path'
import { rimraf } from 'rimraf'
let id = 0
/**
 * A function that creates a temporary directory, changes the current working directory to it,
 * executes a callback, then cleans up the temporary directory and returns the result of the callback.
 *
 * @template T
 * @param {() => Promise<T>} callback - The function to be executed in the temporary directory. It should return a promise that resolves with the desired result.
 * @returns {Promise<T>} - A promise that resolves with the result of the callback.
 */
export default async function (callback) {
  const workerId = `${process.env.JEST_WORKER_ID}-${id++}`
  const tmpPath = path.resolve(__dirname, `../__tmp_${workerId}`)
  const currentPath = process.cwd()

  await rimraf(tmpPath)
  await fs.mkdir(tmpPath)

  process.chdir(tmpPath)
  let result = await callback()
  process.chdir(currentPath)

  await rimraf(tmpPath)
  return result
}
// @ts-check
import packageJson from '../../../package.json'
/**
 * Prints a help message to the console.
 * 
 * @param {Object} args - The arguments to use for generating the help message.
 * @param {string} args.message - The main message to display.
 * @param {Array<string>} args.usage - An array of usage examples.
 * @param {Array<string>} args.commands - An array of command examples.
 * @param {Object} args.options - An object of options where each key is the option name and the value is the option description.
 * @returns {void}
 */
export function help({ message, usage, commands, options }) {
  let indent = 2

  // Render header
  console.log()
  console.log(`${packageJson.name} v${packageJson.version}`)

  // Render message
  if (message) {
    console.log()
    for (let msg of message.split('\n')) {
      console.log(msg)
    }
  }

  // Render usage
  if (usage && usage.length > 0) {
    console.log()
    console.log('Usage:')
    for (let example of usage) {
      console.log(' '.repeat(indent), example)
    }
  }

  // Render commands
  if (commands && commands.length > 0) {
    console.log()
    console.log('Commands:')
    for (let command of commands) {
      console.log(' '.repeat(indent), command)
    }
  }

  // Render options
  if (options) {
    let groupedOptions = {}
    for (let [key, value] of Object.entries(options)) {
      if (typeof value === 'object') {
        groupedOptions[key] = { ...value, flags: [key] }
      } else {
        groupedOptions[value].flags.push(key)
      }
    }

    console.log()
    console.log('Options:')
    for (let { flags, description, deprecated } of Object.values(groupedOptions)) {
      if (deprecated) continue

      if (flags.length === 1) {
        console.log(
          ' '.repeat(indent + 4 /* 4 = "-i, ".length */),
          flags.slice().reverse().join(', ').padEnd(20, ' '),
          description
        )
      } else {
        console.log(
          ' '.repeat(indent),
          flags.slice().reverse().join(', ').padEnd(24, ' '),
          description
        )
      }
    }
  }

  console.log()
}
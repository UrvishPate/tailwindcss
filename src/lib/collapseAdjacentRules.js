let comparisonMap = {
  atrule: ['name', 'params'],
  rule: ['selector'],
}
let types = new Set(Object.keys(comparisonMap))
/**
 * This function collapses adjacent CSS rules in a given root node.
 * It iterates over each node in the root, and if the node is of a certain type, 
 * it checks if it is the same as the current rule. If it is, it appends the node's children to the current rule and removes the node.
 * If the node is not the same as the current rule, it sets the current rule to the node.
 * After collapsing adjacent rules and at-rules, it collapses adjacent rules and at-rules that are children of at-rules.
 * This function does not handle rule nesting, as the user is expected to use a nesting plugin.
 *
 * @returns {Function} A function that takes a root node and collapses its adjacent rules.
 */
export default function collapseAdjacentRules() {
  function collapseRulesIn(root) {
    let currentRule = null
    root.each((node) => {
      if (!types.has(node.type)) {
        currentRule = null
        return
      }

      if (currentRule === null) {
        currentRule = node
        return
      }

      let properties = comparisonMap[node.type]

      if (node.type === 'atrule' && node.name === 'font-face') {
        currentRule = node
      } else if (
        properties.every(
          (property) =>
            (node[property] ?? '').replace(/\s+/g, ' ') ===
            (currentRule[property] ?? '').replace(/\s+/g, ' ')
        )
      ) {
        // An AtRule may not have children (for example if we encounter duplicate @import url(…) rules)
        if (node.nodes) {
          currentRule.append(node.nodes)
        }

        node.remove()
      } else {
        currentRule = node
      }
    })

    // After we've collapsed adjacent rules & at-rules, we need to collapse
    // adjacent rules & at-rules that are children of at-rules.
    // We do not care about nesting rules because Tailwind CSS
    // explicitly does not handle rule nesting on its own as
    // the user is expected to use a nesting plugin
    root.each((node) => {
      if (node.type === 'atrule') {
        collapseRulesIn(node)
      }
    })
  }

  return (root) => {
    collapseRulesIn(root)
  }
}
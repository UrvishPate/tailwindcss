declare namespace postcssValueParser {
  export interface BaseNode {
    sourceIndex: number
    sourceEndIndex: number
    value: string
  }

  export interface ClosableNode {
    unclosed?: true
  }

  export interface AdjacentAwareNode {
    before: string
    after: string
  }

  export interface CommentNode extends BaseNode, ClosableNode {
    type: 'comment'
  }

  export interface DivNode extends BaseNode, AdjacentAwareNode {
    type: 'div'
  }

  export interface FunctionNode extends BaseNode, ClosableNode, AdjacentAwareNode {
    type: 'function'
    nodes: Node[]
  }

  export interface SpaceNode extends BaseNode {
    type: 'space'
  }

  export interface StringNode extends BaseNode, ClosableNode {
    type: 'string'
    quote: '"' | "'"
  }

  export interface UnicodeRangeNode extends BaseNode {
    type: 'unicode-range'
  }

  export interface WordNode extends BaseNode {
    type: 'word'
  }

  export type Node =
    | CommentNode
    | DivNode
    | FunctionNode
    | SpaceNode
    | StringNode
    | UnicodeRangeNode
    | WordNode

  export interface CustomStringifierCallback {
    (nodes: Node): string | undefined
  }

  export interface WalkCallback {
    (node: Node, index: number, nodes: Node[]): void | boolean
  }

  export interface Dimension {
    number: string
    unit: string
  }

  export interface ParsedValue {
    nodes: Node[]
    walk(callback: WalkCallback, bubble?: boolean): this
  }

  export interface ValueParser {
    unit(value: string): Dimension | false
    stringify(nodes: Node | Node[], custom?: CustomStringifierCallback): string
    walk(nodes: Node[], callback: WalkCallback, bubble?: boolean): void
    new (value: string): ParsedValue
    (value: string): ParsedValue
  }
}
declare const postcssValueParser: postcssValueParser.ValueParser
export = postcssValueParser
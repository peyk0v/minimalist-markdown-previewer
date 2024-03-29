import Markdown from 'react-markdown'
import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from 'react-syntax-highlighter'
import { oneDark, prism } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import 'katex/dist/katex.min.css'
import rehypeKatex from 'rehype-katex'
import PreviewButtons from './PreviewButtons'
import rehypeRaw from 'rehype-raw'

const PreviewPanel = ({
  text,
  isDarkMode,
}: {
  text: string
  isDarkMode: boolean
}) => {
  // const SPACE_REGEX = /(?<!#+) /gm
  // const LINE_BREAK_REGEX = /(?<!`)\n(?!(?:`+|$))/g

  // const SPACE_REGEX = /(?<!`|[*]) (?![*]|`)/gm
  // const LINE_BREAK_REGEX = /(?<!`|[*])\n(?![*]|`)/g

  // const processedText = text
  //   .replace(SPACE_REGEX, '\u200b ')
  //   .replace(LINE_BREAK_REGEX, '\u200b\n')

  const processedText = text.replace(/ /gi, ' ')
  // .replace(/\n/g, '<br/>')

  return (
    <div className="relative">
      <div className="overflow-y-scroll overflow-x-hidden absolute w-full h-full p-2.5 font-mono text-zinc-900 dark:text-zinc-100 border border-orange-400 rounded-lg dark:bg-zinc-900 bg-zinc-50">
        <Markdown
          className="react-markdown-text break-normal prose prose-invert prose-img:rounded-xl prose-a:text-blue-500 prose-pre:bg-transparent prose-pre:p-1 prose-code:bg-zinc-200 dark:prose-code:bg-[#282C34] prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-xl prose-h6:text-xl prose-h1:text-zinc-900 prose-h2:text-zinc-900 prose-h3:text-zinc-900 prose-h4:text-zinc-900 dark:prose-h1:text-zinc-100 dark:prose-h2:text-zinc-100 dark:prose-h3:text-zinc-100 dark:prose-h4:text-zinc-100 font-mono text-zinc-900 dark:text-zinc-100"
          children={processedText}
          remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
          rehypePlugins={[rehypeKatex, rehypeRaw as any]}
          key={text}
          remarkRehypeOptions={{ allowDangerousHtml: true }}
          components={{
            code(props) {
              const { children, className, node, ...rest } = props
              console.log(children)
              const match = /language-(\w+)/.exec(className || '')
              return match ? (
                <SyntaxHighlighter
                  showLineNumbers={true}
                  {...(rest as SyntaxHighlighterProps)}
                  PreTag="div"
                  showInlineLineNumbers={true}
                  children={String(children).replace(/\n$/, '')}
                  language={match[1]}
                  style={isDarkMode ? oneDark : prism}
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              )
            },
          }}
        />
      </div>
      <PreviewButtons />
    </div>
  )
}

export default PreviewPanel

import { marked } from 'marked'

export const useMarkdown = () => {
  const render = (markdown: string) => marked.parse(markdown)
  return { render }
}

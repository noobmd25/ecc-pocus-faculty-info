import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Renders a module markdown document with the PHSU typography rules:
 * Open Sans for headings and tables, Noto Serif for H3 subheads,
 * Libre Baskerville for body reading. Styles live in globals.css
 * under `.module-doc`.
 */
export function MarkdownDoc({ children }: { children: string }) {
  return (
    <div className="module-doc">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node: _node, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer" />
          ),
          table: ({ node: _node, ...props }) => (
            <div className="table-wrap">
              <table {...props} />
            </div>
          ),
        }}
      >
        {children}
      </Markdown>
    </div>
  );
}

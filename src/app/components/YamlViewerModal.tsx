import React, { useMemo, useState } from 'react';
import { FileCodeIcon, CopyIcon, CheckIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './ui/accordion';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';

interface YamlSection {
  title: string;
  lines: string[];
  startLine: number;
}

/**
 * Splits a raw YAML document into its top-level sections (keys with no
 * leading indentation), preserving each section's original line numbers
 * for the gutter.
 */
function splitYamlIntoSections(raw: string): YamlSection[] {
  const allLines = raw.replace(/\r\n/g, '\n').split('\n');
  const sections: YamlSection[] = [];

  allLines.forEach((line, index) => {
    const topLevelMatch = /^([A-Za-z0-9_-]+):/.exec(line);
    if (topLevelMatch) {
      sections.push({ title: topLevelMatch[1], lines: [line], startLine: index + 1 });
    } else if (sections.length > 0) {
      sections[sections.length - 1].lines.push(line);
    }
  });

  // Drop trailing blank lines from each section for a tighter display.
  return sections.map((section) => {
    let end = section.lines.length;
    while (end > 0 && section.lines[end - 1].trim() === '') end--;
    return { ...section, lines: section.lines.slice(0, end) };
  });
}

/** Tokenizes a single line of YAML into styled spans for readability. */
function renderHighlightedLine(line: string, key: number) {
  // Comment lines
  const commentMatch = /^(\s*)(#.*)$/.exec(line);
  if (commentMatch) {
    return (
      <div key={key}>
        <span>{commentMatch[1]}</span>
        <span className="text-neutral-600 italic">{commentMatch[2]}</span>
      </div>
    );
  }

  // List item: "  - key: value" or "  - value"
  const listMatch = /^(\s*)(-\s)(.*)$/.exec(line);
  const indent = listMatch ? listMatch[1] : '';
  const dash = listMatch ? listMatch[2] : '';
  const rest = listMatch ? listMatch[3] : line;

  // "key: value" or "key:"
  const kvMatch = /^(\s*)([A-Za-z0-9_.-]+)(:)(\s?)(.*)$/.exec(rest);

  if (!kvMatch) {
    // Plain continuation line (e.g. multi-line string content, `- '*'`)
    return (
      <div key={key}>
        <span>{indent}</span>
        <span className="text-neutral-500">{dash}</span>
        <span>{highlightInlineValue(rest)}</span>
      </div>
    );
  }

  const [, leadWs, keyName, colon, sep, value] = kvMatch;

  return (
    <div key={key}>
      <span>{indent}</span>
      <span className="text-neutral-500">{dash}</span>
      <span>{leadWs}</span>
      <span className="text-sky-400">{keyName}</span>
      <span className="text-neutral-500">{colon}</span>
      <span>{sep}</span>
      {value && highlightInlineValue(value)}
    </div>
  );
}

/** Highlights a value fragment: booleans, numbers, strings, template vars. */
function highlightInlineValue(value: string): React.ReactNode {
  if (value === '') return null;

  if (/^(true|false)$/.test(value)) {
    return <span className="text-amber-400">{value}</span>;
  }
  if (/^-?\d+(\.\d+)?$/.test(value)) {
    return <span className="text-purple-400">{value}</span>;
  }
  if (value === '|-' || value === '|' || value === '>-' || value === '>') {
    return <span className="text-neutral-500">{value}</span>;
  }
  if (value === '{}' || value === '[]') {
    return <span className="text-neutral-500">{value}</span>;
  }

  // Split out {{ template }} placeholders from surrounding text/strings.
  const parts = value.split(/(\{\{[^}]*\}\})/g);
  return parts.map((part, i) => {
    if (/^\{\{[^}]*\}\}$/.test(part)) {
      return (
        <span key={i} className="text-pink-400">
          {part}
        </span>
      );
    }
    if (part === '') return null;
    return (
      <span key={i} className="text-emerald-300">
        {part}
      </span>
    );
  });
}

interface YamlViewerModalProps {
  yamlContent: string;
  triggerLabel?: string;
  className?: string;
}

export const YamlViewerModal: React.FC<YamlViewerModalProps> = ({
  yamlContent,
  triggerLabel = 'View YAML Code',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const sections = useMemo(() => splitYamlIntoSections(yamlContent), [yamlContent]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(yamlContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable — silently ignore.
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={`inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors ${className}`}
        >
          {triggerLabel} <FileCodeIcon className="w-3 h-3" />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-neutral-950 border border-white/10 text-white max-w-4xl w-[calc(100%-2rem)] max-h-[85vh] flex flex-col p-0 gap-0 overflow-hidden rounded-lg">
        <DialogHeader className="flex-row items-center justify-between gap-4 px-6 py-4 border-b border-white/10 space-y-0">
          <DialogTitle className="text-sm font-mono uppercase tracking-widest text-neutral-300 flex items-center gap-2">
            <FileCodeIcon className="w-4 h-4 text-neutral-500" />
            workflow_yaml_code.yaml
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="text-neutral-400 hover:text-white hover:bg-white/10 mr-8"
            aria-label="Copy YAML to clipboard"
          >
            {copied ? (
              <CheckIcon className="w-4 h-4 text-emerald-400" />
            ) : (
              <CopyIcon className="w-4 h-4" />
            )}
          </Button>
        </DialogHeader>

        <ScrollArea className="flex-1 min-h-0">
          <Accordion
            type="multiple"
            defaultValue={sections.length > 0 ? [sections[0].title] : []}
            className="px-2"
          >
            {sections.map((section) => (
              <AccordionItem
                key={section.title}
                value={section.title}
                className="border-white/10"
              >
                <AccordionTrigger className="px-4 text-sm font-mono uppercase tracking-widest text-neutral-300 hover:no-underline hover:text-white">
                  <span className="flex items-baseline gap-3">
                    {section.title}
                    <span className="text-xs font-normal tracking-normal text-neutral-600 normal-case">
                      {section.lines.length} lines
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-4">
                  <pre className="font-mono text-[13px] leading-relaxed overflow-x-auto px-4">
                    <code>
                      {section.lines.map((line, idx) => (
                        <div key={idx} className="flex hover:bg-white/[0.03]">
                          <span className="select-none text-right pr-4 text-neutral-700 shrink-0 w-10">
                            {section.startLine + idx}
                          </span>
                          <div className="whitespace-pre flex-1 text-neutral-300">
                            {renderHighlightedLine(line, idx)}
                          </div>
                        </div>
                      ))}
                    </code>
                  </pre>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

'use client'

import React from "react";
import { Card, IconCheckboxChecked, IconCross, IconLoader } from "@uikit/components";

type CodeRendererProps = {
  code?: React.ReactNode;
  tryRenderChildrenAsCode?: boolean;
  beforeCode?: string;
  afterCode?: string;
  language?: React.ReactNode;
  children?: React.ReactNode;
}

type CardExampleWrapperProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  note?: React.ReactNode;
  status?: "working" | "not-working" | "in-progress" | "not-started" | "none";
  children?: React.ReactNode;
  className?: string;
}

type CardExampleProps = CardExampleWrapperProps & CodeRendererProps

export function CardExample({
  title,
  subtitle,
  description,
  note,
  code,
  beforeCode,
  afterCode,
  language = "tsx",
  className,
  children,
  status = "working",
  tryRenderChildrenAsCode = false
}: CardExampleProps) {

  return (
    <CardExampleWrapper title={title} subtitle={subtitle} description={description} note={note} status={status} className={className}>
      <CodeRenderer code={code} beforeCode={beforeCode} afterCode={afterCode} language={language} tryRenderChildrenAsCode={tryRenderChildrenAsCode}>{children}</CodeRenderer>
    </CardExampleWrapper>
  );
}

export const CardExampleWrapper = ({ title, subtitle, description, note, status, children, className }: CardExampleWrapperProps) => {

  let Icon;
  let iconProps = {};

  if (status === "working") {
    Icon = <IconCheckboxChecked />;
    iconProps = { textColor: "success" };
  } else if (status === "not-working") {
    Icon = <IconCross />;
    iconProps = { textColor: "destructive" };
  }
  else if (status === "in-progress") {
    Icon = <IconLoader />;
    iconProps = { textColor: "warning" };
  }
  else if (status === "not-started") {
    Icon = <IconCross />;
    iconProps = { textColor: "muted" };
  }

  return (
    <Card title={title} subtitle={subtitle} description={description} Icon={Icon} iconProps={iconProps} className={className}>
      {children}
      {note}
    </Card>
  );

}


export const CodeRenderer = ({ code, beforeCode, afterCode, language, tryRenderChildrenAsCode, children }: CodeRendererProps) => {

  // Essayer de récupérer le code JSX automatiquement si pas de code fourni
  const extractedCode = tryRenderChildrenAsCode ? extractJSXFromChildren(children) : null;
  const displayCode = code || extractedCode;

  return (
    <>

      {/* Code Preview */}
      {(code !== null) && (code || displayCode || beforeCode || afterCode) && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Code {language && `(${language})`}</h4>
          <pre className="p-4 bg-muted rounded-lg min-w-0 overflow-x-auto">
            <code className={`text-sm text-muted-foreground font-mono language-${language} whitespace-pre-wrap break-all min-w-0`}>
              {beforeCode && `${beforeCode}\n`}
              {code?.toString().trim() || displayCode?.toString().trim()}
              {afterCode && `\n${afterCode}`}
            </code>
          </pre>
        </div>
      )}

      {/* Render Preview */}
      {children && <div className="space-y-2">
        <h4 className="text-sm font-medium text-foreground">Render</h4>
        <div className="p-6 rounded-lg bg-card border border-low-contrast min-w-0 overflow-x-auto"> {/* inset-shadow-[1px_1px_4px_rgba(0,0,0,0.25)] */}
          {children}
        </div>
      </div>}
    </>
  )

}






function extractJSXFromChildren(children: React.ReactNode, parentCompact = false): string {


  if (typeof children === 'string') {
    return children;
  }

  if (React.isValidElement(children)) {
    const element = children;
    const props = element.props as Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

    const explicitCompact = props['data-doc-compact'];
    const isCompact = explicitCompact === true || (explicitCompact !== false && parentCompact);



    const childrenCode = extractJSXFromChildren(props.children, isCompact);
    let componentName = '';
    if (typeof element.type === 'string') {
      componentName = element.type;
    } else if (typeof element.type === 'function') {
      const component = element.type as any; // eslint-disable-line @typescript-eslint/no-explicit-any

      // Get the default component name
      if (component.displayName) {
        componentName = component.displayName;
      } else if (component.name && component.name !== 'Component') {
        componentName = component.name;
      } else if (component.render && component.render.displayName) {
        componentName = component.render.displayName;
      } else if (component.type && component.type.displayName) {
        componentName = component.type.displayName;
      } else {
        componentName = 'Component';
      }
    } else {
      componentName = 'Component';
    }

    // Always use data-doc if provided, regardless of component type
    if (props['data-doc']) {
      componentName = props['data-doc'];
    }



    let jsx = `<${componentName}`;

    const propsToShow = { ...props };
    delete propsToShow.children;
    delete propsToShow['data-doc'];
    delete propsToShow['data-doc-compact'];
    delete propsToShow['data-doc-as'];
    delete propsToShow['data-doc-aschild'];

    // Add back props that were consumed by the component but should show in docs
    if (props['data-doc-as']) {
      propsToShow.as = props['data-doc-as'];
    }
    if (props['data-doc-aschild']) {
      propsToShow.asChild = true;
    }

    // Use data-doc-as to override the as prop display
    if (props['data-doc-as'] && props.as) {
      propsToShow.as = props['data-doc-as'];
    }

    // Remove internal/debug props that are not part of the public API we want to show
    delete propsToShow['data-atom'];

    // Remove empty className props
    if (propsToShow.className === '') {
      delete propsToShow.className;
    }

    // Remove default/empty classes that don't add value to documentation
    if (propsToShow.className === 'block') {
      delete propsToShow.className;
    }

    const propStrings: string[] = [];
    Object.entries(propsToShow).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (typeof value === 'string') {
          propStrings.push(`${key}="${value}"`);
        } else if (typeof value === 'boolean') {
          if (value) {
            propStrings.push(key);
          }
        } else if (typeof value === 'number') {
          propStrings.push(`${key}={${value}}`);
        } else {
          propStrings.push(`${key}={...}`);
        }
      }
    });

    if (propStrings.length > 0) {
      jsx += ' ' + propStrings.join(' ');
    }

    if (childrenCode) {
      if (isCompact) {
        const compactedChildren = childrenCode.replace(/\s*\n\s*/g, ' ').trim();

        jsx += `>${compactedChildren}</${componentName}>`;
      } else {
        if (childrenCode.includes('<') && childrenCode.includes('>')) {
          const indentedChildren = childrenCode
            .split('\n')
            .map(line => line.trim() ? `  ${line}` : line)
            .join('\n');
          jsx += `>\n${indentedChildren}\n</${componentName}>`;
        } else {
          jsx += `>${childrenCode}</${componentName}>`;
        }
      }
    } else {
      jsx += ' />';
    }

    return jsx;
  }

  if (Array.isArray(children)) {
    return children.map(child => extractJSXFromChildren(child, parentCompact)).join('\n');
  }

  return '';
}
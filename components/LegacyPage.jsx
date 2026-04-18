'use client';

import { useEffect, useRef } from 'react';

export default function LegacyPage({ bodyHtml, scripts = [] }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const appendedScripts = [];

    const bootScripts = async () => {
      for (const scriptHtml of scripts) {
        if (cancelled) return;

        const template = document.createElement('template');
        template.innerHTML = scriptHtml.trim();
        const oldScript = template.content.firstElementChild;
        if (!(oldScript instanceof HTMLScriptElement)) continue;

        const newScript = document.createElement('script');

        Array.from(oldScript.attributes).forEach((attribute) => {
          newScript.setAttribute(attribute.name, attribute.value);
        });

        const loadPromise = new Promise((resolve) => {
          if (oldScript.src) {
            newScript.addEventListener('load', resolve, { once: true });
            newScript.addEventListener('error', resolve, { once: true });
          } else {
            resolve();
          }
        });

        if (oldScript.textContent) {
          newScript.textContent = oldScript.textContent;
        }

        document.body.appendChild(newScript);
        appendedScripts.push(newScript);
        await loadPromise;
      }

      if (cancelled) return;
      document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: true }));
      window.dispatchEvent(new Event('load'));
    };

    bootScripts();

    return () => {
      cancelled = true;
      appendedScripts.forEach((script) => {
        script.remove();
      });
    };
  }, [scripts]);

  return (
    <div
      ref={containerRef}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: bodyHtml }}
    />
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A code block with a copy button.
 *
 * The button reports what actually happened: clipboard access can be refused
 * (insecure context, denied permission), and saying "Copied" when nothing was
 * copied is worse than saying nothing.
 */
export function CopyBlock({
  code,
  label,
  className = "",
}: {
  code: string;
  label?: string;
  className?: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setState("copied");
    } catch {
      setState("failed");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2200);
  }, [code]);

  return (
    <div className={`code ${className}`}>
      <div className="code__bar">
        <span className="mono code__label">{label ?? "shell"}</span>
        <button
          type="button"
          className="code__copy mono"
          onClick={copy}
          aria-live="polite"
        >
          {state === "copied"
            ? "Copied"
            : state === "failed"
              ? "Copy failed — select it"
              : "Copy"}
        </button>
      </div>
      <pre className="code__pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}

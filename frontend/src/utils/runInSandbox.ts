function wrapWithReturn(code: string): string {
    const lines = code.split('\n');

    let lastLineIndex = -1;
    for (let i = lines.length - 1; i >= 0; i--) {
        if (lines[i].trim()) {
            lastLineIndex = i;
            break;
        }
    }

    if (lastLineIndex === -1) return code;

    const lastLine = lines[lastLineIndex].trim();

    if (lastLine.startsWith('return')) return code;

    const forbidden = [
        'if',
        'for',
        'while',
        'switch',
        'try',
        'catch',
        'function',
        'class',
        'const',
        'let',
        'var',
        '{',
        '}'
    ];

    if (forbidden.some(k => lastLine.startsWith(k))) {
        return code;
    }

    const cleanLastLine = lastLine.replace(/;$/, '');

    const newLines = [...lines];
    newLines[lastLineIndex] = `return (${cleanLastLine});`;

    return newLines.join('\n');
}


export function runInSandbox(
    userCode: string,
    timeoutMs = 1000
): Promise<string> {
    return new Promise(resolve => {
        const iframe = document.createElement("iframe");
        iframe.sandbox.add("allow-scripts");
        iframe.style.display = "none";

        let finished = false;

        const onMessage = (e: MessageEvent) => {
            if (finished) return;
            finished = true;
            cleanup();
            resolve(String(e.data));
        };

        const cleanup = () => {
            window.removeEventListener("message", onMessage);
            iframe.remove();
            clearTimeout(timer);
        };

        window.addEventListener("message", onMessage);

        const timer = setTimeout(() => {
            if (finished) return;
            finished = true;
            cleanup();
            resolve("Превышено время выполнения (возможен бесконечный цикл)");
        }, timeoutMs);

        document.body.appendChild(iframe);

        const wrappedCode = wrapWithReturn(userCode);

        iframe.srcdoc = `
      <script>
        setTimeout(() => {
          try {
            const result = (function() {
              ${wrappedCode}
            })();
            parent.postMessage(
              result !== undefined ? result : "undefined",
              "*"
            );
          } catch (e) {
            parent.postMessage("Ошибка " + e.message, "*");
          }
        }, 0);
      <\/script>
    `;
    });
}

export function repeatChar(char: string, count: number): string {
    if (count <= 0) return '';
    return char.repeat(count);
}

export function centerText(text: string, width: number, padChar: string = ' '): string {
    if (text.length >= width) return text;
    const padding = width - text.length;
    const leftPad = Math.floor(padding / 2);
    const rightPad = padding - leftPad;
    return repeatChar(padChar, leftPad) + text + repeatChar(padChar, rightPad);
}

export function wrapLines(lines: string[]): string {
    return lines.join('\n');
}

export function calculateWidth(title: string, minWidth: number): number {
    // Basic heuristic: title length + 4 (for minimal padding) or minWidth, whichever is larger
    // However, some styles might need more padding. We'll stick to a reasonable default.
    const padding = 10;
    return Math.max(minWidth, title.length + padding);
}

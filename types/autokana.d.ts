declare module 'vanilla-autokana' {
  export interface Option {
    katakana: boolean;
    debug: boolean;
    checkInterval: number;
  }
  export function bind(
    name: string,
    furigana?: string,
    option?: Partial<Option>,
  ): AutoKana;
  class AutoKana {
    constructor(name: string, furigana?: string, option?: Partial<Option>);
    public getFurigana(): string;
    public start(): void;
    public stop(): void;
    public toggle(event: Event): void;
  }
}

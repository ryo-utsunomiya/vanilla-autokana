declare module 'vanilla-autokana' {
  type Bindable = string | Element
  export interface Option {
    katakana: boolean;
    debug: boolean;
    checkInterval: number;
  }
  export function bind(
    name: Bindable,
    furigana?: Bindable,
    option?: Partial<Option>,
  ): AutoKana;
  class AutoKana {
    constructor(name: Bindable, furigana?: Bindable, option?: Partial<Option>);
    public getFurigana(): string;
    public start(): void;
    public stop(): void;
    public toggle(event: Event): void;
  }
}

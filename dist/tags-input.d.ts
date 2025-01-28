import { Options, Tag } from './types/types';
export declare class TagsInput {
    contentElement: HTMLElement;
    fileInputName: string;
    options: Options;
    possibleTags: Tag[];
    selectedTags: Tag[];
    constructor(fileInputName: string, options: Options);
    bindEvents(): void;
    refreshComponent(): void;
    moveTagFromSelectedToPossible(targetSelectedTagId: string): void;
    moveTagFromPossibleToSelected(targetPossibleTagId: string): void;
    /**
     * @param id string - Keep it string type.
     * @param targetArray
     */
    findIndexOfItemById(id: string, targetArray: Tag[]): number;
    getComponentHtml(): string;
    addTagToPossibilities(tag: Tag): void;
    addTagToSelected(tag: Tag): void;
    createElements(): void;
}
//# sourceMappingURL=tags-input.d.ts.map
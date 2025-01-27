import { Options, Tag } from './types/types';

export class TagsInput {
  contentElement: HTMLElement;
  fileInputName: string;
  options: Options = {
    createOnElementWithsSelector: null,
    defaultPossibleTags: [],
    defaultSelectedTags: [],
    elementLabel: '',
    questionMarkHelpText: '',
  };
  possibleTags: Tag[];
  selectedTags: Tag[];
  constructor(fileInputName: string, options: Options) {
    this.fileInputName = fileInputName;

    const {
      createOnElementWithsSelector,
      defaultPossibleTags,
      defaultSelectedTags,
      elementLabel,
      questionMarkHelpText,
    } = options;
    this.options.createOnElementWithsSelector = createOnElementWithsSelector ?? null;
    this.options.defaultSelectedTags = defaultSelectedTags ?? [];
    this.options.defaultPossibleTags = defaultPossibleTags ?? [];
    this.options.questionMarkHelpText =
      questionMarkHelpText ??
      'Napište klíčové slovo a stiskněte čárku nebo enter. Můžete také vybrat předvolená klíčová slova níže.';
    this.options.elementLabel = elementLabel ?? 'Klíčová slova';
    this.selectedTags = [...this.options.defaultSelectedTags];
    this.possibleTags = [...this.options.defaultPossibleTags];

    if (this.options.createOnElementWithsSelector) {
      this.contentElement = document.querySelector(
        this.options.createOnElementWithsSelector,
      ) as HTMLElement;
    } else {
      // possible <input name="${this.fileInputName}"/> = can't edit innerHTML
      this.contentElement = document.createElement('div');
      this.contentElement.setAttribute('data-tags-input', this.fileInputName);
    }

    this.createElements();
    this.bindEvents();
  }

  bindEvents(): void {
    this.contentElement.addEventListener('keyup', (e) => {
      const target = e.target as HTMLInputElement;

      if (!target) return;

      if (e.key === 'Enter' || e.key === ',') {
        const clearedTargetValue = target.value.replace(',', '');
        const newTag = {
          id: clearedTargetValue,
          label: clearedTargetValue,
        } as Tag;
        target.value = '';
        this.addTagToSelected(newTag);
        (this.contentElement.querySelector('input[type="text"]') as HTMLInputElement).focus();
      }
    });

    this.contentElement.addEventListener('click', (e) => {
      const target = e.target as HTMLDivElement;

      if (!target) return;

      if (target.matches('.tag-remove')) {
        this.moveTagFromSelectedToPossible(
          target.parentElement?.getAttribute('data-tag-id') as string,
        );
        this.refreshComponent();
      }

      if (target.matches('.tag-possibility')) {
        this.moveTagFromPossibleToSelected(target.getAttribute('data-tag-id') as string);
        this.refreshComponent();
      }
    });
  }

  refreshComponent(): void {
    this.contentElement.innerHTML = this.getComponentHtml();
  }

  moveTagFromSelectedToPossible(targetSelectedTagId: string): void {
    const targetTag =
      this.selectedTags[this.findIndexOfItemById(targetSelectedTagId, this.selectedTags)];
    this.possibleTags.push(targetTag);
    this.selectedTags.splice(this.findIndexOfItemById(targetSelectedTagId, this.selectedTags), 1);
  }

  moveTagFromPossibleToSelected(targetPossibleTagId: string): void {
    const targetTag =
      this.possibleTags[this.findIndexOfItemById(targetPossibleTagId, this.possibleTags)];
    this.selectedTags.push(targetTag);
    this.possibleTags.splice(this.findIndexOfItemById(targetPossibleTagId, this.possibleTags), 1);
  }

  /**
   * @param id string - Keep it string type.
   * @param targetArray
   */
  findIndexOfItemById(id: string, targetArray: Tag[]): number {
    let targetTagIndex = -1;
    targetArray.forEach((tag, index) => {
      if (tag.id.toString() === id) {
        targetTagIndex = index;
      }
    });
    return targetTagIndex;
  }

  getComponentHtml(): string {
    console.log(this.fileInputName);
    return `
      <div class="tags-input-wrapper"> 
        <label for="tagsInput_${this.fileInputName}">${this.options.elementLabel}</label>
        <div class="tags-container" id="tagsInput_${this.fileInputName}wrapper">
          <div class="tags-selected-wrapper">
            ${this.selectedTags.map((tag: Tag): string => {
                return `<div class="tag" data-tag-id="${tag.id}">
                <span class="tag-text">${tag.label}</span>
                <span class="tag-remove">X</span>
                </div>`;
              })
              .join('')}
          </div>
          <input class="form-control" id="tagsInput_${this.fileInputName}" name="${this.fileInputName}" type="text">
          <div class="" data-title="${
              this.options.questionMarkHelpText
            }">
          </div>
        </div>
        <div class="Tags-available" id="available-tags">
          ${this.possibleTags
            .map((tag: Tag): string => {
              return `<div class="tag tag-possibility" data-tag-id="${tag.id}">${tag.label}</div>`;
            })
            .join('')}
        </div>
      </div>
    `;
  }

  addTagToPossibilities(tag: Tag) {
    this.possibleTags.push(tag);
    this.refreshComponent();
  }

  addTagToSelected(tag: Tag) {
    this.selectedTags.push(tag);
    this.refreshComponent();
  }

  createElements(): void {
    this.refreshComponent();
  }
}

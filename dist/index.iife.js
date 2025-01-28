var TagsInput=function(a){"use strict";const h="";var l=(r=>{})();class o{constructor(e,t){this.options={createOnElementWithsSelector:null,defaultPossibleTags:[],defaultSelectedTags:[],elementLabel:"",questionMarkHelpText:""},this.fileInputName=e;const{createOnElementWithsSelector:s,defaultPossibleTags:i,defaultSelectedTags:n,elementLabel:d,questionMarkHelpText:c}=t;this.options.createOnElementWithsSelector=s??null,this.options.defaultSelectedTags=n??[],this.options.defaultPossibleTags=i??[],this.options.questionMarkHelpText=c??"Napište klíčové slovo a stiskněte čárku nebo enter. Můžete také vybrat předvolená klíčová slova níže.",this.options.elementLabel=d??"Klíčová slova",this.selectedTags=[...this.options.defaultSelectedTags],this.possibleTags=[...this.options.defaultPossibleTags],this.options.createOnElementWithsSelector?this.contentElement=document.querySelector(this.options.createOnElementWithsSelector):(this.contentElement=document.createElement("div"),this.contentElement.setAttribute("data-tags-input",this.fileInputName)),this.createElements(),this.bindEvents()}bindEvents(){this.contentElement.addEventListener("keyup",e=>{const t=e.target;if(t&&(e.key==="Enter"||e.key===",")){const s=t.value.replace(",",""),i={id:s,label:s};t.value="",this.addTagToSelected(i),this.contentElement.querySelector('input[type="text"]').focus()}}),this.contentElement.addEventListener("click",e=>{var s;const t=e.target;t&&(t.matches(".tag-remove")&&(this.moveTagFromSelectedToPossible((s=t.parentElement)==null?void 0:s.getAttribute("data-tag-id")),this.refreshComponent()),t.matches(".tag-possibility")&&(this.moveTagFromPossibleToSelected(t.getAttribute("data-tag-id")),this.refreshComponent()))})}refreshComponent(){this.contentElement.innerHTML=this.getComponentHtml()}moveTagFromSelectedToPossible(e){const t=this.selectedTags[this.findIndexOfItemById(e,this.selectedTags)];this.possibleTags.push(t),this.selectedTags.splice(this.findIndexOfItemById(e,this.selectedTags),1)}moveTagFromPossibleToSelected(e){const t=this.possibleTags[this.findIndexOfItemById(e,this.possibleTags)];this.selectedTags.push(t),this.possibleTags.splice(this.findIndexOfItemById(e,this.possibleTags),1)}findIndexOfItemById(e,t){let s=-1;return t.forEach((i,n)=>{i.id.toString()===e&&(s=n)}),s}getComponentHtml(){return console.log(this.fileInputName),`
      <div class="tags-input-wrapper"> 
        <label for="tagsInput_${this.fileInputName}">${this.options.elementLabel}</label>
        <div class="tags-container" id="tagsInput_${this.fileInputName}wrapper">
          <div class="tags-selected-wrapper">
            ${this.selectedTags.map(e=>`<div class="tag" data-tag-id="${e.id}">
                <span class="tag-text">${e.label}</span>
                <span class="tag-remove">X</span>
                </div>`).join("")}
          </div>
          <input class="form-control" id="tagsInput_${this.fileInputName}" name="${this.fileInputName}" type="text">
          <div class="" data-title="${this.options.questionMarkHelpText}">
          </div>
        </div>
        <div class="Tags-available" id="available-tags">
          ${this.possibleTags.map(e=>`<div class="tag tag-possibility" data-tag-id="${e.id}">${e.label}</div>`).join("")}
        </div>
      </div>
    `}addTagToPossibilities(e){this.possibleTags.push(e),this.refreshComponent()}addTagToSelected(e){this.selectedTags.push(e),this.refreshComponent()}createElements(){this.refreshComponent()}}return a.General=l,a.TagsInput=o,Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}),a}({});

class BoxShadowGenerator {
    constructor(
        horizontalInput,
        horizontalRefInput, 
        verticalInput, 
        verticalRefInput, 
        blurInput, 
        blurRefInput, 
        spreadInput, 
        spreadRefInput,
        colorInput,
        colorRefInput, 
        opacityInput,
        opacityRefInput,
        insetInput,
        previewBoxDiv,
        ruleP,
        webkitRuleP,
        mozRuleP
    ) {
        this.horizontalInput = horizontalInput;
        this.horizontalRefInput = horizontalRefInput;
        this.verticalInput = verticalInput;
        this.verticalRefInput = verticalRefInput;
        this.blurInput = blurInput;
        this.blurRefInput = blurRefInput;
        this.spreadInput = spreadInput;
        this.spreadRefInput = spreadRefInput;
        this.colorInput = colorInput,
        this.colorRefInput = colorRefInput, 
        this.opacityInput = opacityInput,
        this.opacityRefInput = opacityRefInput,
        this.insetInput = insetInput,
        this.previewBoxDiv = previewBoxDiv;
        this.ruleP = ruleP;
        this.webkitRuleP = webkitRuleP;
        this.mozRuleP = mozRuleP;
    };

    initalize() {
        this.horizontalRefInput.value = this.horizontalInput.value;
        this.verticalRefInput.value = this.verticalInput.value;
        this.blurRefInput.value = this.blurInput.value;
        this.spreadRefInput.value = this.spreadInput.value;
        this.colorRefInput.value = this.colorInput.value;
        this.opacityRefInput.value = this.opacityInput.value;

        this.applyRule();
        this.showRule();
    };

    // Método(função) que aplica a regra
    applyRule() {
        const isInset = this.insetInput.checked === true ? 'inset' : '';
        const rgbValue = this.hexToRgb(this.colorRefInput.value);
        const shadowRule = `${isInset} ${this.horizontalRefInput.value}px ${this.verticalRefInput.value}px ${this.blurRefInput.value}px ${this.spreadRefInput.value}px rgba(${rgbValue}, ${this.opacityRefInput.value})`;

        // Propriedade que recebe a regra
        this.previewBoxDiv.style.boxShadow = shadowRule;
        this.currentRule = shadowRule;
    };

    // Método(função) que exibe a regra na área de regras
    showRule() {
        this.ruleP.innerText = this.currentRule;
        this.webkitRuleP.innerText = this.currentRule;
        this.mozRuleP.innerText = this.currentRule;
    };

    // Metodo(função) que atualiza o valor da regra exibido em tela
    updateValue(refInput, value) {
        refInput.value = value;
        this.applyRule();
        this.showRule();
        return;
    };

    // Método(função) que converte hexadecimal para rgb
    hexToRgb(hex) {
        const result = `${("0x" + hex[1] + hex[2]) | 0}, ${("0x" + hex[3] + hex[4]) | 0}, ${("0x" + hex[5] + hex[6]) | 0}`;
        return result;
    }

    // Método(função) para copiar conteúdo de um elemento
    copyRules(item) {
        // Expressão regular para remover quebras de linha
        const content = item.innerText.replace(/^\s*\n/gm, '');

        navigator.clipboard.writeText(content).then(() => {
            copyRulesP.style.color = 'red';
            copyRulesP.innerText = 'Regra copiada com sucesso!'
            setTimeout(() => {
                copyRulesP.style.color = '#000000';
                copyRulesP.innerText = 'Clique no quadro para copiar as regras';
            }, 2000);
        });
    }
};

// Seleção de elementos
const horizontalInput = document.querySelector('#horizontal');
const horizontalRefInput = document.querySelector('#horizontal-value');
const verticalInput = document.querySelector('#vertical');
const verticalRefInput = document.querySelector('#vertical-value');
const blurInput = document.querySelector('#blur');
const blurRefInput = document.querySelector('#blur-value');
const spreadInput = document.querySelector('#spread');
const spreadRefInput = document.querySelector('#spread-value');

const colorInput = document.querySelector('#color');
const colorRefInput = document.querySelector('#color-value');
const opacityInput = document.querySelector('#opacity');
const opacityRefInput = document.querySelector('#opacity-value');
const inset = document.querySelector('#inset');

const previewBoxDiv = document.querySelector('#box');

const rulesDiv = document.querySelector('#rules-area')
const ruleP = document.querySelector('#rule span');
const webkitRuleP = document.querySelector('#webkit-rule span');
const mozRuleP = document.querySelector('#moz-rule span');
const copyRulesP = document.querySelector('#copy-instructions');

const boxShadow = new BoxShadowGenerator(
    horizontalInput,
    horizontalRefInput, 
    verticalInput, 
    verticalRefInput, 
    blurInput, 
    blurRefInput, 
    spreadInput, 
    spreadRefInput,
    colorInput,
    colorRefInput, 
    opacityInput,
    opacityRefInput,
    inset,
    previewBoxDiv,
    ruleP,
    webkitRuleP,
    mozRuleP
);

boxShadow.initalize();

// Eventos
horizontalInput.addEventListener('input', (e) => {
    const value = e.target.value;
    boxShadow.updateValue(horizontalRefInput, value);
});

verticalInput.addEventListener('input', (e) => {
    const value = e.target.value;
    boxShadow.updateValue(verticalRefInput, value);
});

blurInput.addEventListener('input', (e) => {
    const value = e.target.value;
    boxShadow.updateValue(blurRefInput, value);
});

spreadInput.addEventListener('input', (e) => {
    const value = e.target.value;
    boxShadow.updateValue(spreadRefInput, value);
});

colorInput.addEventListener('input', (e) => {
    const value = e.target.value;
    boxShadow.updateValue(colorRefInput, value);
});

opacityInput.addEventListener('input', (e) => {
    const value = e.target.value;
    boxShadow.updateValue(opacityRefInput, value)
});

inset.addEventListener('click', (e) => {
    const value =  e.target.checked;
    boxShadow.updateValue(inset, value);  
});

rulesDiv.addEventListener('click', () => {
    copyRulesP.innerText = '';
    boxShadow.copyRules(rulesDiv);
});
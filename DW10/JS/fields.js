const container = document.querySelector(".containerMain")

export function addTitle(title,h="h1")
{
    const subContDiv = document.createElement("div");
    subContDiv.classList.add("subcont");
    subContDiv.style.placeContent = "center";
    subContDiv.style.fontSize = "large";
    subContDiv.innerHTML = `
        <${h}>${title}</${h}>
    `;
    if(container)
    {
        container.appendChild(subContDiv);
        
    }
}
export function addTitleNoBorder(title,h="h1")
{
    const subContDiv = document.createElement("div");
    subContDiv.classList.add("subcont");

    subContDiv.style.placeContent = "center";
    subContDiv.style.fontSize = "large";
    subContDiv.innerHTML = `
        <${h}>${title}</${h}>
    `;
    subContDiv.style.border = "none";
    if(container)
    {
        container.appendChild(subContDiv);
    }
}

export function paragraph(text)
{
    const subContDiv = document.createElement("div");
    subContDiv.classList.add("subcont");

    subContDiv.style.placeContent = "center";
    if(Array.isArray(text))
    {
        text.forEach(txt => {
            subContDiv.innerHTML += `
                <p style="text-align: left;">${txt}</p>
            `;
        });
    }else{
        subContDiv.innerHTML = `
            <p style="text-align: left;">${text}</p>
        `;
    }
    if(container)
    {
        container.appendChild(subContDiv);
    }
}

export function paragraphNoBorder(text)
{
    const subContDiv = document.createElement("div");
    subContDiv.classList.add("subcont");

    subContDiv.style.placeContent = "center";
    if(Array.isArray(text))
    {
        text.forEach(txt => {
            subContDiv.innerHTML += `
                <p style="text-align: left;">${txt}</p>
            `;
        });
    }else{
        subContDiv.innerHTML = `
            <p style="text-align: left;">${text}</p>
        `;
    }
    subContDiv.style.border = "none";
    if(container)
    {
        container.appendChild(subContDiv);
    }
    return subContDiv;
}

export function addField(label,content){

    const subContDiv = document.createElement("div");
    subContDiv.classList.add("subcont");

    //const uniqueId = `temp-${Math.floor(Math.random() * 50000)}`;
    let textContent = content;
    subContDiv.innerHTML = `
        ${label}
        <span class="cuadroLabel"><b>${content}$</b></span>
    `;
    function updateLabel(text)
    {
        subContDiv.innerHTML = `
        ${label}
        <span class="cuadroLabel"><b>${text}$</b></span>
        `;
        textContent = text;
    }
    //const input = subContDiv.querySelector(`#${uniqueId}`);
    subContDiv.style.border = "none";
    const lbl = subContDiv.querySelector(".cuadroLabel");
    if(container)
    {
        container.appendChild(subContDiv);
    }
    return {
        setText : updateLabel,
        getText : () => textContent
    }
}

export function addFieldInput(content)
{
    const subContDiv = document.createElement("div");
    subContDiv.classList.add("subcont");


    const uniqueId = `temp-${Math.floor(Math.random() * 50000)}`;

    subContDiv.innerHTML = `
        <label for="${uniqueId}"><b>${content}</b></label>
        <input type="text" class="cuadroLabel" id="${uniqueId}" name="${uniqueId}" placeholder="@DavidTheWolfx10"><br>
        
    `;

    const input = subContDiv.querySelector(`#${uniqueId}`);
    subContDiv.style.border = "none";
    if(container)
    {
        container.appendChild(subContDiv);
    }
    return input;
}

export function addChoiceBox(label,content,values,id = 1)
{
    const subContDiv = document.createElement("div");
    subContDiv.classList.add("subcont");


    const uniqueId = `temp-${Math.floor(Math.random() * 50000)}`;

    subContDiv.innerHTML = `
        <label for="${uniqueId}"><b>${label}</b></label>
    `;
    if(Array.isArray(content))
    {
        let int = 1;
        content.forEach((txt,index) => {
            const isChecked = (index + 1 === id)
            const ID = `${uniqueId}-${index}`;
            subContDiv.innerHTML += `
            <div>
                <label class="choiceBox"> ${txt}
                <input type="radio" name="${uniqueId}" id="${ID}" value="${values[index]}" class="choiceBox" ${isChecked ? "checked" : ""} ">
                <span class="checkmark"></span>
                </label>
            </div>
            `;
            int++;
        });
        //<label for="${uniqueId}">${txt}</label>
    }else{
        subContDiv.innerHTML += `
        <div>
            <input type="radio" name="${uniqueId}" value="${values}" checked>
        </div>
        `;
    }
    subContDiv.innerHTML += `
        <br>
    `;
    subContDiv.style.border = "none";
    
    if(container)
    {
        container.appendChild(subContDiv);
    }

    const getValue = () =>{
        const selected = document.querySelector(`input[name="${uniqueId}"]:checked`);
        return selected;
    }

    function getText(){
        // 1. Encontrar el input radio seleccionado.
        const selectedInput = document.querySelector(`input[name="${uniqueId}"]:checked`);
        
        // **CORRECCIÓN: Verificar si se encontró un input antes de continuar**
        if (!selectedInput) {
            // Devuelve null o una cadena vacía si no hay nada seleccionado
            return null; 
        }
        
        // 2. Obtener el ID del input seleccionado.
        const selectedLabel = selectedInput.closest('label.choiceBox')
        
        // 3. Encontrar el label asociado usando el ID y el atributo 'for'.
        if (selectedLabel) {
        // Obtenemos todo el texto del label
        let labelText = selectedLabel.textContent.trim();
        
        // El texto a menudo incluye el 'textContent' del <span>. 
        // Para obtener solo el texto de la opción:
        // Si el label contiene el texto y el input, la forma más limpia es
        // obtener los nodos de texto directamente, pero .textContent es más simple
        // si el texto es el primer nodo:
        
        // Opción simple y funcional (devuelve el texto visible):
        return labelText.replace(/[\r\n\s]+/g, ' ').trim(); 
        
        /* Si el texto deseado es el nodo de texto que precede al input:
        return selectedLabel.childNodes[0].nodeValue.trim(); 
        */
        }
        // 4. Devolver el texto del label (con una verificación adicional por seguridad).
        return null; 
    };

    function reset()
    {
        subContDiv.innerHTML = `
        <label for="${uniqueId}"><b>${label}</b></label>
        `;
        if(Array.isArray(content))
        {
        let int = 1;
        content.forEach((txt,index) => {
            const isChecked = (index + 1 === id)
            subContDiv.innerHTML += `
            <div>
                <label class="choiceBox"> ${txt}
                <input type="radio" name="${uniqueId}" value="${values[index]}" class="choiceBox" ${isChecked ? "checked" : ""} ">
                <span class="checkmark"></span>
                </label>
            </div>
            `;
            int++;
        });
        //<label for="${uniqueId}">${txt}</label>
        }else{
            subContDiv.innerHTML += `
            <div>
                <input type="radio" name="${uniqueId}" value="${values}" checked>
            </div>
            `;
        }
        subContDiv.innerHTML += `
            <br>
        `;
    }

    return{
        element: subContDiv,
        getValue: getValue,
        getText: getText,
        reset: reset
    }
}

export function addImage(url)
{
    const subContDiv = document.createElement("div");
    subContDiv.classList.add("subcont");

    subContDiv.style.border = "none";

    subContDiv.innerHTML = `
        <img src="${url}" alt="Imagen" style="width: 100%; height: auto;"><br>
    `;
    if(container)
    {
        container.appendChild(subContDiv);
    }
}

export function addButton()
{
    const subContDiv = document.createElement("div");
    subContDiv.classList.add("subcont");


    const uniqueId = `temp-${Math.floor(Math.random() * 50000)}`;
    subContDiv.innerHTML = `
        <button class="sendButton" id="${uniqueId}">Send</button>
    `;
    subContDiv.style.border = "none";
    subContDiv.style.placeContent = "center";
    if(container)
    {
        container.appendChild(subContDiv);
    }
    const item = document.getElementById(uniqueId);
    item.style.cursor = "pointer";
    return {
        item : item,
        disable : function()
        {
            item.disabled = true;
            item.style.opacity = "0.5";
            item.style.cursor = "not-allowed";
        },
        able : function()
        {
            item.disabled = false;
            item.style.opacity = "1";
            item.style.cursor = "pointer";
        }
    };
}

export function addTextArea(label,subText)
{
    const subContDiv = document.createElement("div");
    subContDiv.classList.add("subcont");

    const uniqueId = `temp-${Math.floor(Math.random() * 50000)}`;
    subContDiv.innerHTML = `
        <label for="${uniqueId}"><b>${label}</b></label>
        <br>
        <textarea id="${uniqueId}" name="${uniqueId}" rows="4" cols="50" placeholder="${subText}"></textarea><br><br>
    `;
    subContDiv.style.border = "none";
    if(container)
    {
        container.appendChild(subContDiv);
    }
    const item = document.getElementById(uniqueId);
    return item;
}

export function addUpload()
{
    const subContDiv = document.createElement("div");
    subContDiv.classList.add("subcont");

    subContDiv.style.border = "none";
    const uniqueId = `temp-${Math.floor(Math.random() * 50000)}`;
    const labelId = `temp-${Math.floor(Math.random() * 50000)}`;
    subContDiv.innerHTML = `
        <label for="${uniqueId}"><b>Upload the references of your character(s) here!</b></label>
        <label for="${uniqueId}" id="${labelId}" class="uploadFiles" ></label>
        <input style="display:none;" type="file" id="${uniqueId}" name="file" accept="image/*" multiple>
        <div id="imagePreview" class="imgPrev" ></div>
        <span><b>Uploading a new image would reset the input, if you want to add more images, select them at the same time</b></span>
        <br><br>
    `;
    if(container)
    {
        container.appendChild(subContDiv);
    }
    const item = document.getElementById(uniqueId);
    const cont = document.getElementById(labelId);
    return {
        files:item,
        content:cont
    };
}
import {addField,addTitle,paragraph,paragraphNoBorder,addTitleNoBorder,addChoiceBox,addButton,addImage,addTextArea, addUpload, addFieldInput} from './fields.js';

function showElement(el) {
    el.style.opacity = 1;
    el.style.maxHeight = "500px";
}

function hideElement(el) {
    el.style.opacity = 0;
    el.style.maxHeight = 0;
}
export function fillForm()
{
addTitle("DavidTheWolfx10 Form");
paragraph(["If you're here, it's because you want a commission made by me",
`In this form you'll be able to write a description of what you want, send references of your characters, what type of commission you want and much more options, depending of the social media you want to contact, make sure you can receive incoming messages in your inbox in case if you're choosed for a slot`
]);

addTitleNoBorder("What I don't do","h3");
paragraphNoBorder(["<b>These are the type of pics I won't draw</b>",`
-Gore<br><br>

-Underage<br><br>

-Real People<br><br>

-Unsanitary kinks (scat, diapers, etc.)<br><br>

-Oc's that are not owned by you (I will do it only if you have proof that you have permission of the owner of the Oc or you want it to be a gift to the owner of the characters)<br><br>`
]);
addTitleNoBorder("IMPORTANT","h4");
paragraphNoBorder(["I follow an order based if who pays first i start first, so if you commission is taken but you were the last on the \"list\", you'll have to wait until I finish the first ones.",
                "So you can choose if you want to pay now, or wait until your turn comes. That will be discussed in DMs in case that your commission is choosed<br><br><br>",
            "I will take 4 slots, but if possible i will try to take more if i can, so probably would take more than 4 sometimes"]);

addImage("Resources/Images/newCommSheet2024.jpg");
addImage("Resources/Images/comic_sheet_2024.jpg");

const commType = addChoiceBox("What type of commission would you like?",
    ["LineArt (15$)","Flat/Colored (25$)","Shaded (35$)"],
    [15,25,35]
);

const comic = addChoiceBox("It is a comic?",
    ["No","Yes with 2 panels (+20%)","Yes with 3 panels (+40%)","Yes with 4 panels (+60%)","Yes with 5 panels (+80%)"],
    [0,0.2,0.4,0.6,0.8]
);

const comicParagraph = paragraphNoBorder([`The percentage of the panels is based of the "Base Price" of the commission you choosed.`,
                `For example if you choose 2 panels and the comic is a lineart(15$), it means the panel adds a 20% of the price base, in this case is 15$, adding 3$
being a total of 18`
]);
//comicParagraph.style.display = "none";//

const background = addChoiceBox("Do you want a background?",
    ["Yes (+5$)","No"],
    [5,0],
    2
);
//background.element.style.display = "none" //

const extracht = addChoiceBox("How many extra characters you desire?",
    ["No extra character","1 extra character (+50%)","2 extra character (+100%)","2 extra character (+150%)"],
    [0,0.5,1,1.5]
)

const extrachtparagh = paragraphNoBorder(["The percentage of the extra characters is based of the \"Base Price\" of the commission you choosed.",
    `For example you want only one extra character, and the commission type is LineArt, it means the price base is 15$, and the extra character would be a 50% of 15\n$
Adding 7.5 to 15, being a total of 22,5$, and in the end it will be rounded to the minimal integer: 22`]);
//extrachtparagh.style.display = "none";//


commType.element.addEventListener("change", setVisible);
comic.element.addEventListener("change", setComicVisible);
extracht.element.addEventListener("change", setextraVisible);

function setVisible() {
  const value = commType.getValue();
  if (value.value == 15) {
    background.reset();
    hideElement(background.element);
  } else {
    showElement(background.element);
  }
}

function setComicVisible() {
  if (comic.getValue().value == 0) {
    hideElement(comicParagraph);
  } else {
    showElement(comicParagraph);
  }
}

function setextraVisible() {
  if (extracht.getValue().value == 0) {
    hideElement(extrachtparagh);
  } else {
    showElement(extrachtparagh);
  }
}
setVisible();
setComicVisible();
setextraVisible();

const total = addField("Total Price:","");


function updateTotal()
{
    const base = Number(commType.getValue().value);
    const back = Number(background.getValue().value);
    const extrac = Number(extracht.getValue().value);
    const comicVal = Number(comic.getValue().value);
    const result = Math.floor(base + back + (base * extrac) + (base * comicVal));

    console.clear();

    total.setText(result);
}



commType.element.addEventListener("change", updateTotal);
comic.element.addEventListener("change", updateTotal);
extracht.element.addEventListener("change", updateTotal);
background.element.addEventListener("change",updateTotal);

updateTotal();


const desc = addTextArea("Give me a description of your commission","In case if you choosed background, write the description of the background as well");

const upload = addUpload();
const imgPriv = document.getElementById('imagePreview');

function updateImgs(event)
{
    imgPriv.innerHTML = '';
    const files = event.target.files;
    if(files.length === 0)
    {
        return;
    }

    for(let i = 0;i<files.length;i++)
    {
        const file = files[i];
        if(!file.type.startsWith('image/'))
        {
            continue;
        }
        const reader = new FileReader();
        reader.onload = function(e)
        {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = file.name; // Nombre del archivo como alt
            // Opcional: Añadir estilos o clases a la imagen
            img.style.maxWidth = '150px'; 
            img.style.maxHeight = '150px';
            img.style.margin = '5px';
            img.style.border = '1px solid #ccc';

            imgPriv.appendChild(img);
        }
        reader.readAsDataURL(file)
    }
}

if(upload && imgPriv)
{
    upload.files.addEventListener('change',updateImgs)
}
    
const socialMedia = addChoiceBox("Can I publish your commission on my social medias?",
    ["Yes","Yes but I want to stay anonymous","No, I want to keep it private"],
    ["Yes","Yes but I want to stay anonymous","No, I want to keep it private"],
);

const contact = addChoiceBox("Where you want me to contact you?",
    ["Twitter","Discord","Bluesky"],
    ["Twitter","Discord","Bluesky"]
);

const contactInput = addFieldInput("Give me your @ of the website you want me to contact you if your commission is selected");

paragraph(["<b>Terms</b>",`
    -I am entitled to reject a commission if the latter does not make me feel comfortable<br>
    -Payment must be made before delivery of the drawing.<br>
    -The payment will be through PayPal, by mail<br>
    -Please do not press the development of the drawing.<br>
    -The client will be able to see the sketches and advise any changes or details to avoid problems once the drawing is finished<br>
    -The client decides if wants the drawing be public or private<br>
    -The client can share the drawing from his own account with the condition of giving credit to the artist<br>
    -The client is entitled to want to remain anonymous or be mentioned in the publication<br>`
]);

const sendBUtton = addButton();
//sendBUtton.ATTRIBUTE_NODE.disabled = true;
sendBUtton.item.addEventListener('click',calculate)
function validate()
{
    let check = true;
    if(desc.value.length <= 0)
    {
        desc.classList.add('required');
        check = false;
    }else{
        desc.classList.remove('required');
    }

    if(upload.files.files.length <= 0)
    {
        upload.content.classList.add('required');
        check = false;
    }else{
        upload.content.classList.remove('required');
    }

    if(contactInput.value.length <= 0)
    {
        contactInput.classList.add('required');
        check = false;
    }else{
        contactInput.classList.remove('required');
    }
    
    return check;
}

async function uploadFilesToBackend(jsonFile, zipFile) {
    const formData = new FormData();
    
    // Adjuntamos los objetos File/Blob creados en el frontend
    formData.append('data', jsonFile); 
    formData.append('file', zipFile); 
    
    try {
        const response = await fetch('https://blowzier-chanelle-unmortared.ngrok-free.dev/api/upload', {
            method: 'POST',
            body: formData,
            // AÑADIR ESTO:
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
            // NOTA: No añadas 'Content-Type': 'multipart/form-data' aquí, 
            // el navegador lo hace solo y añade el "boundary" necesario.
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Subida completada por el servidor:', result.message);
            sendBUtton.able();
            clearForm();
        } else {
            console.error('Error del servidor:', result.message);
        }
    } catch (error) {
        console.error('Error de conexión con el servidor:', error);
    }
}

async function calculate(event)
{
    if(validate())
    {
        const data ={
            type_of_commission : commType.getText(),
            comicType : comic.getText(),
            backgr : background.getText(),
            extCharacer : extracht.getText(),
            description : desc.value,
            publish : socialMedia.getText(),
            clientContact : contact.getText(),
            clientSite : contactInput.value,
            total : 0
        }

        function createJson(file)
        {
            const json = JSON.stringify(file,null,2);
            const blob = new Blob([json],{type:'application/json'});
            console.log("json created")
            return new File([blob], `${data.clientSite}.json`, { type: 'application/json' });
        }

        async function createZip(){
            const input = upload.files;
            const files = input.files;

            if(files.length === 0)
            {
                return null;
            }else{
                console.log("There are: "+files.length+" files")
            }

            const zip = new JSZip();

            for(let i = 0;i<files.length;i++)
            {
                const file = files[i];
                zip.file(file.name,file);
            }

            const zipBlob = await zip.generateAsync({ type: 'blob' });

            const zipFile = new File([zipBlob], `${data.clientSite}Images.zip`, { type: 'application/zip' });
            return zipFile;
        }

        try{
    
            const jsonFile = createJson(data);
            const zipFile = await createZip();

            sendBUtton.disable();
            if(zipFile)
            {
                await uploadFilesToBackend(jsonFile, zipFile);
            }else{
                await uploadFilesToBackend(jsonFile, new File([], 'empty.zip', { type: 'application/zip' }));
            }
            


        
        }catch(err)
        {
            console.log("something happened:\n",err)
        }

    }else{
        console.log("Completa los campos");
    }
}
}

export function clearForm()
{
    const container = document.querySelector(".containerMain");
    container.innerHTML = "";
    console.log("limpiado");
    fillForm();
}


/*
socialMedia
contact
contactInput
*/

/*
document.getElementById("values").addEventListener("click", out);
function out()
{
console.log(field1.value);
}
*/


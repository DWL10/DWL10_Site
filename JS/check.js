import {fillForm} from './script.js';

const sysOnline = document.getElementById('online');
const sysOffline = document.getElementById('offline');
const sysConnect = document.getElementById('connect');
const main = document.getElementById('main');
sysOffline.style.display = 'none';
sysOnline.style.display = 'none';
const btn = document.getElementById('a_Button');
const adultPopUp = document.getElementById('adultsPopUp');


function animate(elem, style, unit, from, to, time, callback) {
    if (!elem) return;
    var start = new Date().getTime(),
        timer = setInterval(function () {
            var step = Math.min(1, (new Date().getTime() - start) / time);
            elem.style[style] = (from + step * (to - from)) + unit;
            if (step == 1) {
                clearInterval(timer);
                if (callback) callback();
            }

        }, 25);

    elem.style[style] = from + unit;
}

async function online() {
    // const ip = 'http://192.168.1.100:4000';
    const ip = 'https://blowzier-chanelle-unmortared.ngrok-free.dev'
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(),5000)
    adultPopUp.remove();
    try {
        const response = await fetch(`${ip}/api/check-status`, {
            method: 'GET', // Opcional pero recomendado
            signal: controller.signal,
            headers: {
                'ngrok-skip-browser-warning': 'true', // ESTO SALTA EL BLOQUEO DE NGROK
                'Accept': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Server offline');

        const driveData = await response.json();
        console.log("Estado del sistema desde el servidor:", driveData.st);

        if(driveData.st === "ok")
        {
            animate(sysConnect,"opacity","",1,0,1000,
                function(){
                    sysConnect.style.display = 'none'
                    sysOffline.style.display = 'none';
                    sysOnline.style.display = 'grid';
                    animate(sysOnline,"opacity","",0,1,1000);
                }
            );
            fillForm();
        }else{
            animate(sysConnect,"opacity","",1,0,1000,
                function(){
                    sysOnline.style.display = 'none';
                    sysOffline.style.display = 'grid';
                    sysConnect.style.display = 'none';
                    sysOffline.appendChild(p)

                    animate(sysOffline,"opacity","",0,1,1000)
                }
            )
        }

    } catch (error) {
            animate(sysConnect,"opacity","",1,0,1000,
                function(){
                    sysOnline.style.display = 'none';
                    sysOffline.style.display = 'grid';
                    sysConnect.style.display = 'none';
                    animate(sysOffline,"opacity","",0,1,1000)
                }
            )
    }finally{
        clearTimeout(timeout);
    }
    
}

///DRIVE ACCESS
// window.onload = online;

//console.log("Test this file is from check.js");

async function tempAcess()
{
    
    const res = "ok"
    if(res === "ok")
        {
            animate(sysConnect,"opacity","",1,0,1000,
                function(){
                    sysConnect.style.display = 'none'
                    sysOffline.style.display = 'none';
                    sysOnline.style.display = 'grid';
                    animate(sysOnline,"opacity","",0,1,1000);
                }
            );
            fillForm();
        }else{
            animate(sysConnect,"opacity","",1,0,1000,
                function(){
                    sysOnline.style.display = 'none';
                    sysOffline.style.display = 'grid';
                    sysConnect.style.display = 'none';
                    animate(sysOffline,"opacity","",0,1,1000)
                }
            )
        }
    adultPopUp.remove();
}

btn.addEventListener("click",online)

// window.onload = tempAcess;






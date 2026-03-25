import {fillForm} from './script.js';

const sysOnline = document.getElementById('online');
const sysOffline = document.getElementById('offline');
const sysConnect = document.getElementById('connect');
const main = document.getElementById('main');
const btn = document.getElementById('a_Button');
const adultPopUp = document.getElementById('adultsPopUp');

const isMobile = /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent);
// console.log(isMobile ? "Mobile" : "Desktop");   
if(isMobile)
{
    const link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = "CSS/mobile.css"
    document.head.appendChild(link)
}



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
    const ip = 'https://blowzier-chanelle-unmortared.ngrok-free.dev'
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(),5000)
    adultPopUp.remove();
    try {
        const response = await fetch(`${ip}/api/check-status`, {
            method: 'GET', 
            signal: controller.signal,
            headers: {
                'ngrok-skip-browser-warning': 'true', 
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






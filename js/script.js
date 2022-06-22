
{
// class App {
//     constructor() {
//         this.text = "";
//     }
// }

// class Child {
//     constructor (one , two) {
//         this.childOne = one;
//         this.childTwo = two;
//         this.isCorrect = 10;
//     }

//     print = ()=> {
//         return ++this.isCorrect;
//     }
// }

// let appClone = new App();
// Object.assign(appClone.constructor.prototype,{print : new Child("abdo").print});
// console.log(appClone.print());

// let childClone = new Child();
// console.log(childClone.print());

}


let card = document.querySelector(".app__card"),
    form = card.querySelector("form"),
    inputFile = form.querySelector("input"),
    qrImg = card.querySelector("img"),
    textArea = card.querySelector("textarea"),
    closeBtn = card.querySelector(".close"),
    copyBtn = card.querySelector(".copy"),
    textMsg = card.querySelector(".textMsg"),
    success = new Audio('../audio/assets_audios_succ.mp3'),
    faild = new Audio('../audio/assets_audios_faild.mp3');


// handil events
form.addEventListener("click",openFile);
inputFile.addEventListener('change', getFile);
closeBtn.addEventListener('click',closeApp);
copyBtn.addEventListener('click',copyQrLink);

// handil functions
function openFile() {
    inputFile.click();
}

function getFile(ele) {
   let file = ele.target.files[0];
   if(!file) return;

   let formData = new FormData();
   formData.append('file',file);
   // send data to api
   feachData(file,formData);
}

function feachData (file , foemData) {
    textMsg.innerText = "أستنا لما نشوف أخرتها...";
    setTimeout( async () => { 
        try {
            let response = await fetch("http://api.qrserver.com/v1/read-qr-code/",{
                 method : 'POST',
                 body : foemData,
            });
    
            let result = await response.json();
    
            let [{symbol:[{data}]}] = result;
            
            textMsg.innerText = data
            ? "  !اضغط هنا ياعم وخلينا نشوف 🤔"
            : "  خلصانه ي صاحبي  ؟ 😡";
    
            if(!data){
               return faild.play();
            }
    
            textArea.innerText = data; // data is a link
    
            qrImg.src = URL.createObjectURL(file); // to make the file path as a url
    
            form.style.cssText = `display: none;`;
            card.querySelector(".form--details").style.cssText = `display: flex;`;
            qrImg.style.cssText = `display: inline-block;`;

    
            return success.play();
    
        }catch(e){
            console.log(new ReferenceError(e));
        }
    }, 900)
}

function closeApp() {
    location.reload();
}

function copyQrLink(e) {

    // navigator hase everysing about your device
    navigator.clipboard.writeText(textArea.textContent);
    e.target.textContent = "💙 ع الرايق";
}



// problem ==> fizz buzz
{

    function fizzBuzz(num) {
        for(let i=1 ; i <= num ; i++) {
            if(i % 3 == 0 && i % 5 == 0) {
                console.log("fizzBuzz " + i );
            }else if(i % 3 == 0) {
                console.log("fizz "  + i );
            }else if(i % 5 == 0) {
                console.log("buzz "  + i );
            }else {
                console.log(num);
            }
        }

    }

   fizzBuzz(15);
}




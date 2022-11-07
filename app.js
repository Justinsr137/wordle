

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '2680a83f8dmsh7a53c34c7318ab8p1f6958jsn565f84d3585c',
        'X-RapidAPI-Host': '1000-most-common-words.p.rapidapi.com'
    }
};
fetch('https://1000-most-common-words.p.rapidapi.com/words/spanish?words_limit=1', options)
.then(result => result.json())
.finally(()=>{
    let loadingElement = document.querySelector('.loading');
    loadingElement.style.display = 'none'
})
.then(data =>{
    let word = data[0];
let rowId = 1;
let mainContainer = document.querySelector('.main-container');
let resultElement = document.querySelector('.result');
let wordArray = word.toUpperCase().split('');   
    
let actualRow = document.querySelector('.row');
drawSquares(actualRow);
listenInput(actualRow);

addFocus(actualRow);


function listenInput(actualRow){
    let squares = actualRow.querySelectorAll('.square');
    squares = [...squares];
    let userInput = [];
    squares.forEach(element =>{
        element.addEventListener('input', event=>{
            if(event.inputType !== 'deleteContentBackward'){
                userInput.push(event.target.value.toUpperCase());
                if(event.target.nextElementSibling){
                event.target.nextElementSibling.focus();
                }else{

                    let squaresFilled = document.querySelectorAll('.square');
                    squaresFilled = [...squaresFilled];
                    let lastFiveSquaresFilled = squaresFilled.slice(-word.length);
                    let finalUserInput = [];
                    lastFiveSquaresFilled.forEach(element =>{
                        finalUserInput.push(element.value.toUpperCase())
                    });



 
                    let rightIndex = compareArrays(wordArray, finalUserInput);
                rightIndex.forEach(element =>{
                    squares[element].classList.add('green');
                });


                if(rightIndex.length == wordArray.length){
                    showResult('Ganaste');
                    return;
                }

                let existIndexArray = existletter(wordArray, finalUserInput)
                existIndexArray.forEach(element=>{
                    squares[element].classList.add('gold');
                });

                let actualRow = createRow();

                if(!actualRow){
                    return;
                }
                drawSquares(actualRow);
                listenInput(actualRow);
                addFocus(actualRow);
                
                }
            }else{
                userInput.pop();
            }
        
        });
    });
}






//funciones ¿?

function showResult(textMsg){
    resultElement.innerHTML = `<p>${textMsg}</p>
                <button class="button">Reiniciar</button>`
    let resetBtn = document.querySelector('.button')
    resetBtn.addEventListener('click', ()=>{  
        location.reload();
    });
}

function addFocus(actualRow){
    let focusElement = actualRow.querySelector('.focus');
    focusElement.focus();
}

function compareArrays(array1, array2){
    let iqualsIndex = []
    array1.forEach((element, index)=>{
        if(element == array2[index]){
            iqualsIndex.push(index);
        }else{
            
        }
    });
    return iqualsIndex;
}

function existletter(array1, array2){
    let existIndexArray = [];
    array2.forEach((element, index)=>{
        if(array1.includes(element)){
            existIndexArray.push(index);
        }
    });
    return existIndexArray;
}

function createRow(){
    rowId++
    if (rowId <= 5){
        let newRow = document.createElement('div');
        newRow.classList.add('row');
        newRow.setAttribute('id', rowId);
        mainContainer.appendChild(newRow);
        return newRow;
    }else{
        showResult(`Intentalo de nuevo, la respuesta correcta era "${word.toUpperCase()}"`);
    }
    
}

function drawSquares(actualRow){
    wordArray.forEach((item, index)=>{
        if(index === 0){
            actualRow.innerHTML += `<input type="text" class="square focus" maxlength="1">`;
        }else{
            actualRow.innerHTML += `<input type="text" class="square" maxlength="1">`;
        }
    });
}
});

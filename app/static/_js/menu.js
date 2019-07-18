function showElemento(id)
{
    let element = document.querySelector(id);
    element.style.display = 'block';
}
function escondeElemento(id)
{
    let element = document.querySelector(id);
    element.style.display = 'none';
}

function exibeEscondeCadastro(id)
{
    let element = document.querySelector(id);
    
    if(element.style.display == 'none')
    {
        element.style.display = 'block';
    }
    else
    {
        element.style.display = 'none';
    }   
}

function exibeEsconde(id)
{
    let element = document.querySelector(id);
    
    if(element.style.display == 'none')
    {
        element.style.display = 'block';
    }
    else
    {
        element.style.display = 'none';
    }   
}



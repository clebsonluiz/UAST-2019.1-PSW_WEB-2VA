var URL = '';



$(document).ready(function () {

    $('#form_logar').submit(function (e) {
        $.ajax({
            type: "POST",
            url: URL + '/logar',
            data: {
                login: $('#logar_Login').val(),
                senha: $('#logar_senha').val()
            }
        }).done(function (data) {
            console.log(data)
            if(data == '200')
                location.reload();
        });
        //Obrigatorio usar o preventDefault para não recarregar a página
        e.preventDefault();
    });

    $('#form_cadastrar').submit(function (e) {

        $.ajax({
            type: "POST",
            url: URL + '/usuario',
            data: {
                op: 'cadastro',
                nome: $('#cad_nome').val(),
                login: $('#cad_login').val(),
                senha: $('#cad_senha').val()
            }
        }).done(function (data) {
            if(data == 'cadastrado')
                alert('Cadastrado');
            else
                alert('Não foi possivel cadastrar esse usuário');
        });
        //Obrigatorio usar o preventDefault para não recarregar a página
        e.preventDefault();
    });


    $('#section').html(); // Equivale ao InnerHTML só passar dentro dos parametros
    // $('#section').children()[0].id = "id" // Usar para setar o id
    console.log($('#section').children()[0]);
});


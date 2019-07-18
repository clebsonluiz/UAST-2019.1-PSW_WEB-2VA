$(document).ready(function () {

    $('#btn_editar_perfil').on('click', function (e) {

        console.log("Clikei no editar perfil");


        let html = $('div.formulario_login').get(0);
        if (html.querySelectorAll('input').length > 0) {
            let nome = html.querySelector('input[name = "nome_user"]').value;
            let login = html.querySelector('input[name = "login_user"]').value;

            let txtHtml = perfil(nome, login);

            $.ajax({
                type: 'POST',
                url: '/usuario',
                data: {
                    op: 'update_login',
                    nome: nome,
                    login: login,
                    senha: null
                }
            }).done(function (response) {alert(response);});

            html.innerHTML = txtHtml;
            console.log("Nome: " + nome + " Login: " + login);
        } else {
            let nome = html.querySelector('label[name = "nome"]').innerText;
            let login = html.querySelector('label[name = "login"]').innerText;

            let txtHtml = perfilEditar(nome, login);

            html.innerHTML = txtHtml;
        }


        console.log(html);
    });

    $('#btn_deletar_perfil').on('click', function (e) {

        console.log("Clikei no deletar perfil");

    });

    $('#editar_senha').on('click', function (e) {

        console.log("Clikei no editar senha");

        let html = $('div.formulario_senha').get(0);

        if (html.querySelectorAll('input').length > 0)
        {
            let senhas = perfilSenha();

            html.innerHTML = '';

            $.ajax({
                type: 'POST',
                url: '/usuario',
                data: {
                    op: 'update_senha',
                    nome: nome,
                    login: login,
                    senhaAntiga: senhas[0],
                    senha: senhas[1]
                }
            }).done(function (response) {
                alert(response);
            });

            console.log("Senha antiga: " + senhas[0] + " Senha Nova: " + senhas[1]);
        }
        else
        {
            html.innerHTML = perfilSenhaEditar();
        }


    });

    $('#btn_sair').on('click', function (e) {

        console.log("Clikei no sair 0");

        $.ajax({
            type: 'POST',
            url: '/logout',
            data: {
                op: ''
            }
        }).done(function (response) {
            location.reload();
        });
        location.reload();
    });


    $('#btn_cad_post').on('click', function (e) {

        console.log("cliquei no cadastrar post");
        $.ajax({
            type: "POST",
            url: '/post',
            data: {
                op: 'cadastro',
                id: null,
                titulo: $('#titulo_post_field_cad').val(),
                descricao: $('#descricao_post_field_cad').val(),
                link_i: adicioneHttp($('#link_imagem_field_cad').val()),
                link_p: adicioneHttp($('#link_post_field_cad').val()),
                categoria: $('#categoria_post_field_cad').val(),
                data: getData($('#data_post_field_cad').val())
            }
        }).done(function (data)
        {
            console.log(data)

            $('#titulo_post_field_cad').val('');
            $('#descricao_post_field_cad').val('');
            $('#link_imagem_field_cad').val('');
            $('#link_post_field_cad').val('');
            $('#categoria_post_field_cad').val('');

        });
        e.preventDefault();
    });

    $.ajax({
        type: 'POST',
        url: '/logado',
        data: {
            op: ''
        }
    }).done(function (response) {

        console.log(response);

        let html = $('div.formulario_login').get(0);

        html.querySelector('label[name = "nome"]').innerText = "Nome: " + response.nome;
        html.querySelector('label[name = "login"]').innerText = "Login: " + response.login;

    });


});
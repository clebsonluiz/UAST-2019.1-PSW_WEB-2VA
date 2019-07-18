function buscarPosts(type, url, data) {
    $.ajax({
        type: type,
        url: url,
        data: data
    }).done(function (response) {
        $('#section').html('');

        response = response.json_parsed;

        console.log(response);
        let txtHtml = "";
        for (let i = 0; i < response.length; i++) {
            txtHtml += preenchePost('perfil', response[i]);
        }

        /*Colocar os eventos de deleção e atualização para o perfil do usuário*/

        $('#section').html(txtHtml);

        for (let i = 0; i < $('#section').children().length; i++) {

            console.log($('#section').children()[i]);

            let post = $('#section').children()[i];

            let excluir = post.firstElementChild.getElementsByClassName('excluir_post')[0];
            let editar = post.firstElementChild.getElementsByClassName('editar_post')[0];
            let form = post.getElementsByClassName('form-group');

            console.log(form);



            excluir.addEventListener('click', function (e) {

                console.log('Cliquei no excluir de id = ' + post.id);
                $.ajax({
                    type: 'POST',
                    url: '/post',
                    data: {
                        op: 'delete',
                        id: post.id
                    }

                }).done(function (response) {

                    if (response == '200') {
                        post.remove();
                    }
                    else
                        alert('Não foi possivel deletar');
                });
            });

            editar.addEventListener('click', function (e) {

                console.log('Cliquei no editar de id = ' + post.id);

                console.log(form[0].querySelectorAll('input').length);

                if (form[0].querySelectorAll('input').length > 0)
                {
                    let titulo = $('#titulo_post_field').val();
                    let descricao = $('#descricao_post_field').val();
                    let link_img = $('#link_imagem_field').val();
                    let link_post = $('#link_post_field').val();
                    let categoria = $('#categoria_post_field').val();
                    let data = $('#data_post_field').val();

                    let textHTML = postNormal(titulo, descricao, link_img, link_post, categoria, data);


                    $.ajax({
                        type: 'POST',
                        url: '/post',
                        data: {
                            op: 'update',
                            id: post.id,
                            titulo: titulo,
                            descricao: descricao,
                            link_i: adicioneHttp(link_img),
                            link_p: adicioneHttp(link_post),
                            categoria: categoria,
                            data: data
                        }

                    }).done(function (response) {

                        if (response == '200')
                            alert('Atualizado');
                        else
                            alert('Não foi possivel atualizar');
                    });


                    form[0].innerHTML = textHTML;
                } else {
                    let titulo = $('.link_interno.black').text();
                    let descricao = $('h3').text();
                    //let link_img = $('img.card-img-top').attr('src');
                    //let link_post = $('a.link_interno.white').attr('href');
                    let categoria = $('.categoria').text();
                    //let data = $('.data_post').text();

                    let link_img = form[0].querySelector('.card-img-top').src;
                    let link_post = form[0].querySelector('.link_interno.white').href;
                    let data = form[0].querySelector('.data_post').innerText;


                    console.log(link_post);
                    console.log(link_img);
                    console.log(data);

                    let textHTML = postEditar(titulo, descricao, link_img, link_post, categoria, data);

                    form[0].innerHTML = textHTML;
                }
            });


        }


    });
}

$(document).ready(function () {

    buscarPosts("POST", '/atual_user', {data: getData(null)});

    $('#bt_busca_data_index').on('click', function (e) {

        buscarPosts(
            'POST',
            '/atual_date_user',
            {data: getData($('#data_campo').val())}
        );
        e.preventDefault();
    });




    $.ajax({
        type: 'POST',
        url: '/logado',
        data: {

        }
    }).done(function (response) {

        console.log(response);
        response = response.json_parsed;

        let html = $('div.formulario_login').get(0);

        let nome = html.querySelector('label[name = "nome"]').innerText;
        let login = html.querySelector('label[name = "login"]').innerText;


    });


});

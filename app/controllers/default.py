from flask import render_template, request, jsonify, redirect, url_for
from flask_login import login_user, logout_user, current_user
from app import app, db, lm

from app.models.tabelas import Usuario, Post


import datetime

@lm.user_loader
def load_user(id):
    return Usuario.query.filter_by(id=int(id)).first()

@app.route('/index')
@app.route('/')
def index():
    if current_user.is_authenticated is False:
        return render_template('index.html')
    else:
        return redirect(url_for('home'))


@app.route('/perfil')
def perfil():
    if current_user.is_authenticated is False:
        return redirect(url_for('index'))
    else:
        return render_template('perfil.html')


@app.route('/home')
def home():
    if current_user.is_authenticated is False:
        return redirect(url_for('index'))
    return render_template('home.html')


@app.route('/usuario', methods=["POST"])
def usuario():
    op = request.form['op']

    # Pegando a requisição
    u = Usuario(
        request.form['nome'],
        request.form['login'],
        request.form['senha'])
    id_user = current_user.get_id()

    if op == 'cadastro':
        db.session.add(u)
        db.session.commit()
        return 'cadastrado'

    elif op == 'update':
        uTemp = Usuario.query.filter_by(id=int(id_user)).first()
        uTemp.nome = u.nome
        uTemp.login = u.login
        uTemp.senha = u.senha

        db.session.add(uTemp)
        db.session.commit()
        return 'atualizado'

    elif op == 'update_login':
        uTemp = Usuario.query.filter_by(id=int(id_user)).first()
        uTemp.nome = u.nome
        uTemp.login = u.login

        db.session.add(uTemp)
        db.session.commit()
        return 'atualizado'

    elif op == 'update_senha':
        uTemp = Usuario.query.filter_by(id=int(id_user)).first()

        if uTemp.senha == request.form['senhaAntiga']:
            uTemp.senha = u.senha
        else:
            return '404'
        db.session.add(uTemp)
        db.session.commit()
        return 'atualizado'
    elif op == 'delete':

        u = Usuario.query.filter_by(id=int(id_user)).first()
        db.session.delete(u)
        db.session.commit()
        return 'deletado'

    return '404'


@app.route('/post', methods=["POST"])
def post():
    op = request.form['op']

    user_id = int(current_user.get_id())
    post_id = request.form['id']

    post = None

    if op == 'cadastro':
        post_id = None

    if op != 'delete':

        post = Post(
            request.form['link_p'],
            request.form['link_i'],
            request.form['titulo'],
            request.form['descricao'],
            datetime.datetime.strptime(request.form['data'], '%Y-%m-%d').date(),
            request.form['categoria'],
            user_id
        )

        post.id = post_id

    if op == 'cadastro':

        db.session.add(post)
        db.session.commit()
        return '200'
    elif op == 'update':

        pTemp = Post.query.filter_by(id=post_id, usuario_id=user_id).first()

        pTemp.link_post = post.link_post
        pTemp.link_imagem = post.link_imagem
        pTemp.titulo_post = post.titulo_post
        pTemp.descricao_post = post.descricao_post
        pTemp.data_post = post.data_post
        pTemp.categoria_post = post.categoria_post
        pTemp.usuario_id = post.usuario_id

        db.session.add(pTemp)
        db.session.commit()
        return '200'
    elif op == 'delete':

        pTemp = Post.query.filter_by(id=post_id, usuario_id=user_id).first()

        db.session.delete(pTemp)
        db.session.commit()
        return '200'

    return '404'


@app.route('/logar', methods=["POST"])
def logar():
    print(request.form)
    u = Usuario.query.filter_by(login=request.form['login'], senha=request.form['senha']).first()
    print(u)
    print(u.serialize())
    if u is None:
        return '404'
    else:
        login_user(u)
        return '200'


@app.route('/logout', methods=["POST"])
def deslogar():
    logout_user()
    return '200'


@app.route('/logado', methods=["POST"])
def logado():
    print(request.form)

    id_user = int(current_user.get_id())
    u = Usuario.query.filter_by(id=id_user).first()
    return jsonify(u.serialize())


@app.route('/busca_date', methods=["POST"])
@app.route('/atual', methods=["POST"])
def get_atual():
    # posts = Usuario.query.filter_by().all()
    data = datetime.datetime.strptime(request.form['data'], '%Y-%m-%d').date()
    posts = Post.query.filter_by(data_post=data).all()

    return jsonify(json_parsed=[e.serialize() for e in posts])

"""
@app.route('/busca_date', methods=["POST"])
def get_busca_date():
    print(request.form['data'])
    data = datetime.datetime.strptime(request.form['data'], '%Y-%m-%d').date()
    print(data)
    posts = Post.query.filter_by(data_post=data).all()
    return jsonify(json_parsed=[e.serialize() for e in posts])
"""

@app.route('/atual_date_user', methods=["POST"])
def get_atual_dateUser():

    data = datetime.datetime.strptime(request.form['data'], '%Y-%m-%d').date()
    user_id = int(current_user.get_id())

    posts = Post.query.filter_by(data_post=data, usuario_id=user_id).all()
    return jsonify(json_parsed=[e.serialize() for e in posts])


@app.route('/atual_user', methods=["POST"])
def get_atual_user():
    if current_user.get_id() is None:
        return jsonify(json_parsed=[])
    user_id = int(current_user.get_id())
    posts = Post.query.filter_by(usuario_id=user_id).all()
    return jsonify(json_parsed=[e.serialize() for e in posts])

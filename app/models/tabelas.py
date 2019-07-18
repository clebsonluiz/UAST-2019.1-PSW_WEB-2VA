from app import db

import datetime


class Usuario(db.Model):
    __tablename__ = 'usuario'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(40), unique=False, nullable=True)
    login = db.Column(db.String(40), unique=True, nullable=True)
    senha = db.Column(db.String(40), unique=False, nullable=True)

    def __init__(self, nome, login, senha):
        self.nome = nome
        self.login = login
        self.senha = senha


    @property
    def is_authenticated(self):
        return True

    @property
    def is_active(self):
        return True

    @property
    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.id)






    def serialize(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'login': self.login,
            'senha': self.senha
        }


class Post(db.Model):

    __tablename__ = 'post'

    id = db.Column(db.Integer, primary_key=True)
    link_post = db.Column(db.String(255), nullable=True)
    link_imagem = db.Column(db.String(255), nullable=True)
    titulo_post = db.Column(db.String(40), nullable=True)
    descricao_post = db.Column(db.String(255), nullable=True)
    data_post = db.Column(db.Date)
    categoria_post = db.Column(db.String(40), unique=False, nullable=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'))

    usuario = db.relationship(Usuario, foreign_keys=usuario_id)

    def __init__(self, link_post, link_imagem, titulo_post, descricao_post, data_post, categoria_post, usuario_id):
        self.link_post = link_post
        self.link_imagem = link_imagem
        self.titulo_post = titulo_post
        self.descricao_post = descricao_post
        self.data_post = data_post
        self.categoria_post = categoria_post
        self.usuario_id = usuario_id

    def serialize(self):

        return {
            'id': self.id,
            'l_post': self.link_post,
            'l_img': self.link_imagem,
            'titulo': self.titulo_post,
            'desc_post': self.descricao_post,
            'data_post': str(self.data_post),
            'cat_post': self.categoria_post,
            'usuario_id': self.usuario_id
        }

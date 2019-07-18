from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from flask_login import LoginManager

app = Flask(__name__)
app.secret_key = 'super secret key'
app.config.from_object('config')
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:13111996@localhost:5432/PSW_2019_1'
db = SQLAlchemy(app)
migrate = Migrate(app, db)

manager = Manager(app)
manager.add_command('db', MigrateCommand)
lm = LoginManager()
lm.init_app(app)


from app.models import tabelas
from app.controllers import default

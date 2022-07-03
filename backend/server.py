from flask import Flask, request
from flask_mail import Mail, Message

app = Flask(__name__)
mail = Mail(app)

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'muddassirash@gmail.com'
app.config['MAIL_PASSWORD'] = 'Ashfaque64!'
app.config['DEBUG'] = True
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

@app.route('/form', methods=['POST'])
def contact():
   try:
      msg = Message('hello',
      sender='muddassirash@gmail.com',
      recipients=['muddassirash@gmail.com'])
      msg.body = 'testing...'
      mail.send(msg)
      return 'Successfully Sent'

   except Exception as e:
      return e



@app.route('/')
def home():
    return '<h1> Home </h1>'


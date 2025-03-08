import json 
import boto3
from botocore.exceptions import ClientError

def lambda_handler(event, context):
    data = json.loads(event['body'])
    name = ''
    phone = ''
    email = ''
    message = ''
    
    for i,j in data.items():
        for i,j in data.items():
            if i == 'name':
                name = j 
            elif i == 'email':
                email = j
            elif i == 'phone':
                phone = j
            else: 
                message = j 
    # Replace sender@example.com with your "From" address.
    # This address must be verified with Amazon SES.
    SENDER = 'muddassircato@gmail.com'

    # Replace recipient@example.com with a "To" address. If your account 
    # is still in the sandbox, this address must be verified.
    RECIPIENT = "muddassirash@gmail.com"
    RECIPIENT_2 = 'ratocato@my.yorku.ca'

    # Specify a configuration set. If you do not want to use a configuration
    # set, comment the following variable, and the 
    # ConfigurationSetName=CONFIGURATION_SET argument below.
    #CONFIGURATION_SET = "ConfigSet"

    # If necessary, replace us-west-2 with the AWS Region you're using for Amazon SES.
    AWS_REGION = "us-east-1"

    # The subject line for the email.
    SUBJECT = f"{name} Messaged Ash Realtor Regarding His Services"

    # The email body for recipients with non-HTML email clients.
    BODY_TEXT = (f"{message}")
                
    # The HTML body of the email.
    BODY_HTML = (
    f"""
    <html>
    <head></head>
    <body>
    <p>Hi Ash Realtor,</p>
    <p>{message}</p>
    <p>Kind regards, {name}<br>
    <i>{email} {phone}</i>
    </body>
    </html>
    """
    )           

    # The character encoding for the email.
    CHARSET = "UTF-8"

    # Create a new SES resource and specify a region.
    client = boto3.client('ses',region_name=AWS_REGION)

    # Try to send the email.
        #Provide the contents of the email.
    response = client.send_email(
        Destination={
            'ToAddresses': [
                RECIPIENT,
            ],
        },
        Message={
            'Body': {
                'Html': {
                    'Charset': CHARSET,
                    'Data': BODY_HTML,
                },
                'Text': {
                    'Charset': CHARSET,
                    'Data': BODY_TEXT,
                },
            },
            'Subject': {
                'Charset': CHARSET,
                'Data': SUBJECT,
            },
        },
        Source=SENDER,
        # If you are not using a configuration set, comment or delete the
        # following line
        #ConfigurationSetName=CONFIGURATION_SET,
        
    )
    return {
        'statusCode': 200,
        'headers': {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*'
        },
        'body': json.dumps('Email Sent')
        }


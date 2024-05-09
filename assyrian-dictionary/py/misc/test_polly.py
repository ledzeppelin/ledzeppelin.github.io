# based on https://docs.aws.amazon.com/polly/latest/dg/get-started-what-next.html

"""Getting Started Example for Python 2.7+/3.3+"""
from contextlib import closing
import os
import sys
import subprocess
from boto3 import Session
from botocore.exceptions import BotoCoreError, ClientError
from tempfile import gettempdir

# Create a client using the credentials and region defined in the [adminuser]
# section of the AWS credentials file (~/.aws/credentials).
session = Session()
polly = session.client("polly")

try:
    # Request speech synthesis
    # https://gist.github.com/sloanlance/b8562252583967e08f5c69775518b366

    # see bilingual
    # https://docs.aws.amazon.com/polly/latest/dg/bilingual-voices.html
    ipa = '/bʃɪmmɑː‿dbaːbaː‿wbroːnaː‿wruːħaː‿dquðʃaː/'
    phoneme = f"<phoneme alphabet='ipa' ph='{ipa}'></phoneme>"
    speed = 'slow'
    # x-slow, slow, medium, fast,x-fast
    # https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html#drc-tag
    phoneme_slow = f"\
        <speak> \
            <prosody volume='loud' rate='{speed}'> \
                <amazon:effect name='drc'> \
                    <phoneme alphabet='ipa' ph='{ipa}'></phoneme> \
                </amazon:effect> \
            </prosody> \
        </speak>"
    response = polly.synthesize_speech(
        Text=phoneme_slow,
        TextType="ssml",
        OutputFormat="mp3",
        Engine = 'neural',
        VoiceId="Hala",
        # VoiceId="Zayd",
    )
except (BotoCoreError, ClientError) as error:
    # The service returned an error, exit gracefully
    print(error)
    sys.exit(-1)


# Access the audio stream from the response
if "AudioStream" in response:
    # Note: Closing the stream is important because the service throttles on the
    # number of parallel connections. Here we are using contextlib.closing to
    # ensure the close method of the stream object will be called automatically
    # at the end of the with statement's scope.
    with closing(response["AudioStream"]) as stream:
        output = os.path.join('./audio', "speech.mp3")

        try:
            # Open a file for writing the output as a binary stream
            with open(output, "wb") as file:
                file.write(stream.read())
        except IOError as error:
            # Could not write to file, exit gracefully
            print(error)
            sys.exit(-1)

else:
    # The response didn't contain audio data, exit gracefully
    print("Could not stream audio")
    sys.exit(-1)

# Play the audio using the platform's default player
if sys.platform == "win32":
    os.startfile(output)
else:
    # The following works on macOS and Linux. (Darwin = mac, xdg-open = linux).
    opener = "open" if sys.platform == "darwin" else "xdg-open"
    subprocess.call([opener, output])

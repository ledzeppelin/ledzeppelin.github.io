# taken from https://docs.aws.amazon.com/polly/latest/dg/get-started-what-next.html
from contextlib import closing
import os
import sys
from boto3 import Session
from botocore.exceptions import BotoCoreError, ClientError

# following env vars need to be set
#
# AWS_ACCESS_KEY_ID
# AWS_SECRET_ACCESS_KEY
# AWS_DEFAULT_REGION
session = Session()
polly = session.client("polly")

def ipa_to_mp3(ipa, hash_str):
    try:
        # Request speech synthesis
        # https://gist.github.com/sloanlance/b8562252583967e08f5c69775518b366
        speed = 'slow'
        phoneme_slow = f"\
            <speak> \
                <prosody volume='loud' rate='{speed}'> \
                    <phoneme alphabet='ipa' ph='{ipa}'></phoneme> \
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
            output = os.path.join('./audio', f"{hash_str}.mp3")

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

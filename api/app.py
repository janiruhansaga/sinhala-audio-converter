import os
import speech_recognition as sr
from flask import Flask, request, jsonify, render_template

# Flask app එක හදාගන්නවා
app = Flask(__name__)

# මුල්ම පේජ් එක (/) load කරනකොට index.html එක පෙන්නන්න කියනවා
@app.route('/')
def index():
    return render_template('index.html')

# '/transcribe' කියන endpoint එක හදනවා. JavaScript එකෙන් කතා කරන්නේ මෙයාට.
@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    # 1. JavaScript එකෙන් 'audio_file' කියලා file එකක් එවලද බලනවා
    if 'audio_file' not in request.files:
        return jsonify({'error': 'No audio file found'}), 400

    audio_file = request.files['audio_file']

    # User file එකක් select නොකර submit කලොත්...
    if audio_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # 2. SpeechRecognition object එක හදාගන්නවා
    r = sr.Recognizer()

    try:
        # 3. ආපු audio file එක අඳුරගන්න පුළුවන් විදිහට load කරනවා
        with sr.AudioFile(audio_file) as source:
            # Audio data එක read කරනවා
            audio_data = r.record(source)
            
            # 4. Google API එක පාවිච්චි කරලා සිංහලෙන් text එකට හරවනවා
            # භාෂාව 'si-LK' දෙන එක අනිවාර්යයි
            text = r.recognize_google(audio_data, language='si-LK')
            
            # 5. සාර්ථක වුණොත්, හදාගත්ත text එක ආපහු JavaScript එකට යවනවා
            return jsonify({'transcribed_text': text})

    except sr.UnknownValueError:
        # කතා කරන දේ පැහැදිලි නැත්නම් එන error එක
        return jsonify({'error': 'Could not understand the audio'}), 500
    except sr.RequestError as e:
        # Google API එක සම්බන්ධ වෙන්න බැරි වුණොත් එන error එක
        return jsonify({'error': f'API request failed; {e}'}), 500
    except Exception as e:
        # වෙනත් ඕනෑම නොසිතූ දෝෂයක් ආවොත්
        return jsonify({'error': f'An unexpected error occurred: {e}'}), 500

# Server එක run කරන්න අවශ්‍ය command එක
if __name__ == '__main__':
    app.run(debug=True)
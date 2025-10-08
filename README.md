Sinhala Audio File to Text ConverterThis is a simple web application built with Python (Flask) and JavaScript that allows users to upload a Sinhala audio file (MP3, WAV, etc.) and get the transcribed Sinhala text in return.FeaturesFile upload interface to select audio files.Backend processing using Python, Flask, and Google's Speech Recognition API.Displays the converted text on the webpage.Basic security checks for file type and size.Prerequisites (අවශ්‍යතා)This project has two main types of dependencies:Python Libraries: All required Python libraries are listed in the requirements.txt file.FFmpeg: The SpeechRecognition library requires FFmpeg to process various audio formats like MP3.You must have FFmpeg installed on your system.For Windows, you can download it from Gyan.dev FFmpeg Builds.After downloading and extracting, you must add the path to the ffmpeg/bin folder to your system's PATH environment variable.How to Run Locally (Run කරන්නේ කෙසේද?)Clone the Repository:git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name
Install Python Packages:It's recommended to use a virtual environment.# Create a virtual environment (optional but recommended)
python -m venv venv
# Activate it (Windows)
.\venv\Scripts\activate

# Install the required packages
pip install -r requirements.txt
Run the Flask Application:python app.py
Access the Application:Open your web browser and navigate to http://127.0.0.1:5000.
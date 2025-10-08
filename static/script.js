document.addEventListener('DOMContentLoaded', () => {
    // HTML එකේ තියෙන elements ටික අල්ලගන්නවා
    const audioFileInput = document.getElementById('audioFileInput');
    const convertBtn = document.getElementById('convertBtn');
    const resultDiv = document.getElementById('result');
    const statusMessage = document.getElementById('statusMessage');

    // "පෙළ බවට හරවන්න" button එක click කළාම මොකද වෙන්න ඕන කියලා කියනවා
    convertBtn.addEventListener('click', () => {
        // 1. User file එකක් තෝරලද කියලා බලනවා
        if (audioFileInput.files.length === 0) {
            statusMessage.textContent = 'කරුණාකර පළමුව audio file එකක් තෝරන්න.';
            return;
        }

        // 2. තෝරපු file එක متغيرයකට (variable) දාගන්නවා
        const audioFile = audioFileInput.files[0];

        // 3. File එක Backend එකට යවන්න FormData object එකක් හදාගන්නවා
        const formData = new FormData();
        formData.append('audio_file', audioFile); // 'audio_file' කියන නම වැදගත්

        // 4. User ට කියනවා වැඩේ පටන් ගත්තා කියලා
        statusMessage.textContent = 'ගොනුව සකසමින් පවතී... කරුණාකර රැඳී සිටින්න.';
        resultDiv.textContent = ''; // පරණ result එක අයින් කරනවා

        // 5. Backend එකට file එක යවනවා (Fetch API)
        fetch('/transcribe', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            // Server එකෙන් error එකක් ආවොත් ඒක handle කරනවා
            if (!response.ok) {
                throw new Error('Server එකෙන් ප්‍රතිචාරයක් ලබාගත නොහැක.');
            }
            return response.json(); // ආපු data එක JSON විදිහට හරවනවා
        })
        .then(data => {
            // 6. Server එකෙන් ආපු text එක result එකේ පෙන්නනවා
            statusMessage.textContent = 'පරිවර්තනය අවසන්!';
            resultDiv.textContent = data.transcribed_text;
        })
        .catch(error => {
            // 7. Network error එකක් වගේ දෙයක් ආවොත් user ට පෙන්නනවා
            console.error('Error:', error);
            statusMessage.textContent = 'ඇතිවූ දෝෂයක් නිසා පරිවර්තනය කළ නොහැකි විය.';
        });
    });
});
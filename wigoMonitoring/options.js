let myAudio = new Audio();
let defaultSoundUrl = 'alarm.mp3';

function saveOptions() {
    let soundUrlInput = document.getElementById('soundUrl');
    if (!soundUrlInput.value) {
        soundUrlInput.value = defaultSoundUrl;
    }
    myAudio.pause();
    myAudio.currentTime = 0.0;
    
    let wigoUrl = document.getElementById('wigoUrl').value;
    let soundVolume = document.getElementById('soundVolume').value;
    let soundUrl = soundUrlInput.value;
    
    chrome.storage.sync.set({
        wigoUrl: wigoUrl,
        soundVolume: soundVolume,
        soundUrl: soundUrl
    }, function () {
        let status = document.getElementById('status');
        status.innerHTML = 'Options saved !';
        status.style.display = 'block';
        restoreOptions();
        chrome.runtime.sendMessage({ updateMonitoring: true });
        setTimeout(function () {
            status.style.display = 'none';
        }, 3 * 1000);
    });
}

function testSound() {
    let soundVolume = document.getElementById('soundVolume').value;
    let soundUrl = document.getElementById('soundUrl').value;
    myAudio.pause();
    myAudio.currentTime = 0.0;
    myAudio.src = soundUrl;
    myAudio.volume = soundVolume;
    myAudio.play();
}

function stopSound() {
    myAudio.pause();
    myAudio.currentTime = 0;
}

function restoreOptions() {
    chrome.storage.sync.get(null, function (options) {
        let wigoUrlInput = document.getElementById('wigoUrl');
        let soundVolumeInput = document.getElementById('soundVolume');
        let soundUrlInput = document.getElementById('soundUrl');

        if (options.hasOwnProperty('wigoUrl')) {
            wigoUrlInput.value = options.wigoUrl;
        }
        if (options.hasOwnProperty('soundVolume')) {
            soundVolumeInput.value = options.soundVolume;
        } else {
            soundVolumeInput.value = 1;
        }
        if (options.hasOwnProperty('soundUrl')) {
            soundUrlInput.value = options.soundUrl;
        } else {
            soundUrlInput.value = defaultSoundUrl;
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    restoreOptions();
    
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveOptions();
    });

    document.getElementById('soundVolume').addEventListener('change', function() {
        let soundUrlInput = document.getElementById('soundUrl');
        if (!soundUrlInput.value) {
            soundUrlInput.value = defaultSoundUrl;
        }
        testSound();
    });

    document.getElementById('soundTest').addEventListener('click', function() {
        let soundUrlInput = document.getElementById('soundUrl');
        if (!soundUrlInput.value) {
            soundUrlInput.value = defaultSoundUrl;
        }
        testSound();
    });

    document.getElementById('soundStop').addEventListener('click', stopSound);

    document.getElementById('soundReset').addEventListener('click', function() {
        document.getElementById('soundUrl').value = defaultSoundUrl;
    });
});

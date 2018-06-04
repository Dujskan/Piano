var NOTE_NAMES = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];
var BASE_FREQUENCY = 27.5;

var audioCtx = new(window.AudioContext || window.webkitAudioContext)();

function playNote(frequency, duration) {
    var oscillator = audioCtx.createOscillator();

    oscillator.type = 'square';
    oscillator.frequency.value = frequency; // value in hertz
    oscillator.connect(audioCtx.destination);
    oscillator.start();

    setTimeout(
        function () {
            oscillator.stop();
        }, duration);
}

function noteToHertz(name) {
    return HERTZ[name];
}

var NoteButton = function (noteIndex, id, octave, hz, distance_to_a) {
    var _this = this;
    _this.element = document.createElement('button');
    _this.element.innerText = NOTE_NAMES[noteIndex] + (octave != 0 ? octave : '');
    _this.element.id = id;
    _this.noteIndex = noteIndex;
    _this.id = id;
    _this.octave = octave;
    _this.hz = hz;
    _this.distance_to_a = distance_to_a;

    _this.onClick = function () {
        console.log('id: ' + _this.id + ' noteIndex: ' + _this.noteIndex + ' octave: ' + _this.octave + ' hz: ' + _this.hz + ' distance_to_a: ' + distance_to_a);
        playNote(_this.hz, 500);
    };

    _this.element.addEventListener('click', _this.onClick);
};

var PianoApplication = function (element) {
    var _this = this;
    _this.element = element;
    _this.noteButtons = [];
    _this.noteData = [];

    _this.init = function () {
        console.log('Piano app started');
        _this.createNoteButtons(88);
        _this.drawPiano();
    };

    _this.drawPiano = function () {
        _this.element.innerHTML = '';

        for (var i = 0; i < _this.noteButtons.length; i++) {
            var button = _this.noteButtons[i];

            _this.element.appendChild(button.element);
        }
    };

    _this.createNoteButtons = function (numberOfNotes) {
        var noteIndex = 0;
        var octave = 0;
        var hz = BASE_FREQUENCY;
        var last_a_octave_id = 0;
        var distance_to_a = 0;

        for (var i = 0; i < numberOfNotes; i++) {
            _this.noteData.push(NOTE_NAMES[noteIndex] + octave);

            if (noteIndex >= NOTE_NAMES.length - 1) {
                noteIndex = 0;
                octave++;
            } else {
                noteIndex++;
            }
        }

        noteIndex = 0;
        octave = 0

        for (var i = 0; i < numberOfNotes; i++) {
            var a_id = _this.noteData.indexOf('a' + octave);
            var distance = i - a_id;
            distance = distance * -1;

            if (NOTE_NAMES[noteIndex][0] == 'c' && i != 0) {
                if (NOTE_NAMES[noteIndex].length >= 1) {
                if (NOTE_NAMES[noteIndex][1] == '#') {
                } else {
                     hz = hz * 2;
                }} else { hz = hz * 2; }
            }
            var cp = hz * (Math.pow(2, 0 - distance / 12));

            _this.noteButtons.push(new NoteButton(noteIndex, i, octave, cp, distance));

            if (noteIndex >= NOTE_NAMES.length - 1) {
                noteIndex = 0;
                octave++;
            } else {
                noteIndex++;
            }
        }
    };

    console.log(_this.noteButtons);

    _this.getNotes = function () {};
}
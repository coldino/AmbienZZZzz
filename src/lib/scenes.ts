export type Sound = {
    description: string;
    src: string;
    attribution: string;
    originalName: string;
    source: string;
    img: string;
    defaultVolume?: number;
};

export type Channel = {
    sound: string;
    volume?: number;
}

export type Scene = {
    name: string;
    channels: Channel[];
}


/** A collection of the available sounds */
export const sounds: { [key: string]: Sound } = {
    'thunder': {
        description: 'Occasional deep thunder',
        img: '/img/thunder.svg',
        src: '/sounds/thunder.mp3',
        originalName: 'Thunderstorm 3',
        source: 'https://freesound.org/people/Sandermotions/sounds/278865/',
        attribution: 'by <span class="author">Sandermotions</span> (licensed as <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0 1.0 Universal</a>)',
    },
    'birds': {
        description: 'Birds singing',
        img: '/img/birds.svg',
        src: '/sounds/birds.mp3',
        originalName: 'fugler natt vaar',
        source: 'https://freesound.org/people/1ratatosk1/sounds/392181/',
        attribution: 'by <span class="author">1ratatosk1</span> (licensed as <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0 1.0 Universal</a>)',
    },
    'crickets': {
        description: 'Crickets chirping',
        img: '/img/crickets.svg',
        src: '/sounds/crickets.mp3',
        originalName: 'Cricket 4',
        source: 'https://freesound.org/people/le_abbaye_Noirlac/sounds/129339/',
        attribution: 'by <span class="author">le_abbaye_Noirlac</span> (licensed as <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>)',
    },
    'fire': {
        description: 'Fire burning and wood cracking',
        img: '/img/fire.svg',
        src: '/sounds/fire.mp3',
        originalName: 'Fire in the fireplace',
        source: 'https://freesound.org/people/petruchio_ru/sounds/256464/',
        attribution: 'by <span class="author">petruchio_ru</span> (licensed as <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0 1.0 Universal</a>)',
    },
    'people': {
        description: 'Group of people talking and laughing',
        img: '/img/people.svg',
        src: '/sounds/people.mp3',
        originalName: 'HOW A FRENCH CITY SOUNDS V2',
        source: 'https://freesound.org/people/FreeToUseSounds/sounds/394331/',
        attribution: 'by <span class="author">FreeToUseSounds</span> (licensed as <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>)',
    },
    'pencil': {
        description: 'Pencil drawing on paper',
        img: '/img/pencil.svg',
        src: '/sounds/pencil.mp3',
        originalName: 'BleistiftPapier2',
        source: 'https://freesound.org/people/hannagreen/sounds/332082/',
        attribution: 'by <span class="author">hannagreen</span> (licensed as <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>)',
    },
    'purring': {
        description: 'Cat purring',
        img: '/img/purring.svg',
        src: '/sounds/purring.mp3',
        originalName: 'Cat is purring',
        source: 'https://freesound.org/people/tosha73/sounds/512223/',
        attribution: 'by <span class="author">tosha73</span> (licensed as <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0 1.0 Universal</a>)',
    },
    'rain': {
        description: 'A medium-light summer rain',
        img: '/img/rain.svg',
        src: '/sounds/rain.mp3',
        originalName: 'Medium Light Rain',
        source: 'https://freesound.org/people/Baconation/sounds/592482/',
        attribution: 'by <span class="author">Baconation</span> (licensed as <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0 1.0 Universal</a>)',
    },
    'raintent': {
        description: 'Rain from within a tent',
        img: '/img/raintent.svg',
        src: '/sounds/raintent.mp3',
        originalName: 'Soft Rain on a Tent & Bird Ambiance',
        source: 'https://freesound.org/people/Kingcornz/sounds/342434/',
        attribution: 'by <span class="author">Kingcornz</span> (licensed as <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>)',
    },
    'keyboard': {
        description: 'Typing on a mechanical keyboard',
        img: '/img/keyboard.svg',
        src: '/sounds/keyboard.mp3',
        originalName: 'Mechanical Keyboard Typing',
        source: 'https://freesound.org/people/GeorgeHopkins/sounds/537244/',
        attribution: 'by <span class="author">GeorgeHopkins</span> (licensed as <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>)',
    },
    'hairbrush': {
        description: 'Brushing hair',
        img: '/img/hairbrush.svg',
        src: '/sounds/hairbrush.mp3',
        originalName: 'HairBrushing',
        source: 'https://freesound.org/people/shelbyshark/sounds/475701/',
        attribution: 'by <span class="author">shelbyshark</span> (licensed as <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0 1.0 Universal</a>)',
    },
    'beach': {
        description: 'Wave crashing on the beach',
        img: '/img/beach.svg',
        src: '/sounds/beach.mp3',
        originalName: 'Beachbreak cobblestones',
        source: 'https://freesound.org/people/Eelke/sounds/462591/',
        attribution: 'by <span class="author">Eelke</span> (licensed as <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>)',
    },
};


/** The scenes that define how the sounds are used */
export const scenes: { [key: string]: Scene } = {
    'catfire': {
        name: 'Cat at fireplace',
        channels: [
            { sound: 'purring', volume: 0.5 },
            { sound: 'fire' },
        ],
    },
    'campdraw': {
        name: 'Sketching at a campfire',
        channels: [
            { sound: 'pencil' },
            { sound: 'fire' },
        ],
    },
    'tentrainthunder': {
        name: 'Camping in a thunderstorm',
        channels: [
            { sound: 'thunder' },
            { sound: 'raintent', volume: 0.7 },
        ],
    },
    'summerstorm': {
        name: 'Summer storm',
        channels: [
            { sound: 'thunder' },
            { sound: 'rain', volume: 0.7 },
        ],
    },
    'campnight': {
        name: 'Campfire at night',
        channels: [
            { sound: 'crickets', volume: 0.5 },
            { sound: 'fire' },
        ],
    },
    'coworking': {
        name: 'Co-Working',
        channels: [
            { sound: 'pencil' },
            { sound: 'keyboard' },
        ],
    },
};

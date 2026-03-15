export const CUTSCENES = {
    intro: {
        id: 'intro',
        scenes: [
            { textKey: 'cutscene.intro.1', portraitId: 'cipher', portraitSide: 'right' },
            { textKey: 'cutscene.intro.2', speakerNameKey: 'cutscene.cipher.name', portraitId: 'cipher', portraitSide: 'right' },
            { textKey: 'cutscene.intro.3', speakerNameKey: 'cutscene.cipher.name', portraitId: 'cipher', portraitSide: 'right' },
        ],
    },
    chapter1_start: {
        id: 'chapter1_start',
        triggeredBy: 'chapter_1_unlocked',
        scenes: [
            { textKey: 'cutscene.ch1_start.1', speakerNameKey: 'cutscene.cipher.name', portraitId: 'cipher', portraitSide: 'right' },
            { textKey: 'cutscene.ch1_start.2', speakerNameKey: 'cutscene.cipher.name', portraitId: 'cipher', portraitSide: 'right' },
        ],
    },
    chapter1_complete: {
        id: 'chapter1_complete',
        triggeredBy: 'chapter_1_complete',
        scenes: [
            { textKey: 'cutscene.ch1_complete.1', speakerNameKey: 'cutscene.cipher.name', portraitId: 'cipher', portraitSide: 'right' },
            { textKey: 'cutscene.ch1_complete.2', speakerNameKey: 'cutscene.cipher.name', portraitId: 'cipher', portraitSide: 'right' },
            { textKey: 'cutscene.ch1_complete.3', portraitId: 'cipher', portraitSide: 'right' },
        ],
    },
    chapter2_start: {
        id: 'chapter2_start',
        triggeredBy: 'chapter_2_unlocked',
        scenes: [
            { textKey: 'cutscene.ch2_start.1', speakerNameKey: 'cutscene.cipher.name', portraitId: 'cipher', portraitSide: 'right' },
            { textKey: 'cutscene.ch2_start.2', speakerNameKey: 'cutscene.cipher.name', portraitId: 'cipher', portraitSide: 'right' },
        ],
    },
    chapter2_complete: {
        id: 'chapter2_complete',
        triggeredBy: 'chapter_2_complete',
        scenes: [
            { textKey: 'cutscene.ch2_complete.1', speakerNameKey: 'cutscene.cipher.name', portraitId: 'cipher', portraitSide: 'right' },
            { textKey: 'cutscene.ch2_complete.2', speakerNameKey: 'cutscene.cipher.name', portraitId: 'cipher', portraitSide: 'right' },
        ],
    },
};
//# sourceMappingURL=CutsceneData.js.map
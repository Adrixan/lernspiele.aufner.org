export interface CutsceneScene {
    speakerNameKey?: string;
    textKey: string;
    portraitId?: string;
    portraitSide?: 'left' | 'right';
    duration?: number;
    backgroundId?: string;
}
export interface Cutscene {
    id: string;
    scenes: CutsceneScene[];
    triggeredBy?: string;
}
export declare const CUTSCENES: Record<string, Cutscene>;
//# sourceMappingURL=CutsceneData.d.ts.map
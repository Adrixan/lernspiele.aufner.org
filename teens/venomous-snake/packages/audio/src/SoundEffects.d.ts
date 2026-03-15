/**
 * All game sound effect IDs as constants.
 * Use these with AudioManager.play() to avoid magic strings.
 */
export declare const SFX: {
    readonly MENU_CLICK: "sfx_menu_click";
    readonly MENU_HOVER: "sfx_menu_hover";
    readonly MENU_BACK: "sfx_menu_back";
    readonly TERMINAL_OPEN: "sfx_terminal_open";
    readonly TERMINAL_CLOSE: "sfx_terminal_close";
    readonly TERMINAL_KEYSTROKE: "sfx_terminal_key";
    readonly CODE_RUN: "sfx_code_run";
    readonly CODE_SUCCESS: "sfx_code_success";
    readonly CODE_ERROR: "sfx_code_error";
    readonly DOOR_OPEN: "sfx_door_open";
    readonly DOOR_LOCKED: "sfx_door_locked";
    readonly FOOTSTEP: "sfx_footstep";
    readonly NPC_ALERT: "sfx_npc_alert";
    readonly XP_GAIN: "sfx_xp_gain";
    readonly LEVEL_UP: "sfx_level_up";
    readonly ACHIEVEMENT: "sfx_achievement";
};
export declare const MUSIC: {
    readonly MAIN_MENU: "music_main_menu";
    readonly LOBBY: "music_lobby";
    readonly OFFICE: "music_office";
    readonly LAB: "music_lab";
    readonly SERVER_ROOM: "music_server_room";
    readonly EXECUTIVE: "music_executive";
    readonly BOSS: "music_boss";
};
export type SFXKey = (typeof SFX)[keyof typeof SFX];
export type MusicKey = (typeof MUSIC)[keyof typeof MUSIC];
//# sourceMappingURL=SoundEffects.d.ts.map
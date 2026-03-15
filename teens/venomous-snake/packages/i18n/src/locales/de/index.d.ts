declare const _default: {
    common: {
        app_title: string;
        app_subtitle: string;
        loading: string;
        loading_interpreter: string;
        error: string;
        close: string;
        cancel: string;
        confirm: string;
        save: string;
        back: string;
        continue: string;
        retry: string;
    };
    ui: {
        terminal: {
            title: string;
            run: string;
            run_shortcut: string;
            clear: string;
            submit: string;
            hint: string;
            reset: string;
            output_label: string;
            input_placeholder: string;
            status: {
                ready: string;
                loading: string;
                executing: string;
                error: string;
            };
            line: string;
            column: string;
        };
        menu: {
            new_game: string;
            continue_game: string;
            load_game: string;
            save_game: string;
            settings: string;
            quit: string;
            resume: string;
            tutorial: string;
        };
        new_game: {
            step_gender: string;
            step_codename: string;
            step_intro: string;
            gender_male: string;
            gender_female: string;
            gender_nonbinary: string;
            codename_label: string;
            codename_placeholder: string;
            codename_hint: string;
            codename_error: string;
            cipher_intro: string;
            back: string;
            next: string;
            start_game: string;
        };
        settings: {
            title: string;
            language: string;
            volume_master: string;
            volume_music: string;
            volume_sfx: string;
            fullscreen: string;
            reduced_motion: string;
            keyboard_layout: string;
            native_keyboard: string;
        };
        hud: {
            xp: string;
            level: string;
            floor: string;
            interact: string;
            interact_mobile: string;
            max_level: string;
        };
        challenge: {
            title: string;
            description: string;
            hints_used: string;
            attempts: string;
            time_spent: string;
            success: string;
            xp_earned: string;
            try_again: string;
            tests_passed: string;
            locked: string;
            test_results: string;
        };
        progress: {
            title: string;
            chapter: string;
            completed: string;
            total_xp: string;
            completion: string;
        };
        quest_log: {
            title: string;
            chapter: string;
            floor: string;
            progress: string;
            no_quests: string;
            status_locked: string;
            status_available: string;
            status_in_progress: string;
            status_completed: string;
        };
        inventory: {
            title: string;
            empty: string;
            category_tools: string;
            category_keycards: string;
            category_datafiles: string;
        };
        floor_map: {
            title: string;
            floor: string;
            locked: string;
            current: string;
            fast_travel: string;
        };
        levels: {
            "1": string;
            "2": string;
            "3": string;
            "4": string;
            "5": string;
            "6": string;
            "7": string;
            "8": string;
            "9": string;
            "10": string;
        };
        skill_tree: {
            title: string;
            close: string;
            unlock: string;
            unlocked: string;
            xp_available: string;
            xp_cost: string;
            cat_fundamentals: string;
            cat_control_flow: string;
            cat_functions: string;
            cat_data_structures: string;
            cat_oop: string;
            cat_advanced: string;
            effect_hint_boost: string;
            effect_speed_bonus: string;
        };
        skills: {
            print_master: string;
            "print_master.desc": string;
            variable_basics: string;
            "variable_basics.desc": string;
            math_wizard: string;
            "math_wizard.desc": string;
            type_aware: string;
            "type_aware.desc": string;
            float_handler: string;
            "float_handler.desc": string;
            if_master: string;
            "if_master.desc": string;
            comparison_expert: string;
            "comparison_expert.desc": string;
            logic_guru: string;
            "logic_guru.desc": string;
            elif_master: string;
            "elif_master.desc": string;
            nested_logic: string;
            "nested_logic.desc": string;
            def_starter: string;
            "def_starter.desc": string;
            param_master: string;
            "param_master.desc": string;
            return_value: string;
            "return_value.desc": string;
            default_params: string;
            "default_params.desc": string;
            recursion_unlocked: string;
            "recursion_unlocked.desc": string;
            list_basics: string;
            "list_basics.desc": string;
            list_methods: string;
            "list_methods.desc": string;
            dict_basics: string;
            "dict_basics.desc": string;
            tuple_basics: string;
            "tuple_basics.desc": string;
            set_basics: string;
            "set_basics.desc": string;
            class_basics: string;
            "class_basics.desc": string;
            constructor_master: string;
            "constructor_master.desc": string;
            method_master: string;
            "method_master.desc": string;
            inheritance_basics: string;
            "inheritance_basics.desc": string;
            polymorphism: string;
            "polymorphism.desc": string;
            comprehension_list: string;
            "comprehension_list.desc": string;
            lambda_func: string;
            "lambda_func.desc": string;
            decorator_basics: string;
            "decorator_basics.desc": string;
            generator_basics: string;
            "generator_basics.desc": string;
            context_manager: string;
            "context_manager.desc": string;
        };
        achievements: {
            unlocked_label: string;
            first_hack: string;
            "first_hack.desc": string;
            chapter_1_done: string;
            "chapter_1_done.desc": string;
            chapter_2_done: string;
            "chapter_2_done.desc": string;
            chapter_3_done: string;
            "chapter_3_done.desc": string;
            floor_lobby: string;
            "floor_lobby.desc": string;
            floor_2_unlock: string;
            "floor_2_unlock.desc": string;
            floor_3_unlock: string;
            "floor_3_unlock.desc": string;
            floor_4_unlock: string;
            "floor_4_unlock.desc": string;
            five_challenges: string;
            "five_challenges.desc": string;
            ten_challenges: string;
            "ten_challenges.desc": string;
            twenty_challenges: string;
            "twenty_challenges.desc": string;
            fifty_challenges: string;
            "fifty_challenges.desc": string;
            centurion: string;
            "centurion.desc": string;
            xp_rookie: string;
            "xp_rookie.desc": string;
            xp_veteran: string;
            "xp_veteran.desc": string;
            xp_master: string;
            "xp_master.desc": string;
            first_try_hello: string;
            "first_try_hello.desc": string;
            first_try_vars: string;
            "first_try_vars.desc": string;
            first_try_math: string;
            "first_try_math.desc": string;
            no_hints_hello: string;
            "no_hints_hello.desc": string;
            no_hints_if: string;
            "no_hints_if.desc": string;
            speed_hello: string;
            "speed_hello.desc": string;
            speed_vars: string;
            "speed_vars.desc": string;
            speed_strings: string;
            "speed_strings.desc": string;
            streak_3: string;
            "streak_3.desc": string;
            streak_5: string;
            "streak_5.desc": string;
            streak_10: string;
            "streak_10.desc": string;
            perfectionist: string;
            "perfectionist.desc": string;
            venomous_title: string;
            "venomous_title.desc": string;
            no_hints_chapter: string;
            "no_hints_chapter.desc": string;
            elite_streak: string;
            "elite_streak.desc": string;
        };
        accessibility: {
            skip_to_content: string;
            loading: string;
            close: string;
            xp_gained: string;
            level_up: string;
            achievement_unlocked: string;
        };
        item_pickup: {
            title: string;
            first_time_label: string;
            type_datafile: string;
            type_tool: string;
            type_keycard: string;
        };
        tutorial: {
            title: string;
            subtitle: string;
            back_to_menu: string;
            chapter: string;
            challenges_completed: string;
            start_challenge: string;
            next_challenge: string;
            prev_challenge: string;
            chapter_locked: string;
            all_complete: string;
            progress: string;
            reset_progress: string;
            reset_confirm: string;
            difficulty: string;
            concepts: string;
        };
    };
    dialog: {
        ch01_01: {
            pre: string;
            post: string;
        };
        ch01_02: {
            pre: string;
            post: string;
        };
        ch01_03: {
            pre: string;
            post: string;
        };
        ch01_04: {
            pre: string;
            post: string;
        };
        ch01_05: {
            pre: string;
            post: string;
        };
        ch01_06: {
            pre: string;
            post: string;
        };
        ch01_07: {
            pre: string;
            post: string;
        };
        ch01_08: {
            pre: string;
            post: string;
        };
        ch02_01: {
            pre: string;
            post: string;
        };
        ch02_02: {
            pre: string;
            post: string;
        };
        ch02_03: {
            pre: string;
            post: string;
        };
        ch02_04: {
            pre: string;
            post: string;
        };
        ch02_05: {
            pre: string;
            post: string;
        };
        ch02_06: {
            pre: string;
            post: string;
        };
        ch02_07: {
            pre: string;
            post: string;
        };
        ch02_08: {
            pre: string;
            post: string;
        };
        ch03_01: {
            pre: string;
            post: string;
        };
        ch03_02: {
            pre: string;
            post: string;
        };
        ch03_03: {
            pre: string;
            post: string;
        };
        ch03_04: {
            pre: string;
            post: string;
        };
        ch03_05: {
            pre: string;
            post: string;
        };
        ch03_06: {
            pre: string;
            post: string;
        };
        ch03_07: {
            pre: string;
            post: string;
        };
        ch03_08: {
            pre: string;
            post: string;
        };
        ch04_01: {
            pre: string;
            post: string;
        };
        ch04_02: {
            pre: string;
            post: string;
        };
        ch04_03: {
            pre: string;
            post: string;
        };
        ch04_04: {
            pre: string;
            post: string;
        };
        ch04_05: {
            pre: string;
            post: string;
        };
        ch04_06: {
            pre: string;
            post: string;
        };
        ch04_07: {
            pre: string;
            post: string;
        };
        ch04_08: {
            pre: string;
            post: string;
        };
        ch04_09: {
            pre: string;
            post: string;
        };
        ch04_10: {
            pre: string;
            post: string;
        };
        ch05_01: {
            pre: string;
            post: string;
        };
        ch05_02: {
            pre: string;
            post: string;
        };
        ch05_03: {
            pre: string;
            post: string;
        };
        ch05_04: {
            pre: string;
            post: string;
        };
        ch05_05: {
            pre: string;
            post: string;
        };
        ch05_06: {
            pre: string;
            post: string;
        };
        ch05_07: {
            pre: string;
            post: string;
        };
        ch05_08: {
            pre: string;
            post: string;
        };
        ch05_09: {
            pre: string;
            post: string;
        };
        ch05_10: {
            pre: string;
            post: string;
        };
        ch06_01: {
            pre: string;
            post: string;
        };
        ch06_02: {
            pre: string;
            post: string;
        };
        ch06_03: {
            pre: string;
            post: string;
        };
        ch06_04: {
            pre: string;
            post: string;
        };
        ch06_05: {
            pre: string;
            post: string;
        };
        ch06_06: {
            pre: string;
            post: string;
        };
        ch06_07: {
            pre: string;
            post: string;
        };
        ch06_08: {
            pre: string;
            post: string;
        };
        ch06_09: {
            pre: string;
            post: string;
        };
        ch06_10: {
            pre: string;
            post: string;
        };
        ai_sidekick: {
            greeting: string;
            encouragement: string[];
            idle: string[];
        };
        cutscene: {
            cipher: {
                name: string;
            };
            intro: {
                "1": string;
                "2": string;
                "3": string;
            };
            ch1_start: {
                "1": string;
                "2": string;
            };
            ch1_complete: {
                "1": string;
                "2": string;
                "3": string;
            };
            ch2_start: {
                "1": string;
                "2": string;
            };
            ch2_complete: {
                "1": string;
                "2": string;
            };
        };
        ch07_01: {
            pre: string;
            post: string;
        };
        ch07_02: {
            pre: string;
            post: string;
        };
        ch07_03: {
            pre: string;
            post: string;
        };
        ch07_04: {
            pre: string;
            post: string;
        };
        ch07_05: {
            pre: string;
            post: string;
        };
        ch07_06: {
            pre: string;
            post: string;
        };
        ch07_07: {
            pre: string;
            post: string;
        };
        ch07_08: {
            pre: string;
            post: string;
        };
        ch08_01: {
            pre: string;
            post: string;
        };
        ch08_02: {
            pre: string;
            post: string;
        };
        ch08_03: {
            pre: string;
            post: string;
        };
        ch08_04: {
            pre: string;
            post: string;
        };
        ch08_05: {
            pre: string;
            post: string;
        };
        ch08_06: {
            pre: string;
            post: string;
        };
        ch08_07: {
            pre: string;
            post: string;
        };
        ch08_08: {
            pre: string;
            post: string;
        };
        ch09_01: {
            pre: string;
            post: string;
        };
        ch09_02: {
            pre: string;
            post: string;
        };
        ch09_03: {
            pre: string;
            post: string;
        };
        ch09_04: {
            pre: string;
            post: string;
        };
        ch09_05: {
            pre: string;
            post: string;
        };
        ch09_06: {
            pre: string;
            post: string;
        };
        ch09_07: {
            pre: string;
            post: string;
        };
        ch09_08: {
            pre: string;
            post: string;
        };
        ch09_09: {
            pre: string;
            post: string;
        };
        ch09_10: {
            pre: string;
            post: string;
        };
        ch10_01: {
            pre: string;
            post: string;
        };
        ch10_02: {
            pre: string;
            post: string;
        };
        ch10_03: {
            pre: string;
            post: string;
        };
        ch10_04: {
            pre: string;
            post: string;
        };
        ch10_05: {
            pre: string;
            post: string;
        };
        ch10_06: {
            pre: string;
            post: string;
        };
        ch10_07: {
            pre: string;
            post: string;
        };
        ch10_08: {
            pre: string;
            post: string;
        };
        ch10_09: {
            pre: string;
            post: string;
        };
        ch10_10: {
            pre: string;
            post: string;
        };
        ch11_01: {
            pre: string;
            post: string;
        };
        ch11_02: {
            pre: string;
            post: string;
        };
        ch11_03: {
            pre: string;
            post: string;
        };
        ch11_04: {
            pre: string;
            post: string;
        };
        ch11_05: {
            pre: string;
            post: string;
        };
        ch11_06: {
            pre: string;
            post: string;
        };
        ch11_07: {
            pre: string;
            post: string;
        };
        ch11_08: {
            pre: string;
            post: string;
        };
        ch12_01: {
            pre: string;
            post: string;
        };
        ch12_02: {
            pre: string;
            post: string;
        };
        ch12_03: {
            pre: string;
            post: string;
        };
        ch12_04: {
            pre: string;
            post: string;
        };
        ch12_05: {
            pre: string;
            post: string;
        };
        ch12_06: {
            pre: string;
            post: string;
        };
        ch12_07: {
            pre: string;
            post: string;
        };
        ch12_08: {
            pre: string;
            post: string;
        };
        ch12_09: {
            pre: string;
            post: string;
        };
        ch12_10: {
            pre: string;
            post: string;
        };
        npc: {
            guard: {
                speaker: string;
                n1: string;
                n1_choice_show_id: string;
                n1_choice_sneak: string;
                n1_choice_ask: string;
                n2: string;
                n3: string;
                n3_choice_apologize: string;
                n3_choice_bluff: string;
                n4: string;
                n5: string;
                n6: string;
            };
            silva: {
                speaker: string;
                n1: string;
                n1_choice_terminal: string;
                n1_choice_project: string;
                n1_choice_hi: string;
                n2: string;
                n3: string;
                n4: string;
            };
            cipher: {
                speaker: string;
                intro_n1: string;
                intro_n2: string;
                intro_n3: string;
                intro_n3_choice_ready: string;
                intro_n3_choice_info: string;
                intro_n4: string;
                intro_n5: string;
            };
        };
    };
    challenges: {
        ch01_01: {
            title: string;
            description: string;
        };
        ch01_02: {
            title: string;
            description: string;
        };
        ch01_03: {
            title: string;
            description: string;
        };
        ch01_04: {
            title: string;
            description: string;
        };
        ch01_05: {
            title: string;
            description: string;
        };
        ch01_06: {
            title: string;
            description: string;
        };
        ch01_07: {
            title: string;
            description: string;
        };
        ch01_08: {
            title: string;
            description: string;
        };
        ch02_01: {
            title: string;
            description: string;
        };
        ch02_02: {
            title: string;
            description: string;
        };
        ch02_03: {
            title: string;
            description: string;
        };
        ch02_04: {
            title: string;
            description: string;
        };
        ch02_05: {
            title: string;
            description: string;
        };
        ch02_06: {
            title: string;
            description: string;
        };
        ch02_07: {
            title: string;
            description: string;
        };
        ch02_08: {
            title: string;
            description: string;
        };
        ch03_01: {
            title: string;
            description: string;
        };
        ch03_02: {
            title: string;
            description: string;
        };
        ch03_03: {
            title: string;
            description: string;
        };
        ch03_04: {
            title: string;
            description: string;
        };
        ch03_05: {
            title: string;
            description: string;
        };
        ch03_06: {
            title: string;
            description: string;
        };
        ch03_07: {
            title: string;
            description: string;
        };
        ch03_08: {
            title: string;
            description: string;
        };
        ch04_01: {
            title: string;
            description: string;
        };
        ch04_02: {
            title: string;
            description: string;
        };
        ch04_03: {
            title: string;
            description: string;
        };
        ch04_04: {
            title: string;
            description: string;
        };
        ch04_05: {
            title: string;
            description: string;
        };
        ch04_06: {
            title: string;
            description: string;
        };
        ch04_07: {
            title: string;
            description: string;
        };
        ch04_08: {
            title: string;
            description: string;
        };
        ch04_09: {
            title: string;
            description: string;
        };
        ch04_10: {
            title: string;
            description: string;
        };
        ch05_01: {
            title: string;
            description: string;
        };
        ch05_02: {
            title: string;
            description: string;
        };
        ch05_03: {
            title: string;
            description: string;
        };
        ch05_04: {
            title: string;
            description: string;
        };
        ch05_05: {
            title: string;
            description: string;
        };
        ch05_06: {
            title: string;
            description: string;
        };
        ch05_07: {
            title: string;
            description: string;
        };
        ch05_08: {
            title: string;
            description: string;
        };
        ch05_09: {
            title: string;
            description: string;
        };
        ch05_10: {
            title: string;
            description: string;
        };
        ch06_01: {
            title: string;
            description: string;
        };
        ch06_02: {
            title: string;
            description: string;
        };
        ch06_03: {
            title: string;
            description: string;
        };
        ch06_04: {
            title: string;
            description: string;
        };
        ch06_05: {
            title: string;
            description: string;
        };
        ch06_06: {
            title: string;
            description: string;
        };
        ch06_07: {
            title: string;
            description: string;
        };
        ch06_08: {
            title: string;
            description: string;
        };
        ch06_09: {
            title: string;
            description: string;
        };
        ch06_10: {
            title: string;
            description: string;
        };
        ch07_01: {
            title: string;
            description: string;
        };
        ch07_02: {
            title: string;
            description: string;
        };
        ch07_03: {
            title: string;
            description: string;
        };
        ch07_04: {
            title: string;
            description: string;
        };
        ch07_05: {
            title: string;
            description: string;
        };
        ch07_06: {
            title: string;
            description: string;
        };
        ch07_07: {
            title: string;
            description: string;
        };
        ch07_08: {
            title: string;
            description: string;
        };
        ch08_01: {
            title: string;
            description: string;
        };
        ch08_02: {
            title: string;
            description: string;
        };
        ch08_03: {
            title: string;
            description: string;
        };
        ch08_04: {
            title: string;
            description: string;
        };
        ch08_05: {
            title: string;
            description: string;
        };
        ch08_06: {
            title: string;
            description: string;
        };
        ch08_07: {
            title: string;
            description: string;
        };
        ch08_08: {
            title: string;
            description: string;
        };
        ch09_01: {
            title: string;
            description: string;
        };
        ch09_02: {
            title: string;
            description: string;
        };
        ch09_03: {
            title: string;
            description: string;
        };
        ch09_04: {
            title: string;
            description: string;
        };
        ch09_05: {
            title: string;
            description: string;
        };
        ch09_06: {
            title: string;
            description: string;
        };
        ch09_07: {
            title: string;
            description: string;
        };
        ch09_08: {
            title: string;
            description: string;
        };
        ch09_09: {
            title: string;
            description: string;
        };
        ch09_10: {
            title: string;
            description: string;
        };
        ch10_01: {
            title: string;
            description: string;
        };
        ch10_02: {
            title: string;
            description: string;
        };
        ch10_03: {
            title: string;
            description: string;
        };
        ch10_04: {
            title: string;
            description: string;
        };
        ch10_05: {
            title: string;
            description: string;
        };
        ch10_06: {
            title: string;
            description: string;
        };
        ch10_07: {
            title: string;
            description: string;
        };
        ch10_08: {
            title: string;
            description: string;
        };
        ch10_09: {
            title: string;
            description: string;
        };
        ch10_10: {
            title: string;
            description: string;
        };
        ch11_01: {
            title: string;
            description: string;
        };
        ch11_02: {
            title: string;
            description: string;
        };
        ch11_03: {
            title: string;
            description: string;
        };
        ch11_04: {
            title: string;
            description: string;
        };
        ch11_05: {
            title: string;
            description: string;
        };
        ch11_06: {
            title: string;
            description: string;
        };
        ch11_07: {
            title: string;
            description: string;
        };
        ch11_08: {
            title: string;
            description: string;
        };
        ch12_01: {
            title: string;
            description: string;
        };
        ch12_02: {
            title: string;
            description: string;
        };
        ch12_03: {
            title: string;
            description: string;
        };
        ch12_04: {
            title: string;
            description: string;
        };
        ch12_05: {
            title: string;
            description: string;
        };
        ch12_06: {
            title: string;
            description: string;
        };
        ch12_07: {
            title: string;
            description: string;
        };
        ch12_08: {
            title: string;
            description: string;
        };
        ch12_09: {
            title: string;
            description: string;
        };
        ch12_10: {
            title: string;
            description: string;
        };
    };
    chapters: {
        ch01: {
            title: string;
            description: string;
        };
        ch02: {
            title: string;
            description: string;
        };
        ch03: {
            title: string;
            description: string;
        };
        ch04: {
            title: string;
            description: string;
        };
        ch05: {
            title: string;
            description: string;
        };
        ch06: {
            title: string;
            description: string;
        };
        ch07: {
            title: string;
            description: string;
        };
        ch08: {
            title: string;
            description: string;
        };
        ch09: {
            title: string;
            description: string;
        };
        ch10: {
            title: string;
            description: string;
        };
        ch11: {
            title: string;
            description: string;
        };
        ch12: {
            title: string;
            description: string;
        };
    };
    story: {
        cutscene: {
            speaker: {
                handler: string;
                cipher: string;
                snake: string;
                narrator: string;
            };
            intro: {
                frame1: string;
                frame2: string;
                frame3: string;
                frame4: string;
                frame5: string;
                frame6: string;
                frame7: string;
            };
            floor: {
                f1: {
                    arrive: string;
                    cipher: string;
                    note: string;
                    hint: string;
                };
                f2: {
                    arrive: string;
                    cipher: string;
                    note: string;
                    hint: string;
                };
                f3: {
                    arrive: string;
                    cipher: string;
                    note: string;
                    hint: string;
                };
                f4: {
                    arrive: string;
                    cipher: string;
                    note: string;
                    hint: string;
                };
                f5: {
                    arrive: string;
                    cipher: string;
                    note: string;
                    hint: string;
                };
                f6: {
                    arrive: string;
                    cipher: string;
                    note: string;
                    hint: string;
                };
                f7: {
                    arrive: string;
                    cipher: string;
                    note: string;
                    hint: string;
                };
                f8: {
                    arrive: string;
                    cipher: string;
                    note: string;
                    hint: string;
                };
                f9: {
                    arrive: string;
                    cipher: string;
                    note: string;
                    hint: string;
                };
                f10: {
                    arrive: string;
                    cipher: string;
                    note: string;
                    hint: string;
                };
                f11: {
                    arrive: string;
                    cipher: string;
                    note: string;
                    hint: string;
                };
                f12: {
                    arrive: string;
                    cipher: string;
                    note: string;
                    hint: string;
                };
            };
            boss: {
                frame1: string;
                frame2: string;
                frame3: string;
                frame4: string;
                frame5: string;
                frame6: string;
            };
            victory: {
                frame1: string;
                frame2: string;
                frame3: string;
                frame4: string;
                frame5: string;
            };
            gameover: {
                frame1: string;
                frame2: string;
                frame3: string;
            };
        };
        tutorial: {
            step: {
                movement: string;
                interaction: string;
                terminalBasics: string;
                codeSubmit: string;
                firstSuccess: string;
            };
            gotIt: string;
            skipTutorial: string;
            skipConfirm: string;
            spotlight: string;
        };
        credits: {
            title: string;
            subtitle: string;
            stats: {
                heading: string;
                challengesCompleted: string;
                totalXp: string;
                timePlayed: string;
                achievementsUnlocked: string;
                floorsCleared: string;
            };
            newGamePlus: string;
            returnToMenu: string;
            scrollTitle: string;
            scrollSubtitle: string;
            thankYou: string;
            builtWith: string;
        };
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map
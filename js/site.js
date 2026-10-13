(function () {
    'use strict';

    var THEME_KEY = 'lernspiele-theme';
    var root = document.documentElement;

    function readStored() {
        try {
            var value = localStorage.getItem(THEME_KEY);
            return value === 'light' || value === 'dark' ? value : null;
        } catch (e) {
            return null;
        }
    }

    // Dark is the default; light only when the visitor chose it with the toggle.
    function apply(theme) {
        root.setAttribute('data-theme', theme);
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
            meta.setAttribute('content', theme === 'light' ? '#f6f8f6' : '#121212');
        }
    }

    apply(readStored() || 'dark');

    document.addEventListener('DOMContentLoaded', function () {
        var toggle = document.getElementById('theme-toggle');
        var year = document.getElementById('copyright-year');
        if (year) {
            year.textContent = String(new Date().getFullYear());
        }
        if (!toggle) {
            return;
        }

        function syncLabel() {
            var isLight = root.getAttribute('data-theme') === 'light';
            toggle.setAttribute('aria-label', isLight ? 'Zum dunklen Design wechseln' : 'Zum hellen Design wechseln');
        }

        syncLabel();
        toggle.addEventListener('click', function () {
            var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            apply(next);
            try {
                localStorage.setItem(THEME_KEY, next);
            } catch (e) { /* storage unavailable: choice applies to this visit only */ }
            syncLabel();
        });
    });
})();

tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // Primary brand accents
                primary: {
                    light: "#0f766e", // teal-700
                    DEFAULT: "#14b8a6", // teal-500
                    dark: "#2dd4bf", // teal-400
                },
                secondary: {
                    light: "#0891b2", // cyan-600
                    DEFAULT: "#06b6d4", // cyan-500
                    dark: "#22d3ee", // cyan-400
                },
                // Neutrals based on a elegant Slate theme
                surface: {
                    light: "#f8fafc", // slate-50
                    DEFAULT: "#0f172a", // slate-900
                    card: {
                        light: "#ffffff",
                        dark: "#1e293b" // slate-800
                    }
                }
            },
            fontFamily: {
                sans: ["Hanken Grotesk", "sans-serif"],
                serif: ["Source Serif 4", "serif"],
            },
            spacing: {
                maxwidth: "1140px"
            }
        }
    }
};

import { useCallback, useEffect, useRef, useState } from 'react';

/** Tarayıcı TTS ile sesli okuma (Türkçe ses tercih edilir). */
const useSpeech = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
    const utteranceRef = useRef(null);

    const stop = useCallback(() => {
        if (!supported) return;
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    }, [supported]);

    const speak = useCallback(
        (text) => {
            if (!supported || !text) return;
            window.speechSynthesis.cancel();

            const u = new SpeechSynthesisUtterance(text);
            const voices = window.speechSynthesis.getVoices();
            const trVoice = voices.find((v) => v.lang?.startsWith('tr'));
            if (trVoice) u.voice = trVoice;
            u.lang = 'tr-TR';
            u.rate = 0.95;
            u.pitch = 1;
            u.onend = () => setIsSpeaking(false);
            u.onerror = () => setIsSpeaking(false);

            utteranceRef.current = u;
            window.speechSynthesis.speak(u);
            setIsSpeaking(true);
        },
        [supported]
    );

    const toggle = useCallback(
        (text) => {
            if (isSpeaking) stop();
            else speak(text);
        },
        [isSpeaking, speak, stop]
    );

    useEffect(() => () => stop(), [stop]);

    return { speak, stop, toggle, isSpeaking, supported };
};

export default useSpeech;

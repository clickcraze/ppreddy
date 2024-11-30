import React, { useEffect } from 'react';

const LiveChatWidget = () => {
    useEffect(() => {
        // LiveChat initialization
        window.__lc = window.__lc || {};
        window.__lc.license = 17769087;
        window.__lc.asyncInit = false;

        function initLiveChat() {
            var script = document.createElement('script');
            script.async = true;
            script.type = 'text/javascript';
            script.src = 'https://cdn.livechatinc.com/tracking.js';
            document.head.appendChild(script);
        }

        if (!window.__lc.asyncInit) {
            initLiveChat();
            window.__lc.asyncInit = true;
        }

        return () => {
            // Clean up code if necessary
        };
    }, []);

    return (
        <noscript>
            <a href="https://www.livechat.com/chat-with/17769087/" rel="nofollow">
                Chat with us
            </a>
            , powered by{' '}
            <a href="https://www.livechat.com/?welcome" rel="noopener nofollow" target="_blank">
                LiveChat
            </a>
        </noscript>
    );
};

export default LiveChatWidget;

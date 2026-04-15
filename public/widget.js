(function () {
  if (window.StellaWidgetLoaded) return;
  window.StellaWidgetLoaded = true;

  const scriptTag = document.currentScript;
  const scriptUrl = scriptTag ? new URL(scriptTag.src, window.location.href) : null;
  const baseUrl = scriptUrl ? scriptUrl.origin : window.location.origin;
  const iframeUrl = new URL('/', baseUrl);
  iframeUrl.searchParams.set('widget', 'true');

  const avatarSrc = baseUrl + '/stella-avatar.png';

  const launcher = document.createElement('div');
  const avatar = document.createElement('img');
  avatar.src = avatarSrc;
  avatar.alt = 'Chat with Stella';
  Object.assign(launcher.style, {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: '2147483000',
    boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
    overflow: 'hidden',
    background: '#fff'
  });
  Object.assign(avatar.style, {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  });
  launcher.appendChild(avatar);

  const frame = document.createElement('iframe');
  frame.src = iframeUrl.toString();
  frame.title = 'Stella Chat Widget';
  frame.setAttribute('allow', 'clipboard-write');
  Object.assign(frame.style, {
    position: 'fixed',
    bottom: '92px',
    right: '24px',
    width: '350px',
    maxWidth: 'calc(100vw - 24px)',
    height: '560px',
    maxHeight: 'calc(100vh - 120px)',
    border: 'none',
    borderRadius: '14px',
    boxShadow: '0 18px 50px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
    background: '#fff',
    zIndex: '2147483000',
    display: 'none'
  });

  let isOpen = false;
  launcher.addEventListener('click', function () {
    isOpen = !isOpen;
    frame.style.display = isOpen ? 'block' : 'none';
    avatar.src = avatarSrc;
  });

  document.body.appendChild(frame);
  document.body.appendChild(launcher);
})();

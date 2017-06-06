import { isMobile } from '../../helpers/device';

const KKBOX_PROTOCOL = {
  NEXT_SLOT: 'kkbox://sponsored_premium_v2_goto_next_slot',
  MOBILE_GO_PREMIUM: 'kkbox://payment_entrance',
  PORTAL_GO_PREMIUM: 'http://www.kkbox.com/client/billing.php',
};

export default (config) => {
  const { playlist } = config;
  return {
    nextSlot: KKBOX_PROTOCOL.NEXT_SLOT,
    viewPlaylist: `${KKBOX_PROTOCOL.NEXT_SLOT}?callback=kkbox://view_playlist_${playlist}`,
    // playPlaylist: `${KKBOX_PROTOCOL.NEXT_SLOT}?callback=kkbox://play_playlist_${playlist}`,
    goPremium: isMobile ?
        KKBOX_PROTOCOL.MOBILE_GO_PREMIUM :
        KKBOX_PROTOCOL.PORTAL_GO_PREMIUM,
  };
};

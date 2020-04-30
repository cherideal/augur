import { useReducer } from 'react';
import {
  APP_STATUS_ACTIONS,
  DEFAULT_APP_STATUS,
  THEME,
  ODDS,
  IS_HELP_MENU_OPEN,
  IS_CONNECTION_TRAY_OPEN,
  IS_ODDS_MENU_OPEN,
  IS_ALERTS_MENU_OPEN,
  IS_MOBILE,
  Ox_ENABLED,
  GSN_ENABLED,
  ETH_TO_DAI_RATE,
  REP_TO_DAI_RATE,
  Ox_STATUS,
  WALLET_STATUS,
  RESTORED_ACCOUNT,
  IS_LOGGED,
  IS_CONNECTED,
  IS_RECONNECTION_PAUSED,
  CAN_HOTLOAD,
  ENV,
  GAS_PRICE_INFO,
  MOBILE_MENU_STATE,
  CURRENT_BASE_PATH,
  BLOCKCHAIN,
} from 'modules/app/store/constants';

const {
  SET_THEME,
  SET_ODDS,
  SET_IS_ODDS_MENU_OPEN,
  SET_IS_HELP_MENU_OPEN,
  SET_IS_CONNECTION_TRAY_OPEN,
  SET_IS_ALERTS_MENU_OPEN,
  CLOSE_APP_MENUS,
  SET_IS_MOBILE,
  SET_Ox_ENABLED,
  SET_GSN_ENABLED,
  SET_ETH_TO_DAI_RATE,
  SET_REP_TO_DAI_RATE,
  SET_Ox_STATUS,
  SET_WALLET_STATUS,
  SET_RESTORED_ACCOUNT,
  SET_IS_LOGGED,
  SET_IS_CONNECTED,
  SET_IS_RECONNECTION_PAUSED,
  SET_CAN_HOTLOAD,
  SET_ENV,
  UPDATE_GAS_PRICE_INFO,
  SET_MOBILE_MENU_STATE,
  SET_CURRENT_BASE_PATH,
  UPDATE_BLOCKCHAIN,
} = APP_STATUS_ACTIONS;

const setHTMLTheme = theme =>
  document.documentElement.setAttribute(THEME, theme);

export function AppStatusReducer(state, action) {
  const updatedState = { ...state };
  switch (action.type) {
    case SET_THEME: {
      updatedState[THEME] = action.theme;
      break;
    }
    case SET_ODDS: {
      updatedState[ODDS] = action.odds;
      break;
    }
    case SET_IS_ODDS_MENU_OPEN: {
      updatedState[IS_ODDS_MENU_OPEN] = action.isOpen;
      updatedState[IS_HELP_MENU_OPEN] = false;
      updatedState[IS_CONNECTION_TRAY_OPEN] = false;
      updatedState[IS_ALERTS_MENU_OPEN] = false;
      break;
    }
    case SET_IS_HELP_MENU_OPEN: {
      updatedState[IS_ODDS_MENU_OPEN] = false;
      updatedState[IS_HELP_MENU_OPEN] = action.isOpen;
      updatedState[IS_CONNECTION_TRAY_OPEN] = false;
      updatedState[IS_ALERTS_MENU_OPEN] = false;
      break;
    }
    case SET_IS_CONNECTION_TRAY_OPEN: {
      updatedState[IS_ODDS_MENU_OPEN] = false;
      updatedState[IS_HELP_MENU_OPEN] = false;
      updatedState[IS_CONNECTION_TRAY_OPEN] = action.isOpen;
      updatedState[IS_ALERTS_MENU_OPEN] = false;
      break;
    }
    case SET_IS_ALERTS_MENU_OPEN: {
      updatedState[IS_ODDS_MENU_OPEN] = false;
      updatedState[IS_HELP_MENU_OPEN] = false;
      updatedState[IS_CONNECTION_TRAY_OPEN] = false;
      updatedState[IS_ALERTS_MENU_OPEN] = action.isOpen;
      break;
    }
    case CLOSE_APP_MENUS: {
      updatedState[IS_ODDS_MENU_OPEN] = false;
      updatedState[IS_HELP_MENU_OPEN] = false;
      updatedState[IS_CONNECTION_TRAY_OPEN] = false;
      updatedState[IS_ALERTS_MENU_OPEN] = false;
      break;
    }
    case SET_IS_MOBILE: {
      updatedState[IS_MOBILE] = action.isMobile;
      break;
    }
    case SET_Ox_ENABLED: {
      updatedState[Ox_ENABLED] = action.isOxEnabled;
      break;
    }
    case SET_GSN_ENABLED: {
      updatedState[GSN_ENABLED] = action.isGSNEnabled;
      break;
    }
    case SET_ETH_TO_DAI_RATE: {
      updatedState[ETH_TO_DAI_RATE] = action.ethToDaiRate;
      break;
    }
    case SET_REP_TO_DAI_RATE: {
      updatedState[REP_TO_DAI_RATE] = action.repToDaiRate;
      break;
    }
    case SET_Ox_STATUS: {
      updatedState[Ox_STATUS] = action.OxStatus;
      break;
    }
    case SET_WALLET_STATUS: {
      updatedState[WALLET_STATUS] = action.walletStatus;
      break;
    }
    case SET_RESTORED_ACCOUNT: {
      updatedState[RESTORED_ACCOUNT] = action.restoredAccount;
      break;
    }
    case SET_IS_LOGGED: {
      updatedState[IS_LOGGED] = action.isLogged;
      break;
    }
    case SET_IS_CONNECTED: {
      updatedState[IS_CONNECTED] = action.isConnected;
      break;
    }
    case SET_IS_RECONNECTION_PAUSED: {
      updatedState[IS_RECONNECTION_PAUSED] = action.isReconnectionPaused;
      break;
    }
    case SET_CAN_HOTLOAD: {
      updatedState[CAN_HOTLOAD] = action.canHotload;
      break;
    }
    case SET_ENV: {
      updatedState[ENV] = action.env;
      break;
    }
    case UPDATE_GAS_PRICE_INFO: {
      updatedState[GAS_PRICE_INFO] = {
        ...updatedState[GAS_PRICE_INFO],
        ...action.gasPriceInfo,
      };
      break;
    }
    case SET_CURRENT_BASE_PATH: {
      updatedState[CURRENT_BASE_PATH] = action.currentBasePath;
      break;
    }
    case SET_MOBILE_MENU_STATE: {
      updatedState[MOBILE_MENU_STATE] = action.mobileMenuState;
      break;
    }
    case UPDATE_BLOCKCHAIN: {
      updatedState[BLOCKCHAIN] = { ...updatedState[BLOCKCHAIN], ...action.blockchain };
      break;
    }
    default:
      throw new Error(
        `Error: ${action.type} not caught by App Status reducer.`
      );
  }
  window.appStatus = updatedState;
  return updatedState;
}

export const useAppStatus = (defaultState = DEFAULT_APP_STATUS) => {
  const [state, dispatch] = useReducer(AppStatusReducer, defaultState);
  setHTMLTheme(state.theme);
  return {
    ...state,
    actions: {
      setTheme: theme => {
        setHTMLTheme(theme);
        dispatch({ type: SET_THEME, theme });
      },
      setOdds: odds => dispatch({ type: SET_ODDS, odds }),
      setIsOddsMenuOpen: isOpen =>
        dispatch({ type: SET_IS_ODDS_MENU_OPEN, isOpen }),
      setIsHelpMenuOpen: isOpen =>
        dispatch({ type: SET_IS_HELP_MENU_OPEN, isOpen }),
      setIsConnectionTrayOpen: isOpen =>
        dispatch({ type: SET_IS_CONNECTION_TRAY_OPEN, isOpen }),
      setIsAlertsMenuOpen: isOpen =>
        dispatch({ type: SET_IS_ALERTS_MENU_OPEN, isOpen }),
      closeAppMenus: () => dispatch({ type: CLOSE_APP_MENUS }),
      setIsMobile: isMobile => dispatch({ type: SET_IS_MOBILE, isMobile }),
      setOxEnabled: isOxEnabled =>
        dispatch({ type: SET_Ox_ENABLED, isOxEnabled }),
      setGSNEnabled: isGSNEnabled =>
        dispatch({ type: SET_GSN_ENABLED, isGSNEnabled }),
      setEthToDaiRate: ethToDaiRate =>
        dispatch({ type: SET_ETH_TO_DAI_RATE, ethToDaiRate }),
      setRepToDaiRate: repToDaiRate =>
        dispatch({ type: SET_REP_TO_DAI_RATE, repToDaiRate }),
      setOxStatus: OxStatus => dispatch({ type: SET_Ox_STATUS, OxStatus }),
      setWalletStatus: walletStatus =>
        dispatch({ type: SET_WALLET_STATUS, walletStatus }),
      setRestoredAccount: restoredAccount =>
        dispatch({ type: SET_RESTORED_ACCOUNT, restoredAccount }),
      setIsLogged: isLogged => dispatch({ type: SET_IS_LOGGED, isLogged }),
      setIsConnected: isConnected =>
        dispatch({ type: SET_IS_CONNECTED, isConnected }),
      setIsReconnectionPaused: isReconnectionPaused =>
        dispatch({ type: SET_IS_RECONNECTION_PAUSED, isReconnectionPaused }),
      setCanHotload: canHotload =>
        dispatch({ type: SET_CAN_HOTLOAD, canHotload }),
      setEnv: env => dispatch({ type: SET_ENV, env }),
      updateGasPriceInfo: gasPriceInfo =>
        dispatch({ type: UPDATE_GAS_PRICE_INFO, gasPriceInfo }),
      setMobileMenuState: mobileMenuState =>
        dispatch({ type: SET_MOBILE_MENU_STATE, mobileMenuState }),
      setCurrentBasePath: currentBasePath =>
        dispatch({ type: SET_CURRENT_BASE_PATH, currentBasePath }),
      updateBlockchain: blockchain => dispatch({ type: UPDATE_BLOCKCHAIN, blockchain });
    },
  };
};

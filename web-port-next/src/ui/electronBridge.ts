export type ElectronWindowApi = {
  readonly windowMinimize: () => void;
  readonly windowMaximize: () => void;
  readonly windowClose: () => void;
};

type WindowWithElectronApi = Window & {
  readonly electronAPI?: ElectronWindowApi;
};

export function getElectronWindowApi(): ElectronWindowApi | undefined {
  if (typeof window === 'undefined') return undefined;
  return (window as WindowWithElectronApi).electronAPI;
}

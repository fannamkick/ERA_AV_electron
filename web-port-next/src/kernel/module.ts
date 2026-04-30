export type ModuleStatus = 'planned' | 'active' | 'blocked';

export type StateScope = 'catalog' | 'save' | 'session' | 'adapter' | 'derived';

export type DomainModule<TState = unknown> = {
  readonly id: string;
  readonly label: string;
  readonly status: ModuleStatus;
  readonly layer: 'foundation' | 'gameplay' | 'presentation' | 'adapter';
  readonly stateScope: StateScope;
  readonly statePath: string;
  readonly description: string;
  readonly owns: readonly string[];
  readonly dependsOn: readonly string[];
  readonly createInitialState: () => TState;
};

export type FeatureModule = {
  readonly id: string;
  readonly label: string;
  readonly milestone: string;
  readonly status: ModuleStatus;
  readonly description: string;
  readonly requiredDomains: readonly string[];
  readonly provides: readonly string[];
  readonly steps: readonly string[];
};

export type GameDefinition = {
  readonly domains: readonly DomainModule[];
  readonly features: readonly FeatureModule[];
};

export type ModuleDiagnostic = {
  readonly severity: 'ok' | 'warning' | 'error';
  readonly message: string;
};

export function createGameDefinition(definition: GameDefinition): GameDefinition {
  return Object.freeze({
    domains: Object.freeze([...definition.domains]),
    features: Object.freeze([...definition.features]),
  });
}

export function validateGameDefinition(definition: GameDefinition): readonly ModuleDiagnostic[] {
  const diagnostics: ModuleDiagnostic[] = [];
  const domainIds = new Set<string>();
  const statePaths = new Set<string>();

  for (const domain of definition.domains) {
    if (domainIds.has(domain.id)) {
      diagnostics.push({ severity: 'error', message: `Duplicate domain id: ${domain.id}` });
    }
    domainIds.add(domain.id);

    if (statePaths.has(domain.statePath)) {
      diagnostics.push({ severity: 'error', message: `Duplicate domain state path: ${domain.statePath}` });
    }
    statePaths.add(domain.statePath);

    if (domain.owns.length === 0) {
      diagnostics.push({ severity: 'warning', message: `${domain.id} does not declare owned state.` });
    }
  }

  const featureIds = new Set<string>();

  for (const feature of definition.features) {
    if (featureIds.has(feature.id)) {
      diagnostics.push({ severity: 'error', message: `Duplicate feature id: ${feature.id}` });
    }
    featureIds.add(feature.id);

    for (const domainId of feature.requiredDomains) {
      if (!domainIds.has(domainId)) {
        diagnostics.push({ severity: 'error', message: `${feature.id} requires missing domain: ${domainId}` });
      }
    }
  }

  for (const domain of definition.domains) {
    for (const dependency of domain.dependsOn) {
      if (!domainIds.has(dependency)) {
        diagnostics.push({ severity: 'error', message: `${domain.id} depends on missing domain: ${dependency}` });
      }
    }
  }

  if (diagnostics.length === 0) {
    diagnostics.push({ severity: 'ok', message: 'Domain and feature registry is internally consistent.' });
  }

  return diagnostics;
}

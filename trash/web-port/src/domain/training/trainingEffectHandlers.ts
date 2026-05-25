import {
  defaultEffectHandlers,
  type EffectHandlerRegistry,
} from '../../core/effects';
import { contactEffectHandlers } from '../contact';
import { equipmentEffectHandlers } from '../equipment';

export const trainingEffectHandlers: EffectHandlerRegistry = {
  ...defaultEffectHandlers,
  ...equipmentEffectHandlers,
  ...contactEffectHandlers,
};

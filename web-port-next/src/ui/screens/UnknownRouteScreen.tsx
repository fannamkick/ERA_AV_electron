import type { ScreenProps } from '../routeScreenTypes';
import { ScreenHeading } from '../ScreenPrimitives';

export function UnknownRouteScreen({ session, onAction }: ScreenProps) {
  return (
    <section className="screen-panel">
      <ScreenHeading eyebrow="알 수 없는 화면" title={session.ui.route} />
      <button type="button" onClick={() => onAction({ type: 'route/change', route: 'boot' })}>
        시작 화면으로
      </button>
    </section>
  );
}

import { buildWardrobeView } from '../../features/socialEquipmentCflag';
import type { ScreenProps } from '../routeScreenTypes';
import { ActionRow, ScreenHeading } from '../ScreenPrimitives';

export function WardrobeScreen({ catalog, state, onAction }: ScreenProps) {
  const view = buildWardrobeView(state, catalog);

  return (
    <section className="screen-panel wardrobe-screen">
      <ScreenHeading eyebrow="사무소 드레스룸" title="의상실 및 코스튬 관리" />
      
      <div className="wardrobe-grid">
        {view.entries.map((entry) => {
          const clothingFlagId = Object.keys(entry.clothing).sort((left, right) => Number(left) - Number(right))[0];
          return (
            <div className="wardrobe-card glass-panel" key={entry.characterId}>
              <div className="wardrobe-card-header">
                <h3 className="wardrobe-name">{entry.label}</h3>
                <span className="wardrobe-info-tag">
                  보유 의상: {entry.clothingFlagCount}벌 | 탈의 활성화: {entry.availabilityFlagCount}개
                </span>
              </div>

              <div className="wardrobe-card-body">
                {clothingFlagId && (
                  <div className="clothing-toggle-section">
                    <button
                      className="clothing-toggle-btn"
                      type="button"
                      onClick={() => onAction({ type: 'wardrobe/toggleClothing', characterId: entry.characterId, flagId: clothingFlagId })}
                    >
                      입히기/벗기: {entry.clothingLabels[clothingFlagId] ?? clothingFlagId}
                    </button>
                  </div>
                )}

                {entry.costumeOptions.length > 0 && (
                  <div className="costumes-section">
                    <span className="section-subtitle">보유 코스튬 리스트</span>
                    <div className="costumes-chips-container">
                      {entry.costumeOptions.map((option) => (
                        <button
                          className="costume-chip-btn"
                          key={option.costumeId}
                          type="button"
                          disabled={!option.available}
                          onClick={() => onAction({ type: 'wardrobe/selectCostume', characterId: entry.characterId, costumeId: option.costumeId })}
                        >
                          {option.label} 착용
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <ActionRow>
        <button className="danger-glow-btn" type="button" onClick={() => onAction({ type: 'wardrobe/cancel' })}>
          사무소 복귀
        </button>
      </ActionRow>
    </section>
  );
}

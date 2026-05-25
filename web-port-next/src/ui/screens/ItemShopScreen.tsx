import { buildItemShopView } from '../../features/itemShop';
import { money, playerFacingReason } from '../routeScreenFormat';
import type { ScreenProps } from '../routeScreenTypes';
import { ActionRow, ChoiceButton, ScreenHeading, SummaryList } from '../ScreenPrimitives';

export function ItemShopScreen({ catalog, state, session, onAction }: ScreenProps) {
  const view = buildItemShopView(catalog, state, session);
  const selectedListing = view.visibleListings.find((listing) => listing.listingId === view.selectedListingId);

  return (
    <section className="screen-panel shop-screen">
      <ScreenHeading eyebrow="사무소 상점" title={`현재 금고 자금 : ${money(view.currentMoney)}`} />
      <div className="shop-layout">
        <div className="listing-list" aria-label="판매 상품">
          {view.visibleListings.map((listing) => (
            <ChoiceButton
              detail={!listing.available ? playerFacingReason(listing.disabledReason) : undefined}
              key={listing.listingId}
              label={listing.label}
              meta={money(listing.unitPrice)}
              selected={listing.listingId === view.selectedListingId}
              onClick={() => onAction({ type: 'shop/selectListing', listingId: listing.listingId })}
            />
          ))}
          {view.visibleUseItems.length > 0 && (
            <div className="section-heading">
              <p>소지품 창고</p>
              <h2>보유 약품 복용 및 조교 도구 사용</h2>
            </div>
          )}
          {view.visibleUseItems.map((item) => (
            <ChoiceButton
              detail={!item.available ? playerFacingReason(item.disabledReason) : item.description}
              key={`use:${item.itemId}`}
              label={item.label}
              meta={money(item.unitPrice)}
              selected={item.itemId === view.selectedUseItemId}
              onClick={() => onAction({ type: 'shop/selectUseItem', itemId: item.itemId })}
            />
          ))}
        </div>

        <aside className="detail-panel">
          <h2>{selectedListing ? selectedListing.label : '상점 구매 대행'}</h2>
          <SummaryList
            items={[
              {
                label: '구매 수량',
                value: (
                  <input
                    min={1}
                    type="number"
                    value={view.quantity}
                    onChange={(event) => onAction({ type: 'shop/changeQuantity', quantity: Number(event.target.value) })}
                  />
                ),
              },
              { label: '최종 합계', value: view.totalPrice === undefined ? '-' : money(view.totalPrice) },
            ]}
          />
          <ActionRow compact>
            <button type="button" disabled={!selectedListing} onClick={() => onAction({ type: 'shop/confirmPurchase' })}>
              즉시 구매
            </button>
            <button type="button" onClick={() => onAction({ type: 'shop/cancel' })}>
              상점 퇴장
            </button>
          </ActionRow>

          <div className="section-heading">
            <p>도구/약물 조율</p>
            <h2>{view.selectedUseItem ? view.selectedUseItem.label : '도구 및 약품 조율'}</h2>
          </div>
          <SummaryList
            items={[
              { label: '소모 가격', value: view.useTotalPrice === undefined ? '-' : money(view.useTotalPrice) },
              { label: '적용 여배우', value: view.selectedUseTarget?.label ?? '미지정' },
            ]}
          />
          {view.selectedUseItem?.targetRequired && (
            <div className="listing-list compact-list choice-grid" aria-label="아이템 적용 대상">
              {view.eligibleUseTargets.map((target) => (
                <ChoiceButton
                  detail={!target.available ? playerFacingReason(target.disabledReason) : undefined}
                  disabled={!target.available}
                  key={target.characterId}
                  label={target.label}
                  selected={target.characterId === view.selectedUseTargetCharacterId}
                  onClick={() => onAction({ type: 'shop/selectUseTarget', characterId: target.characterId })}
                />
              ))}
            </div>
          )}
          <ActionRow compact>
            <button
              type="button"
              disabled={!view.selectedUseItem || (view.selectedUseItem.targetRequired && !view.selectedUseTarget)}
              onClick={() => onAction({ type: 'shop/confirmUseItem' })}
            >
              사용 적용
            </button>
            <button type="button" disabled={!view.selectedUseItem && !view.selectedUseTarget} onClick={() => onAction({ type: 'shop/cancelUseItem' })}>
              선택 취소
            </button>
          </ActionRow>
        </aside>
      </div>
    </section>
  );
}

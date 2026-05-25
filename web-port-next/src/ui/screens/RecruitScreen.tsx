import { buildRecruitView } from '../../features/recruit';
import { money, playerFacingReason } from '../routeScreenFormat';
import type { ScreenProps } from '../routeScreenTypes';
import { ActionRow, ChoiceButton, ScreenHeading, SummaryList } from '../ScreenPrimitives';

export function RecruitScreen({ catalog, state, session, onAction }: ScreenProps) {
  const view = buildRecruitView(catalog, state, session);

  return (
    <section className="screen-panel shop-screen">
      <ScreenHeading eyebrow="스카우트 센터" title={`현재 금고 자금 : ${money(view.currentMoney)}`} />
      <div className="shop-layout">
        <div className="listing-list" aria-label="영입 후보">
          {view.visibleListings.map((listing) => (
            <ChoiceButton
              detail={!listing.available ? playerFacingReason(listing.disabledReason) : undefined}
              key={listing.listingId}
              label={listing.label}
              meta={money(listing.price)}
              selected={listing.listingId === view.selectedListingId}
              onClick={() => onAction({ type: 'recruit/selectListing', listingId: listing.listingId })}
            />
          ))}
          <div className="event-log-container">
            <span className="page-indicator">페이지: {view.pageIndex + 1}</span>
            <ActionRow compact>
              <button type="button" onClick={() => onAction({ type: 'recruit/previousPage' })}>
                {view.previousPageLabel === 'previous' ? '이전 페이지' : view.previousPageLabel}
              </button>
              <button type="button" onClick={() => onAction({ type: 'recruit/nextPage' })}>
                {view.nextPageLabel === 'next' ? '다음 페이지' : view.nextPageLabel}
              </button>
            </ActionRow>
            <button style={{ marginTop: '10px', width: '100%' }} type="button" onClick={() => onAction({ type: 'recruit/cancel' })}>
              {view.returnLabel === 'return' ? '사무소 복귀' : view.returnLabel}
            </button>
          </div>
        </div>

        <aside className="detail-panel">
          <h2>{view.selectedListing ? view.selectedListing.label : '스카우트 후보 프로필'}</h2>
          <SummaryList
            items={[
              { label: '영입 계약금', value: view.selectedListing ? money(view.selectedListing.price) : '미지정' },
            ]}
          />
          {view.selectedManual ? (
            <div className="event-log" aria-label="후보 설명">
              {view.selectedManual.lines.map((line, index) => (
                <p key={`manual:${view.selectedManual?.candidateNumber}:${index}`}>{line || '\u00a0'}</p>
              ))}
            </div>
          ) : null}
          {view.interview ? (
            <div className="event-log" aria-label="면접 내용">
              <h3>{view.interview.candidateName}</h3>
              {view.interview.promptLines.map((line) => (
                <p key={`prompt:${line}`}>{line}</p>
              ))}
              {view.interview.descriptionLines.map((line, index) => (
                <p key={`interview:${index}`}>{line}</p>
              ))}
              <p>{view.interview.contractPrompt}</p>
            </div>
          ) : null}
          <ActionRow compact>
            <button type="button" disabled={!view.selectedListing} onClick={() => onAction({ type: 'recruit/confirm' })}>
              {view.interview?.confirmLabel ?? '계약 체결'}
            </button>
            {view.interview?.rerollLabel ? (
              <button type="button" onClick={() => onAction({ type: 'recruit/rerollInterview' })}>
                다른 후보 보기
              </button>
            ) : null}
            <button type="button" onClick={() => onAction({ type: 'recruit/cancel' })}>
              {view.interview?.rejectLabel ?? '생각해본다'}
            </button>
          </ActionRow>
        </aside>
      </div>
    </section>
  );
}

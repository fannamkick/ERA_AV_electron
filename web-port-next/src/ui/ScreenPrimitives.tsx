import type { ReactNode } from 'react';

type ScreenHeadingProps = {
  readonly eyebrow: string;
  readonly title: ReactNode;
};

type ActionRowProps = {
  readonly children: ReactNode;
  readonly compact?: boolean;
};

type ChoiceButtonProps = {
  readonly label: ReactNode;
  readonly meta?: ReactNode;
  readonly detail?: ReactNode;
  readonly selected?: boolean;
  readonly disabled?: boolean;
  readonly title?: string;
  readonly className?: string;
  readonly onClick: () => void;
};

type SummaryListProps = {
  readonly items: readonly {
    readonly label: string;
    readonly value: ReactNode;
  }[];
};

export function ScreenHeading({ eyebrow, title }: ScreenHeadingProps) {
  return (
    <div className="screen-heading">
      <p>{eyebrow}</p>
      <h1>{title}</h1>
    </div>
  );
}

export function ActionRow({ children, compact = false }: ActionRowProps) {
  return <div className={`action-row${compact ? ' compact' : ''}`}>{children}</div>;
}

export function ChoiceButton({
  label,
  meta,
  detail,
  selected = false,
  disabled = false,
  title,
  className,
  onClick,
}: ChoiceButtonProps) {
  const classNames = [className, selected ? 'selected' : undefined].filter(Boolean).join(' ');

  return (
    <button className={classNames} disabled={disabled} title={title} type="button" onClick={onClick}>
      <span>{label}</span>
      {meta !== undefined && <strong>{meta}</strong>}
      {detail !== undefined && <small>{detail}</small>}
    </button>
  );
}

export function SummaryList({ items }: SummaryListProps) {
  return (
    <dl className="summary-list">
      {items.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

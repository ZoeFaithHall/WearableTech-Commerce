"use client";

import type { SubscriptionOption } from "@/lib/types/commerce";

interface SubscriptionToggleProps {
  subscription: SubscriptionOption;
  isActive: boolean;
  onToggle: (active: boolean) => void;
}

const SubscriptionToggle: React.FC<SubscriptionToggleProps> = ({
  subscription,
  isActive,
  onToggle,
}) => {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(subscription.price);

  return (
    <div className={`subscription-toggle ${isActive ? "subscription-toggle--active" : ""}`}>
      <div className="subscription-toggle__header">
        <div>
          <h4 className="subscription-toggle__name">{subscription.name}</h4>
          <p className="subscription-toggle__pricing">
            {formattedPrice}/{subscription.interval}
            {subscription.trialDays > 0 && (
              <span className="subscription-toggle__trial">
                {" · "}{subscription.trialDays}-day free trial
              </span>
            )}
          </p>
        </div>
        <button
          role="switch"
          aria-checked={isActive}
          aria-label={`${isActive ? "Remove" : "Add"} ${subscription.name}`}
          className="subscription-toggle__switch"
          onClick={() => onToggle(!isActive)}
        >
          <span className="subscription-toggle__thumb" />
        </button>
      </div>
      {isActive && (
        <ul className="subscription-toggle__features" aria-label="Included features">
          {subscription.features.map((feature, i) => (
            <li key={i} className="subscription-toggle__feature">
              <span aria-hidden="true">✓</span> {feature}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubscriptionToggle;

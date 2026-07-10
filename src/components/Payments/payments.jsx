import { CreditCard, History } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function Payments() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

const role = user?.role;

const allCards = [
    {
        title: "Payment",
        description: "Add and manage customer payments",
        icon: <CreditCard size={40} className="text-blue-600" />,
        path: "/payments/sendpayments",
        roles: ["MASTER ROLE"],
    },
    {
        title: "Payment History",
        description: "View all payment transactions",
        icon: <History size={40} className="text-green-600" />,
        path: "/payments/history",
        roles: ["UI/UX","BACKEND DEVELOPER","ANDROID DEVELOPER","CLOUD DEVELOPER","FRONT END DEVELOPER","MASTER ROLE"],
    },
    {
        title: "Payments Approval",
        description: "Approve employee payments",
        icon: <History size={40} className="text-purple-600" />,
        path: "/payments/approval",
        roles: ["MASTER ROLE"],
    },
];

const cards = allCards.filter((card) =>
    card.roles.includes(user?.role)
);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Payments</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border hover:border-blue-500"
          >
            <div className="flex items-center gap-4">
              {card.icon}
              <div>
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="text-gray-500 text-sm">
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
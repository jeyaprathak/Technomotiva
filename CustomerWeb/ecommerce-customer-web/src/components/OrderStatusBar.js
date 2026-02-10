export default function OrderStatusBar({ status }) {
  const steps = ["Placed", "Shipped", "Delivered"];
  const currentIndex = steps.indexOf(status);

  return (
    <div className="py-4">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500"
            style={{
              width: `${(currentIndex / (steps.length - 1)) * 100}%`,
            }}
          ></div>
        </div>

        {/* Steps */}
        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step} className="flex flex-col items-center flex-1">
              {/* Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  isCompleted
                    ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg scale-110"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>

              {/* Label */}
              <div className="mt-2 text-center">
                <p
                  className={`text-sm font-semibold ${
                    isCompleted ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {step}
                </p>
                {isCurrent && (
                  <p className="text-xs text-orange-600 font-medium mt-1">In Progress</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Status Message */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4 text-center">
        {currentIndex === 0 && (
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Order Placed:</span> Your order has been confirmed
          </p>
        )}
        {currentIndex === 1 && (
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Shipped:</span> Your order is on its way
          </p>
        )}
        {currentIndex === 2 && (
          <div className="flex items-center justify-center gap-2 text-green-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-semibold">Delivered Successfully</span>
          </div>
        )}
      </div>
    </div>
  );
}
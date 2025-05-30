export interface PromotionalBannerProps {
    id: string;
    title: string;
    description: string;
    buttonText: string;
    image: string;
}

export function PromotionalBanner({ title, description, buttonText, image }: PromotionalBannerProps) {
    return (
        <div className="bg-gradient-to-r from-blue-600 min-w-[518px] max-w-[518px] h-[186px] to-blue-700 rounded-lg p-6 text-white relative overflow-hidden">
            <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                    <h2 className="text-xl font-bold mb-2">{title}</h2>
                    <p className="text-blue-100 mb-4 text-sm">{description}</p>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
                        {buttonText}
                    </button>
                </div>
                <div className="flex-shrink-0">
                    <img
                        src={image}
                        alt="Promotional aircraft"
                        className="w-32 h-20 object-contain"
                    />
                </div>
            </div>
        </div>
    );
}
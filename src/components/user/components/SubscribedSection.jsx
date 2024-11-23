import React from "react";

export default function SubscribedSection() {
    const subscribedChannels = [
        { id: 1, name: "Channel 1", avatar: "https://dummyimage.com/100x100" },
        { id: 2, name: "Channel 2", avatar: "https://dummyimage.com/100x100" },
        { id: 3, name: "Channel 3", avatar: "https://dummyimage.com/100x100" },
    ];

    return (
        <div>
            <p className="text-gray-300 mb-5">Channels you are subscribed to:</p>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {subscribedChannels.map((sub) => (
                    <div key={sub.id} className="flex items-center hover:bg-[#1c1d1f] p-3 rounded-lg">
                        <img src={sub.avatar} alt={sub.name} className="w-12 h-12 rounded-full mr-3" />
                        <div className="text-white">
                            <h3 className="text-lg font-semibold">{sub.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

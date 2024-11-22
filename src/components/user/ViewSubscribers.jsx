import React, { useEffect, useState } from "react";
import { subscriptionService } from "../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewSubscribers() {
    const [subscribers, setSubscribers] = useState([]);

    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const response = await subscriptionService.getUserChannelSubscribers();
                setSubscribers(response.data);
            } catch (error) {
                toast.error("Failed to load subscribers.");
            }
        };

        fetchSubscribers();
    }, []);

    return (
        <div className="bg-[#101010] text-white p-5 h-full md:ml-52 pt-16">
            <h1 className="text-3xl font-semibold mb-6">Subscribers</h1>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {subscribers.map((subscriber) => (
                    <div
                        key={subscriber._id}
                        className="bg-[#1a1a1d] rounded-lg shadow-lg overflow-hidden flex items-center p-4"
                    >
                        <img
                            src={subscriber.avatar}
                            alt={subscriber.username}
                            className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                            <h2 className="text-lg font-semibold">{subscriber.username}</h2>
                            <p className="text-gray-400">{subscriber.email}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

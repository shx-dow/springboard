import { useEffect, useState } from "react";
import { Clock } from "@phosphor-icons/react";
import api from "../services/api";

function ActivityFeed({ projectId }) {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const res = await api.get("/activities", {
                    params: projectId ? { project: projectId } : {},
                });
                setActivities(res.data);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, [projectId]);

    if (loading) return <p>Loading activity...</p>;

    return (
        <div className="activity-section">
            <h2>Recent Activity</h2>

            {error && <p>Unable to load recent activity. Please refresh.</p>}
            {!error && activities.length === 0 && <p>No recent activity yet.</p>}

            {activities.map((activity) => (
                <div className="activity-item" key={activity._id}>
                    <Clock size={18} />

                    <div>
                        <p>
                            {activity.userId?.name || "User"} {activity.action}
                        </p>

                        <small>
                            {activity.issueId?.title || "Issue unavailable"}
                        </small>

                        <small>
                            {new Date(activity.createdAt).toLocaleString()}
                        </small>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ActivityFeed;

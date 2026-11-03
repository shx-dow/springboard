import { useEffect, useState } from "react";
import {
    Kanban,
    ListChecks,
    Clock,
    CheckCircle,
    Warning,
} from "@phosphor-icons/react";

import api from "../services/api";
function Dashboard() {
    const [stats, setStats] = useState({
        totalProjects: 0,
        totalIssues: 0,
        openIssues: 0,
        inProgressIssues: 0,
        completedIssues: 0,
        highPriorityIssues: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get("/dashboard/stats");
                setStats(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const cards = [
        {
            title: "Total Projects",
            value: stats.totalProjects,
            icon: Kanban,
        },
        {
            title: "Total Issues",
            value: stats.totalIssues,
            icon: ListChecks,
        },
        {
            title: "Open Issues",
            value: stats.openIssues,
            icon: Clock,
        },
        {
            title: "In Progress",
            value: stats.inProgressIssues,
            icon: Warning,
        },
        {
            title: "Completed",
            value: stats.completedIssues,
            icon: CheckCircle,
        },
        {
            title: "High Priority",
            value: stats.highPriorityIssues,
            icon: Warning,
        },
    ];

    if (loading) return <p>Loading dashboard...</p>;

    return (
        <div className="dashboard">
            <div className="page-heading">
                <div>
                    <h1>Dashboard</h1>
                    <p>Here's what's happening in your workspace.</p>
                </div>
            </div>

            <div className="stats-grid">
                {cards.map((card, index) => {
                    const Icon = card.icon;

                    return (
                        <div className="stat-card" key={index}>
                            <div className="stat-icon">
                                <Icon size={22} />
                            </div>

                            <p>{card.title}</p>

                            <h2>{card.value}</h2>
                        </div>
                    );
                })}
            </div>

            <div className="welcome-card">
                <div>
                    <h2>Workspace overview</h2>
                    <p>Track project work and keep issues moving.</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

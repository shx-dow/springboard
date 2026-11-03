import { useEffect, useState } from "react";
import {
    Kanban,
    ListChecks,
    Clock,
    CheckCircle,
    Warning,
} from "@phosphor-icons/react";

import api from "../services/api";
import { Link } from "react-router-dom";
import ActivityFeed from "../components/ActivityFeed";
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
            <div className="page-heading dashboard-heading">
                <div><h1>Dashboard</h1><p>Your workspace at a glance.</p></div>
                <Link className="dashboard-action" to="/projects">View projects <span>→</span></Link>
            </div>
            <div className="stats-grid">
                {cards.map((card) => {
                    const Icon = card.icon;
                    return <div className="stat-card" key={card.title}><div className="stat-icon"><Icon size={18} /></div><p>{card.title}</p><h2>{card.value}</h2></div>;
                })}
            </div>
            <div className="dashboard-lower">
              <section className="dashboard-panel dashboard-activity">
                <div className="section-caption"><span>Recent activity</span><Link to="/issues">Browse issues →</Link></div>
                <ActivityFeed />
              </section>
              <section className="dashboard-side-note">
                <span className="eyebrow">NEXT UP</span>
                <p>{stats.totalProjects === 0 ? "Create your first project to start organizing work." : stats.openIssues > 0 ? `${stats.openIssues} open ${stats.openIssues === 1 ? "issue needs" : "issues need"} attention.` : "All clear. Add an issue when new work comes in."}</p>
                <Link to={stats.totalProjects === 0 ? "/projects" : "/issues"}>{stats.totalProjects === 0 ? "Create a project" : "Review issues"}<span>↗</span></Link>
              </section>
            </div>
        </div>
    );
}

export default Dashboard;

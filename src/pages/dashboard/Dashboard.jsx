import CalendarApp from '../../components/calendar/Calendar';
import CompletionChart from '../../components/chart/Chart';
import TrainingsTable from '../../components/trainings/Trainings';
import TrainingCostSummary from '../../components/costs/Costs';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard-wrapper">
            {/* Main Content Area */}
            <main className="dashboard-content">
                <div className="dashboard-grid">

                    {/* GRID AREA 1: CALENDAR (Top Left) */}
                    <div className="grid-card calendar">
                        <CalendarApp />
                    </div>

                    {/* GRID AREA 2: COMPLETION RATE (Top Right) */}
                    <div className="grid-card chart">
                        <CompletionChart />
                    </div>

                    {/* GRID AREA 3: UPCOMING TRAININGS TABLE (Bottom Left) */}
                    <div className="grid-card training">
                        <TrainingsTable />
                    </div>

                    {/* GRID AREA 4: TRAINING COST SUMMARY (Bottom Right) */}
                    <div className="grid-card cost">
                        <TrainingCostSummary />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;